import { ConsoleLogger } from "aws-amplify/utils";
import { generateCustomerSpecificShortId, graphqlClient } from "./core";
import {
  createBooking,
  createPetBookings,
  updateBooking,
} from "./graphql/mutations";
import {
  bookingsByOrder,
  bookingsByService,
  bookingsByTimeSlot,
  listBookings,
  listPetBookings,
  petBookingsByPetNameAndPetcustomerUsername,
} from "./graphql/queries";
import {
  BookingStatus,
  CreateBookingInput,
  GetBookingQueryVariables,
  ListBookingsQueryVariables,
  ModelPetBookingsFilterInput,
  ModelStringKeyConditionInput,
  UpdateBookingInput,
} from "./graphql/API";
import {
  addBookingToOrder,
  addOrder,
  fetchOrder,
  updateBookingCancellationInOrder,
} from "./order";
import {
  addBookingToTimeSlot,
  fetchTimeSlot,
  removeBookingFromTimeSlot,
} from "./time-slot";
import { addBookingToService } from "./service";
import {
  BadRequestError,
  ConflictError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "./errors";
import { isValidBookingStatusTransition } from "./validation";
import {
  customBookingById,
  customBookingsByCustomer,
  customGetBooking,
} from "./graphql/custom";
import { fetchPaymentsByOrderId } from "./payment";

const logger = new ConsoleLogger("api/booking.ts");

const generateBookingId = async (customerId: string, timeSlotId: string) => {
  return await generateCustomerSpecificShortId(customerId, timeSlotId, 7);
};

// Create
// Make sure there is an order before adding a booking
// Check that disclaimer was accepted before creating booking
export const addBooking = async (
  input: CreateBookingInput,
  petName: string
) => {
  try {
    let order;
    let orderId = input.orderId;
    if (!orderId) {
      logger.warn("No order id provided, creating new order");
      order = await addOrder(input.customerId, input.currency, input.amount);
      orderId = order.id;
    } else {
      order = await fetchOrder(orderId);
      if (!order) {
        logger.error(`Order with id=${orderId} not found`);
        throw new NotFoundError("Order not found");
      }
    }

    const timeSlot = await fetchTimeSlot(input.serviceId, input.startDateTime);
    if (!timeSlot) {
      logger.error(
        `Time slot not found for service with id=${input.serviceId} at ${input.startDateTime}`
      );
      throw new NotFoundError("Time slot not found");
    }

    if (timeSlot.isFull) {
      logger.error("Time slot is full");
      throw new ConflictError("Time slot is full");
    }

    const id = await generateBookingId(input.customerId, timeSlot.id);
    const bookingResult = await graphqlClient.graphql({
      query: createBooking,
      variables: {
        input: {
          id,
          ...input,
          owners: [input.customerId, input.serviceProviderName],
          timeSlotId: timeSlot.id,
          status: BookingStatus.PENDING,
        },
      },
    });
    const booking = bookingResult.data.createBooking;
    logger.info("Called createBooking mutation");

    const [updatedTimeSlot, updatedService, updatedOrder, petBooking] =
      await Promise.all([
        addBookingToTimeSlot(
          booking.serviceId,
          booking.startDateTime,
          booking.id
        ),
        addBookingToService(booking.serviceId, booking.id),
        addBookingToOrder(
          orderId,
          booking.id,
          booking.currency,
          booking.amount
        ),
        addPetBookingRelationship(
          booking.customerUsername,
          petName,
          timeSlot.id
        ),
      ]);

    return {
      booking,
      updatedOrder,
      updatedTimeSlot,
      updatedService,
      petBooking,
    };
  } catch (error) {
    logger.error("Error creating booking: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error creating booking");
  }
};

export const addPetBookingRelationship = async (
  customerUsername: string,
  petName: string,
  timeSlotId: string
) => {
  try {
    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    if (!petName) {
      logger.error("Pet name is required");
      throw new BadRequestError("Pet name is required");
    }

    if (!timeSlotId) {
      logger.error("Time slot id is required");
      throw new BadRequestError("Time slot id is required");
    }

    const result = await graphqlClient.graphql({
      query: createPetBookings,
      variables: {
        input: {
          bookingCustomerUsername: customerUsername,
          bookingtimeSlotId: timeSlotId,
          petName,
          petcustomerUsername: customerUsername,
        },
      },
    });
    logger.info("Called createPetBookings mutation");
    return result.data.createPetBookings;
  } catch (error) {
    logger.error("Error creating pet booking relationship: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error creating pet booking relationship");
    // TODO: Rollback booking creation?
  }
};

// Read
export const fetchBookings = async (variables: ListBookingsQueryVariables) => {
  try {
    const result = await graphqlClient.graphql({
      query: listBookings,
      variables,
    });
    logger.info("Called listBookings query");
    return result.data.listBookings.items;
  } catch (error) {
    logger.error("Error fetching all bookings: ", error);
    throw new InternalServerError("Error fetching bookings");
  }
};

export const fetchBookingsByCustomer = async (customerId: string) => {
  try {
    const result: any = await graphqlClient.graphql({
      query: customBookingsByCustomer,
      variables: {
        customerId,
      },
    });
    logger.info("Called bookingsByCustomer query");
    return result.data.bookingsByCustomer.items;
  } catch (error) {
    logger.error(
      `Error fetching bookings by customer id=${customerId}: `,
      error
    );
    throw new InternalServerError("Error fetching bookings");
  }
};

export const fetchBookingsByOrder = async (orderId: string) => {
  try {
    if (!orderId) {
      logger.error("Order id is required");
      throw new BadRequestError("Order id is required");
    }

    const result = await graphqlClient.graphql({
      query: bookingsByOrder,
      variables: {
        orderId,
      },
    });
    logger.info("Called bookingsByOrder query");
    return result.data.bookingsByOrder.items;
  } catch (error) {
    logger.error(
      `Error fetching bookings for order with id=${orderId}: `,
      error
    );
    throw new InternalServerError("Error fetching bookings");
  }
};

export const fetchBookingsByPet = async (
  petName: string,
  customerUsername: string
) => {
  try {
    if (!petName) {
      logger.error("Pet name is required");
      throw new BadRequestError("Pet name is required");
    }

    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    const result = await graphqlClient.graphql({
      query: petBookingsByPetNameAndPetcustomerUsername,
      variables: {
        petName,
        petcustomerUsername: {
          eq: customerUsername,
        } as ModelStringKeyConditionInput,
      },
    });
    logger.info("Called petBookingsByPetNameAndPetcustomerUsername query");
    return result.data.petBookingsByPetNameAndPetcustomerUsername.items;
  } catch (error) {
    logger.error(
      `Error fetching bookings for pet named ${petName} owned by ${customerUsername}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching bookings");
  }
};

export const fetchPetBookings = async (filter: ModelPetBookingsFilterInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: listPetBookings,
      variables: {
        filter,
      },
    });
    logger.info("Called listPetBookings query");
    return result.data.listPetBookings.items;
  } catch (error) {
    logger.error(`Error fetching bookings with filter=${filter}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching bookings");
  }
};

export const fetchBookingsByService = async (serviceId: string) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    const result = await graphqlClient.graphql({
      query: bookingsByService,
      variables: {
        serviceId,
      },
    });
    logger.info("Called bookingsByService query");
    return result.data.bookingsByService.items;
  } catch (error) {
    logger.error(
      `Error fetching bookings for service with id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching bookings");
  }
};

export const fetchBookingsByTimeSlot = async (timeSlotId: string) => {
  try {
    if (!timeSlotId) {
      logger.error("Time slot id is required");
      throw new BadRequestError("Time slot id is required");
    }

    const result = await graphqlClient.graphql({
      query: bookingsByTimeSlot,
      variables: {
        timeSlotId,
      },
    });
    logger.info(`Called bookingsByTimeSlot query`);
    return result.data.bookingsByTimeSlot.items;
  } catch (error) {
    logger.error(
      `Error fetching bookings by timeslot with id=${timeSlotId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching bookings");
  }
};

// This is preferred over fetchBookingById as it uses the GSI
export const fetchBooking = async (
  customerUsername: string,
  timeSlotId: string
) => {
  try {
    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    if (!timeSlotId) {
      logger.error("Time slot id is required");
      throw new BadRequestError("Time slot id is required");
    }

    const result = await graphqlClient.graphql({
      query: customGetBooking,
      variables: {
        customerUsername,
        timeSlotId,
      } as GetBookingQueryVariables,
    });

    logger.info("Called getBooking query");
    const booking = result.data.getBooking;
    const payments = await fetchPaymentsByOrderId(booking.orderId);
    return { booking, payments };
  } catch (error) {
    logger.error(`Error fetching booking: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching booking");
  }
};

// WARN: Fetching by primary key is safer as booking id is a short id that has a high chance of collision
export const fetchBookingById = async (id: string) => {
  try {
    if (!id) {
      logger.error("Booking id is required");
      throw new BadRequestError("Booking id is required");
    }

    const result: any = await graphqlClient.graphql({
      query: customBookingById,
      variables: {
        id,
      },
    });

    logger.info("Called bookingById query");
    const bookingItems = result.data.bookingById.items;
    if (!bookingItems || bookingItems.length === 0) {
      logger.error(`Booking with id=${id} not found`);
      throw new NotFoundError("Booking not found");
    }
    const booking = bookingItems[0];
    const payments = await fetchPaymentsByOrderId(booking.orderId);
    return { booking, payments };
  } catch (error) {
    logger.error(`Error fetching booking with id=${id}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching booking");
  }
};

// Update
export const updateBookingStatus = async (
  customerUsername: string,
  timeSlotId: string,
  status: BookingStatus,
  toRefund: boolean
) => {
  try {
    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    if (!timeSlotId) {
      logger.error("Time slot id is required");
      throw new BadRequestError("Time slot id is required");
    }

    const { booking } = await fetchBooking(customerUsername, timeSlotId);
    if (!booking) {
      logger.error(
        `Booking not found for customer=${customerUsername} and time slot=${timeSlotId}`
      );
      throw new NotFoundError("Booking not found");
    }

    if (!isValidBookingStatusTransition(booking.status, status)) {
      logger.error(
        `Booking status cannot transition from ${booking.status} to ${status}`
      );
      throw new BadRequestError("Invalid booking status transition");
    }

    // If cancelling order, remove booking from order and timeslot
    let order;
    let timeSlot;
    if (status === BookingStatus.CANCELLED) {
      order = await updateBookingCancellationInOrder(
        booking.orderId,
        booking.id,
        booking.amount,
        toRefund
      );
      timeSlot = await removeBookingFromTimeSlot(
        booking.serviceId,
        booking.startDateTime,
        booking.id
      );
    }

    const updatedBooking = await graphqlClient.graphql({
      query: updateBooking,
      variables: {
        input: {
          customerUsername,
          timeSlotId,
          status,
        } as UpdateBookingInput,
      },
    });
    logger.info(`Updated booking status from ${booking.status} to ${status}`);

    return { updatedBooking, timeSlot, order };
  } catch (error) {
    logger.error(`Error updating booking status to ${status}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error updating booking status");
  }
};
