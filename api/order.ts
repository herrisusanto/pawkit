import { ConsoleLogger } from "aws-amplify/utils";
import { graphqlClient } from "./core";
import { Currency, OrderStatus } from "./graphql/API";
import { createOrder, updateOrder } from "./graphql/mutations";
import { getOrder } from "./graphql/queries";
import {
  BadRequestError,
  ConflictError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "./errors";

const logger = new ConsoleLogger("api/order.ts");

// Create
export const addOrder = async (customerId: string, currency: Currency) => {
  try {
    const result = await graphqlClient.graphql({
      query: createOrder,
      variables: {
        input: {
          customerId,
          currency,
          totalAmount: 0,
          status: OrderStatus.PENDING,
          bookingIds: [],
        },
      },
    });
    logger.info("Called createOrder mutation");
    return result.data.createOrder;
  } catch (error) {
    logger.error("Error creating order: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error creating order");
  }
};

// Read
export const fetchOrder = async (id: string) => {
  try {
    if (!id) {
      logger.error("Order id is required");
      throw new BadRequestError("Order id is required");
    }

    const result = await graphqlClient.graphql({
      query: getOrder,
      variables: {
        id,
      },
    });
    logger.info("Called getOrder query");
    return result.data.getOrder;
  } catch (error) {
    logger.error(`Error fetching order with id=${id}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching order");
  }
};

// Update
export const addBookingToOrder = async (
  orderId: string,
  bookingId: string,
  currency: Currency,
  amount: number
) => {
  try {
    if (!orderId) {
      logger.error("Order id is required");
      throw new BadRequestError("Order id is required");
    }

    if (!bookingId) {
      logger.error("Booking id is required");
      throw new BadRequestError("Booking id is required");
    }

    const order = await fetchOrder(orderId);
    if (!order) {
      logger.error(`Order with id=${orderId} not found`);
      throw new NotFoundError("Order not found");
    }
    const bookingIds = order.bookingIds || [];
    const orderCurrency = order.currency;
    if (orderCurrency !== currency) {
      logger.error(
        `Order currency=${orderCurrency} does not match booking currency=${currency}`
      );
      throw new ConflictError("Currency mismatch");
    }
    const orderAmount = order.totalAmount;

    if (bookingIds.includes(bookingId)) {
      logger.warn(
        `Booking id=${bookingId} already exists in order id=${orderId}`
      );
      return order;
    }

    const result = await graphqlClient.graphql({
      query: updateOrder,
      variables: {
        input: {
          id: orderId,
          bookingIds: [...bookingIds, bookingId],
          totalAmount: orderAmount + amount,
        },
      },
    });
    logger.info("Called updateOrder mutation to add booking to order");
    return result.data.updateOrder;
  } catch (error) {
    logger.error(
      `Error adding booking id=${bookingId} to order id=${orderId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error adding booking to order");
  }
};

export const updateBookingCancellationInOrder = async (
  orderId: string,
  bookingId: string
) => {
  try {
    if (!orderId) {
      logger.error("Order id is required");
      throw new BadRequestError("Order id is required");
    }

    if (!bookingId) {
      logger.error("Booking id is required");
      throw new BadRequestError("Booking id is required");
    }

    const order = await fetchOrder(orderId);
    if (!order) {
      logger.error(`Order with id=${orderId} not found`);
      throw new NotFoundError("Order not found");
    }

    const bookingIds = order.bookingIds;
    if (!bookingIds?.includes(bookingId)) {
      logger.error(
        `Booking id=${bookingId} does not belong to order id=${orderId}`
      );
      throw new ConflictError("Booking does not belong to order");
    }

    const result = await graphqlClient.graphql({
      query: updateOrder,
      variables: {
        input: {
          id: orderId,
          bookingIds: bookingIds.filter((id) => id !== bookingId),
        },
      },
    });
    logger.info(
      "Called updateOrder mutation to update order with booking cancellation"
    );
    return result.data.updateOrder;
  } catch (error) {
    logger.error(
      `Error updating booking id=${bookingId} cancellation in order id=${orderId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError(
      "Error updating order with booking cancellation"
    );
  }
};

export const updateOrderPayment = async (
  orderId: string,
  paymentRequestId: string
) => {
  try {
    if (!orderId) {
      logger.error("Order id is required");
      throw new BadRequestError("Order id is required");
    }

    if (!paymentRequestId) {
      logger.error("Payment request id is required");
      throw new BadRequestError("Payment request id is required");
    }

    const order = await fetchOrder(orderId);
    if (!order) {
      logger.error(`Order with id=${orderId} not found`);
      throw new NotFoundError("Order not found");
    }

    const result = await graphqlClient.graphql({
      query: updateOrder,
      variables: {
        input: {
          id: orderId,
          paymentRequestId,
        },
      },
    });
    logger.info("Called updateOrder mutation to add payment to order");
    return result.data.updateOrder;
  } catch (error) {
    logger.error(
      `Error updating order payment to ${paymentRequestId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error updating order payment");
  }
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  try {
    if (!id) {
      logger.error("Order id is required");
      throw new BadRequestError("Order id is required");
    }

    const order = await fetchOrder(id);
    if (!order) {
      logger.error(`Order with id=${id} not found`);
      throw new NotFoundError("Order not found");
    }

    const result = await graphqlClient.graphql({
      query: updateOrder,
      variables: {
        input: {
          id,
          status,
        },
      },
    });
    logger.info("Called updateOrder mutation");
    return result.data.updateOrder;
  } catch (error) {
    logger.error(`Error updating order status to ${status}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error updating order status");
  }
};
