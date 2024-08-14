export type AmplifyDependentResourcesAttributes = {
  api: {
    AdminQueries: {
      ApiId: "string";
      ApiName: "string";
      RootUrl: "string";
    };
    pawkit: {
      GraphQLAPIEndpointOutput: "string";
      GraphQLAPIIdOutput: "string";
      GraphQLAPIKeyOutput: "string";
    };
    payments: {
      ApiId: "string";
      ApiName: "string";
      RootUrl: "string";
    };
  };
  auth: {
    pawkit: {
      AppClientID: "string";
      AppClientIDWeb: "string";
      CreatedSNSRole: "string";
      HostedUIDomain: "string";
      IdentityPoolId: "string";
      IdentityPoolName: "string";
      OAuthMetadata: "string";
      UserPoolArn: "string";
      UserPoolId: "string";
      UserPoolName: "string";
    };
    userPoolGroups: {
      AdminGroupRole: "string";
      PetOwnersGroupRole: "string";
      ServicePersonnelGroupRole: "string";
    };
  };
  function: {
    AdminQueries2bb3090c: {
      Arn: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
    bookingExpiryAndTimeSlotUpdater: {
      Arn: "string";
      CloudWatchEventRule: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
    dataLoader: {
      Arn: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
    pawkitCreateAuthChallenge: {
      Arn: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
    pawkitDefineAuthChallenge: {
      Arn: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
    pawkitPostConfirmation: {
      Arn: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
    pawkitVerifyAuthChallengeResponse: {
      Arn: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
    paymentConfirmation: {
      Arn: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
    paymentRequests: {
      Arn: "string";
      LambdaExecutionRole: "string";
      LambdaExecutionRoleArn: "string";
      Name: "string";
      Region: "string";
    };
  };
  storage: {
    content: {
      BucketName: "string";
      Region: "string";
    };
  };
};
