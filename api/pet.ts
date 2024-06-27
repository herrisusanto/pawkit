import { graphqlClient } from "./core";
import {
  getPet,
  getQuestion,
  getQuestionAnswer,
  petBookingsByBookingCustomerUsernameAndBookingtimeSlotId,
  petsByCustomer,
} from "./graphql/queries";
import {
  BookingStatus,
  CreatePetInput,
  ModelIDKeyConditionInput,
  UpdatePetInput,
} from "./graphql/API";
import { createPet, updatePet } from "./graphql/mutations";
import { ConsoleLogger } from "aws-amplify/utils";
import {
  BadRequestError,
  ConflictError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "./errors";
import { fetchBooking, fetchBookingsByPet } from "./booking";
import { fetchServiceById } from "./service";

const logger = new ConsoleLogger("api/pets.ts");

// Create
export const addPet = async (input: CreatePetInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: createPet,
      variables: {
        input,
      },
    });
    logger.info("Called createPet mutation");
    return result.data.createPet;
  } catch (error) {
    logger.error("Error creating pet: ", error);
    throw new InternalServerError("Error creating pet");
  }
};

// Read
export const fetchPetsByCustomer = async (customerId: string) => {
  try {
    if (!customerId) {
      logger.error("Customer id is required");
      throw new BadRequestError("Customer id is required");
    }

    const result = await graphqlClient.graphql({
      query: petsByCustomer,
      variables: {
        customerId,
        filter: {
          isDeleted: { eq: false },
        },
      },
    });
    logger.info("Called petsByOwner query");
    return result.data.petsByCustomer.items;
  } catch (error) {
    logger.error(`Error fetching pets owned by ${customerId}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching pets");
  }
};

export const fetchPetsByBooking = async (
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
      query: petBookingsByBookingCustomerUsernameAndBookingtimeSlotId,
      variables: {
        bookingCustomerUsername: customerUsername,
        bookingtimeSlotId: { eq: timeSlotId } as ModelIDKeyConditionInput,
      },
    });
    logger.info(
      "Called petBookingsByBookingCustomerUsernameAndBookingtimeSlotId query"
    );
    const petBookings =
      result.data.petBookingsByBookingCustomerUsernameAndBookingtimeSlotId
        .items;
    return petBookings;
    // logger.debug("PetBookings:", petBookings);
    // const enhancedPetBookings = [];
    // const errors = [];
    // for (const petBooking of petBookings) {
    //   logger.debug("PetBooking:", petBooking);
    //   try {
    //     const pet = await fetchPet(petBooking.petName, petBooking.petcustomerUsername);
    //     if (pet) {
    //       enhancedPetBookings.push({ ...petBooking, petImageUrl: pet.imageUrl, petBirthDate: pet.birthdate });
    //     }
    //   } catch (error) {
    //     logger.error(`Pet with name=${petBooking.petName} and owner=${petBooking.petcustomerUsername} not found`);
    //     errors.push(error);
    //   }
    // }
    // return { enhancedPetBookings, errors };
  } catch (error) {
    logger.error(
      `Error fetching bookings for customer ${customerUsername} at time slot ${timeSlotId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching bookings");
  }
};

export const fetchPet = async (customerUsername: string, name: string) => {
  try {
    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    if (!name) {
      logger.error("Pet name is required");
      throw new BadRequestError("Pet name is required");
    }

    const result = await graphqlClient.graphql({
      query: getPet,
      variables: {
        name,
        customerUsername,
      },
    });
    logger.info("Called getPet query");

    const pet = result.data.getPet;
    if (!pet) {
      logger.error(`Pet named ${name} owned by ${customerUsername} not found`);
      throw new NotFoundError("Pet not found");
    }

    if (pet.isDeleted) {
      logger.error(
        `Pet named ${name} owned by ${customerUsername} is already deleted`
      );
      throw new NotFoundError("Pet is deleted");
    }
    return pet;
  } catch (error) {
    logger.error(`Error fetching pet named ${name}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching pet");
  }
};

export const fetchPetQuestionAnswersForService = async (
  customerUsername: string,
  petName: string,
  serviceId: string
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

    if (!serviceId) {
      logger.error("Question ID is required");
      throw new BadRequestError("Question ID is required");
    }

    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service with id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    if (
      !service.requiredQuestionIds ||
      service.requiredQuestionIds.length === 0
    ) {
      logger.warn(`Service with id=${serviceId} does not have any questions`);
      return [];
    }

    const promises = service.requiredQuestionIds.map(async (questionId) => {
      try {
        const questionAnswer = await graphqlClient.graphql({
          query: getQuestionAnswer,
          variables: {
            customerUsername,
            petName,
            questionId,
          },
        });
        const question = await graphqlClient.graphql({
          query: getQuestion,
          variables: {
            id: questionId,
          },
        });
        return {
          id: questionId,
          question: question?.data.getQuestion?.questionString,
          answer: questionAnswer.data.getQuestionAnswer?.answer,
        };
      } catch (error) {
        logger.error(
          `Error fetching answer for question with id=${questionId}: `,
          error
        );
        return null;
      }
    });
    return await Promise.all(promises);
  } catch (error) {
    logger.error(
      `Error fetching question answers for pet ${petName} for service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching question answers");
  }
};

// Update
export const modifyPet = async (input: UpdatePetInput) => {
  try {
    const pet = await fetchPet(input.customerUsername, input.name);
    if (!pet) {
      logger.error(
        `Pet named ${input.name} owned by ${input.customerUsername} not found`
      );
      throw new NotFoundError("Pet not found");
    }

    if (pet.isDeleted) {
      logger.error(
        `Pet named ${input.name} owned by ${input.customerUsername} is already deleted`
      );
      throw new ConflictError("Pet is already deleted");
    }

    const result = await graphqlClient.graphql({
      query: updatePet,
      variables: {
        input,
      },
    });
    logger.info("Called updatePet mutation");
    return result.data.updatePet;
  } catch (error) {
    logger.error("Error updating pet: ", error);
    throw new InternalServerError("Error updating pet");
  }
};

// SOFT Delete
export const removePet = async (customerUsername: string, name: string) => {
  try {
    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    if (!name) {
      logger.error("Pet name is required");
      throw new BadRequestError("Pet name is required");
    }

    const petBookings = await fetchBookingsByPet(customerUsername, name);
    if (petBookings.length > 0) {
      petBookings.map(async (petBooking) => {
        const { booking } = await fetchBooking(
          petBooking.bookingCustomerUsername,
          petBooking.bookingtimeSlotId
        );
        if (
          booking?.status !== BookingStatus.COMPLETED &&
          booking?.status !== BookingStatus.CANCELLED
        ) {
          logger.error(
            `Pet named ${name} owned by ${customerUsername} has an active booking`
          );
          throw new ConflictError("Pet has a booking that is not cancelled");
        }
      });
    }

    logger.info(
      `Initiating soft deletion of pet named ${name} owned by ${customerUsername}`
    );
    return await graphqlClient.graphql({
      query: updatePet,
      variables: {
        input: {
          name,
          customerUsername,
          isDeleted: true,
        },
      },
    });
  } catch (error) {
    logger.error("Error deleting pet: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error deleting pet");
  }
};
