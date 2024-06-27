import { updateUserAttributes } from "aws-amplify/auth";

export const handleUpdateAttributes = async (
  userAttributes: {
    name?: string;
    email?: string;
    phone_number?: string;
  },
  callback?: (open: any, isError: boolean) => void
) => {
  try {
    const attributes = await updateUserAttributes({
      userAttributes,
    });

    if (attributes) {
      callback && callback(true, false);
    }
  } catch (error) {
    callback && callback(true, true);
    console.log(error);
  }
};
