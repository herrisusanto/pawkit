import { post } from "aws-amplify/api";
import { fetchAuthSession } from "@aws-amplify/core";
import { ConsoleLogger } from "aws-amplify/utils";
import { deactivateCustomer, reactivateCustomer } from "./customer";

const logger = new ConsoleLogger("api/admin.ts");

export const disableUser = async (username: string) => {
  const apiName = "AdminQueries";
  const path = "/disableUser";
  const options = {
    body: {
      username,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  logger.info("Disabling user with username=", username);
  await deactivateCustomer(username);
  return post({ apiName, path, options });
};

export const enableUser = async (username: string) => {
  const apiName = "AdminQueries";
  const path = "/enableUser";
  const options = {
    body: {
      username,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  logger.info("Enabling user with username=", username);
  await reactivateCustomer(username);
  return post({ apiName, path, options });
};
