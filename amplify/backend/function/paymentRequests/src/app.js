/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["HITPAY_API_KEY"].map(secretName => process.env[secretName]),
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
	ENV
	REGION
	AUTH_PAWKIT_USERPOOLID
	API_PAWKIT_GRAPHQLAPIIDOUTPUT
	API_PAWKIT_GRAPHQLAPIENDPOINTOUTPUT
	API_PAWKIT_GRAPHQLAPIKEYOUTPUT
	HITPAY_ENDPOINT
 WEBHOOK_URL
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { SSM } = require("aws-sdk");
const ssm = new SSM();

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Retrieve configured secrets from SSM
const fetchHitPayAPIKey = async () => {
  try {
    const { Parameter } = await ssm
      .getParameter({
        Name: process.env["HITPAY_API_KEY"],
        WithDecryption: true,
      })
      .promise();

    console.log("Fetched parameter:", Parameter.Name);
    return Parameter.Value;
  } catch (error) {
    console.error("Error fetching parameter:", error);
    throw error;
  }
};

/**********************
 * Example get method *
 **********************/

app.get("/v1/payment-requests", async (req, res) => {
  const apiKey = await fetchHitPayAPIKey();
  console.debug("Request query:", req.query);

  if (!req.query.request_id) {
    console.error("Missing request_id query parameter");
    res.status(400).json({ error: "request_id is required" });
    return;
  }

  const options = {
    method: "GET",
    headers: { "X-BUSINESS-API-KEY": apiKey },
  };

  fetch(`${process.env.HITPAY_ENDPOINT}/${req.query.request_id}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log("GET call succeeded!");
      console.log(`response: ${JSON.stringify(response)}`);
      res.json(response);
    })
    .catch((err) => {
      console.error("GET call failed with error:", err);
      res.status(500).json({ error: err });
    });
});

// app.get("/v1/payment-requests/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "get call succeed!", url: req.url });
// });

/****************************
 * Example post method *
 ****************************/

app.post("/v1/payment-requests", async (req, res) => {
  const apiKey = await fetchHitPayAPIKey();
  console.log("Request body:", req.body);
  req.body.webhook = process.env.WEBHOOK_URL;
  const body = JSON.stringify(req.body);

  const options = {
    method: "POST",
    headers: {
      "X-BUSINESS-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body,
  };

  fetch(process.env.HITPAY_ENDPOINT, options)
    .then((response) => response.json())
    .then((response) => {
      console.log("POST call succeeded!");
      console.log(`response: ${JSON.stringify(response)}`);
      res.json(response);
    })
    .catch((err) => {
      console.error("POST call failed with error:", err);
      res.status(500).json({ error: err });
    });
});

// app.post("/v1/payment-requests/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "post call succeed!", url: req.url, body: req.body });
// });

/****************************
 * Example put method *
 ****************************/

// app.put("/v1/payment-requests", function (req, res) {
//   // Add your code here
//   res.json({ success: "put call succeed!", url: req.url, body: req.body });
// });

// app.put("/v1/payment-requests/*", function (req, res) {
//   // Add your code here
//   res.json({ success: "put call succeed!", url: req.url, body: req.body });
// });

/****************************
 * Example delete method *
 ****************************/

app.delete("/v1/payment-requests", async (req, res) => {
  const apiKey = await fetchHitPayAPIKey();
  console.debug("Request query:", req.query);

  if (!req.query.request_id) {
    console.error("Missing request_id query parameter");
    res.status(400).json({ error: "request_id is required" });
    return;
  }

  const options = {
    method: "DELETE",
    headers: { "X-BUSINESS-API-KEY": apiKey },
  };

  fetch(`${process.env.HITPAY_ENDPOINT}/${req.query.request_id}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log("DELETE call succeeded!");
      console.log(`response: ${JSON.stringify(response)}`);
      res.json(response);
    })
    .catch((err) => {
      console.error("DELETE call failed with error:", err);
      res.status(500).json({ error: err });
    });
});

// app.delete("/v1/payment-requests/*", function (req, res) {
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
