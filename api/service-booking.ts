import { getUrl } from "@aws-amplify/storage";
import { generateCustomerSpecificShortId, graphqlClient } from "./core";
import {
  servicesByServiceProvider,
  servicesByCategory,
  servicesByPetType,
  getService,
  getQuestion,
  bookingsByOrder,
  bookingsByService,
  bookingsByTimeSlot,
  getTimeSlot,
  listPetBookings,
  listTimeSlots,
  timeSlotById,
  petBookingsByPetId,
} from "./graphql/queries";
import {
  Booking,
  BookingStatus,
  BookingType,
  CreateBookingInput,
  CreateQuestionInput,
  CreateServiceInput,
  CreateTimeSlotInput,
  Currency,
  DeleteBookingInput,
  DeleteBookingMutation,
  GetBookingQueryVariables,
  ListBookingsQueryVariables,
  ListServicesQueryVariables,
  ListTimeSlotsQueryVariables,
  ModelPetBookingsFilterInput,
  PetType,
  Service,
  ServiceCategory,
  UpdateBookingInput,
  UpdateServiceInput,
  UpdateTimeSlotInput,
} from "./graphql/API";
import { ConsoleLogger } from "aws-amplify/utils";
import {
  createBooking,
  createPetBookings,
  createQuestion,
  createService,
  createTimeSlot,
  deleteService,
  deleteTimeSlot,
  updateBooking,
  updateQuestion,
  updateService,
  updateTimeSlot,
} from "./graphql/mutations";
import {
  BadRequestError,
  ConflictError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "./errors";
import {
  customBookingById,
  customBookingsByCustomer,
  customDeleteBooking,
  customGetBooking,
  customListBookings,
  customListServices,
  customServiceById,
} from "./graphql/custom";
import {
  fetchOrder,
  addBookingToOrder,
  updateBookingCancellationInOrder,
} from "./order";
import { fetchPaymentsByOrderId } from "./payment";
import { isValidDateTime, isValidBookingStatusTransition } from "./validation";

const logger = new ConsoleLogger("api/service-booking.ts");

const generateBookingId = async (customerId: string, timeSlotId: string) => {
  return await generateCustomerSpecificShortId(customerId, timeSlotId, 7);
};

export type AddBookingInput = {
  orderId: string;
  customerId: string;
  customerUsername: string;
  serviceId: string;
  startDateTime: string;
  address: string;
  petIds: string[];
  addOns: string[];
  bookingType: BookingType;
  amount: number;
  currency: Currency;
};

// Create
export const addService = async (input: CreateServiceInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: createService,
      variables: {
        input,
      },
    });
    logger.info("Called createService mutation");
    return result.data.createService;
  } catch (error) {
    logger.error("Error creating service: ", error);
    throw new InternalServerError("Error creating service");
  }
};

export const addQuestion = async (input: CreateQuestionInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: createQuestion,
      variables: {
        input,
      },
    });
    logger.info("Called createQuestion mutation");
    return result.data.createQuestion;
  } catch (error) {
    logger.error("Error creating question: ", error);
    throw new InternalServerError("Error creating question");
  }
};

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

// Make sure there is an order before adding a booking
// Check that disclaimer was accepted before creating booking
export const addBooking = async (input: AddBookingInput) => {
  try {
    const order = await fetchOrder(input.orderId);
    if (!order) {
      logger.error(`Order with id=${input.orderId} not found`);
      throw new NotFoundError("Order not found");
    }

    const service = await fetchServiceById(input.serviceId);
    if (!service) {
      logger.error(`Service with id=${input.serviceId} not found`);
      throw new NotFoundError("Service not found");
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
          orderId: input.orderId,
          customerUsername: input.customerUsername,
          owners: [input.customerId, service.serviceProviderId],
          customerId: input.customerId,
          serviceName: service.name,
          serviceProviderName: service.serviceProviderName,
          serviceCategory: service.serviceCategory,
          petType: service.petType,
          serviceId: input.serviceId,
          startDateTime: input.startDateTime,
          timeSlotId: timeSlot.id,
          address: input.address,
          petIds: input.petIds,
          addOns: input.addOns,
          bookingType: input.bookingType,
          amount: input.amount,
          currency: input.currency,
          status:
            input.bookingType === BookingType.FREE_TRIAL
              ? BookingStatus.PENDING_CONFIRMATION
              : BookingStatus.PENDING_PAYMENT,
        } as CreateBookingInput,
      },
    });
    const booking = bookingResult.data.createBooking;
    logger.info("Called createBooking mutation");

    const [updatedTimeSlot, updatedService, updatedOrder, petBookings] =
      await Promise.all([
        addBookingToTimeSlot(
          booking.serviceId,
          booking.startDateTime,
          booking.id
        ),
        addBookingToService(booking.serviceId, booking.id),
        addBookingToOrder(
          input.orderId,
          booking.id,
          booking.currency,
          booking.amount
        ),
        addPetBookingRelationships(
          booking.customerUsername,
          timeSlot.id,
          input.petIds
        ),
      ]);

    return {
      booking,
      updatedOrder,
      updatedTimeSlot,
      updatedService,
      petBookings,
    };
  } catch (error) {
    logger.error("Error creating booking: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error creating booking");
  }
};

export const addPetBookingRelationships = (
  customerUsername: string,
  timeSlotId: string,
  petIds: string[]
) => {
  try {
    const petBookingPromises: any[] = [];
    petIds.forEach((petId) =>
      petBookingPromises.push(
        addPetBookingRelationship(customerUsername, timeSlotId, petId)
      )
    );
    return Promise.all(petBookingPromises);
  } catch (error) {
    logger.error("Error creating pet booking relationships: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error creating pet booking relationships");
  }
};

export const addPetBookingRelationship = async (
  customerUsername: string,
  timeSlotId: string,
  petId: string
) => {
  if (!customerUsername) {
    logger.error("Customer username is required");
    throw new BadRequestError("Customer username is required");
  }

  if (!timeSlotId) {
    logger.error("Time slot id is required");
    throw new BadRequestError("Time slot id is required");
  }

  if (!petId) {
    logger.error("Pet id is required");
    throw new BadRequestError("Pet id is required");
  }

  try {
    const result = await graphqlClient.graphql({
      query: createPetBookings,
      variables: {
        input: {
          bookingCustomerUsername: customerUsername,
          bookingtimeSlotId: timeSlotId,
          petId,
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
export const fetchServices = async (variables: ListServicesQueryVariables) => {
  try {
    const result: any = await graphqlClient.graphql({
      query: customListServices,
      variables,
    });
    logger.info(
      `Called customListServices query with variables: ${JSON.stringify(variables)}`
    );
    return result.data.listServices.items as Service[];
  } catch (error) {
    logger.error("Error fetching services: ", error);
    throw new InternalServerError("Error fetching services");
  }
};

export const fetchServicesByServiceProvider = async (
  serviceProviderName: string
) => {
  try {
    if (!serviceProviderName) {
      logger.error("Service provider name is required");
      throw new BadRequestError("Service provider name is required");
    }

    const result = await graphqlClient.graphql({
      query: servicesByServiceProvider,
      variables: {
        serviceProviderName,
      },
    });
    logger.info("Called servicesByServiceProvider query");
    return result.data.servicesByServiceProvider.items;
  } catch (error) {
    logger.error(
      `Error fetching services provided by ${serviceProviderName}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching services");
  }
};

export const fetchServicesByCategory = async (
  serviceCategory: ServiceCategory
) => {
  try {
    const result = await graphqlClient.graphql({
      query: servicesByCategory,
      variables: {
        serviceCategory,
      },
    });
    logger.info("Called servicesByCategory query");
    return result.data.servicesByCategory.items;
  } catch (error) {
    logger.error(`Error fetching ${serviceCategory} services: `, error);
    throw new InternalServerError("Error fetching services");
  }
};

export const fetchServicesByPetType = async (petType: PetType) => {
  try {
    const result = await graphqlClient.graphql({
      query: servicesByPetType,
      variables: {
        petType,
      },
    });
    logger.info("Called servicesByPetType query");
    return result.data.servicesByPetType.items;
  } catch (error) {
    logger.error(`Error fetching services for ${petType}s: `, error);
    throw new InternalServerError("Error fetching services");
  }
};

export const fetchService = async (
  name: string,
  serviceProviderName: string,
  serviceCategory: ServiceCategory,
  petType: PetType
) => {
  try {
    if (!name) {
      logger.error("Service name is required");
      throw new BadRequestError("Service name is required");
    }

    if (!serviceProviderName) {
      logger.error("Service provider name is required");
      throw new BadRequestError("Service provider name is required");
    }

    const result = await graphqlClient.graphql({
      query: getService,
      variables: {
        name,
        serviceProviderName,
        serviceCategory,
        petType,
      },
    });
    logger.info("Called getService query");
    return result.data.getService;
  } catch (error) {
    logger.error(
      `Error fetching ${serviceCategory} service named ${name} provided by ${serviceProviderName} for ${petType}s: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching service");
  }
};

export const fetchServiceById = async (id: string) => {
  try {
    if (!id) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    const result: any = await graphqlClient.graphql({
      query: customServiceById,
      variables: {
        id,
      },
    });
    logger.info("Called serviceById query");
    const serviceItems = result.data.serviceById.items as Service[];
    if (!serviceItems || serviceItems.length === 0) {
      logger.error(`Service with id ${id} not found`);
      throw new NotFoundError("Service not found");
    }
    return serviceItems[0];
  } catch (error) {
    logger.error(`Error fetching service with id ${id}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching service");
  }
};

export const downloadServiceImage = async (serviceId: string) => {
  try {
    const service = await fetchServiceById(serviceId);
    if (!service) {
      console.error("Service not found");
      return;
    }

    if (!service.s3ImageKey) {
      console.error("Service image URL not found");
      return;
    }

    const getUrlResult = await getUrl({
      key: service.s3ImageKey,
      // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
      options: {
        validateObjectExistence: false, // Check if object exists before creating a URL
        expiresIn: 20, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
        // useAccelerateEndpoint: true // Whether to use accelerate endpoint
      },
    });
    logger.info("signed URL: ", getUrlResult.url);
    logger.info("URL expires at: ", getUrlResult.expiresAt);
    return getUrlResult.url;
  } catch (error) {
    logger.error("Error : ", JSON.stringify(error));
    throw new InternalServerError("Error download service image");
  }
};

export const fetchQuestionsByService = async (serviceId: string) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    if (
      !service.requiredQuestionIds ||
      service.requiredQuestionIds.length === 0
    ) {
      logger.warn(`No required questions found for service id=${serviceId}`);
      return [];
    }

    const questionPromises = service.requiredQuestionIds.map(async (id) => {
      try {
        const question = await graphqlClient.graphql({
          query: getQuestion,
          variables: {
            id,
          },
        });
        return question.data.getQuestion;
      } catch (error) {
        logger.error(
          `Error fetching question id=${id} for service id=${serviceId}: `,
          error
        );
        return null;
      }
    });

    return await Promise.all(questionPromises);
  } catch (error) {
    logger.error(
      `Error fetching questions for service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching questions");
  }
};

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

export const fetchBookings = async (variables: ListBookingsQueryVariables) => {
  try {
    const result: any = await graphqlClient.graphql({
      query: customListBookings,
      variables,
    });
    logger.info("Called listBookings query");
    return result.data.listBookings.items as Booking[];
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

export const fetchBookingsByPet = async (petId: string) => {
  if (!petId) {
    logger.error("Pet id is required");
    throw new BadRequestError("Pet id is required");
  }

  try {
    const result = await graphqlClient.graphql({
      query: petBookingsByPetId,
      variables: {
        petId,
      },
    });
    logger.info("Called petBookingsByPetId query");
    return result.data.petBookingsByPetId.items;
  } catch (error) {
    logger.error(`Error fetching bookings for pet id=${petId}: `, error);
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

    const result: any = await graphqlClient.graphql({
      query: customGetBooking,
      variables: {
        customerUsername,
        timeSlotId,
      } as GetBookingQueryVariables,
    });

    logger.info("Called getBooking query");
    const booking = result.data.getBooking as Booking;
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

export const fetchQuestion = async (id: string) => {
  try {
    if (!id) {
      logger.error("Question id is required");
      throw new BadRequestError("Question id is required");
    }

    const result = await graphqlClient.graphql({
      query: getQuestion,
      variables: {
        id,
      },
    });
    logger.info("Called getQuestion query");
    return result.data.getQuestion;
  } catch (error) {
    logger.error(`Error fetching question with id=${id}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching question");
  }
};

// Update
export const modifyService = async (input: UpdateServiceInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: updateService,
      variables: {
        input,
      },
    });
    logger.info("Called updateService mutation");
    return result.data.updateService;
  } catch (error) {
    logger.error("Error updating service: ", error);
    throw new InternalServerError("Error updating service");
  }
};

export const addServiceRelationship = async (
  parentServiceId: string,
  childServiceId: string
) => {
  try {
    if (!parentServiceId || !childServiceId) {
      logger.error("Parent and child service ids are required");
      throw new BadRequestError("Parent and child service ids are required");
    }

    if (parentServiceId === childServiceId) {
      logger.error("Parent and child service ids are the same");
      throw new BadRequestError("Parent and child service ids are the same");
    }

    const parent = await fetchServiceById(parentServiceId);
    if (!parent) {
      logger.error(`Parent service id=${parentServiceId} not found`);
      throw new NotFoundError("Parent service not found");
    }

    const child = await fetchServiceById(childServiceId);
    if (!child) {
      logger.error(`Child service id=${childServiceId} not found`);
      throw new NotFoundError("Child service not found");
    }

    let updatedParent;
    let updatedChild;

    const childServiceIds = parent.childServiceIds || [];
    if (!childServiceIds.includes(childServiceId)) {
      updatedParent = await modifyService({
        name: parent.name,
        serviceProviderName: parent.serviceProviderName,
        serviceCategory: parent.serviceCategory,
        petType: parent.petType,
        childServiceIds: [...childServiceIds, childServiceId],
      });
    }

    const parentServiceIds = child.parentServiceIds || [];
    if (!parentServiceIds.includes(parentServiceId)) {
      updatedChild = await modifyService({
        name: child.name,
        serviceProviderName: child.serviceProviderName,
        serviceCategory: child.serviceCategory,
        petType: child.petType,
        parentServiceIds: [...parentServiceIds, parentServiceId],
      });
    }
    logger.info("Adding service relationship");
    logger.debug("Updated parent: ", updatedParent);
    logger.debug("Updated child: ", updatedChild);
    return { updatedParent, updatedChild };
  } catch (error) {
    logger.error("Error adding service relationship: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error adding service relationship");
  }
};

export const removeServiceRelationship = async (
  parentServiceId: string,
  childServiceId: string
) => {
  try {
    if (!parentServiceId || !childServiceId) {
      logger.error("Parent and child service ids are required");
      throw new BadRequestError("Parent and child service ids are required");
    }

    if (parentServiceId === childServiceId) {
      logger.error("Parent and child service ids are the same");
      throw new BadRequestError("Parent and child service ids are the same");
    }

    const parent = await fetchServiceById(parentServiceId);
    if (!parent) {
      logger.error(`Parent service id=${parentServiceId} not found`);
      throw new NotFoundError("Parent service not found");
    }

    const child = await fetchServiceById(childServiceId);
    if (!child) {
      logger.error(`Child service id=${childServiceId} not found`);
      throw new NotFoundError("Child service not found");
    }

    let updatedParent;
    let updatedChild;

    const childServiceIds = parent.childServiceIds || [];
    if (childServiceIds.includes(childServiceId)) {
      updatedParent = await modifyService({
        name: parent.name,
        serviceProviderName: parent.serviceProviderName,
        serviceCategory: parent.serviceCategory,
        petType: parent.petType,
        childServiceIds: childServiceIds.filter(
          (id: string) => id !== childServiceId
        ),
      });
    }

    const parentServiceIds = child.parentServiceIds || [];
    if (parentServiceIds.includes(parentServiceId)) {
      updatedChild = await modifyService({
        name: child.name,
        serviceProviderName: child.serviceProviderName,
        serviceCategory: child.serviceCategory,
        petType: child.petType,
        parentServiceIds: parentServiceIds.filter(
          (id: string) => id !== parentServiceId
        ),
      });
    }
    logger.debug("Updated parent: ", updatedParent);
    logger.debug("Updated child: ", updatedChild);
    return { updatedParent, updatedChild };
  } catch (error) {
    logger.error("Error removing service relationship: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error removing service relationship");
  }
};

export const addTimeSlotToService = async (
  serviceId: string,
  timeSlotId: string
) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    if (!timeSlotId) {
      logger.error("Time slot id is required");
      throw new BadRequestError("Time slot id is required");
    }

    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    const timeSlotIds = service.timeSlotIds || [];
    if (timeSlotIds.includes(timeSlotId)) {
      logger.warn(
        `Time slot id=${timeSlotId} already exists in service id=${serviceId}`
      );
      return service;
    }

    const updatedService = await graphqlClient.graphql({
      query: updateService,
      variables: {
        input: {
          name: service.name,
          serviceProviderName: service.serviceProviderName,
          serviceCategory: service.serviceCategory,
          petType: service.petType,
          timeSlotIds: [...timeSlotIds, timeSlotId],
        },
      },
    });
    logger.info("Called updateService mutation to add time slot to service");
    return updatedService.data.updateService;
  } catch (error) {
    logger.error(
      `Error adding time slot id=${timeSlotId} to service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error adding time slot to service");
  }
};

export const removeTimeSlotFromService = async (
  serviceId: string,
  timeSlotId: string
) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    if (!timeSlotId) {
      logger.error("Time slot id is required");
      throw new BadRequestError("Time slot id is required");
    }

    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    const timeSlotIds = service.timeSlotIds || [];
    if (!timeSlotIds.includes(timeSlotId)) {
      logger.warn(
        `Time slot id=${timeSlotId} does not exist in service id=${serviceId}`
      );
      return service;
    }

    const updatedService = await graphqlClient.graphql({
      query: updateService,
      variables: {
        input: {
          name: service.name,
          serviceProviderName: service.serviceProviderName,
          serviceCategory: service.serviceCategory,
          petType: service.petType,
          timeSlotIds: timeSlotIds.filter((id: string) => id !== timeSlotId),
        },
      },
    });
    logger.info(
      "Called updateService mutation to remove time slot from service"
    );
    return updatedService.data.updateService;
  } catch (error) {
    logger.error(
      `Error removing time slot id=${timeSlotId} from service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error removing time slot from service");
  }
};

export const addBookingToService = async (
  serviceId: string,
  bookingId: string
) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    if (!bookingId) {
      logger.error("Booking id is required");
      throw new BadRequestError("Booking id is required");
    }

    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    const bookingIds = service.bookingIds || [];
    if (bookingIds.includes(bookingId)) {
      logger.warn(
        `Booking id=${bookingId} already exists in service id=${serviceId}`
      );
      return service;
    }

    const updatedService = await graphqlClient.graphql({
      query: updateService,
      variables: {
        input: {
          name: service.name,
          serviceProviderName: service.serviceProviderName,
          serviceCategory: service.serviceCategory,
          petType: service.petType,
          bookingIds: [...bookingIds, bookingId],
        },
      },
    });
    logger.info("Called updateService mutation to add booking to service");
    return updatedService.data.updateService;
  } catch (error) {
    logger.error(
      `Error adding booking id=${bookingId} to service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error adding booking to service");
  }
};

export const removeBookingFromService = async (
  serviceId: string,
  bookingId: string
) => {
  try {
    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    if (!bookingId) {
      logger.error("Booking id is required");
      throw new BadRequestError("Booking id is required");
    }

    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    const bookingIds = service.bookingIds || [];
    if (!bookingIds.includes(bookingId)) {
      logger.warn(
        `Booking id=${bookingId} does not exist in service id=${serviceId}`
      );
      return service;
    }

    const updatedService = await graphqlClient.graphql({
      query: updateService,
      variables: {
        input: {
          name: service.name,
          serviceProviderName: service.serviceProviderName,
          serviceCategory: service.serviceCategory,
          petType: service.petType,
          bookingIds: bookingIds.filter((id: string) => id !== bookingId),
        },
      },
    });
    logger.info("Called updateService mutation to remove booking from service");
    return updatedService.data.updateService;
  } catch (error) {
    logger.error(
      `Error removing booking id=${bookingId} from service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error removing booking from service");
  }
};

export const addQuestionAsFollowUp = async (
  parentQuestionId: string,
  childQuestionId: string
) => {
  if (!parentQuestionId || !childQuestionId) {
    logger.error("Parent and child question ids are required");
    throw new BadRequestError("Parent and child question ids are required");
  }

  if (parentQuestionId === childQuestionId) {
    logger.error("Parent and child question ids are the same");
    throw new BadRequestError("Parent and child question ids are the same");
  }

  try {
    const parent = await fetchQuestion(parentQuestionId);
    if (!parent) {
      logger.error(`Parent question id=${parentQuestionId} not found`);
      throw new NotFoundError("Parent question not found");
    }

    const child = await fetchQuestion(childQuestionId);
    if (!child) {
      logger.error(`Child question id=${childQuestionId} not found`);
      throw new NotFoundError("Child question not found");
    }

    const childQuestionIds = parent.followUpQuestionIds || [];
    if (childQuestionIds.includes(childQuestionId)) {
      logger.warn(
        `Child question id=${childQuestionId} already exists in parent question id=${parentQuestionId}`
      );
      return parent;
    }

    const updatedParent = await graphqlClient.graphql({
      query: updateQuestion,
      variables: {
        input: {
          id: parentQuestionId,
          followUpQuestionIds: [...childQuestionIds, childQuestionId],
        },
      },
    });

    logger.info("Adding question as follow-up");
    logger.debug("Updated parent: ", updatedParent);
    return updatedParent;
  } catch (error) {
    logger.error("Error adding question as follow-up: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error adding question as follow-up");
  }
};

export const addQuestionToService = async (
  questionId: string,
  serviceId: string
) => {
  try {
    if (!questionId) {
      logger.error("Question id is required");
      throw new BadRequestError("Question id is required");
    }

    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    const questionIds = service.requiredQuestionIds || [];
    if (questionIds.includes(questionId)) {
      logger.warn(
        `Question id=${questionId} already exists in service id=${serviceId}`
      );
      return service;
    }

    const updatedService = await graphqlClient.graphql({
      query: updateService,
      variables: {
        input: {
          name: service.name,
          serviceProviderName: service.serviceProviderName,
          serviceCategory: service.serviceCategory,
          petType: service.petType,
          requiredQuestionIds: [...questionIds, questionId],
        },
      },
    });
    logger.info("Called updateService mutation to add question to service");
    return updatedService.data.updateService;
  } catch (error) {
    logger.error(
      `Error adding question id=${questionId} to service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error adding question to service");
  }
};

export const removeQuestionFromService = async (
  questionId: string,
  serviceId: string
) => {
  try {
    if (!questionId) {
      logger.error("Question id is required");
      throw new BadRequestError("Question id is required");
    }

    if (!serviceId) {
      logger.error("Service id is required");
      throw new BadRequestError("Service id is required");
    }

    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    const questionIds = service.requiredQuestionIds || [];
    if (!questionIds.includes(questionId)) {
      logger.warn(
        `Question id=${questionId} does not exist in service id=${serviceId}`
      );
      return service;
    }

    const updatedService = await graphqlClient.graphql({
      query: updateService,
      variables: {
        input: {
          name: service.name,
          serviceProviderName: service.serviceProviderName,
          serviceCategory: service.serviceCategory,
          petType: service.petType,
          requiredQuestionIds: questionIds.filter(
            (id: string) => id !== questionId
          ),
        },
      },
    });
    logger.info(
      "Called updateService mutation to remove question from service"
    );
    return updatedService.data.updateService;
  } catch (error) {
    logger.error(
      `Error removing question id=${questionId} from service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error removing question from service");
  }
};

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
    if (bookingIds?.includes(bookingId)) {
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

// Delete
// TODO: Soft delete service
export const removeService = async (
  name: string,
  serviceProviderName: string,
  category: ServiceCategory,
  petType: PetType
) => {
  try {
    if (!name) {
      logger.error("Service name is required");
      throw new BadRequestError("Service name is required");
    }

    if (!serviceProviderName) {
      logger.error("Service provider name is required");
      throw new BadRequestError("Service provider name is required");
    }

    const service = await fetchService(
      name,
      serviceProviderName,
      category,
      petType
    );

    if (!service) {
      logger.error(
        `Service named ${name} provided by ${serviceProviderName} for ${petType}s in ${category} not found`
      );
      throw new NotFoundError("Service not found");
    }

    // Cancel confirmed bookings for the service
    const bookings = await fetchBookingsByService(service.id);
    for (const booking of bookings) {
      if (
        booking.status === BookingStatus.CONFIRMED ||
        booking.status === BookingStatus.IN_PROGRESS
      ) {
        throw new ConflictError(
          "Cannot delete service with confirmed bookings"
        );
      }
    }
    const promises = bookings
      .filter((booking) => booking.status === BookingStatus.PENDING)
      .map((booking) =>
        modifyBooking({
          customerUsername: booking.customerUsername,
          timeSlotId: booking.timeSlotId,
          startDateTime: booking.startDateTime,
          status: BookingStatus.CANCELLED,
        })
      );
    await Promise.all(promises);

    // Remove time slots for the service
    const timeSlots = await fetchTimeSlotsByServiceId(service.id);
    for (const timeSlot of timeSlots) {
      await removeTimeSlot(service.id, timeSlot.startDateTime);
    }

    // Remove parent-child service relationships
    const parentServiceIds = service.parentServiceIds || [];
    const childServiceIds = service.childServiceIds || [];
    for (const id of parentServiceIds) {
      await removeServiceRelationship(id, service.id);
    }
    for (const id of childServiceIds) {
      await removeServiceRelationship(service.id, id);
    }

    // Finally, delete the service
    const result = await graphqlClient.graphql({
      query: deleteService,
      variables: {
        input: {
          name,
          serviceProviderName,
          serviceCategory: category,
          petType,
        },
      },
    });
    logger.info("Called deleteService mutation");
    return result.data.deleteService;
  } catch (error) {
    logger.error("Error deleting service: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error deleting service");
  }
};

export const modifyBooking = async (input: UpdateBookingInput) => {
  try {
    const { booking } = await fetchBooking(
      input.customerUsername,
      input.timeSlotId
    );
    if (!booking) {
      logger.error(
        `Booking not found for customer=${input.customerUsername} and time slot=${input.timeSlotId}`
      );
      throw new NotFoundError("Booking not found");
    }

    if (
      input.status &&
      !isValidBookingStatusTransition(booking.status, input.status)
    ) {
      logger.error(
        `Booking status cannot transition from ${booking.status} to ${status}`
      );
      throw new BadRequestError("Invalid booking status transition");
    }

    // If cancelling order, remove booking from order and timeslot
    let order;
    let timeSlot;
    if (input.status === BookingStatus.CANCELLED) {
      order = await updateBookingCancellationInOrder(
        booking.orderId,
        booking.id
      );
      timeSlot = await removeBookingFromTimeSlot(
        booking.serviceId,
        booking.startDateTime,
        booking.id
      );
    }

    const updatedBooking = await graphqlClient.graphql({
      query: updateBooking,
      variables: { input },
    });
    logger.info(
      `Updated booking ${booking.id} for customer ${input.customerUsername}.`
    );

    return { updatedBooking, timeSlot, order };
  } catch (error) {
    logger.error(
      `Error updating booking for customer=${input.customerUsername}, timeSlotId=${input.timeSlotId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error updating booking.");
  }
};

export const removeBooking = async (input: DeleteBookingInput) => {
  try {
    const deletedBooking = (await graphqlClient.graphql({
      query: customDeleteBooking,
      variables: { input },
    })) as { data: DeleteBookingMutation };
    return deletedBooking.data.deleteBooking;
  } catch (error) {
    logger.error(`Error deleting booking: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error deleting booking");
  }
};
