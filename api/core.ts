import { generateClient } from "aws-amplify/api";
import * as Crypto from "expo-crypto";
import { Buffer } from "buffer";

const BASE62_CHARSET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const graphqlClient = generateClient();

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
