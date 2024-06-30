import {
  SignUpInput,
  signUp,
  ConfirmSignUpInput,
  confirmSignUp,
  signIn,
  confirmSignIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
} from "aws-amplify/auth";
import { ConsoleLogger } from "aws-amplify/utils";
import { graphqlClient } from "./core";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "./graphql/mutations";
import { UpdateCustomerInput } from "./graphql/API";
import { getCustomer } from "./graphql/queries";

const logger = new ConsoleLogger("api/auth.ts");

type SignUpParameters = {
  phoneNumber: string;
};

export const handleSignUp = async ({ phoneNumber }: SignUpParameters) => {
  const params = {
    username: phoneNumber,
    password: getRandomString(30),
    options: {
      userAttributes: {},
      autoSignIn: true,
      authFlowType: "CUSTOM_AUTH",
    },
  } as SignUpInput;
  logger.debug(params);
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp(params);
    logger.debug(isSignUpComplete, userId, nextStep);
  } catch (error) {
    logger.error("error signing up:", error);
  }
};

function getRandomString(bytes: number) {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(intToHex).join("");
}

function intToHex(nr: number) {
  return nr.toString(16).padStart(2, "0");
}

export const handleSignUpConfirmation = async ({
  username,
  confirmationCode,
}: ConfirmSignUpInput) => {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode,
    });
    logger.debug("Signup completion: ", isSignUpComplete);
    logger.debug("Next step: ", nextStep);
  } catch (error) {
    logger.error("error confirming sign up", error);
  }
};

export const handleSignIn = async (
  username: string,
  challengeResponse: string
) => {
  try {
    const { nextStep } = await signIn({
      username,
      options: {
        authFlowType: "CUSTOM_WITHOUT_SRP",
      },
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
      logger.debug("confirm sign in with custom challenge");
      try {
        // to send the answer of the custom challenge
        const output = await confirmSignIn({ challengeResponse });
        logger.debug(output);
      } catch (err) {
        logger.error(err);
      }
    }
  } catch (err) {
    logger.debug(err);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut();
    logger.info("signed out");
  } catch (error) {
    logger.error("error signing out: ", error);
  }
};

export async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    logger.debug(`The username: ${username}`);
    logger.debug(`The userId: ${userId}`);
    logger.debug(`The signInDetails: ${signInDetails}`);
    return { username, userId, signInDetails };
  } catch (err) {
    logger.error(err);
  }
  return null;
}

export async function currentSession() {
  try {
    return (await fetchAuthSession()).tokens?.accessToken.toString() ?? "";
  } catch (err) {
    logger.error(err);
  }
  return null;
}

export async function refreshSession() {
  try {
    const { tokens } = await fetchAuthSession({ forceRefresh: true });
    logger.debug(tokens);
    return tokens;
  } catch (err) {
    logger.error(err);
  }
}

// GraphQL
export const addCustomer = async (id: string, username: string) => {
  try {
    const result = await graphqlClient.graphql({
      query: createCustomer,
      variables: {
        input: {
          id,
          username,
          isDeactivated: false,
        },
      },
    });
    logger.info("Called createCustomer mutation");
    return result.data.createCustomer;
  } catch (error) {
    logger.error("Error creating customer: ", error);
    return null;
  }
};

export const fetchCustomer = async (id: string) => {
  try {
    const result = await graphqlClient.graphql({
      query: getCustomer,
      variables: {
        id,
      },
    });
    logger.info("Called getCustomer query");
    return result.data.getCustomer;
  } catch (error) {
    logger.error(`Error fetching customer with id=${id}: `, error);
    return null;
  }
};

export const modifyCustomer = async (input: UpdateCustomerInput) => {
  try {
    const result = await graphqlClient.graphql({
      query: updateCustomer,
      variables: {
        input,
      },
    });
    logger.info("Called updateCustomer mutation");
    return result.data.updateCustomer;
  } catch (error) {
    logger.error("Error updating customer: ", error);
    return null;
  }
};

export const removeCustomer = async (id: string) => {
  try {
    const result = await graphqlClient.graphql({
      query: deleteCustomer,
      variables: {
        input: {
          id,
        },
      },
    });
    logger.info("Called deleteCustomer mutation");
    return result.data.deleteCustomer;
  } catch (error) {
    logger.error("Error deleting customer: ", error);
    return null;
  }
};
