/* Amplify Params - DO NOT EDIT
	API_PAWKIT_GRAPHQLAPIENDPOINTOUTPUT
	API_PAWKIT_GRAPHQLAPIIDOUTPUT
	API_PAWKIT_GRAPHQLAPIKEYOUTPUT
	AUTH_PAWKIT_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { Sha256 } from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@smithy/signature-v4";
import { HttpRequest } from "@smithy/protocol-http";
import fetch, { Request } from "node-fetch";

const GRAPHQL_ENDPOINT = process.env.API_PAWKIT_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "ap-southeast-1";

const BookingStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
};

const listBookings = /* GraphQL */ `
  query ListBookings($filter: ModelBookingFilterInput) {
    listBookings(filter: $filter) {
      items {
        id
        orderId
        customerUsername
        owners
        customerId
        serviceName
        serviceProviderName
        serviceCategory
        petType
        serviceId
        startDateTime
        timeSlotId
        address
        petIds
        addOns
        bookingType
        amount
        currency
        status
        createdAt
        updatedAt
        serviceProviderBookingsName
        timeSlotBookingsServiceId
        timeSlotBookingsStartDateTime
      }
    }
  }
`;

const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
      id
      orderId
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      address
      petIds
      addOns
      bookingType
      amount
      currency
      status
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
    }
  }
`;

const createTimeSlot = /* GraphQL */ `
  mutation CreateTimeSlot($input: CreateTimeSlotInput!) {
    createTimeSlot(input: $input) {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
    }
  }
`;

async function sendGraphQLRequest(query, variables) {
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();

    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return { statusCode, body: JSON.stringify(body) };
}

async function fetchExpiredBookingsToCancel(today) {
  const variables = {
    filter: {
      startDateTime: {
        lt: today.toISOString(),
      },
      status: {
        not: {
          in: [BookingStatus.CANCELLED, BookingStatus.COMPLETED],
        },
      },
    },
  };

  const { status, body } = await sendGraphQLRequest(listBookings, variables);
  if (status === 200) {
    console.debug("Expired bookings: ", body);
    return body.data.listBookings.items;
  } else {
    console.error(`Failed to fetch expired bookings: ${body}`);
    return null;
  }
}

async function cancelExpiredBookings(bookings) {
  const promises = bookings.map((booking) => {
    const variables = {
      input: {
        customerUsername: booking.customerUsername,
        timeSlotId: booking.timeSlotId,
        status: BookingStatus.CANCELLED,
      },
    };
    sendGraphQLRequest(updateBooking, variables);
  });

  return Promise.all(promises).then((cancelledBookings) => {
    console.debug(cancelledBookings);
    cancelledBookings.map(({ status, body }) => {
      if (status === 200) {
        console.log("Cancelled booking: ", body);
        return body.data.updateBooking;
      } else {
        console.error(`Failed to cancel booking: ${body}`);
        return null;
      }
    });
  });
}

async function addTimeSlots(today, serviceId) {
  const promises = [];
  const startDate = today; // Get the current date and time
  startDate.setHours(startDate.getHours() + 8); // Adjust for SGT timezone
  startDate.setMinutes(0, 0, 0); // Round down to the nearest hour
  startDate.setDate(startDate.getDate() + 7); // Add 7 days to the current date
  const endDate = startDate; // Get the end date by adding 1 day to the start date
  endDate.setDate(endDate.getDate() + 1);

  const timeSlotDuration = 60; // Duration of each time slot in minutes

  // Iterate through hourly intervals
  for (
    let currentTime = startDate;
    currentTime < endDate;
    currentTime.setHours(currentTime.getHours() + 1)
  ) {
    const currentHour = currentTime.getHours();
    if (currentHour >= 9 && currentHour < 22) {
      // Convert the current time to ISO string format
      const startDateTime = currentTime.toISOString();
      // Calculate the end time by adding the duration to the start time
      const endDateTime = new Date(
        currentTime.getTime() + timeSlotDuration * 60000
      ).toISOString();
      // console.log(startDateTime, endDateTime);

      const variables = {
        input: {
          serviceId,
          startDateTime,
          endDateTime,
          bookingCount: 0,
          capacity: 3,
          isFull: false,
        },
      };

      // Add the time slot using the calculated start and end times
      promises.push(sendGraphQLRequest(createTimeSlot, variables));
    }
  }

  // Wait for all time slot promises to resolve
  await Promise.all(promises).then((timeSlots) => {
    console.debug(timeSlots);
    timeSlots.map(({ status, body }) => {
      if (status === 200) {
        console.log("Added time slot: ", body);
        return body.data.createTimeSlot;
      } else {
        console.error(`Failed to add time slot: ${body}`);
        return null;
      }
    });
  });
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const today = new Date();
  const defaultServiceIds = ["1", "8", "16", "17", "18", "19"];

  // TODO: Manage status codes and response bodies
  const expiredBookingResults = await fetchExpiredBookingsToCancel(today);
  const expiredBookings = expiredBookingResults.data.listBookings.items;
  console.debug("Expired bookings: ", expiredBookings);

  const cancelledBookings = await cancelExpiredBookings(expiredBookings);
  console.debug("Cancelled bookings: ", cancelledBookings);
  const addedTimeSlots = defaultServiceIds.map(
    async (serviceId) => await addTimeSlots(today, serviceId)
  );
  console.debug("Added time slots: ", addedTimeSlots);
};
