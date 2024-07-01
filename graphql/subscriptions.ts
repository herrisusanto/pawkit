/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../api/graphql/API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateBooking = /* GraphQL */ `subscription OnCreateBooking($filter: ModelSubscriptionBookingFilterInput) {
  onCreateBooking(filter: $filter) {
    id
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
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
      imageUrl
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
      imageUrl
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
    petNames
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
` as GeneratedSubscription<
  APITypes.OnCreateBookingSubscriptionVariables,
  APITypes.OnCreateBookingSubscription
>;
export const onUpdateBooking = /* GraphQL */ `subscription OnUpdateBooking($filter: ModelSubscriptionBookingFilterInput) {
  onUpdateBooking(filter: $filter) {
    id
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
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
      imageUrl
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
      imageUrl
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
    petNames
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
` as GeneratedSubscription<
  APITypes.OnUpdateBookingSubscriptionVariables,
  APITypes.OnUpdateBookingSubscription
>;
export const onDeleteBooking = /* GraphQL */ `subscription OnDeleteBooking($filter: ModelSubscriptionBookingFilterInput) {
  onDeleteBooking(filter: $filter) {
    id
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
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
      imageUrl
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
      imageUrl
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
    petNames
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
` as GeneratedSubscription<
  APITypes.OnDeleteBookingSubscriptionVariables,
  APITypes.OnDeleteBookingSubscription
>;
export const onCreateBreed = /* GraphQL */ `subscription OnCreateBreed($filter: ModelSubscriptionBreedFilterInput) {
  onCreateBreed(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBreedSubscriptionVariables,
  APITypes.OnCreateBreedSubscription
>;
export const onUpdateBreed = /* GraphQL */ `subscription OnUpdateBreed($filter: ModelSubscriptionBreedFilterInput) {
  onUpdateBreed(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBreedSubscriptionVariables,
  APITypes.OnUpdateBreedSubscription
>;
export const onDeleteBreed = /* GraphQL */ `subscription OnDeleteBreed($filter: ModelSubscriptionBreedFilterInput) {
  onDeleteBreed(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBreedSubscriptionVariables,
  APITypes.OnDeleteBreedSubscription
>;
export const onCreateCustomer = /* GraphQL */ `subscription OnCreateCustomer(
  $filter: ModelSubscriptionCustomerFilterInput
  $id: String
) {
  onCreateCustomer(filter: $filter, id: $id) {
    id
    username
    isDeactivated
    imageUrl
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
` as GeneratedSubscription<
  APITypes.OnCreateCustomerSubscriptionVariables,
  APITypes.OnCreateCustomerSubscription
>;
export const onUpdateCustomer = /* GraphQL */ `subscription OnUpdateCustomer(
  $filter: ModelSubscriptionCustomerFilterInput
  $id: String
) {
  onUpdateCustomer(filter: $filter, id: $id) {
    id
    username
    isDeactivated
    imageUrl
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
` as GeneratedSubscription<
  APITypes.OnUpdateCustomerSubscriptionVariables,
  APITypes.OnUpdateCustomerSubscription
>;
export const onDeleteCustomer = /* GraphQL */ `subscription OnDeleteCustomer(
  $filter: ModelSubscriptionCustomerFilterInput
  $id: String
) {
  onDeleteCustomer(filter: $filter, id: $id) {
    id
    username
    isDeactivated
    imageUrl
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
` as GeneratedSubscription<
  APITypes.OnDeleteCustomerSubscriptionVariables,
  APITypes.OnDeleteCustomerSubscription
>;
export const onCreateDisclaimer = /* GraphQL */ `subscription OnCreateDisclaimer(
  $filter: ModelSubscriptionDisclaimerFilterInput
) {
  onCreateDisclaimer(filter: $filter) {
    name
    serviceName
    serviceProviderName
    serviceCategory
    petType
    service {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
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
      serviceProviderId
      __typename
    }
    text
    s3Link
    supersededBy {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
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
` as GeneratedSubscription<
  APITypes.OnCreateDisclaimerSubscriptionVariables,
  APITypes.OnCreateDisclaimerSubscription
>;
export const onUpdateDisclaimer = /* GraphQL */ `subscription OnUpdateDisclaimer(
  $filter: ModelSubscriptionDisclaimerFilterInput
) {
  onUpdateDisclaimer(filter: $filter) {
    name
    serviceName
    serviceProviderName
    serviceCategory
    petType
    service {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
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
      serviceProviderId
      __typename
    }
    text
    s3Link
    supersededBy {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
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
` as GeneratedSubscription<
  APITypes.OnUpdateDisclaimerSubscriptionVariables,
  APITypes.OnUpdateDisclaimerSubscription
>;
export const onDeleteDisclaimer = /* GraphQL */ `subscription OnDeleteDisclaimer(
  $filter: ModelSubscriptionDisclaimerFilterInput
) {
  onDeleteDisclaimer(filter: $filter) {
    name
    serviceName
    serviceProviderName
    serviceCategory
    petType
    service {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
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
      serviceProviderId
      __typename
    }
    text
    s3Link
    supersededBy {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
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
` as GeneratedSubscription<
  APITypes.OnDeleteDisclaimerSubscriptionVariables,
  APITypes.OnDeleteDisclaimerSubscription
>;
export const onCreateDisclaimerAcceptance = /* GraphQL */ `subscription OnCreateDisclaimerAcceptance(
  $filter: ModelSubscriptionDisclaimerAcceptanceFilterInput
  $customerId: String
) {
  onCreateDisclaimerAcceptance(filter: $filter, customerId: $customerId) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnCreateDisclaimerAcceptanceSubscriptionVariables,
  APITypes.OnCreateDisclaimerAcceptanceSubscription
>;
export const onUpdateDisclaimerAcceptance = /* GraphQL */ `subscription OnUpdateDisclaimerAcceptance(
  $filter: ModelSubscriptionDisclaimerAcceptanceFilterInput
  $customerId: String
) {
  onUpdateDisclaimerAcceptance(filter: $filter, customerId: $customerId) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnUpdateDisclaimerAcceptanceSubscriptionVariables,
  APITypes.OnUpdateDisclaimerAcceptanceSubscription
>;
export const onDeleteDisclaimerAcceptance = /* GraphQL */ `subscription OnDeleteDisclaimerAcceptance(
  $filter: ModelSubscriptionDisclaimerAcceptanceFilterInput
  $customerId: String
) {
  onDeleteDisclaimerAcceptance(filter: $filter, customerId: $customerId) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnDeleteDisclaimerAcceptanceSubscriptionVariables,
  APITypes.OnDeleteDisclaimerAcceptanceSubscription
>;
export const onCreateOrder = /* GraphQL */ `subscription OnCreateOrder(
  $filter: ModelSubscriptionOrderFilterInput
  $customerId: String
) {
  onCreateOrder(filter: $filter, customerId: $customerId) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    currency
    totalAmount
    pendingRefundAmount
    refundedAmount
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
` as GeneratedSubscription<
  APITypes.OnCreateOrderSubscriptionVariables,
  APITypes.OnCreateOrderSubscription
>;
export const onUpdateOrder = /* GraphQL */ `subscription OnUpdateOrder(
  $filter: ModelSubscriptionOrderFilterInput
  $customerId: String
) {
  onUpdateOrder(filter: $filter, customerId: $customerId) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    currency
    totalAmount
    pendingRefundAmount
    refundedAmount
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
` as GeneratedSubscription<
  APITypes.OnUpdateOrderSubscriptionVariables,
  APITypes.OnUpdateOrderSubscription
>;
export const onDeleteOrder = /* GraphQL */ `subscription OnDeleteOrder(
  $filter: ModelSubscriptionOrderFilterInput
  $customerId: String
) {
  onDeleteOrder(filter: $filter, customerId: $customerId) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    currency
    totalAmount
    pendingRefundAmount
    refundedAmount
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
` as GeneratedSubscription<
  APITypes.OnDeleteOrderSubscriptionVariables,
  APITypes.OnDeleteOrderSubscription
>;
export const onCreatePayment = /* GraphQL */ `subscription OnCreatePayment(
  $filter: ModelSubscriptionPaymentFilterInput
  $customerId: String
) {
  onCreatePayment(filter: $filter, customerId: $customerId) {
    paymentRequestId
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
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
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnCreatePaymentSubscriptionVariables,
  APITypes.OnCreatePaymentSubscription
>;
export const onUpdatePayment = /* GraphQL */ `subscription OnUpdatePayment(
  $filter: ModelSubscriptionPaymentFilterInput
  $customerId: String
) {
  onUpdatePayment(filter: $filter, customerId: $customerId) {
    paymentRequestId
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
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
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnUpdatePaymentSubscriptionVariables,
  APITypes.OnUpdatePaymentSubscription
>;
export const onDeletePayment = /* GraphQL */ `subscription OnDeletePayment(
  $filter: ModelSubscriptionPaymentFilterInput
  $customerId: String
) {
  onDeletePayment(filter: $filter, customerId: $customerId) {
    paymentRequestId
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
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
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnDeletePaymentSubscriptionVariables,
  APITypes.OnDeletePaymentSubscription
>;
export const onCreatePet = /* GraphQL */ `subscription OnCreatePet(
  $filter: ModelSubscriptionPetFilterInput
  $customerId: String
) {
  onCreatePet(filter: $filter, customerId: $customerId) {
    name
    customerUsername
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    gender
    petType
    isDeleted
    breedName
    imageUrl
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
` as GeneratedSubscription<
  APITypes.OnCreatePetSubscriptionVariables,
  APITypes.OnCreatePetSubscription
>;
export const onUpdatePet = /* GraphQL */ `subscription OnUpdatePet(
  $filter: ModelSubscriptionPetFilterInput
  $customerId: String
) {
  onUpdatePet(filter: $filter, customerId: $customerId) {
    name
    customerUsername
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    gender
    petType
    isDeleted
    breedName
    imageUrl
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
` as GeneratedSubscription<
  APITypes.OnUpdatePetSubscriptionVariables,
  APITypes.OnUpdatePetSubscription
>;
export const onDeletePet = /* GraphQL */ `subscription OnDeletePet(
  $filter: ModelSubscriptionPetFilterInput
  $customerId: String
) {
  onDeletePet(filter: $filter, customerId: $customerId) {
    name
    customerUsername
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    gender
    petType
    isDeleted
    breedName
    imageUrl
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
` as GeneratedSubscription<
  APITypes.OnDeletePetSubscriptionVariables,
  APITypes.OnDeletePetSubscription
>;
export const onCreateQuestion = /* GraphQL */ `subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onCreateQuestion(filter: $filter) {
    id
    serviceCategory
    questionString
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateQuestionSubscriptionVariables,
  APITypes.OnCreateQuestionSubscription
>;
export const onUpdateQuestion = /* GraphQL */ `subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onUpdateQuestion(filter: $filter) {
    id
    serviceCategory
    questionString
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateQuestionSubscriptionVariables,
  APITypes.OnUpdateQuestionSubscription
>;
export const onDeleteQuestion = /* GraphQL */ `subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onDeleteQuestion(filter: $filter) {
    id
    serviceCategory
    questionString
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionSubscriptionVariables,
  APITypes.OnDeleteQuestionSubscription
>;
export const onCreateQuestionAnswer = /* GraphQL */ `subscription OnCreateQuestionAnswer(
  $filter: ModelSubscriptionQuestionAnswerFilterInput
  $customerId: String
) {
  onCreateQuestionAnswer(filter: $filter, customerId: $customerId) {
    petName
    customerUsername
    pet {
      name
      customerUsername
      customerId
      gender
      petType
      isDeleted
      breedName
      imageUrl
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
    customerId
    questionId
    question {
      id
      serviceCategory
      questionString
      createdAt
      updatedAt
      __typename
    }
    answer
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateQuestionAnswerSubscriptionVariables,
  APITypes.OnCreateQuestionAnswerSubscription
>;
export const onUpdateQuestionAnswer = /* GraphQL */ `subscription OnUpdateQuestionAnswer(
  $filter: ModelSubscriptionQuestionAnswerFilterInput
  $customerId: String
) {
  onUpdateQuestionAnswer(filter: $filter, customerId: $customerId) {
    petName
    customerUsername
    pet {
      name
      customerUsername
      customerId
      gender
      petType
      isDeleted
      breedName
      imageUrl
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
    customerId
    questionId
    question {
      id
      serviceCategory
      questionString
      createdAt
      updatedAt
      __typename
    }
    answer
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateQuestionAnswerSubscriptionVariables,
  APITypes.OnUpdateQuestionAnswerSubscription
>;
export const onDeleteQuestionAnswer = /* GraphQL */ `subscription OnDeleteQuestionAnswer(
  $filter: ModelSubscriptionQuestionAnswerFilterInput
  $customerId: String
) {
  onDeleteQuestionAnswer(filter: $filter, customerId: $customerId) {
    petName
    customerUsername
    pet {
      name
      customerUsername
      customerId
      gender
      petType
      isDeleted
      breedName
      imageUrl
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
    customerId
    questionId
    question {
      id
      serviceCategory
      questionString
      createdAt
      updatedAt
      __typename
    }
    answer
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionAnswerSubscriptionVariables,
  APITypes.OnDeleteQuestionAnswerSubscription
>;
export const onCreateService = /* GraphQL */ `subscription OnCreateService(
  $filter: ModelSubscriptionServiceFilterInput
  $serviceProviderId: String
) {
  onCreateService(filter: $filter, serviceProviderId: $serviceProviderId) {
    id
    name
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      imageUrl
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
    imageUrl
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
    serviceProviderId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateServiceSubscriptionVariables,
  APITypes.OnCreateServiceSubscription
>;
export const onUpdateService = /* GraphQL */ `subscription OnUpdateService(
  $filter: ModelSubscriptionServiceFilterInput
  $serviceProviderId: String
) {
  onUpdateService(filter: $filter, serviceProviderId: $serviceProviderId) {
    id
    name
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      imageUrl
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
    imageUrl
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
    serviceProviderId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateServiceSubscriptionVariables,
  APITypes.OnUpdateServiceSubscription
>;
export const onDeleteService = /* GraphQL */ `subscription OnDeleteService(
  $filter: ModelSubscriptionServiceFilterInput
  $serviceProviderId: String
) {
  onDeleteService(filter: $filter, serviceProviderId: $serviceProviderId) {
    id
    name
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      imageUrl
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
    imageUrl
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
    serviceProviderId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteServiceSubscriptionVariables,
  APITypes.OnDeleteServiceSubscription
>;
export const onCreateServiceProvider = /* GraphQL */ `subscription OnCreateServiceProvider(
  $filter: ModelSubscriptionServiceProviderFilterInput
  $id: String
) {
  onCreateServiceProvider(filter: $filter, id: $id) {
    id
    name
    displayName
    description
    imageUrl
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
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnCreateServiceProviderSubscriptionVariables,
  APITypes.OnCreateServiceProviderSubscription
>;
export const onUpdateServiceProvider = /* GraphQL */ `subscription OnUpdateServiceProvider(
  $filter: ModelSubscriptionServiceProviderFilterInput
  $id: String
) {
  onUpdateServiceProvider(filter: $filter, id: $id) {
    id
    name
    displayName
    description
    imageUrl
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
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnUpdateServiceProviderSubscriptionVariables,
  APITypes.OnUpdateServiceProviderSubscription
>;
export const onDeleteServiceProvider = /* GraphQL */ `subscription OnDeleteServiceProvider(
  $filter: ModelSubscriptionServiceProviderFilterInput
  $id: String
) {
  onDeleteServiceProvider(filter: $filter, id: $id) {
    id
    name
    displayName
    description
    imageUrl
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
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnDeleteServiceProviderSubscriptionVariables,
  APITypes.OnDeleteServiceProviderSubscription
>;
export const onCreateTimeSlot = /* GraphQL */ `subscription OnCreateTimeSlot(
  $filter: ModelSubscriptionTimeSlotFilterInput
  $serviceProviderId: String
) {
  onCreateTimeSlot(filter: $filter, serviceProviderId: $serviceProviderId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTimeSlotSubscriptionVariables,
  APITypes.OnCreateTimeSlotSubscription
>;
export const onUpdateTimeSlot = /* GraphQL */ `subscription OnUpdateTimeSlot(
  $filter: ModelSubscriptionTimeSlotFilterInput
  $serviceProviderId: String
) {
  onUpdateTimeSlot(filter: $filter, serviceProviderId: $serviceProviderId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTimeSlotSubscriptionVariables,
  APITypes.OnUpdateTimeSlotSubscription
>;
export const onDeleteTimeSlot = /* GraphQL */ `subscription OnDeleteTimeSlot(
  $filter: ModelSubscriptionTimeSlotFilterInput
  $serviceProviderId: String
) {
  onDeleteTimeSlot(filter: $filter, serviceProviderId: $serviceProviderId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTimeSlotSubscriptionVariables,
  APITypes.OnDeleteTimeSlotSubscription
>;
export const onCreatePetBookings = /* GraphQL */ `subscription OnCreatePetBookings(
  $filter: ModelSubscriptionPetBookingsFilterInput
  $owners: String
  $customerId: String
) {
  onCreatePetBookings(
    filter: $filter
    owners: $owners
    customerId: $customerId
  ) {
    id
    bookingCustomerUsername
    bookingtimeSlotId
    petName
    petcustomerUsername
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
      petNames
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
      name
      customerUsername
      customerId
      gender
      petType
      isDeleted
      breedName
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnCreatePetBookingsSubscriptionVariables,
  APITypes.OnCreatePetBookingsSubscription
>;
export const onUpdatePetBookings = /* GraphQL */ `subscription OnUpdatePetBookings(
  $filter: ModelSubscriptionPetBookingsFilterInput
  $owners: String
  $customerId: String
) {
  onUpdatePetBookings(
    filter: $filter
    owners: $owners
    customerId: $customerId
  ) {
    id
    bookingCustomerUsername
    bookingtimeSlotId
    petName
    petcustomerUsername
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
      petNames
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
      name
      customerUsername
      customerId
      gender
      petType
      isDeleted
      breedName
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnUpdatePetBookingsSubscriptionVariables,
  APITypes.OnUpdatePetBookingsSubscription
>;
export const onDeletePetBookings = /* GraphQL */ `subscription OnDeletePetBookings(
  $filter: ModelSubscriptionPetBookingsFilterInput
  $owners: String
  $customerId: String
) {
  onDeletePetBookings(
    filter: $filter
    owners: $owners
    customerId: $customerId
  ) {
    id
    bookingCustomerUsername
    bookingtimeSlotId
    petName
    petcustomerUsername
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
      petNames
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
      name
      customerUsername
      customerId
      gender
      petType
      isDeleted
      breedName
      imageUrl
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
` as GeneratedSubscription<
  APITypes.OnDeletePetBookingsSubscriptionVariables,
  APITypes.OnDeletePetBookingsSubscription
>;
