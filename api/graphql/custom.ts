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
      s3ImageKey
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
      }
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
      address {
        blockNumber
        postalCode
        streetName
        unitNumber
      }
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
    petIds
    pets {
      items {
        pet {
          birthdate
          s3ImageKey
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
     address
     serviceProviderBookingsName
     timeSlotBookingsServiceId
     timeSlotBookingsStartDateTime
     petIds
     pets {
       items {
         pet {
           petType
           birthdate
           s3ImageKey
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
     petIds
     pets {
       items {
         pet {
           name
           birthdate
           s3ImageKey
         }
       }
     }
   }
 }
}`;

export const customListBookings = /* GraphQL */ `
  query CustomListBookings(
    $customerUsername: String
    $timeSlotId: ModelIDKeyConditionInput
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBookings(
      customerUsername: $customerUsername
      timeSlotId: $timeSlotId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
        address
        petIds
        addOns
        bookingType
        amount
        currency
        pets {
          items {
            pet {
              name
              birthdate
            }
          }
        }
        status
        createdAt
        updatedAt
        serviceProviderBookingsName
        timeSlotBookingsServiceId
        timeSlotBookingsStartDateTime
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const customServiceById = /* GraphQL */ `
  query CustomServiceById(
    $id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    serviceById(
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        disclaimer {
          name
          serviceName
          serviceProviderName
          serviceCategory
          petType 
          text
          s3Link 
        }
        timeSlotIds
        bookingIds
        requiredQuestionIds
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
