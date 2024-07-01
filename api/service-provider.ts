import { ConsoleLogger } from "aws-amplify/utils";
import { graphqlClient } from "./core";
import {
  CreateServiceProviderInput,
  DeleteServiceProviderInput,
  ListServiceProvidersQueryVariables,
  UpdateServiceProviderInput,
} from "./graphql/API";
import {
  createServiceProvider,
  deleteServiceProvider,
  updateServiceProvider,
} from "./graphql/mutations";
import { getServiceProvider, listServiceProviders } from "./graphql/queries";
import {
  fetchServicesByServiceProvider,
  removeService,
} from "./service-booking";
import { BadRequestError, CustomError, InternalServerError } from "./errors";

const logger = new ConsoleLogger("api/service-provider.ts");

// Create
export const addServiceProvider = async (input: CreateServiceProviderInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: createServiceProvider,
      variables: {
        input,
      },
    });
    logger.info("Called createServiceProvider mutation");
    return result.data.createServiceProvider;
  } catch (error) {
    logger.error("Error creating service provider: ", error);
    throw new InternalServerError("Error creating service provider");
  }
};

// Read
export const fetchServiceProviders = async (
  variables: ListServiceProvidersQueryVariables
) => {
  try {
    const result = await graphqlClient.graphql({
      query: listServiceProviders,
      variables,
    });
    logger.info("Called listServiceProviders query");
    return result.data.listServiceProviders.items;
  } catch (error) {
    logger.error("Error fetching service providers: ", error);
    throw new InternalServerError("Error fetching service providers");
  }
};

export const fetchServiceProvider = async (name: string) => {
  try {
    if (!name) {
      logger.error("Service provider name is required");
      throw new BadRequestError("Service provider name is required");
    }

    const result = await graphqlClient.graphql({
      query: getServiceProvider,
      variables: {
        name,
      },
    });
    logger.info("Called getServiceProvider query");
    return result.data.getServiceProvider;
  } catch (error) {
    logger.error(`Error fetching service provider ${name}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching service provider");
  }
};

// Update
export const modifyServiceProvider = async (
  input: UpdateServiceProviderInput
) => {
  try {
    const result = await graphqlClient.graphql({
      query: updateServiceProvider,
      variables: {
        input,
      },
    });
    logger.info("Called updateServiceProvider mutation");
    return result.data.updateServiceProvider;
  } catch (error) {
    logger.error("Error updating service provider: ", error);
    throw new InternalServerError("Error updating service provider");
  }
};

// Delete
export const removeServiceProvider = async (
  input: DeleteServiceProviderInput
) => {
  try {
    const services = await fetchServicesByServiceProvider(input.name);
    services?.forEach((service: any) => {
      removeService(
        service.name,
        service.serviceProviderName,
        service.serviceCategory,
        service.petType
      );
    });

    const result = await graphqlClient.graphql({
      query: deleteServiceProvider,
      variables: {
        input,
      },
    });
    logger.info("Called deleteServiceProvider mutation");
    return result.data.deleteServiceProvider;
  } catch (error) {
    logger.error("Error deleting service provider: ", error);
    throw new InternalServerError("Error deleting service provider");
  }
};
