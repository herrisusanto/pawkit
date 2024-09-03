import { get, post } from "aws-amplify/api";
import { fetchAuthSession } from "@aws-amplify/core";
import { ConsoleLogger } from "aws-amplify/utils";
import { deactivateCustomer, reactivateCustomer } from "./customer";

const logger = new ConsoleLogger("api/admin.ts");
const apiName = "AdminQueries";

export const disableUser = async (username: string) => {
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

export const listUsers = async ({ pageParam }: { pageParam?: any }) => {
  const path = "/listUsers";
  const queryParams: { limit: string; token?: string } = { limit: "60" };
  if (pageParam) {
    queryParams["token"] = pageParam;
  }
  const options = {
    queryParams,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  const { body } = await get({ apiName, path, options }).response;
  return (await body.json()) as any;
};

export const getUser = async (username: string) => {
  const path = `/getUser?username=${username}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  const { body } = await get({ apiName, path, options }).response;
  return await body.json();
};

export const searchUsersByName = async (name: string) => {
  const path = `/searchUsers?attributeName=name&attributeValue=${name}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  const { body } = await get({ apiName, path, options }).response;
  return await body.json();
};

export const searchUsersByPhoneNumber = async (phone: string) => {
  const path = `/searchUsers?attributeName=phone_number&attributeValue=${phone}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await fetchAuthSession()).tokens?.accessToken.toString()}`,
    },
  };
  const { body } = await get({ apiName, path, options }).response;
  return await body.json();
};
