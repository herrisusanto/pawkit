/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createBooking = /* GraphQL */ `mutation CreateBooking(
  $input: CreateBookingInput!
  $condition: ModelBookingConditionInput
) {
  createBooking(input: $input, condition: $condition) {
    id
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    customerUsername
    owners
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    serviceName
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    serviceCategory
    petType
    serviceId
    startDateTime
    timeSlot {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    timeSlotId
    address
    petIds
    pets {
      nextToken
      __typename
    }
    addOns
    bookingType
    amount
    currency
    status
    createdAt
    updatedAt
    serviceProviderBookingsName
    timeSlotBookingsServiceId
    timeSlotBookingsStartDateTime
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBookingMutationVariables,
  APITypes.CreateBookingMutation
>;
export const updateBooking = /* GraphQL */ `mutation UpdateBooking(
  $input: UpdateBookingInput!
  $condition: ModelBookingConditionInput
) {
  updateBooking(input: $input, condition: $condition) {
    id
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    customerUsername
    owners
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    serviceName
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    serviceCategory
    petType
    serviceId
    startDateTime
    timeSlot {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    timeSlotId
    address
    petIds
    pets {
      nextToken
      __typename
    }
    addOns
    bookingType
    amount
    currency
    status
    createdAt
    updatedAt
    serviceProviderBookingsName
    timeSlotBookingsServiceId
    timeSlotBookingsStartDateTime
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBookingMutationVariables,
  APITypes.UpdateBookingMutation
>;
export const deleteBooking = /* GraphQL */ `mutation DeleteBooking(
  $input: DeleteBookingInput!
  $condition: ModelBookingConditionInput
) {
  deleteBooking(input: $input, condition: $condition) {
    id
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    customerUsername
    owners
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    serviceName
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    serviceCategory
    petType
    serviceId
    startDateTime
    timeSlot {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    timeSlotId
    address
    petIds
    pets {
      nextToken
      __typename
    }
    addOns
    bookingType
    amount
    currency
    status
    createdAt
    updatedAt
    serviceProviderBookingsName
    timeSlotBookingsServiceId
    timeSlotBookingsStartDateTime
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBookingMutationVariables,
  APITypes.DeleteBookingMutation
>;
export const createBreed = /* GraphQL */ `mutation CreateBreed(
  $input: CreateBreedInput!
  $condition: ModelBreedConditionInput
) {
  createBreed(input: $input, condition: $condition) {
    name
    petType
    coats
    undercoatRemoval
    durationUnit
    basicGroomingDuration
    fullGroomingDuration
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBreedMutationVariables,
  APITypes.CreateBreedMutation
>;
export const updateBreed = /* GraphQL */ `mutation UpdateBreed(
  $input: UpdateBreedInput!
  $condition: ModelBreedConditionInput
) {
  updateBreed(input: $input, condition: $condition) {
    name
    petType
    coats
    undercoatRemoval
    durationUnit
    basicGroomingDuration
    fullGroomingDuration
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBreedMutationVariables,
  APITypes.UpdateBreedMutation
>;
export const deleteBreed = /* GraphQL */ `mutation DeleteBreed(
  $input: DeleteBreedInput!
  $condition: ModelBreedConditionInput
) {
  deleteBreed(input: $input, condition: $condition) {
    name
    petType
    coats
    undercoatRemoval
    durationUnit
    basicGroomingDuration
    fullGroomingDuration
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBreedMutationVariables,
  APITypes.DeleteBreedMutation
>;
export const createCustomer = /* GraphQL */ `mutation CreateCustomer(
  $input: CreateCustomerInput!
  $condition: ModelCustomerConditionInput
) {
  createCustomer(input: $input, condition: $condition) {
    id
    username
    isDeactivated
    s3ImageKey
    address {
      blockNumber
      streetName
      unitNumber
      postalCode
      __typename
    }
    acceptedDisclaimers {
      nextToken
      __typename
    }
    pets {
      nextToken
      __typename
    }
    bookings {
      nextToken
      __typename
    }
    orders {
      nextToken
      __typename
    }
    payments {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCustomerMutationVariables,
  APITypes.CreateCustomerMutation
>;
export const updateCustomer = /* GraphQL */ `mutation UpdateCustomer(
  $input: UpdateCustomerInput!
  $condition: ModelCustomerConditionInput
) {
  updateCustomer(input: $input, condition: $condition) {
    id
    username
    isDeactivated
    s3ImageKey
    address {
      blockNumber
      streetName
      unitNumber
      postalCode
      __typename
    }
    acceptedDisclaimers {
      nextToken
      __typename
    }
    pets {
      nextToken
      __typename
    }
    bookings {
      nextToken
      __typename
    }
    orders {
      nextToken
      __typename
    }
    payments {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCustomerMutationVariables,
  APITypes.UpdateCustomerMutation
>;
export const deleteCustomer = /* GraphQL */ `mutation DeleteCustomer(
  $input: DeleteCustomerInput!
  $condition: ModelCustomerConditionInput
) {
  deleteCustomer(input: $input, condition: $condition) {
    id
    username
    isDeactivated
    s3ImageKey
    address {
      blockNumber
      streetName
      unitNumber
      postalCode
      __typename
    }
    acceptedDisclaimers {
      nextToken
      __typename
    }
    pets {
      nextToken
      __typename
    }
    bookings {
      nextToken
      __typename
    }
    orders {
      nextToken
      __typename
    }
    payments {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCustomerMutationVariables,
  APITypes.DeleteCustomerMutation
>;
export const createDisclaimer = /* GraphQL */ `mutation CreateDisclaimer(
  $input: CreateDisclaimerInput!
  $condition: ModelDisclaimerConditionInput
) {
  createDisclaimer(input: $input, condition: $condition) {
    name
    serviceName
    serviceProviderName
    serviceCategory
    petType
    service {
      id
      serviceProviderId
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      s3ImageKey
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      requiredQuestionIds
      createdAt
      updatedAt
      __typename
    }
    header
    subheader
    text
    s3Link
    supersededBy {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    supersessionDate
    customerAcceptances {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDisclaimerMutationVariables,
  APITypes.CreateDisclaimerMutation
>;
export const updateDisclaimer = /* GraphQL */ `mutation UpdateDisclaimer(
  $input: UpdateDisclaimerInput!
  $condition: ModelDisclaimerConditionInput
) {
  updateDisclaimer(input: $input, condition: $condition) {
    name
    serviceName
    serviceProviderName
    serviceCategory
    petType
    service {
      id
      serviceProviderId
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      s3ImageKey
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      requiredQuestionIds
      createdAt
      updatedAt
      __typename
    }
    header
    subheader
    text
    s3Link
    supersededBy {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    supersessionDate
    customerAcceptances {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDisclaimerMutationVariables,
  APITypes.UpdateDisclaimerMutation
>;
export const deleteDisclaimer = /* GraphQL */ `mutation DeleteDisclaimer(
  $input: DeleteDisclaimerInput!
  $condition: ModelDisclaimerConditionInput
) {
  deleteDisclaimer(input: $input, condition: $condition) {
    name
    serviceName
    serviceProviderName
    serviceCategory
    petType
    service {
      id
      serviceProviderId
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      s3ImageKey
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      requiredQuestionIds
      createdAt
      updatedAt
      __typename
    }
    header
    subheader
    text
    s3Link
    supersededBy {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    supersessionDate
    customerAcceptances {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDisclaimerMutationVariables,
  APITypes.DeleteDisclaimerMutation
>;
export const createDisclaimerAcceptance = /* GraphQL */ `mutation CreateDisclaimerAcceptance(
  $input: CreateDisclaimerAcceptanceInput!
  $condition: ModelDisclaimerAcceptanceConditionInput
) {
  createDisclaimerAcceptance(input: $input, condition: $condition) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    disclaimerName
    disclaimer {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateDisclaimerAcceptanceMutationVariables,
  APITypes.CreateDisclaimerAcceptanceMutation
>;
export const updateDisclaimerAcceptance = /* GraphQL */ `mutation UpdateDisclaimerAcceptance(
  $input: UpdateDisclaimerAcceptanceInput!
  $condition: ModelDisclaimerAcceptanceConditionInput
) {
  updateDisclaimerAcceptance(input: $input, condition: $condition) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    disclaimerName
    disclaimer {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateDisclaimerAcceptanceMutationVariables,
  APITypes.UpdateDisclaimerAcceptanceMutation
>;
export const deleteDisclaimerAcceptance = /* GraphQL */ `mutation DeleteDisclaimerAcceptance(
  $input: DeleteDisclaimerAcceptanceInput!
  $condition: ModelDisclaimerAcceptanceConditionInput
) {
  deleteDisclaimerAcceptance(input: $input, condition: $condition) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    disclaimerName
    disclaimer {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteDisclaimerAcceptanceMutationVariables,
  APITypes.DeleteDisclaimerAcceptanceMutation
>;
export const createOrder = /* GraphQL */ `mutation CreateOrder(
  $input: CreateOrderInput!
  $condition: ModelOrderConditionInput
) {
  createOrder(input: $input, condition: $condition) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    currency
    totalAmount
    bookingIds
    bookings {
      nextToken
      __typename
    }
    paymentRequestId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateOrderMutationVariables,
  APITypes.CreateOrderMutation
>;
export const updateOrder = /* GraphQL */ `mutation UpdateOrder(
  $input: UpdateOrderInput!
  $condition: ModelOrderConditionInput
) {
  updateOrder(input: $input, condition: $condition) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    currency
    totalAmount
    bookingIds
    bookings {
      nextToken
      __typename
    }
    paymentRequestId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateOrderMutationVariables,
  APITypes.UpdateOrderMutation
>;
export const deleteOrder = /* GraphQL */ `mutation DeleteOrder(
  $input: DeleteOrderInput!
  $condition: ModelOrderConditionInput
) {
  deleteOrder(input: $input, condition: $condition) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    currency
    totalAmount
    bookingIds
    bookings {
      nextToken
      __typename
    }
    paymentRequestId
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteOrderMutationVariables,
  APITypes.DeleteOrderMutation
>;
export const createPayment = /* GraphQL */ `mutation CreatePayment(
  $input: CreatePaymentInput!
  $condition: ModelPaymentConditionInput
) {
  createPayment(input: $input, condition: $condition) {
    paymentRequestId
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    name
    email
    phone
    amount
    currency
    requestCreatedAt
    requestUpdatedAt
    status
    purpose
    referenceNumber
    paymentId
    paymentMethod
    url
    webhookUrl
    redirectUrl
    sendSMS
    sendEmail
    smsStatus
    emailStatus
    allowRepeatedPayments
    expiryDateTime
    errors
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePaymentMutationVariables,
  APITypes.CreatePaymentMutation
>;
export const updatePayment = /* GraphQL */ `mutation UpdatePayment(
  $input: UpdatePaymentInput!
  $condition: ModelPaymentConditionInput
) {
  updatePayment(input: $input, condition: $condition) {
    paymentRequestId
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    name
    email
    phone
    amount
    currency
    requestCreatedAt
    requestUpdatedAt
    status
    purpose
    referenceNumber
    paymentId
    paymentMethod
    url
    webhookUrl
    redirectUrl
    sendSMS
    sendEmail
    smsStatus
    emailStatus
    allowRepeatedPayments
    expiryDateTime
    errors
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePaymentMutationVariables,
  APITypes.UpdatePaymentMutation
>;
export const deletePayment = /* GraphQL */ `mutation DeletePayment(
  $input: DeletePaymentInput!
  $condition: ModelPaymentConditionInput
) {
  deletePayment(input: $input, condition: $condition) {
    paymentRequestId
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    name
    email
    phone
    amount
    currency
    requestCreatedAt
    requestUpdatedAt
    status
    purpose
    referenceNumber
    paymentId
    paymentMethod
    url
    webhookUrl
    redirectUrl
    sendSMS
    sendEmail
    smsStatus
    emailStatus
    allowRepeatedPayments
    expiryDateTime
    errors
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePaymentMutationVariables,
  APITypes.DeletePaymentMutation
>;
export const createPet = /* GraphQL */ `mutation CreatePet(
  $input: CreatePetInput!
  $condition: ModelPetConditionInput
) {
  createPet(input: $input, condition: $condition) {
    id
    name
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    gender
    petType
    isDeleted
    breedName
    s3ImageKey
    birthdate
    weightValue
    weightUnit
    additionalInfo
    predefinedBehaviors
    customBehaviors
    isNeutered
    isMicrochipped
    microchipNumber
    hasMedicalCondition
    additionalCareInstructions
    bookings {
      nextToken
      __typename
    }
    questionAnswerIds
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePetMutationVariables,
  APITypes.CreatePetMutation
>;
export const updatePet = /* GraphQL */ `mutation UpdatePet(
  $input: UpdatePetInput!
  $condition: ModelPetConditionInput
) {
  updatePet(input: $input, condition: $condition) {
    id
    name
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    gender
    petType
    isDeleted
    breedName
    s3ImageKey
    birthdate
    weightValue
    weightUnit
    additionalInfo
    predefinedBehaviors
    customBehaviors
    isNeutered
    isMicrochipped
    microchipNumber
    hasMedicalCondition
    additionalCareInstructions
    bookings {
      nextToken
      __typename
    }
    questionAnswerIds
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePetMutationVariables,
  APITypes.UpdatePetMutation
>;
export const deletePet = /* GraphQL */ `mutation DeletePet(
  $input: DeletePetInput!
  $condition: ModelPetConditionInput
) {
  deletePet(input: $input, condition: $condition) {
    id
    name
    customerId
    customer {
      id
      username
      isDeactivated
      s3ImageKey
      createdAt
      updatedAt
      __typename
    }
    gender
    petType
    isDeleted
    breedName
    s3ImageKey
    birthdate
    weightValue
    weightUnit
    additionalInfo
    predefinedBehaviors
    customBehaviors
    isNeutered
    isMicrochipped
    microchipNumber
    hasMedicalCondition
    additionalCareInstructions
    bookings {
      nextToken
      __typename
    }
    questionAnswerIds
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePetMutationVariables,
  APITypes.DeletePetMutation
>;
export const createQuestion = /* GraphQL */ `mutation CreateQuestion(
  $input: CreateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  createQuestion(input: $input, condition: $condition) {
    id
    serviceCategory
    questionString
    questionType
    followUpQuestionIds
    isRequired
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateQuestionMutationVariables,
  APITypes.CreateQuestionMutation
>;
export const updateQuestion = /* GraphQL */ `mutation UpdateQuestion(
  $input: UpdateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  updateQuestion(input: $input, condition: $condition) {
    id
    serviceCategory
    questionString
    questionType
    followUpQuestionIds
    isRequired
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateQuestionMutationVariables,
  APITypes.UpdateQuestionMutation
>;
export const deleteQuestion = /* GraphQL */ `mutation DeleteQuestion(
  $input: DeleteQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  deleteQuestion(input: $input, condition: $condition) {
    id
    serviceCategory
    questionString
    questionType
    followUpQuestionIds
    isRequired
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteQuestionMutationVariables,
  APITypes.DeleteQuestionMutation
>;
export const createQuestionAnswer = /* GraphQL */ `mutation CreateQuestionAnswer(
  $input: CreateQuestionAnswerInput!
  $condition: ModelQuestionAnswerConditionInput
) {
  createQuestionAnswer(input: $input, condition: $condition) {
    petId
    pet {
      id
      name
      customerId
      gender
      petType
      isDeleted
      breedName
      s3ImageKey
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      questionAnswerIds
      createdAt
      updatedAt
      __typename
    }
    questionId
    question {
      id
      serviceCategory
      questionString
      questionType
      followUpQuestionIds
      isRequired
      createdAt
      updatedAt
      __typename
    }
    answer
    createdAt
    updatedAt
    customerId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateQuestionAnswerMutationVariables,
  APITypes.CreateQuestionAnswerMutation
>;
export const updateQuestionAnswer = /* GraphQL */ `mutation UpdateQuestionAnswer(
  $input: UpdateQuestionAnswerInput!
  $condition: ModelQuestionAnswerConditionInput
) {
  updateQuestionAnswer(input: $input, condition: $condition) {
    petId
    pet {
      id
      name
      customerId
      gender
      petType
      isDeleted
      breedName
      s3ImageKey
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      questionAnswerIds
      createdAt
      updatedAt
      __typename
    }
    questionId
    question {
      id
      serviceCategory
      questionString
      questionType
      followUpQuestionIds
      isRequired
      createdAt
      updatedAt
      __typename
    }
    answer
    createdAt
    updatedAt
    customerId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateQuestionAnswerMutationVariables,
  APITypes.UpdateQuestionAnswerMutation
>;
export const deleteQuestionAnswer = /* GraphQL */ `mutation DeleteQuestionAnswer(
  $input: DeleteQuestionAnswerInput!
  $condition: ModelQuestionAnswerConditionInput
) {
  deleteQuestionAnswer(input: $input, condition: $condition) {
    petId
    pet {
      id
      name
      customerId
      gender
      petType
      isDeleted
      breedName
      s3ImageKey
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      questionAnswerIds
      createdAt
      updatedAt
      __typename
    }
    questionId
    question {
      id
      serviceCategory
      questionString
      questionType
      followUpQuestionIds
      isRequired
      createdAt
      updatedAt
      __typename
    }
    answer
    createdAt
    updatedAt
    customerId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteQuestionAnswerMutationVariables,
  APITypes.DeleteQuestionAnswerMutation
>;
export const createService = /* GraphQL */ `mutation CreateService(
  $input: CreateServiceInput!
  $condition: ModelServiceConditionInput
) {
  createService(input: $input, condition: $condition) {
    id
    serviceProviderId
    name
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    serviceCategory
    petType
    defaultDisplay
    displayPriority
    s3ImageKey
    onlinePaymentAccepted
    currency
    basePrice
    baseDuration
    baseDurationUnit
    additionalPetPrice
    additionalTimePrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xsWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    sWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    mWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    lWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xlWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xxlWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    shortDescription
    longDescription
    serviceBreakdown
    additionalInfo
    faq
    goodToKnow
    parentServiceIds
    childServiceIds
    disclaimerName
    disclaimer {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    timeSlotIds
    bookingIds
    requiredQuestionIds
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateServiceMutationVariables,
  APITypes.CreateServiceMutation
>;
export const updateService = /* GraphQL */ `mutation UpdateService(
  $input: UpdateServiceInput!
  $condition: ModelServiceConditionInput
) {
  updateService(input: $input, condition: $condition) {
    id
    serviceProviderId
    name
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    serviceCategory
    petType
    defaultDisplay
    displayPriority
    s3ImageKey
    onlinePaymentAccepted
    currency
    basePrice
    baseDuration
    baseDurationUnit
    additionalPetPrice
    additionalTimePrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xsWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    sWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    mWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    lWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xlWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xxlWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    shortDescription
    longDescription
    serviceBreakdown
    additionalInfo
    faq
    goodToKnow
    parentServiceIds
    childServiceIds
    disclaimerName
    disclaimer {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    timeSlotIds
    bookingIds
    requiredQuestionIds
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateServiceMutationVariables,
  APITypes.UpdateServiceMutation
>;
export const deleteService = /* GraphQL */ `mutation DeleteService(
  $input: DeleteServiceInput!
  $condition: ModelServiceConditionInput
) {
  deleteService(input: $input, condition: $condition) {
    id
    serviceProviderId
    name
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    serviceCategory
    petType
    defaultDisplay
    displayPriority
    s3ImageKey
    onlinePaymentAccepted
    currency
    basePrice
    baseDuration
    baseDurationUnit
    additionalPetPrice
    additionalTimePrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xsWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    sWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    mWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    lWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xlWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xxlWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    shortDescription
    longDescription
    serviceBreakdown
    additionalInfo
    faq
    goodToKnow
    parentServiceIds
    childServiceIds
    disclaimerName
    disclaimer {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      header
      subheader
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    timeSlotIds
    bookingIds
    requiredQuestionIds
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteServiceMutationVariables,
  APITypes.DeleteServiceMutation
>;
export const createServiceProvider = /* GraphQL */ `mutation CreateServiceProvider(
  $input: CreateServiceProviderInput!
  $condition: ModelServiceProviderConditionInput
) {
  createServiceProvider(input: $input, condition: $condition) {
    id
    name
    displayName
    description
    s3ImageKey
    address {
      blockNumber
      streetName
      unitNumber
      postalCode
      __typename
    }
    website
    email
    phone
    operatingTimes {
      dayOfWeek
      openTime
      closeTime
      __typename
    }
    isHeadquarters
    headquarters {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    services {
      nextToken
      __typename
    }
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    serviceProviderHeadquartersName
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateServiceProviderMutationVariables,
  APITypes.CreateServiceProviderMutation
>;
export const updateServiceProvider = /* GraphQL */ `mutation UpdateServiceProvider(
  $input: UpdateServiceProviderInput!
  $condition: ModelServiceProviderConditionInput
) {
  updateServiceProvider(input: $input, condition: $condition) {
    id
    name
    displayName
    description
    s3ImageKey
    address {
      blockNumber
      streetName
      unitNumber
      postalCode
      __typename
    }
    website
    email
    phone
    operatingTimes {
      dayOfWeek
      openTime
      closeTime
      __typename
    }
    isHeadquarters
    headquarters {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    services {
      nextToken
      __typename
    }
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    serviceProviderHeadquartersName
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateServiceProviderMutationVariables,
  APITypes.UpdateServiceProviderMutation
>;
export const deleteServiceProvider = /* GraphQL */ `mutation DeleteServiceProvider(
  $input: DeleteServiceProviderInput!
  $condition: ModelServiceProviderConditionInput
) {
  deleteServiceProvider(input: $input, condition: $condition) {
    id
    name
    displayName
    description
    s3ImageKey
    address {
      blockNumber
      streetName
      unitNumber
      postalCode
      __typename
    }
    website
    email
    phone
    operatingTimes {
      dayOfWeek
      openTime
      closeTime
      __typename
    }
    isHeadquarters
    headquarters {
      id
      name
      displayName
      description
      s3ImageKey
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    services {
      nextToken
      __typename
    }
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    serviceProviderHeadquartersName
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteServiceProviderMutationVariables,
  APITypes.DeleteServiceProviderMutation
>;
export const createTimeSlot = /* GraphQL */ `mutation CreateTimeSlot(
  $input: CreateTimeSlotInput!
  $condition: ModelTimeSlotConditionInput
) {
  createTimeSlot(input: $input, condition: $condition) {
    id
    serviceId
    startDateTime
    endDateTime
    capacity
    bookingCount
    isFull
    bookingIds
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    serviceProviderId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTimeSlotMutationVariables,
  APITypes.CreateTimeSlotMutation
>;
export const updateTimeSlot = /* GraphQL */ `mutation UpdateTimeSlot(
  $input: UpdateTimeSlotInput!
  $condition: ModelTimeSlotConditionInput
) {
  updateTimeSlot(input: $input, condition: $condition) {
    id
    serviceId
    startDateTime
    endDateTime
    capacity
    bookingCount
    isFull
    bookingIds
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    serviceProviderId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTimeSlotMutationVariables,
  APITypes.UpdateTimeSlotMutation
>;
export const deleteTimeSlot = /* GraphQL */ `mutation DeleteTimeSlot(
  $input: DeleteTimeSlotInput!
  $condition: ModelTimeSlotConditionInput
) {
  deleteTimeSlot(input: $input, condition: $condition) {
    id
    serviceId
    startDateTime
    endDateTime
    capacity
    bookingCount
    isFull
    bookingIds
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    serviceProviderId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTimeSlotMutationVariables,
  APITypes.DeleteTimeSlotMutation
>;
export const createPetBookings = /* GraphQL */ `mutation CreatePetBookings(
  $input: CreatePetBookingsInput!
  $condition: ModelPetBookingsConditionInput
) {
  createPetBookings(input: $input, condition: $condition) {
    id
    bookingCustomerUsername
    bookingtimeSlotId
    petId
    booking {
      id
      orderId
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      address
      petIds
      addOns
      bookingType
      amount
      currency
      status
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    pet {
      id
      name
      customerId
      gender
      petType
      isDeleted
      breedName
      s3ImageKey
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      questionAnswerIds
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    owners
    customerId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePetBookingsMutationVariables,
  APITypes.CreatePetBookingsMutation
>;
export const updatePetBookings = /* GraphQL */ `mutation UpdatePetBookings(
  $input: UpdatePetBookingsInput!
  $condition: ModelPetBookingsConditionInput
) {
  updatePetBookings(input: $input, condition: $condition) {
    id
    bookingCustomerUsername
    bookingtimeSlotId
    petId
    booking {
      id
      orderId
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      address
      petIds
      addOns
      bookingType
      amount
      currency
      status
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    pet {
      id
      name
      customerId
      gender
      petType
      isDeleted
      breedName
      s3ImageKey
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      questionAnswerIds
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    owners
    customerId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePetBookingsMutationVariables,
  APITypes.UpdatePetBookingsMutation
>;
export const deletePetBookings = /* GraphQL */ `mutation DeletePetBookings(
  $input: DeletePetBookingsInput!
  $condition: ModelPetBookingsConditionInput
) {
  deletePetBookings(input: $input, condition: $condition) {
    id
    bookingCustomerUsername
    bookingtimeSlotId
    petId
    booking {
      id
      orderId
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      address
      petIds
      addOns
      bookingType
      amount
      currency
      status
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    pet {
      id
      name
      customerId
      gender
      petType
      isDeleted
      breedName
      s3ImageKey
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      questionAnswerIds
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    owners
    customerId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePetBookingsMutationVariables,
  APITypes.DeletePetBookingsMutation
>;
