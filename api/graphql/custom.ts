export const customListServices = `query CustomListServices(
  $name: String
  $serviceProviderNameServiceCategoryPetType: ModelServicePrimaryCompositeKeyConditionInput
  $filter: ModelServiceFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listServices(
    name: $name
    serviceProviderNameServiceCategoryPetType: $serviceProviderNameServiceCategoryPetType
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
      xsWeightPrice {
        minWeight
        maxWeight
        amount
      }
      sWeightPrice {
        minWeight
        maxWeight
        amount
      }
      mWeightPrice {
        minWeight
        maxWeight
        amount
      }
      lWeightPrice {
        minWeight
        maxWeight
        amount
      }
      xlWeightPrice {
        minWeight
        maxWeight
        amount
      }
      xxlWeightPrice {
        minWeight
        maxWeight
        amount
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
      timeSlotIds
      bookingIds
      requiredQuestionIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
`;

export const customGetBooking = `query CustomGetBooking(
  $customerUsername: String!
  $timeSlotId: ID!
 ) {
  getBooking(
    customerUsername: $customerUsername
    timeSlotId: $timeSlotId
  ) {
    id
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
      address {
        blockNumber
        postalCode
        streetName
        unitNumber
      }
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
      items {
        pet {
          birthdate
          imageUrl
          name
        }
      }
      nextToken
      __typename
    }
    addOns
    bookingType
    amount
    currency
    status
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
    createdAt
    updatedAt
    serviceProviderBookingsName
    timeSlotBookingsServiceId
    timeSlotBookingsStartDateTime
    __typename
  }
 }`;

export const customBookingById = `query CustomBookingById(
 $id: ID!
) {
 bookingById(
   id: $id
 ) {
   items {
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
     petNames
     pets {
       items {
         pet {
           birthdate
           imageUrl
           name
         }
       }
       nextToken
     }
     serviceProvider {
       name
       displayName
       address {
         blockNumber
         postalCode
         streetName
         unitNumber
       }
     }
     timeSlot {
       id
       startDateTime
       endDateTime
     }
     __typename
   }
   nextToken
   __typename
 }
}`;

export const customBookingsByCustomer = `query CustomBookingsByCustomer(
 $customerId: ID!
) {
 bookingsByCustomer(
   customerId: $customerId
 ) {
   items {
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
     addOns
     bookingType
     amount
     currency
     status
     createdAt
     updatedAt
     timeSlotBookingsServiceId
     timeSlotBookingsStartDateTime
     petNames
     pets {
       items {
         pet {
           name
           birthdate
           imageUrl
         }
       }
     }
   }
 }
}`;
