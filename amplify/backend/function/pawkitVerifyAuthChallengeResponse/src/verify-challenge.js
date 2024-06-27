/**
 * @type {import('@types/aws-lambda').VerifyAuthChallengeResponseTriggerHandler}
 */
exports.handler = async (event) => {
  console.log("Verify Auth Challenge Response event: ", event);
  const expectedAnswer =
    event.request.privateChallengeParameters.secretLoginCode;
  event.response.answerCorrect =
    event.request.challengeAnswer === expectedAnswer;
  return event;
};
