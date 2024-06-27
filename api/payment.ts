import { ConsoleLogger } from "aws-amplify/utils";
import { graphqlClient } from "./core";
import {
  CreatePaymentInput,
  Currency,
  PaymentStatus,
  UpdatePaymentInput,
} from "./graphql/API";
import { createPayment, updatePayment } from "./graphql/mutations";
import { get, post } from "aws-amplify/api";
import {
  BadRequestError,
  CustomError,
  InternalServerError,
  InvalidResponseError,
} from "./errors";
import { getPayment, paymentsByOrder } from "./graphql/queries";
import { updateOrderPayment } from "./order";

const logger = new ConsoleLogger("api/payments.ts");

interface ClientPaymentRequest {
  amount: number;
  currency: Currency;
  name: string;
  phone: string;
  purpose: string;
  redirectUrl: string;
}

type HitPayRequest = {
  amount: number;
  currency: string;
  payment_methods?: string[];
  email?: string;
  name?: string;
  phone?: string;
  purpose?: string;
  reference_number?: string; // Order ID
  redirect_url?: string;
  webhook?: string;
  allow_repeated_payments?: string;
  expiry_date?: string;
  expires_after?: string;
  send_email?: string;
  send_sms?: string;
};

type HitPayResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: string;
  currency: string;
  status: string;
  purpose: string; // Service name - Pet name - Datetime
  reference_number: string;
  payment_methods: string[];
  url: string;
  redirect_url: string;
  webhook: string;
  send_sms: boolean;
  send_email: boolean;
  sms_status: string;
  email_status: string;
  allow_repeated_payments: boolean;
  expiry_date: string;
  created_at: string;
  updated_at: string;
  address?: object;
  line_items?: object[];
  payments?: object[];
};

function isHitPayResponse(response: any): response is HitPayResponse {
  return (
    typeof response.id === "string" &&
    typeof response.name === "string" &&
    typeof response.email === "string" &&
    typeof response.phone === "string" &&
    typeof response.amount === "string" &&
    typeof response.currency === "string" &&
    typeof response.status === "string" &&
    typeof response.purpose === "string" &&
    typeof response.reference_number === "string" &&
    Array.isArray(response.payment_methods) &&
    typeof response.url === "string" &&
    typeof response.redirect_url === "string" &&
    typeof response.webhook === "string" &&
    typeof response.send_sms === "boolean" &&
    typeof response.send_email === "boolean" &&
    typeof response.sms_status === "string" &&
    typeof response.email_status === "string" &&
    typeof response.allow_repeated_payments === "boolean" &&
    typeof response.expiry_date === "string" &&
    typeof response.created_at === "string" &&
    typeof response.updated_at === "string"
  );
}

// HitPay
export const createPaymentRequest = async ({
  customerId,
  orderId,
  input,
}: {
  customerId: string;
  orderId: string;
  input: ClientPaymentRequest;
}) => {
  try {
    if (!customerId) {
      logger.error("Customer id is required");
      throw new BadRequestError("Customer id is required");
    }

    if (!orderId) {
      logger.error("Order id is required");
      throw new BadRequestError("Order id is required");
    }

    logger.debug(
      `Creating payment request with input: ${JSON.stringify(input)}`
    );
    const paymentRequest: HitPayRequest = {
      amount: input.amount,
      currency: input.currency.toString(),
      payment_methods: ["paynow_online", "card"],
      name: input.name,
      phone: input.phone,
      purpose: input.purpose,
      reference_number: orderId,
      redirect_url: input.redirectUrl,
      send_email: "false",
      allow_repeated_payments: "false",
    };

    const restOperation = post({
      apiName: "payments",
      path: "/v1/payment-requests",
      options: {
        body: paymentRequest,
      },
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    logger.info("POST call succeeded");

    const hitPayResponse = response as HitPayResponse;
    logger.info("HitPay payment request created successfully");
    const payment = await addPayment({
      paymentRequestId: hitPayResponse.id,
      orderId,
      customerId,
      name: hitPayResponse.name,
      email: hitPayResponse.email,
      phone: hitPayResponse.phone,
      amount: parseFloat(hitPayResponse.amount),
      currency: hitPayResponse.currency as Currency,
      requestCreatedAt: hitPayResponse.created_at + "Z",
      requestUpdatedAt: hitPayResponse.updated_at + "Z",
      status: hitPayResponse.status.toUpperCase() as PaymentStatus,
      purpose: hitPayResponse.purpose,
      referenceNumber: hitPayResponse.reference_number,
      url: hitPayResponse.url,
      redirectUrl: hitPayResponse.redirect_url,
      webhookUrl: hitPayResponse.webhook,
      sendSMS: hitPayResponse.send_sms,
      sendEmail: hitPayResponse.send_email,
      smsStatus: hitPayResponse.sms_status === "true",
      emailStatus: hitPayResponse.email_status === "true",
      allowRepeatedPayments: hitPayResponse.allow_repeated_payments,
      expiryDateTime: hitPayResponse.expiry_date,
    });
    return { url: hitPayResponse.url, payment };
  } catch (e) {
    logger.error("POST call failed: ", JSON.parse((e as any).response.body));
    if (e instanceof CustomError) throw e;
    throw new InternalServerError("Error creating payment request");
  }
};

export const getPaymentStatus = async (paymentRequestId: string) => {
  try {
    if (!paymentRequestId) {
      logger.error("Payment request id is required");
      throw new BadRequestError("Payment request id is required");
    }

    logger.debug(`Getting payment status for request_id=${paymentRequestId}`);
    const restOperation = get({
      apiName: "payments",
      path: "/v1/payment-requests",
      options: {
        queryParams: {
          request_id: paymentRequestId,
        },
      },
    });
    const response = await restOperation.response;
    logger.info("GET call succeeded: ", response);
    if (!isHitPayResponse(response)) {
      logger.error("Invalid response from HitPay:", response);
      throw new InvalidResponseError("Invalid response from HitPay");
    }
    return response as HitPayResponse;
  } catch (e) {
    logger.error("GET call failed: ", JSON.parse((e as any).response.body));
    if (e instanceof CustomError) {
      throw e;
    }
    throw new InternalServerError("Error getting payment status");
  }
};

// Create
export const addPayment = async (input: CreatePaymentInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: createPayment,
      variables: {
        input,
      },
    });
    logger.debug("Called createPayment mutation");
    await updateOrderPayment(input.orderId, input.paymentRequestId);
    return result.data.createPayment;
  } catch (error) {
    logger.error("Error creating payment: ", error);
    return null;
  }
};

// Read
export const fetchPayment = async (paymentRequestId: string) => {
  try {
    if (!paymentRequestId) {
      logger.error("Payment request id is required");
      throw new BadRequestError("Payment request id is required");
    }

    const result = await graphqlClient.graphql({
      query: getPayment,
      variables: {
        paymentRequestId,
      },
    });
    logger.debug("Called getPayment query");
    return result.data.getPayment;
  } catch (error) {
    logger.error("Error fetching payment: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching payment");
  }
};

export const fetchPaymentsByOrderId = async (orderId: string) => {
  if (!orderId) {
    logger.error("Order id is required");
    throw new BadRequestError("Order id is required");
  }

  const result = await graphqlClient.graphql({
    query: paymentsByOrder,
    variables: {
      orderId,
    },
  });
  logger.debug("Called paymentsByOrder query");
  return result.data.paymentsByOrder.items;
};

// Update
export const modifyPayment = async (input: UpdatePaymentInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: updatePayment,
      variables: {
        input,
      },
    });
    logger.debug("Called updatePayment mutation");
    return result.data.updatePayment;
  } catch (error) {
    logger.error("Error updating payment: ", error);
    throw new InternalServerError("Error updating payment");
  }
};
