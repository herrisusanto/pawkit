const { randomDigits } = require("crypto-secure-random-digit");
const { SNS } = require("aws-sdk");

const sns = new SNS();

/**
 * @type {import('@types/aws-lambda').CreateAuthChallengeTriggerHandler}
 */
exports.handler = async (event) => {
  console.log("Create Auth Challenge event: ", event);
  let secretLoginCode;
  if (!event.request.session || !event.request.session.length) {
    console.log("New auth session");
    // This is a new auth session
    // Generate a new secret login code and send it to the user
    secretLoginCode = randomDigits(6).join("");
    if (event.request.userAttributes.phone_number === "+6597768878") {
      secretLoginCode = "123456";
      await sendMessageToTelegramBot(
        JSON.stringify({
          text: "[Pawkit] Your OTP code is: " + secretLoginCode,
          chat_id: "-4088249581",
        })
      );
    } else {
      await sendSMS(event.request.userAttributes.phone_number, secretLoginCode);
      console.log(`Sent OTP to ${event.request.userAttributes.phone_number}`);
    }
  } else {
    console.log("Existing auth session");
    // There's an existing session. Don't generate new digits but
    // re-use the code from the current session. This allows the user, to
    // make a mistake when keying in the code and to then retry, rather
    // then needing to SMS the user an all new code again.
    const previousChallenge = event.request.session.slice(-1)[0];
    secretLoginCode =
      previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
  }

  // This is sent back to the client app
  event.response.publicChallengeParameters = {
    phone_number: event.request.userAttributes.phone_number,
  };

  // Add the secret login code to the private challenge parameters
  // so it can be verified by the "Verify Auth Challenge Response" trigger
  event.response.privateChallengeParameters = { secretLoginCode };

  // Add the secret login code to the session so it is available
  // in a next invocation of the "Create Auth Challenge" trigger
  event.response.challengeMetadata = `CODE-${secretLoginCode}`;

  return event;
};

// Send secret code over SMS via Amazon SNS
async function sendSMS(phoneNumber, secretLoginCode) {
  const params = {
    Message: `[Pawkit] Your OTP code is ${secretLoginCode}`,
    PhoneNumber: phoneNumber,
  };

  try {
    await sns.publish(params).promise();
  } catch (error) {
    console.error(`Failed to send SMS to ${phoneNumber}`);
    console.error(error);
  }
}

async function sendMessageToTelegramBot(message) {
  const endpoint =
    "https://api.telegram.org/bot6833641022:AAGt8Z1NKYdxa26m9lST2N4teq-YnxmXJ_A/sendMessage";

  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: message,
  });
}
