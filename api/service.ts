import { graphqlClient } from "./core";
import {
  servicesByServiceProvider,
  servicesByCategory,
  servicesByPetType,
  getService,
  serviceById,
  getQuestion,
} from "./graphql/queries";
import {
  BookingStatus,
  CreateQuestionInput,
  CreateServiceInput,
  ListServicesQueryVariables,
  PetType,
  ServiceCategory,
  UpdateServiceInput,
} from "./graphql/API";
import { ConsoleLogger } from "aws-amplify/utils";
import {
  createQuestion,
  createService,
  deleteService,
  updateService,
} from "./graphql/mutations";
import { fetchBookingsByService, updateBookingStatus } from "./booking";
import { fetchTimeSlotsByServiceId, removeTimeSlot } from "./time-slot";
import {
  BadRequestError,
  ConflictError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "./errors";
import { customListServices } from "./graphql/custom";

const logger = new ConsoleLogger("api/services.ts");

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

// Read
export const fetchServices = async (variables: ListServicesQueryVariables) => {
  try {
    const result = await graphqlClient.graphql({
      query: customListServices,
      variables,
    });
    logger.info(
      `Called customListServices query with variables: ${JSON.stringify(variables)}`
    );
    return result.data.listServices.items;
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

    const result = await graphqlClient.graphql({
      query: serviceById,
      variables: {
        id,
      },
    });
    logger.info("Called serviceById query");
    const serviceItems = result.data.serviceById.items;
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

// Delete
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
    bookings
      .filter((booking) => booking.status === BookingStatus.PENDING)
      .forEach((booking) =>
        updateBookingStatus(booking.id, BookingStatus.CANCELLED, true)
      );

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
