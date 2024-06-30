const { Sha256 } = require("@aws-crypto/sha256-js");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@smithy/signature-v4");
const { HttpRequest } = require("@smithy/protocol-http");

const GRAPHQL_ENDPOINT = process.env.API_PAWKIT_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.REGION || "ap-southeast-1";

const query = /* GraphQL */ `
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
      username
      isDeactivated
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  const { default: fetch, Request } = await import("node-fetch");

  const variables = {
    input: {
      id: event.userName,
      username: event.userName,
      isDeactivated: false,
    },
  };

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

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
  const request = new Request(GRAPHQL_ENDPOINT, signed);

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
    body: JSON.stringify(body),
  };
};
