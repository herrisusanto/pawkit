import { generateClient } from "aws-amplify/api";
import { getUrl, uploadData } from "@aws-amplify/storage";
import * as Crypto from "expo-crypto";
import { Buffer } from "buffer";
import { ConsoleLogger } from "aws-amplify/utils";
import { InternalServerError } from "./errors";

const logger = new ConsoleLogger("api/core.ts");

const BASE62_CHARSET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const graphqlClient = generateClient();

export function getCognitoSubUsername(userId: string): string {
  // https://docs.amplify.aws/gen1/react-native/build-a-backend/graphqlapi/customize-authorization-rules/
  return `${userId}::${userId}`;
}

export function hashToBase62(hash: Uint8Array, length: number): string {
  let bigint = BigInt("0x" + Buffer.from(hash).toString("hex"));

  let base62 = "";
  while (bigint > 0) {
    base62 = BASE62_CHARSET[Number(bigint % 62n)] + base62;
    bigint /= 62n;
  }

  // Ensure the base-62 string is the given length
  return base62.padStart(length, "0").substring(0, length);
}

export async function generateCustomerSpecificShortId(
  customerId: string,
  uuid: string,
  length: number
): Promise<string> {
  const combinedString = customerId + uuid;
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    combinedString,
    { encoding: Crypto.CryptoEncoding.HEX }
  );
  return hashToBase62(Buffer.from(hash, "hex"), length);
}

// https://docs.amplify.aws/gen1/react-native/build-a-backend/storage/upload/
export async function uploadFile(
  imageKey: string,
  accessLevel: "guest" | "protected" | "private",
  file: File
) {
  try {
    const result = await uploadData({
      key: imageKey,
      data: file,
      options: {
        accessLevel,
      },
    }).result;
    logger.info("Succeeded: ", result);
  } catch (error) {
    logger.error("Failed: ", error);
    throw new InternalServerError("Error uploading file");
  }
}

export async function getFileUrl(
  imageKey: string,
  accessLevel: "guest" | "protected" | "private"
) {
  try {
    const getUrlResult = await getUrl({
      key: imageKey,
      // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
      options: {
        accessLevel,
        validateObjectExistence: true, // Check if object exists before creating a URL
        expiresIn: 20, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
        // useAccelerateEndpoint: true // Whether to use accelerate endpoint
      },
    });
    logger.info("signed URL: ", getUrlResult.url);
    logger.info("URL expires at: ", getUrlResult.expiresAt);
    return getUrlResult.url;
  } catch (error) {
    logger.error("Failed: ", error);
    return null;
  }
}
