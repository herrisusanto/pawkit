/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["HITPAY_API_KEY","HITPAY_SALT"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_PAWKIT_GRAPHQLAPIENDPOINTOUTPUT
	API_PAWKIT_GRAPHQLAPIIDOUTPUT
	API_PAWKIT_GRAPHQLAPIKEYOUTPUT
	AUTH_PAWKIT_USERPOOLID
 HITPAY_ENDPOINT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const crypto = require("crypto");
const { SSM } = require("aws-sdk");
const ssm = new SSM();
const { Sha256 } = require("@aws-crypto/sha256-js");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@smithy/signature-v4");
const { HttpRequest } = require("@smithy/protocol-http");
const { default: fetch, Request } = require("node-fetch");

const GRAPHQL_ENDPOINT = process.env.API_PAWKIT_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.REGION || "ap-southeast-1";

const PaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  VOIDED: "VOIDED",
  REFUNDED: "REFUNDED",
  SENT: "SENT",
  EXPIRED: "EXPIRED",
};

const PaymentMethod = {
  CARD: "CARD",
  PAYNOW_ONLINE: "PAYNOW_ONLINE",
};

const query = /* GraphQL */ `
  mutation UpdatePayment($input: UpdatePaymentInput!) {
    updatePayment(input: $input) {
      paymentRequestId
      status
      paymentId
      paymentMethod
    }
  }
`;

// declare a new express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Retrieved configured secrets from SSM
async function fetchSecrets() {
  try {
    const { Parameters } = await ssm
      .getParameters({
        Names: ["HITPAY_API_KEY", "HITPAY_SALT"].map(
          (secretName) => process.env[secretName]
        ),
        WithDecryption: true,
      })
      .promise();

    console.log(
      "Fetched parameters:",
      Parameters.map((param) => param.Name)
    );
    return Parameters.map((param) => param.Value);
  } catch (error) {
    console.error("Error fetching parameters:", error);
    throw error;
  }
}

// Generate signature array
function generateSignatureArray(secret, vals) {
  const payload = Object.keys(vals)
    .filter((key) => key !== "hmac")
    .sort()
    .map((key) => `${key}${vals[key]}`)
    .join("");
  const hmac = crypto.createHmac("sha256", secret);
  console.debug(payload);
  const signed = hmac.update(Buffer.from(payload, "utf-8")).digest("hex");
  return signed;
}

async function updatePayment(input) {
  console.debug("Updating payment with input:", input);
  const { payment_request_id, payment_id, status, payment_type } = input;
  const variables = {
    input: {
      paymentRequestId: payment_request_id,
      paymentId: payment_id,
      status: PaymentStatus[status.toUpperCase()],
      paymentMethod: PaymentMethod[payment_type.toUpperCase()],
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
}

/**********************
 * Example get method *
 **********************/

// app.get("/payment-confirmation/webhook", function (req, res) {
//   // Add your code here
//   res.json({ success: "get call succeed!", url: req.url });
// });

// app.get("/payment-confirmation/webhook/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "get call succeed!", url: req.url });
// });

/****************************
 * Example post method *
 ****************************/

app.post("/payment-confirmation/webhook", async (req, res) => {
  const [apiKey, salt] = await fetchSecrets();
  console.debug("Request body:", req.body);
  const signed = generateSignatureArray(salt, req.body);
  if (signed === req.body.hmac) {
    console.log("Signature matched");
    const options = {
      method: "GET",
      headers: { "X-BUSINESS-API-KEY": apiKey },
    };

    // Get payment method from HitPay and enrich the data
    const paymentRequest = await fetch(
      `${process.env.HITPAY_ENDPOINT}/${req.body.payment_request_id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Get Payment Request from HitPay succeeded!");
        console.log(`response: ${JSON.stringify(response)}`);
        return response;
      })
      .catch((err) => {
        console.error(
          "Get Payment Request from HitPay failed with error:",
          err
        );
      });

    const { payment_type } = paymentRequest.payments[0];
    const { statusCode, body } = await updatePayment({
      ...req.body,
      payment_type,
    });
    console.log(
      `GraphQL API call completed with statusCode=${statusCode} and response=${JSON.stringify(body)}`
    );
    res.json({
      success: "Webhook payload validated!",
      url: req.url,
      body: req.body,
    });
  } else {
    console.error("Signature mismatch");
    res.status(400).json({ error: "Signature mismatch" });
  }
});

// app.post("/payment-confirmation/webhook/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "post call succeed!", url: req.url, body: req.body });
// });

/****************************
 * Example put method *
 ****************************/

// app.put("/payment-confirmation/webhook", function (req, res) {
//   // Add your code here
//   res.json({ success: "put call succeed!", url: req.url, body: req.body });
// });

// app.put("/payment-confirmation/webhook/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "put call succeed!", url: req.url, body: req.body });
// });

/****************************
 * Example delete method *
 ****************************/

// app.delete("/payment-confirmation/webhook", function (req, res) {
//   // Add your code here
//   res.json({ success: "delete call succeed!", url: req.url });
// });

// app.delete("/payment-confirmation/webhook/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "delete call succeed!", url: req.url });
// });

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
