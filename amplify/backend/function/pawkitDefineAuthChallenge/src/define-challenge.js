/**
 * @type {import('@types/aws-lambda').DefineAuthChallengeTriggerHandler}
 */
exports.handler = async (event) => {
  console.log("Define Auth Challenge event: ", event);
  if (
    event.request.session &&
    event.request.session.find(
      (attempt) => attempt.challengeName !== "CUSTOM_CHALLENGE"
    )
  ) {
    console.log("A user attempted to sign in without a custom challenge");
    // We only accept custom challenges; fail auth
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
  } else if (
    event.request.session &&
    event.request.session.length >= 3 &&
    event.request.session.slice(-1)[0].challengeResult === false
  ) {
    console.log("A user failed to answer the custom challenge 3 times");
    // The user provided a wrong answer 3 times; fail auth
    event.response.issueTokens = false;
    event.response.failAuthentication = true;
  } else if (
    event.request.session &&
    event.request.session.length &&
    event.request.session.slice(-1)[0].challengeName === "CUSTOM_CHALLENGE" && // Doubly stitched, holds better
    event.request.session.slice(-1)[0].challengeResult === true
  ) {
    console.log("A user provided the right answer; succeed auth");
    // The user provided the right answer; succeed auth
    event.response.issueTokens = true;
    event.response.failAuthentication = false;
  } else {
    console.log(
      "A user did not provide a correct answer yet; present challenge"
    );
    // The user did not provide a correct answer yet; present challenge
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = "CUSTOM_CHALLENGE";
  }

  return event;
};
