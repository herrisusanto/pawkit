import { ConsoleLogger } from "aws-amplify/utils";
import { graphqlClient } from "./core";
import {
  CreateBreedInput,
  DeleteBreedInput,
  ListBreedsQueryVariables,
  ModelBreedConditionInput,
  PetType,
  UpdateBreedInput,
} from "./graphql/API";
import { breedsByPetType, getBreed, listBreeds } from "./graphql/queries";
import { createBreed, deleteBreed, updateBreed } from "./graphql/mutations";
import { BadRequestError, CustomError, InternalServerError } from "./errors";

const logger = new ConsoleLogger("api/breed.ts");

// Create
export const addBreed = async (input: CreateBreedInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: createBreed,
      variables: {
        input,
      },
    });
    logger.info("Called createBreed mutation");
    return result.data.createBreed;
  } catch (error) {
    logger.error("Error creating breed: ", error);
    throw new InternalServerError("Error creating breed");
  }
};

// Read
export const fetchBreeds = async (variables: ListBreedsQueryVariables) => {
  try {
    const result = await graphqlClient.graphql({
      query: listBreeds,
      variables,
    });
    logger.info("Called breedsByPetType query");
    return result.data.listBreeds.items;
  } catch (error) {
    logger.error("Error fetching breeds: ", error);
    throw new InternalServerError("Error fetching breeds");
  }
};

export const fetchBreedsByPetType = async (petType: PetType) => {
  try {
    const result = await graphqlClient.graphql({
      query: breedsByPetType,
      variables: {
        petType,
      },
    });
    logger.info("Called breedsByPetType query");
    return result.data.breedsByPetType.items;
  } catch (error) {
    logger.error(`Error fetching breeds for ${petType}: `, error);
    throw new InternalServerError("Error fetching breeds");
  }
};

export const fetchBreed = async (name: string) => {
  try {
    if (!name) {
      logger.error("Breed name is required");
      throw new BadRequestError("Breed name is required");
    }

    const result = await graphqlClient.graphql({
      query: getBreed,
      variables: {
        name,
      },
    });
    logger.info("Called getBreed query");
    return result.data.getBreed;
  } catch (error) {
    logger.error(`Error fetching breed named ${name}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching breed");
  }
};

// Update
export const modifyBreed = async (
  input: UpdateBreedInput,
  condition: ModelBreedConditionInput
) => {
  try {
    const result = await graphqlClient.graphql({
      query: updateBreed,
      variables: {
        input,
        condition,
      },
    });
    logger.info("Called updateBreed mutation");
    return result.data.updateBreed;
  } catch (error) {
    logger.error("Error updating breed: ", error);
    throw new InternalServerError("Error updating breed");
  }
};

// Delete
export const removeBreed = async (
  input: DeleteBreedInput,
  condition: ModelBreedConditionInput
) => {
  try {
    const result = await graphqlClient.graphql({
      query: deleteBreed,
      variables: {
        input,
        condition,
      },
    });
    logger.info("Called deleteBreed mutation");
    return result.data.deleteBreed;
  } catch (error) {
    logger.error("Error deleting breed: ", error);
    throw new InternalServerError("Error deleting breed");
  }
};
