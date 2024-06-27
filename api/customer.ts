import { ConsoleLogger } from "aws-amplify/utils";
import { graphqlClient } from "./core";
import {
  CreateCustomerInput,
  CreateDisclaimerAcceptanceInput,
  ListCustomersQueryVariables,
  UpdateCustomerInput,
} from "./graphql/API";
import {
  createCustomer,
  createDisclaimerAcceptance,
  updateCustomer,
} from "./graphql/mutations";
import { BadRequestError, CustomError, InternalServerError } from "./errors";
import {
  acceptancesByCustomer,
  getCustomer,
  listCustomers,
} from "./graphql/queries";

const logger = new ConsoleLogger("api/customer.ts");

// Create
export const addCustomer = async (input: CreateCustomerInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: createCustomer,
      variables: { input },
    });
    logger.info("Called createCustomer mutation with input: ", input);
    return result.data.createCustomer;
  } catch (error) {
    logger.error("Error creating customer: ", error);
    throw new InternalServerError("Error creating customer");
  }
};

export const addDisclaimerAcceptance = async (
  input: CreateDisclaimerAcceptanceInput
) => {
  try {
    const result = await graphqlClient.graphql({
      query: createDisclaimerAcceptance,
      variables: { input },
    });
    logger.info(
      "Called createDisclaimerAcceptance mutation with input: ",
      input
    );
    return result.data.createDisclaimerAcceptance;
  } catch (error) {
    logger.error("Error creating disclaimer acceptance: ", error);
    throw new InternalServerError("Error creating disclaimer acceptance");
  }
};

// Read
export const fetchCustomers = async (
  variables: ListCustomersQueryVariables
) => {
  try {
    const result = await graphqlClient.graphql({
      query: listCustomers,
      variables,
    });
    logger.info("Called listCustomers query");
    return result.data.listCustomers.items;
  } catch (error) {
    logger.error("Error fetching customers: ", error);
    throw new InternalServerError("Error fetching customers");
  }
};

export const fetchCustomer = async (userId: string) => {
  try {
    if (!userId) {
      logger.error("User ID is required");
      throw new BadRequestError("User ID is required");
    }

    const result = await graphqlClient.graphql({
      query: getCustomer,
      variables: { id: userId },
    });
    logger.info("Called getCustomer query");
    return result.data.getCustomer;
  } catch (error) {
    logger.error(`Error fetching customer with id=${userId}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching customer");
  }
};

export const hasCustomerAcceptedServiceDisclaimer = async (
  userId: string,
  disclaimerName: string
): Promise<boolean> => {
  try {
    if (!userId) {
      logger.error("User ID is required");
      throw new BadRequestError("User ID is required");
    }

    if (!disclaimerName) {
      logger.error("Disclaimer name is required");
      throw new BadRequestError("Disclaimer name is required");
    }

    const acceptedDisclaimers = await graphqlClient
      .graphql({
        query: acceptancesByCustomer,
        variables: { customerId: userId },
      })
      .then((result) => {
        logger.info("Called acceptancesByCustomer query");
        return result.data.acceptancesByCustomer.items;
      });
    return (
      acceptedDisclaimers.find(
        (acceptance: any) => acceptance.disclaimerName === disclaimerName
      ) !== undefined
    );
  } catch (error) {
    logger.error(`Error fetching customer with id=${userId}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching customer");
  }
};

// Update
export const modifyCustomer = async (input: UpdateCustomerInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: updateCustomer,
      variables: { input },
    });
    logger.info("Called updateCustomer mutation with input: ", input);
    return result.data.updateCustomer;
  } catch (error) {
    logger.error("Error updating customer: ", error);
    throw new InternalServerError("Error updating customer");
  }
};

export const deactivateCustomer = async (userId: string) => {
  try {
    if (!userId) {
      logger.error("User ID is required");
      throw new BadRequestError("User ID is required");
    }

    const updatedCustomer = await modifyCustomer({
      id: userId,
      isDeactivated: true,
    });
    logger.info("Deactivated customer with id=", userId);
    return updatedCustomer;
  } catch (error) {
    logger.error("Error deactivating customer: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error deactivating customer");
  }
};

export const reactivateCustomer = async (userId: string) => {
  try {
    if (!userId) {
      logger.error("User ID is required");
      throw new BadRequestError("User ID is required");
    }

    const updatedCustomer = await modifyCustomer({
      id: userId,
      isDeactivated: false,
    });
    logger.info("Reactivated customer with id=", userId);
    return updatedCustomer;
  } catch (error) {
    logger.error("Error reactivating customer: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error reactivating customer");
  }
};
