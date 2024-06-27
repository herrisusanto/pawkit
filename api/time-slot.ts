import { ConsoleLogger } from "aws-amplify/utils";
import { graphqlClient } from "./core";
import {
  CreateTimeSlotInput,
  ListTimeSlotsQueryVariables,
  UpdateTimeSlotInput,
} from "./graphql/API";
import {
  createTimeSlot,
  deleteTimeSlot,
  updateTimeSlot,
} from "./graphql/mutations";
import { fetchBookingsByTimeSlot } from "./booking";
import { listTimeSlots, getTimeSlot, timeSlotById } from "./graphql/queries";
import { addTimeSlotToService, fetchServiceById } from "./service";
import {
  BadRequestError,
  ConflictError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "./errors";
import { isValidDateTime } from "./validation";

const logger = new ConsoleLogger("api/timeslot.ts");

// Create
export const addTimeSlot = async (input: CreateTimeSlotInput) => {
  try {
    const service = await fetchServiceById(input.serviceId);
    if (!service) {
      logger.error("Service not found");
      throw new NotFoundError("Service not found");
    }

    if (!service.defaultDisplay) {
      logger.error("Cannot add time slot to an add-on service.");
      throw new BadRequestError("Cannot add time slot to an add-on service.");
    }

    await graphqlClient.graphql({
      query: createTimeSlot,
      variables: {
        input,
      },
    });
    logger.info("Called createTimeSlot mutation");

    // Update service with new time slot
    const updatedService = addTimeSlotToService(
      input.serviceId,
      input.startDateTime
    );

    return updatedService;
  } catch (error) {
    logger.error("Error creating time slot: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error creating time slot");
  }
};

// Read
export const fetchTimeSlots = async (
  variables: ListTimeSlotsQueryVariables
) => {
  try {
    const result = await graphqlClient.graphql({
      query: listTimeSlots,
      variables,
    });
    logger.info("Called listTimeSlots query with variables: ", variables);
    return result.data.listTimeSlots.items;
  } catch (error) {
    logger.error("Error fetching time slots: ", error);
    throw new InternalServerError("Error fetching time slots");
  }
};

export const fetchTimeSlotsByServiceId = async (serviceId: string) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    const result = await graphqlClient.graphql({
      query: listTimeSlots,
      variables: {
        serviceId,
      },
    });
    logger.info(`Called listTimeSlots query for service with id=${serviceId}`);
    return result.data.listTimeSlots.items;
  } catch (error) {
    logger.error(
      `Error fetching time slots for service with id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching time slots");
  }
};

export const fetchTimeSlotById = async (id: string) => {
  try {
    if (!id) {
      logger.error("Time slot id is required");
      throw new BadRequestError("Time slot id is required");
    }

    const result = await graphqlClient.graphql({
      query: timeSlotById,
      variables: {
        id,
      },
    });
    logger.info(`Called timeSlotById query for timeslot with id=${id}`);
    return result.data.timeSlotById.items[0];
  } catch (error) {
    logger.error(`Error fetching time slot with id=${id}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching time slot");
  }
};

export const fetchTimeSlot = async (
  serviceId: string,
  startDateTime: string
) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    if (!startDateTime) {
      logger.error("Start datetime is required");
      throw new BadRequestError("Start datetime is required");
    }

    if (!isValidDateTime(startDateTime)) {
      logger.error("Invalid start datetime format");
      throw new BadRequestError("Invalid start datetime format");
    }

    const result = await graphqlClient.graphql({
      query: getTimeSlot,
      variables: {
        serviceId,
        startDateTime,
      },
    });
    logger.info(
      `Called getTimeSlot query for timeslot with serviceId=${serviceId} and startDateTime=${startDateTime}`
    );
    return result.data.getTimeSlot;
  } catch (error) {
    logger.error(
      `Error fetching time slot with serviceId=${serviceId} and startDateTime=${startDateTime}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching time slot");
  }
};

// Update
export const modifyTimeSlot = async (input: UpdateTimeSlotInput) => {
  try {
    const timeSlot = await fetchTimeSlot(input.serviceId, input.startDateTime);
    if (!timeSlot) {
      logger.error("Time slot not found");
      throw new NotFoundError("Time slot not found");
    }

    logger.debug("Time slot found: ", timeSlot);
    const bookings = await fetchBookingsByTimeSlot(timeSlot.id);
    if (bookings?.length && bookings.length > 0) {
      logger.error(
        "Cannot update a time slot that has already been booked: ",
        bookings
      );
      throw new BadRequestError(
        "Cannot update a time slot that has already been booked"
      );
    }

    const result = await graphqlClient.graphql({
      query: updateTimeSlot,
      variables: {
        input,
      },
    });
    logger.info("Called updateTimeSlot mutation");
    return result.data.updateTimeSlot;
  } catch (error) {
    logger.error("Error updating time slot: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error updating time slot");
  }
};

export const addBookingToTimeSlot = async (
  serviceId: string,
  startDateTime: string,
  bookingId: string
) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    if (!startDateTime) {
      logger.error("Start datetime is required");
      throw new BadRequestError("Start datetime is required");
    }

    if (!isValidDateTime(startDateTime)) {
      logger.error("Invalid start datetime format");
      throw new BadRequestError("Invalid start datetime format");
    }

    if (!bookingId) {
      logger.error("Booking id is required");
      throw new BadRequestError("Booking id is required");
    }

    const timeSlot = await fetchTimeSlot(serviceId, startDateTime);
    if (!timeSlot) {
      logger.error("Time slot not found");
      throw new NotFoundError("Time slot not found");
    }

    const bookingIds = timeSlot.bookingIds || [];
    if (!bookingIds?.includes(bookingId)) {
      logger.warn("Booking id already exists in time slot");
      return timeSlot;
    }

    let bookingCount = timeSlot.bookingCount || bookingIds.length;
    if (bookingCount >= timeSlot.capacity) {
      logger.error(`Time slot is full with ${bookingCount} bookings`);
      throw new ConflictError("Time slot is full");
    }

    bookingCount++;
    const result = await graphqlClient.graphql({
      query: updateTimeSlot,
      variables: {
        input: {
          serviceId,
          startDateTime,
          bookingIds: [...bookingIds, bookingId],
          bookingCount,
          isFull: bookingCount === timeSlot.capacity,
        },
      },
    });
    logger.info("Called updateTimeSlot mutation to add booking to time slot");
    return result.data.updateTimeSlot;
  } catch (error) {
    logger.error("Error adding booking to time slot: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error adding booking to time slot");
  }
};

export const removeBookingFromTimeSlot = async (
  serviceId: string,
  startDateTime: string,
  bookingId: string
) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    if (!startDateTime) {
      logger.error("Start datetime is required");
      throw new BadRequestError("Start datetime is required");
    }

    if (!isValidDateTime(startDateTime)) {
      logger.error("Invalid start datetime format");
      throw new BadRequestError("Invalid start datetime format");
    }

    if (!bookingId) {
      logger.error("Booking id is required");
      throw new BadRequestError("Booking id is required");
    }

    const timeSlot = await fetchTimeSlot(serviceId, startDateTime);
    if (!timeSlot) {
      logger.error("Time slot not found");
      throw new NotFoundError("Time slot not found");
    }

    const bookingIds = timeSlot.bookingIds || [];
    if (!bookingIds?.includes(bookingId)) {
      logger.warn(
        `Booking id=${bookingId} does not exist in time slot id=${timeSlot.id}`
      );
      return timeSlot;
    }

    let bookingCount = timeSlot.bookingCount || bookingIds.length;
    if (bookingCount <= 0) {
      logger.error("Time slot has no bookings");
      throw new ConflictError("Time slot has no bookings");
    }

    bookingCount--;
    const result = await graphqlClient.graphql({
      query: updateTimeSlot,
      variables: {
        input: {
          serviceId,
          startDateTime,
          bookingIds: bookingIds.filter((id) => id !== bookingId),
          bookingCount,
          isFull: bookingCount === timeSlot.capacity,
        },
      },
    });
    logger.info(
      "Called updateTimeSlot mutation to remove booking from time slot"
    );
    return result.data.updateTimeSlot;
  } catch (error) {
    logger.error("Error removing booking from time slot: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error removing booking from time slot");
  }
};

// Delete
export const removeTimeSlot = async (
  serviceId: string,
  startDateTime: string
) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    if (!startDateTime) {
      logger.error("Start datetime is required");
      throw new BadRequestError("Start datetime is required");
    }

    if (!isValidDateTime(startDateTime)) {
      logger.error("Invalid start datetime format");
      throw new BadRequestError("Invalid start datetime format");
    }

    const timeSlot = await fetchTimeSlot(serviceId, startDateTime);
    if (!timeSlot) {
      logger.error("Time slot not found");
      throw new NotFoundError("Time slot not found");
    }

    const bookings = await fetchBookingsByTimeSlot(timeSlot.id);
    if (bookings?.length && bookings.length > 0) {
      logger.error(
        "Cannot remove a time slot that has already been booked: ",
        bookings
      );
      throw new BadRequestError(
        "Cannot remove a time slot that has already been booked"
      );
    }

    const result = await graphqlClient.graphql({
      query: deleteTimeSlot,
      variables: {
        input: {
          serviceId,
          startDateTime,
        },
      },
    });
    logger.info("Called deleteTimeSlot mutation");
    return result.data.deleteTimeSlot;
  } catch (error) {
    logger.error("Error deleting time slot: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error deleting time slot");
  }
};
