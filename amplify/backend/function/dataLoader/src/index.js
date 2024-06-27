/* Amplify Params - DO NOT EDIT
	API_PAWKIT_GRAPHQLAPIENDPOINTOUTPUT
	API_PAWKIT_GRAPHQLAPIIDOUTPUT
	API_PAWKIT_GRAPHQLAPIKEYOUTPUT
	AUTH_PAWKIT_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";
import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { Transform } from "stream";

const client = new S3Client();

const GRAPHQL_ENDPOINT = process.env.API_PAWKIT_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "ap-southeast-1";
const { Sha256 } = crypto;

const endpoint = new URL(GRAPHQL_ENDPOINT);

const signer = new SignatureV4({
  credentials: defaultProvider(),
  region: AWS_REGION,
  service: "appsync",
  sha256: Sha256,
});

const signAndSendGraphQLRequest = async (query, variables) => {
  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;

  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: JSON.stringify(body),
  };
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  // Dynamically import csv-parser
  const csv = await import("csv-parser").then((mod) => mod.default);

  console.log(`EVENT: ${JSON.stringify(event)}`);

  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const objectParams = { Bucket: bucket, Key: key };

  try {
    // Get object metadata to ensure it exists and retrieve content type
    const { ContentType } = await client.send(
      new HeadObjectCommand(objectParams)
    );

    console.log("CONTENT TYPE:", ContentType);

    // Check if the object is a CSV file
    if (ContentType !== "text/csv") {
      throw new Error("The file is not a CSV");
    }
  } catch (err) {
    console.log(err);
    const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    console.log(message);
    throw new Error(message);
  }

  // Get the object from S3
  const data = await client.send(new GetObjectCommand(objectParams));

  // Read and parse the CSV file
  const records = [];
  const stream = data.Body.pipe(csv());
  const csvToJsonStream = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      records.push(chunk);
      callback();
    },
  });

  stream.pipe(csvToJsonStream);

  await new Promise((resolve, reject) => {
    csvToJsonStream.on("finish", resolve);
    csvToJsonStream.on("error", reject);
  });

  // The records array now contains the JSON representation of the CSV file
  console.log("CSV to JSON conversion successful:", JSON.stringify(records));

  const result = await loadBreeds(records);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

const loadBreeds = async (records) => {
  console.log("Loading breed data...");
  const createQuery = /* GraphQL */ `
    mutation CREATE_BREED($input: CreateBreedInput!) {
      createBreed(input: $input) {
        name
        petType
        coats
        undercoatRemoval
        durationUnit
        basicGroomingDuration
        fullGroomingDuration
      }
    }
  `;

  const updateQuery = /* GraphQL */ `
    mutation UPDATE_BREED($input: UpdateBreedInput!) {
      updateBreed(input: $input) {
        name
        petType
        coats
        undercoatRemoval
        durationUnit
        basicGroomingDuration
        fullGroomingDuration
      }
    }
  `;

  const asyncMutations = records.map(async (record) => {
    const variables = {
      input: {
        name: record.name,
        petType: record.petType,
        coats: record.coats.split("/"),
        undercoatRemoval: record.undercoatRemoval,
        durationUnit: record.durationUnit,
        basicGroomingDuration: record.basicGroomingDuration,
        fullGroomingDuration: record.fullGroomingDuration,
      },
    };

    try {
      return signAndSendGraphQLRequest(updateQuery, variables);
    } catch (error) {
      console.debug(error);
      console.log("Breed doesn't exist, creating new breed...");
      return signAndSendGraphQLRequest(createQuery, variables);
    }
  });

  try {
    const results = await Promise.all(asyncMutations);
    console.log("Results of mutations:", JSON.stringify(results));
    return results;
  } catch (error) {
    console.log("Error loading breeds:", JSON.stringify(error));
    throw error;
  }
};
