/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelServicePrimaryCompositeKeyConditionInput = {
  eq?: ModelServicePrimaryCompositeKeyInput | null,
  le?: ModelServicePrimaryCompositeKeyInput | null,
  lt?: ModelServicePrimaryCompositeKeyInput | null,
  ge?: ModelServicePrimaryCompositeKeyInput | null,
  gt?: ModelServicePrimaryCompositeKeyInput | null,
  between?: Array< ModelServicePrimaryCompositeKeyInput | null > | null,
  beginsWith?: ModelServicePrimaryCompositeKeyInput | null,
};

export type ModelServicePrimaryCompositeKeyInput = {
  serviceProviderName?: string | null,
  serviceCategory?: ServiceCategory | null,
  petType?: PetType | null,
};

export enum ServiceCategory {
  VACCINATION = "VACCINATION",
  GROOMING = "GROOMING",
  MEDICAL_SITTING = "MEDICAL_SITTING",
}


export enum PetType {
  DOG = "DOG",
  CAT = "CAT",
  RABBIT = "RABBIT",
  GUINEA_PIG = "GUINEA_PIG",
  BIRD = "BIRD",
  OTHER = "OTHER",
  ALL = "ALL",
}


export type ModelServiceFilterInput = {
  id?: ModelIDInput | null,
  serviceProviderId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  serviceProviderName?: ModelStringInput | null,
  serviceCategory?: ModelServiceCategoryInput | null,
  petType?: ModelPetTypeInput | null,
  defaultDisplay?: ModelBooleanInput | null,
  displayPriority?: ModelIntInput | null,
  onlinePaymentAccepted?: ModelBooleanInput | null,
  currency?: ModelCurrencyInput | null,
  basePrice?: ModelFloatInput | null,
  baseDuration?: ModelIntInput | null,
  baseDurationUnit?: ModelTimeUnitInput | null,
  additionalPetPrice?: ModelFloatInput | null,
  shortDescription?: ModelStringInput | null,
  longDescription?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  serviceBreakdown?: ModelStringInput | null,
  additionalInfo?: ModelStringInput | null,
  faq?: ModelStringInput | null,
  goodToKnow?: ModelStringInput | null,
  parentServiceIds?: ModelIDInput | null,
  childServiceIds?: ModelIDInput | null,
  disclaimerName?: ModelStringInput | null,
  timeSlotIds?: ModelIDInput | null,
  bookingIds?: ModelIDInput | null,
  requiredQuestionIds?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelServiceFilterInput | null > | null,
  or?: Array< ModelServiceFilterInput | null > | null,
  not?: ModelServiceFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelServiceCategoryInput = {
  eq?: ServiceCategory | null,
  ne?: ServiceCategory | null,
};

export type ModelPetTypeInput = {
  eq?: PetType | null,
  ne?: PetType | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelCurrencyInput = {
  eq?: Currency | null,
  ne?: Currency | null,
};

export enum Currency {
  SGD = "SGD",
}


export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelTimeUnitInput = {
  eq?: TimeUnit | null,
  ne?: TimeUnit | null,
};

export enum TimeUnit {
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  DAYS = "DAYS",
  WEEKS = "WEEKS",
  MONTHS = "MONTHS",
  YEARS = "YEARS",
}


export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelServiceConnection = {
  __typename: "ModelServiceConnection",
  items:  Array<Service | null >,
  nextToken?: string | null,
};

export type Service = {
  __typename: "Service",
  id: string,
  serviceProviderId: string,
  name: string,
  serviceProviderName: string,
  serviceProvider: ServiceProvider,
  serviceCategory: ServiceCategory,
  petType: PetType,
  defaultDisplay: boolean,
  displayPriority?: number | null,
  onlinePaymentAccepted: boolean,
  currency: Currency,
  basePrice: number,
  baseDuration: number,
  baseDurationUnit: TimeUnit,
  additionalPetPrice?: number | null,
  additionalTimePrice?: CustomPrice | null,
  xsWeightPrice?: CustomPrice | null,
  sWeightPrice?: CustomPrice | null,
  mWeightPrice?: CustomPrice | null,
  lWeightPrice?: CustomPrice | null,
  xlWeightPrice?: CustomPrice | null,
  xxlWeightPrice?: CustomPrice | null,
  shortDescription?: string | null,
  longDescription?: string | null,
  imageUrl?: string | null,
  serviceBreakdown?: string | null,
  additionalInfo?: string | null,
  faq?: string | null,
  goodToKnow?: string | null,
  parentServiceIds?: Array< string > | null,
  childServiceIds?: Array< string > | null,
  disclaimerName?: string | null,
  disclaimer?: Disclaimer | null,
  timeSlotIds?: Array< string > | null,
  bookingIds?: Array< string > | null,
  requiredQuestionIds?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
};

export type ServiceProvider = {
  __typename: "ServiceProvider",
  id: string,
  name: string,
  displayName?: string | null,
  description?: string | null,
  imageUrl?: string | null,
  address?: Address | null,
  website?: string | null,
  email?: string | null,
  phone?: string | null,
  operatingTimes:  Array<TimeInterval >,
  isHeadquarters: boolean,
  headquarters?: ServiceProvider | null,
  services?: ModelServiceConnection | null,
  bookings?: ModelBookingConnection | null,
  createdAt: string,
  updatedAt: string,
  serviceProviderHeadquartersName?: string | null,
};

export type Address = {
  __typename: "Address",
  blockNumber?: string | null,
  streetName: string,
  unitNumber?: string | null,
  postalCode: string,
};

export type TimeInterval = {
  __typename: "TimeInterval",
  dayOfWeek: number,
  openTime: string,
  closeTime: string,
};

export type ModelBookingConnection = {
  __typename: "ModelBookingConnection",
  items:  Array<Booking | null >,
  nextToken?: string | null,
};

export type Booking = {
  __typename: "Booking",
  id: string,
  orderId: string,
  order: Order,
  customerUsername: string,
  owners: Array< string >,
  customerId: string,
  customer: Customer,
  serviceName: string,
  serviceProviderName: string,
  serviceProvider: ServiceProvider,
  serviceCategory: ServiceCategory,
  petType: PetType,
  serviceId: string,
  startDateTime: string,
  timeSlot: TimeSlot,
  timeSlotId: string,
  petNames: Array< string >,
  pets?: ModelPetBookingsConnection | null,
  addOns?: Array< string > | null,
  bookingType: BookingType,
  amount: number,
  currency: Currency,
  status: BookingStatus,
  createdAt: string,
  updatedAt: string,
  serviceProviderBookingsName?: string | null,
  timeSlotBookingsServiceId?: string | null,
  timeSlotBookingsStartDateTime?: string | null,
};

export type Order = {
  __typename: "Order",
  id: string,
  customerId: string,
  customer: Customer,
  currency: Currency,
  totalAmount: number,
  pendingRefundAmount?: number | null,
  refundedAmount?: number | null,
  bookingIds?: Array< string > | null,
  bookings?: ModelBookingConnection | null,
  paymentRequestId?: string | null,
  status: OrderStatus,
  createdAt: string,
  updatedAt: string,
};

export type Customer = {
  __typename: "Customer",
  id: string,
  username: string,
  isDeactivated: boolean,
  imageUrl?: string | null,
  address?: Address | null,
  acceptedDisclaimers?: ModelDisclaimerAcceptanceConnection | null,
  pets?: ModelPetConnection | null,
  bookings?: ModelBookingConnection | null,
  orders?: ModelOrderConnection | null,
  payments?: ModelPaymentConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelDisclaimerAcceptanceConnection = {
  __typename: "ModelDisclaimerAcceptanceConnection",
  items:  Array<DisclaimerAcceptance | null >,
  nextToken?: string | null,
};

export type DisclaimerAcceptance = {
  __typename: "DisclaimerAcceptance",
  id: string,
  customerId: string,
  customer: Customer,
  disclaimerName: string,
  disclaimer: Disclaimer,
  createdAt: string,
  updatedAt: string,
};

export type Disclaimer = {
  __typename: "Disclaimer",
  name: string,
  serviceName?: string | null,
  serviceProviderName?: string | null,
  serviceCategory?: ServiceCategory | null,
  petType?: PetType | null,
  service?: Service | null,
  text?: string | null,
  s3Link?: string | null,
  supersededBy?: Disclaimer | null,
  supersessionDate?: string | null,
  customerAcceptances?: ModelDisclaimerAcceptanceConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPetConnection = {
  __typename: "ModelPetConnection",
  items:  Array<Pet | null >,
  nextToken?: string | null,
};

export type Pet = {
  __typename: "Pet",
  name: string,
  customerUsername: string,
  customerId: string,
  customer: Customer,
  gender: Gender,
  petType: PetType,
  isDeleted: boolean,
  breedName?: string | null,
  imageUrl?: string | null,
  birthdate?: string | null,
  weightValue?: number | null,
  weightUnit?: WeightUnit | null,
  additionalInfo?: string | null,
  predefinedBehaviors?: Array< PredefinedBehavior > | null,
  customBehaviors?: Array< string > | null,
  isNeutered?: boolean | null,
  isMicrochipped?: boolean | null,
  microchipNumber?: string | null,
  hasMedicalCondition?: boolean | null,
  additionalCareInstructions?: string | null,
  bookings?: ModelPetBookingsConnection | null,
  questionAnswerIds?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
};

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}


export enum WeightUnit {
  KG = "KG",
  G = "G",
}


export enum PredefinedBehavior {
  FEAR_OF_LOUD_NOISES = "FEAR_OF_LOUD_NOISES",
  HYPERACTIVE = "HYPERACTIVE",
  ANXIOUS = "ANXIOUS",
  FRIENDLY_WITH_STRANGERS = "FRIENDLY_WITH_STRANGERS",
  MIGHT_SNAP = "MIGHT_SNAP",
  RESPONSIVE_TO_COMMANDS = "RESPONSIVE_TO_COMMANDS",
  RESPONSIVE_TO_TREATS = "RESPONSIVE_TO_TREATS",
}


export type ModelPetBookingsConnection = {
  __typename: "ModelPetBookingsConnection",
  items:  Array<PetBookings | null >,
  nextToken?: string | null,
};

export type PetBookings = {
  __typename: "PetBookings",
  id: string,
  bookingCustomerUsername: string,
  bookingtimeSlotId: string,
  petName: string,
  petcustomerUsername: string,
  booking: Booking,
  pet: Pet,
  createdAt: string,
  updatedAt: string,
  owners?: string | null,
  customerId?: string | null,
};

export type ModelOrderConnection = {
  __typename: "ModelOrderConnection",
  items:  Array<Order | null >,
  nextToken?: string | null,
};

export type ModelPaymentConnection = {
  __typename: "ModelPaymentConnection",
  items:  Array<Payment | null >,
  nextToken?: string | null,
};

export type Payment = {
  __typename: "Payment",
  paymentRequestId: string,
  orderId: string,
  order: Order,
  customerId: string,
  customer: Customer,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  amount: number,
  currency: Currency,
  requestCreatedAt: string,
  requestUpdatedAt: string,
  status: PaymentStatus,
  purpose?: string | null,
  referenceNumber?: string | null,
  paymentId?: string | null,
  paymentMethod?: PaymentMethod | null,
  url: string,
  webhookUrl: string,
  redirectUrl?: string | null,
  sendSMS?: boolean | null,
  sendEmail?: boolean | null,
  smsStatus?: boolean | null,
  emailStatus?: boolean | null,
  allowRepeatedPayments?: boolean | null,
  expiryDateTime?: string | null,
  errors?: string | null,
  createdAt: string,
  updatedAt: string,
};

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  VOIDED = "VOIDED",
  REFUNDED = "REFUNDED",
  SENT = "SENT",
  EXPIRED = "EXPIRED",
}


export enum PaymentMethod {
  CARD = "CARD",
  CASH = "CASH",
  PAYNOW_ONLINE = "PAYNOW_ONLINE",
}


export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}


export type TimeSlot = {
  __typename: "TimeSlot",
  id: string,
  serviceId: string,
  startDateTime: string,
  endDateTime?: string | null,
  capacity: number,
  bookingCount: number,
  isFull: boolean,
  bookingIds?: Array< string > | null,
  bookings?: ModelBookingConnection | null,
  createdAt: string,
  updatedAt: string,
  serviceProviderId?: string | null,
};

export enum BookingType {
  FREE_TRIAL = "FREE_TRIAL",
  PAID = "PAID",
}


export enum BookingStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}


export type CustomPrice = {
  __typename: "CustomPrice",
  additionalDuration?: number | null,
  additionalDurationUnit?: TimeUnit | null,
  minWeight?: number | null,
  maxWeight?: number | null,
  weightUnit?: WeightUnit | null,
  amount: number,
};

export type CreateBookingInput = {
  id?: string | null,
  orderId: string,
  customerUsername: string,
  owners: Array< string >,
  customerId: string,
  serviceName: string,
  serviceProviderName: string,
  serviceCategory: ServiceCategory,
  petType: PetType,
  serviceId: string,
  startDateTime: string,
  timeSlotId: string,
  petNames: Array< string >,
  addOns?: Array< string > | null,
  bookingType: BookingType,
  amount: number,
  currency: Currency,
  status: BookingStatus,
  serviceProviderBookingsName?: string | null,
  timeSlotBookingsServiceId?: string | null,
  timeSlotBookingsStartDateTime?: string | null,
};

export type ModelBookingConditionInput = {
  orderId?: ModelIDInput | null,
  owners?: ModelIDInput | null,
  customerId?: ModelIDInput | null,
  serviceName?: ModelStringInput | null,
  serviceProviderName?: ModelStringInput | null,
  serviceCategory?: ModelServiceCategoryInput | null,
  petType?: ModelPetTypeInput | null,
  serviceId?: ModelIDInput | null,
  startDateTime?: ModelStringInput | null,
  petNames?: ModelStringInput | null,
  addOns?: ModelIDInput | null,
  bookingType?: ModelBookingTypeInput | null,
  amount?: ModelFloatInput | null,
  currency?: ModelCurrencyInput | null,
  status?: ModelBookingStatusInput | null,
  and?: Array< ModelBookingConditionInput | null > | null,
  or?: Array< ModelBookingConditionInput | null > | null,
  not?: ModelBookingConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  serviceProviderBookingsName?: ModelStringInput | null,
  timeSlotBookingsServiceId?: ModelIDInput | null,
  timeSlotBookingsStartDateTime?: ModelStringInput | null,
};

export type ModelBookingTypeInput = {
  eq?: BookingType | null,
  ne?: BookingType | null,
};

export type ModelBookingStatusInput = {
  eq?: BookingStatus | null,
  ne?: BookingStatus | null,
};

export type UpdateBookingInput = {
  id?: string | null,
  orderId?: string | null,
  customerUsername: string,
  owners?: Array< string > | null,
  customerId?: string | null,
  serviceName?: string | null,
  serviceProviderName?: string | null,
  serviceCategory?: ServiceCategory | null,
  petType?: PetType | null,
  serviceId?: string | null,
  startDateTime?: string | null,
  timeSlotId: string,
  petNames?: Array< string > | null,
  addOns?: Array< string > | null,
  bookingType?: BookingType | null,
  amount?: number | null,
  currency?: Currency | null,
  status?: BookingStatus | null,
  serviceProviderBookingsName?: string | null,
  timeSlotBookingsServiceId?: string | null,
  timeSlotBookingsStartDateTime?: string | null,
};

export type DeleteBookingInput = {
  customerUsername: string,
  timeSlotId: string,
};

export type CreateBreedInput = {
  name: string,
  petType: PetType,
  coats?: Array< Coat > | null,
  undercoatRemoval?: boolean | null,
  durationUnit?: TimeUnit | null,
  basicGroomingDuration?: number | null,
  fullGroomingDuration?: number | null,
};

export enum Coat {
  HAIRLESS = "HAIRLESS",
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
}


export type ModelBreedConditionInput = {
  petType?: ModelPetTypeInput | null,
  coats?: ModelCoatListInput | null,
  undercoatRemoval?: ModelBooleanInput | null,
  durationUnit?: ModelTimeUnitInput | null,
  basicGroomingDuration?: ModelIntInput | null,
  fullGroomingDuration?: ModelIntInput | null,
  and?: Array< ModelBreedConditionInput | null > | null,
  or?: Array< ModelBreedConditionInput | null > | null,
  not?: ModelBreedConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelCoatListInput = {
  eq?: Array< Coat | null > | null,
  ne?: Array< Coat | null > | null,
  contains?: Coat | null,
  notContains?: Coat | null,
};

export type Breed = {
  __typename: "Breed",
  name: string,
  petType: PetType,
  coats?: Array< Coat > | null,
  undercoatRemoval?: boolean | null,
  durationUnit?: TimeUnit | null,
  basicGroomingDuration?: number | null,
  fullGroomingDuration?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateBreedInput = {
  name: string,
  petType?: PetType | null,
  coats?: Array< Coat > | null,
  undercoatRemoval?: boolean | null,
  durationUnit?: TimeUnit | null,
  basicGroomingDuration?: number | null,
  fullGroomingDuration?: number | null,
};

export type DeleteBreedInput = {
  name: string,
};

export type CreateCustomerInput = {
  id?: string | null,
  username: string,
  isDeactivated: boolean,
  imageUrl?: string | null,
  address?: AddressInput | null,
};

export type AddressInput = {
  blockNumber?: string | null,
  streetName: string,
  unitNumber?: string | null,
  postalCode: string,
};

export type ModelCustomerConditionInput = {
  username?: ModelStringInput | null,
  isDeactivated?: ModelBooleanInput | null,
  imageUrl?: ModelStringInput | null,
  and?: Array< ModelCustomerConditionInput | null > | null,
  or?: Array< ModelCustomerConditionInput | null > | null,
  not?: ModelCustomerConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateCustomerInput = {
  id: string,
  username?: string | null,
  isDeactivated?: boolean | null,
  imageUrl?: string | null,
  address?: AddressInput | null,
};

export type DeleteCustomerInput = {
  id: string,
};

export type CreateDisclaimerInput = {
  name: string,
  serviceName?: string | null,
  serviceProviderName?: string | null,
  serviceCategory?: ServiceCategory | null,
  petType?: PetType | null,
  text?: string | null,
  s3Link?: string | null,
  supersessionDate?: string | null,
};

export type ModelDisclaimerConditionInput = {
  serviceName?: ModelStringInput | null,
  serviceProviderName?: ModelStringInput | null,
  serviceCategory?: ModelServiceCategoryInput | null,
  petType?: ModelPetTypeInput | null,
  text?: ModelStringInput | null,
  s3Link?: ModelStringInput | null,
  supersessionDate?: ModelStringInput | null,
  and?: Array< ModelDisclaimerConditionInput | null > | null,
  or?: Array< ModelDisclaimerConditionInput | null > | null,
  not?: ModelDisclaimerConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateDisclaimerInput = {
  name: string,
  serviceName?: string | null,
  serviceProviderName?: string | null,
  serviceCategory?: ServiceCategory | null,
  petType?: PetType | null,
  text?: string | null,
  s3Link?: string | null,
  supersessionDate?: string | null,
};

export type DeleteDisclaimerInput = {
  name: string,
};

export type CreateDisclaimerAcceptanceInput = {
  id?: string | null,
  customerId: string,
  disclaimerName: string,
};

export type ModelDisclaimerAcceptanceConditionInput = {
  customerId?: ModelIDInput | null,
  disclaimerName?: ModelStringInput | null,
  and?: Array< ModelDisclaimerAcceptanceConditionInput | null > | null,
  or?: Array< ModelDisclaimerAcceptanceConditionInput | null > | null,
  not?: ModelDisclaimerAcceptanceConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateDisclaimerAcceptanceInput = {
  id: string,
  customerId?: string | null,
  disclaimerName?: string | null,
};

export type DeleteDisclaimerAcceptanceInput = {
  id: string,
};

export type CreateOrderInput = {
  id?: string | null,
  customerId: string,
  currency: Currency,
  totalAmount: number,
  pendingRefundAmount?: number | null,
  refundedAmount?: number | null,
  bookingIds?: Array< string > | null,
  paymentRequestId?: string | null,
  status: OrderStatus,
};

export type ModelOrderConditionInput = {
  customerId?: ModelIDInput | null,
  currency?: ModelCurrencyInput | null,
  totalAmount?: ModelFloatInput | null,
  pendingRefundAmount?: ModelFloatInput | null,
  refundedAmount?: ModelFloatInput | null,
  bookingIds?: ModelIDInput | null,
  paymentRequestId?: ModelIDInput | null,
  status?: ModelOrderStatusInput | null,
  and?: Array< ModelOrderConditionInput | null > | null,
  or?: Array< ModelOrderConditionInput | null > | null,
  not?: ModelOrderConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelOrderStatusInput = {
  eq?: OrderStatus | null,
  ne?: OrderStatus | null,
};

export type UpdateOrderInput = {
  id: string,
  customerId?: string | null,
  currency?: Currency | null,
  totalAmount?: number | null,
  pendingRefundAmount?: number | null,
  refundedAmount?: number | null,
  bookingIds?: Array< string > | null,
  paymentRequestId?: string | null,
  status?: OrderStatus | null,
};

export type DeleteOrderInput = {
  id: string,
};

export type CreatePaymentInput = {
  paymentRequestId: string,
  orderId: string,
  customerId: string,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  amount: number,
  currency: Currency,
  requestCreatedAt: string,
  requestUpdatedAt: string,
  status: PaymentStatus,
  purpose?: string | null,
  referenceNumber?: string | null,
  paymentId?: string | null,
  paymentMethod?: PaymentMethod | null,
  url: string,
  webhookUrl: string,
  redirectUrl?: string | null,
  sendSMS?: boolean | null,
  sendEmail?: boolean | null,
  smsStatus?: boolean | null,
  emailStatus?: boolean | null,
  allowRepeatedPayments?: boolean | null,
  expiryDateTime?: string | null,
  errors?: string | null,
};

export type ModelPaymentConditionInput = {
  orderId?: ModelIDInput | null,
  customerId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  currency?: ModelCurrencyInput | null,
  requestCreatedAt?: ModelStringInput | null,
  requestUpdatedAt?: ModelStringInput | null,
  status?: ModelPaymentStatusInput | null,
  purpose?: ModelStringInput | null,
  referenceNumber?: ModelIDInput | null,
  paymentId?: ModelIDInput | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  url?: ModelStringInput | null,
  webhookUrl?: ModelStringInput | null,
  redirectUrl?: ModelStringInput | null,
  sendSMS?: ModelBooleanInput | null,
  sendEmail?: ModelBooleanInput | null,
  smsStatus?: ModelBooleanInput | null,
  emailStatus?: ModelBooleanInput | null,
  allowRepeatedPayments?: ModelBooleanInput | null,
  expiryDateTime?: ModelStringInput | null,
  errors?: ModelStringInput | null,
  and?: Array< ModelPaymentConditionInput | null > | null,
  or?: Array< ModelPaymentConditionInput | null > | null,
  not?: ModelPaymentConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPaymentStatusInput = {
  eq?: PaymentStatus | null,
  ne?: PaymentStatus | null,
};

export type ModelPaymentMethodInput = {
  eq?: PaymentMethod | null,
  ne?: PaymentMethod | null,
};

export type UpdatePaymentInput = {
  paymentRequestId: string,
  orderId?: string | null,
  customerId?: string | null,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  amount?: number | null,
  currency?: Currency | null,
  requestCreatedAt?: string | null,
  requestUpdatedAt?: string | null,
  status?: PaymentStatus | null,
  purpose?: string | null,
  referenceNumber?: string | null,
  paymentId?: string | null,
  paymentMethod?: PaymentMethod | null,
  url?: string | null,
  webhookUrl?: string | null,
  redirectUrl?: string | null,
  sendSMS?: boolean | null,
  sendEmail?: boolean | null,
  smsStatus?: boolean | null,
  emailStatus?: boolean | null,
  allowRepeatedPayments?: boolean | null,
  expiryDateTime?: string | null,
  errors?: string | null,
};

export type DeletePaymentInput = {
  paymentRequestId: string,
};

export type CreatePetInput = {
  name: string,
  customerUsername: string,
  customerId: string,
  gender: Gender,
  petType: PetType,
  isDeleted: boolean,
  breedName?: string | null,
  imageUrl?: string | null,
  birthdate?: string | null,
  weightValue?: number | null,
  weightUnit?: WeightUnit | null,
  additionalInfo?: string | null,
  predefinedBehaviors?: Array< PredefinedBehavior > | null,
  customBehaviors?: Array< string > | null,
  isNeutered?: boolean | null,
  isMicrochipped?: boolean | null,
  microchipNumber?: string | null,
  hasMedicalCondition?: boolean | null,
  additionalCareInstructions?: string | null,
  questionAnswerIds?: Array< string > | null,
};

export type ModelPetConditionInput = {
  customerId?: ModelIDInput | null,
  gender?: ModelGenderInput | null,
  petType?: ModelPetTypeInput | null,
  isDeleted?: ModelBooleanInput | null,
  breedName?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  birthdate?: ModelStringInput | null,
  weightValue?: ModelFloatInput | null,
  weightUnit?: ModelWeightUnitInput | null,
  additionalInfo?: ModelStringInput | null,
  predefinedBehaviors?: ModelPredefinedBehaviorListInput | null,
  customBehaviors?: ModelStringInput | null,
  isNeutered?: ModelBooleanInput | null,
  isMicrochipped?: ModelBooleanInput | null,
  microchipNumber?: ModelStringInput | null,
  hasMedicalCondition?: ModelBooleanInput | null,
  additionalCareInstructions?: ModelStringInput | null,
  questionAnswerIds?: ModelIDInput | null,
  and?: Array< ModelPetConditionInput | null > | null,
  or?: Array< ModelPetConditionInput | null > | null,
  not?: ModelPetConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelGenderInput = {
  eq?: Gender | null,
  ne?: Gender | null,
};

export type ModelWeightUnitInput = {
  eq?: WeightUnit | null,
  ne?: WeightUnit | null,
};

export type ModelPredefinedBehaviorListInput = {
  eq?: Array< PredefinedBehavior | null > | null,
  ne?: Array< PredefinedBehavior | null > | null,
  contains?: PredefinedBehavior | null,
  notContains?: PredefinedBehavior | null,
};

export type UpdatePetInput = {
  name: string,
  customerUsername: string,
  customerId?: string | null,
  gender?: Gender | null,
  petType?: PetType | null,
  isDeleted?: boolean | null,
  breedName?: string | null,
  imageUrl?: string | null,
  birthdate?: string | null,
  weightValue?: number | null,
  weightUnit?: WeightUnit | null,
  additionalInfo?: string | null,
  predefinedBehaviors?: Array< PredefinedBehavior > | null,
  customBehaviors?: Array< string > | null,
  isNeutered?: boolean | null,
  isMicrochipped?: boolean | null,
  microchipNumber?: string | null,
  hasMedicalCondition?: boolean | null,
  additionalCareInstructions?: string | null,
  questionAnswerIds?: Array< string > | null,
};

export type DeletePetInput = {
  name: string,
  customerUsername: string,
};

export type CreateQuestionInput = {
  id?: string | null,
  serviceCategory: ServiceCategory,
  questionString: string,
};

export type ModelQuestionConditionInput = {
  serviceCategory?: ModelServiceCategoryInput | null,
  questionString?: ModelStringInput | null,
  and?: Array< ModelQuestionConditionInput | null > | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  not?: ModelQuestionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Question = {
  __typename: "Question",
  id: string,
  serviceCategory: ServiceCategory,
  questionString: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateQuestionInput = {
  id: string,
  serviceCategory?: ServiceCategory | null,
  questionString?: string | null,
};

export type DeleteQuestionInput = {
  id: string,
};

export type CreateQuestionAnswerInput = {
  petName: string,
  customerUsername: string,
  customerId: string,
  questionId: string,
  answer: string,
};

export type ModelQuestionAnswerConditionInput = {
  customerId?: ModelIDInput | null,
  answer?: ModelStringInput | null,
  and?: Array< ModelQuestionAnswerConditionInput | null > | null,
  or?: Array< ModelQuestionAnswerConditionInput | null > | null,
  not?: ModelQuestionAnswerConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type QuestionAnswer = {
  __typename: "QuestionAnswer",
  petName: string,
  customerUsername: string,
  pet: Pet,
  customerId: string,
  questionId: string,
  question: Question,
  answer: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateQuestionAnswerInput = {
  petName: string,
  customerUsername: string,
  customerId?: string | null,
  questionId: string,
  answer?: string | null,
};

export type DeleteQuestionAnswerInput = {
  petName: string,
  customerUsername: string,
  questionId: string,
};

export type CreateServiceInput = {
  id?: string | null,
  serviceProviderId: string,
  name: string,
  serviceProviderName: string,
  serviceCategory: ServiceCategory,
  petType: PetType,
  defaultDisplay: boolean,
  displayPriority?: number | null,
  onlinePaymentAccepted: boolean,
  currency: Currency,
  basePrice: number,
  baseDuration: number,
  baseDurationUnit: TimeUnit,
  additionalPetPrice?: number | null,
  additionalTimePrice?: CustomPriceInput | null,
  xsWeightPrice?: CustomPriceInput | null,
  sWeightPrice?: CustomPriceInput | null,
  mWeightPrice?: CustomPriceInput | null,
  lWeightPrice?: CustomPriceInput | null,
  xlWeightPrice?: CustomPriceInput | null,
  xxlWeightPrice?: CustomPriceInput | null,
  shortDescription?: string | null,
  longDescription?: string | null,
  imageUrl?: string | null,
  serviceBreakdown?: string | null,
  additionalInfo?: string | null,
  faq?: string | null,
  goodToKnow?: string | null,
  parentServiceIds?: Array< string > | null,
  childServiceIds?: Array< string > | null,
  disclaimerName?: string | null,
  timeSlotIds?: Array< string > | null,
  bookingIds?: Array< string > | null,
  requiredQuestionIds?: Array< string > | null,
};

export type CustomPriceInput = {
  additionalDuration?: number | null,
  additionalDurationUnit?: TimeUnit | null,
  minWeight?: number | null,
  maxWeight?: number | null,
  weightUnit?: WeightUnit | null,
  amount: number,
};

export type ModelServiceConditionInput = {
  serviceProviderId?: ModelIDInput | null,
  defaultDisplay?: ModelBooleanInput | null,
  displayPriority?: ModelIntInput | null,
  onlinePaymentAccepted?: ModelBooleanInput | null,
  currency?: ModelCurrencyInput | null,
  basePrice?: ModelFloatInput | null,
  baseDuration?: ModelIntInput | null,
  baseDurationUnit?: ModelTimeUnitInput | null,
  additionalPetPrice?: ModelFloatInput | null,
  shortDescription?: ModelStringInput | null,
  longDescription?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  serviceBreakdown?: ModelStringInput | null,
  additionalInfo?: ModelStringInput | null,
  faq?: ModelStringInput | null,
  goodToKnow?: ModelStringInput | null,
  parentServiceIds?: ModelIDInput | null,
  childServiceIds?: ModelIDInput | null,
  disclaimerName?: ModelStringInput | null,
  timeSlotIds?: ModelIDInput | null,
  bookingIds?: ModelIDInput | null,
  requiredQuestionIds?: ModelIDInput | null,
  and?: Array< ModelServiceConditionInput | null > | null,
  or?: Array< ModelServiceConditionInput | null > | null,
  not?: ModelServiceConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateServiceInput = {
  id?: string | null,
  serviceProviderId?: string | null,
  name: string,
  serviceProviderName: string,
  serviceCategory: ServiceCategory,
  petType: PetType,
  defaultDisplay?: boolean | null,
  displayPriority?: number | null,
  onlinePaymentAccepted?: boolean | null,
  currency?: Currency | null,
  basePrice?: number | null,
  baseDuration?: number | null,
  baseDurationUnit?: TimeUnit | null,
  additionalPetPrice?: number | null,
  additionalTimePrice?: CustomPriceInput | null,
  xsWeightPrice?: CustomPriceInput | null,
  sWeightPrice?: CustomPriceInput | null,
  mWeightPrice?: CustomPriceInput | null,
  lWeightPrice?: CustomPriceInput | null,
  xlWeightPrice?: CustomPriceInput | null,
  xxlWeightPrice?: CustomPriceInput | null,
  shortDescription?: string | null,
  longDescription?: string | null,
  imageUrl?: string | null,
  serviceBreakdown?: string | null,
  additionalInfo?: string | null,
  faq?: string | null,
  goodToKnow?: string | null,
  parentServiceIds?: Array< string > | null,
  childServiceIds?: Array< string > | null,
  disclaimerName?: string | null,
  timeSlotIds?: Array< string > | null,
  bookingIds?: Array< string > | null,
  requiredQuestionIds?: Array< string > | null,
};

export type DeleteServiceInput = {
  name: string,
  serviceProviderName: string,
  serviceCategory: ServiceCategory,
  petType: PetType,
};

export type CreateServiceProviderInput = {
  id?: string | null,
  name: string,
  displayName?: string | null,
  description?: string | null,
  imageUrl?: string | null,
  address?: AddressInput | null,
  website?: string | null,
  email?: string | null,
  phone?: string | null,
  operatingTimes: Array< TimeIntervalInput >,
  isHeadquarters: boolean,
  serviceProviderHeadquartersName?: string | null,
};

export type TimeIntervalInput = {
  dayOfWeek: number,
  openTime: string,
  closeTime: string,
};

export type ModelServiceProviderConditionInput = {
  displayName?: ModelStringInput | null,
  description?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  website?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  isHeadquarters?: ModelBooleanInput | null,
  and?: Array< ModelServiceProviderConditionInput | null > | null,
  or?: Array< ModelServiceProviderConditionInput | null > | null,
  not?: ModelServiceProviderConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  serviceProviderHeadquartersName?: ModelStringInput | null,
  id?: ModelStringInput | null,
};

export type UpdateServiceProviderInput = {
  id?: string | null,
  name: string,
  displayName?: string | null,
  description?: string | null,
  imageUrl?: string | null,
  address?: AddressInput | null,
  website?: string | null,
  email?: string | null,
  phone?: string | null,
  operatingTimes?: Array< TimeIntervalInput > | null,
  isHeadquarters?: boolean | null,
  serviceProviderHeadquartersName?: string | null,
};

export type DeleteServiceProviderInput = {
  name: string,
};

export type CreateTimeSlotInput = {
  id?: string | null,
  serviceId: string,
  startDateTime: string,
  endDateTime?: string | null,
  capacity: number,
  bookingCount: number,
  isFull: boolean,
  bookingIds?: Array< string > | null,
};

export type ModelTimeSlotConditionInput = {
  endDateTime?: ModelStringInput | null,
  capacity?: ModelIntInput | null,
  bookingCount?: ModelIntInput | null,
  isFull?: ModelBooleanInput | null,
  bookingIds?: ModelIDInput | null,
  and?: Array< ModelTimeSlotConditionInput | null > | null,
  or?: Array< ModelTimeSlotConditionInput | null > | null,
  not?: ModelTimeSlotConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  serviceProviderId?: ModelStringInput | null,
};

export type UpdateTimeSlotInput = {
  id?: string | null,
  serviceId: string,
  startDateTime: string,
  endDateTime?: string | null,
  capacity?: number | null,
  bookingCount?: number | null,
  isFull?: boolean | null,
  bookingIds?: Array< string > | null,
};

export type DeleteTimeSlotInput = {
  serviceId: string,
  startDateTime: string,
};

export type CreatePetBookingsInput = {
  id?: string | null,
  bookingCustomerUsername: string,
  bookingtimeSlotId: string,
  petName: string,
  petcustomerUsername: string,
};

export type ModelPetBookingsConditionInput = {
  bookingCustomerUsername?: ModelStringInput | null,
  bookingtimeSlotId?: ModelIDInput | null,
  petName?: ModelStringInput | null,
  petcustomerUsername?: ModelStringInput | null,
  and?: Array< ModelPetBookingsConditionInput | null > | null,
  or?: Array< ModelPetBookingsConditionInput | null > | null,
  not?: ModelPetBookingsConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owners?: ModelStringInput | null,
  customerId?: ModelStringInput | null,
};

export type UpdatePetBookingsInput = {
  id: string,
  bookingCustomerUsername?: string | null,
  bookingtimeSlotId?: string | null,
  petName?: string | null,
  petcustomerUsername?: string | null,
};

export type DeletePetBookingsInput = {
  id: string,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelBookingFilterInput = {
  id?: ModelIDInput | null,
  orderId?: ModelIDInput | null,
  customerUsername?: ModelStringInput | null,
  owners?: ModelIDInput | null,
  customerId?: ModelIDInput | null,
  serviceName?: ModelStringInput | null,
  serviceProviderName?: ModelStringInput | null,
  serviceCategory?: ModelServiceCategoryInput | null,
  petType?: ModelPetTypeInput | null,
  serviceId?: ModelIDInput | null,
  startDateTime?: ModelStringInput | null,
  timeSlotId?: ModelIDInput | null,
  petNames?: ModelStringInput | null,
  addOns?: ModelIDInput | null,
  bookingType?: ModelBookingTypeInput | null,
  amount?: ModelFloatInput | null,
  currency?: ModelCurrencyInput | null,
  status?: ModelBookingStatusInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBookingFilterInput | null > | null,
  or?: Array< ModelBookingFilterInput | null > | null,
  not?: ModelBookingFilterInput | null,
  serviceProviderBookingsName?: ModelStringInput | null,
  timeSlotBookingsServiceId?: ModelIDInput | null,
  timeSlotBookingsStartDateTime?: ModelStringInput | null,
};

export type ModelBreedFilterInput = {
  name?: ModelStringInput | null,
  petType?: ModelPetTypeInput | null,
  coats?: ModelCoatListInput | null,
  undercoatRemoval?: ModelBooleanInput | null,
  durationUnit?: ModelTimeUnitInput | null,
  basicGroomingDuration?: ModelIntInput | null,
  fullGroomingDuration?: ModelIntInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBreedFilterInput | null > | null,
  or?: Array< ModelBreedFilterInput | null > | null,
  not?: ModelBreedFilterInput | null,
};

export type ModelBreedConnection = {
  __typename: "ModelBreedConnection",
  items:  Array<Breed | null >,
  nextToken?: string | null,
};

export type ModelCustomerFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  isDeactivated?: ModelBooleanInput | null,
  imageUrl?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCustomerFilterInput | null > | null,
  or?: Array< ModelCustomerFilterInput | null > | null,
  not?: ModelCustomerFilterInput | null,
};

export type ModelCustomerConnection = {
  __typename: "ModelCustomerConnection",
  items:  Array<Customer | null >,
  nextToken?: string | null,
};

export type ModelDisclaimerFilterInput = {
  name?: ModelStringInput | null,
  serviceName?: ModelStringInput | null,
  serviceProviderName?: ModelStringInput | null,
  serviceCategory?: ModelServiceCategoryInput | null,
  petType?: ModelPetTypeInput | null,
  text?: ModelStringInput | null,
  s3Link?: ModelStringInput | null,
  supersessionDate?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDisclaimerFilterInput | null > | null,
  or?: Array< ModelDisclaimerFilterInput | null > | null,
  not?: ModelDisclaimerFilterInput | null,
};

export type ModelDisclaimerConnection = {
  __typename: "ModelDisclaimerConnection",
  items:  Array<Disclaimer | null >,
  nextToken?: string | null,
};

export type ModelDisclaimerAcceptanceFilterInput = {
  id?: ModelIDInput | null,
  customerId?: ModelIDInput | null,
  disclaimerName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelDisclaimerAcceptanceFilterInput | null > | null,
  or?: Array< ModelDisclaimerAcceptanceFilterInput | null > | null,
  not?: ModelDisclaimerAcceptanceFilterInput | null,
};

export type ModelOrderFilterInput = {
  id?: ModelIDInput | null,
  customerId?: ModelIDInput | null,
  currency?: ModelCurrencyInput | null,
  totalAmount?: ModelFloatInput | null,
  pendingRefundAmount?: ModelFloatInput | null,
  refundedAmount?: ModelFloatInput | null,
  bookingIds?: ModelIDInput | null,
  paymentRequestId?: ModelIDInput | null,
  status?: ModelOrderStatusInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelOrderFilterInput | null > | null,
  or?: Array< ModelOrderFilterInput | null > | null,
  not?: ModelOrderFilterInput | null,
};

export type ModelPaymentFilterInput = {
  paymentRequestId?: ModelIDInput | null,
  orderId?: ModelIDInput | null,
  customerId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  currency?: ModelCurrencyInput | null,
  requestCreatedAt?: ModelStringInput | null,
  requestUpdatedAt?: ModelStringInput | null,
  status?: ModelPaymentStatusInput | null,
  purpose?: ModelStringInput | null,
  referenceNumber?: ModelIDInput | null,
  paymentId?: ModelIDInput | null,
  paymentMethod?: ModelPaymentMethodInput | null,
  url?: ModelStringInput | null,
  webhookUrl?: ModelStringInput | null,
  redirectUrl?: ModelStringInput | null,
  sendSMS?: ModelBooleanInput | null,
  sendEmail?: ModelBooleanInput | null,
  smsStatus?: ModelBooleanInput | null,
  emailStatus?: ModelBooleanInput | null,
  allowRepeatedPayments?: ModelBooleanInput | null,
  expiryDateTime?: ModelStringInput | null,
  errors?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPaymentFilterInput | null > | null,
  or?: Array< ModelPaymentFilterInput | null > | null,
  not?: ModelPaymentFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelPetFilterInput = {
  name?: ModelStringInput | null,
  customerUsername?: ModelStringInput | null,
  customerId?: ModelIDInput | null,
  gender?: ModelGenderInput | null,
  petType?: ModelPetTypeInput | null,
  isDeleted?: ModelBooleanInput | null,
  breedName?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  birthdate?: ModelStringInput | null,
  weightValue?: ModelFloatInput | null,
  weightUnit?: ModelWeightUnitInput | null,
  additionalInfo?: ModelStringInput | null,
  predefinedBehaviors?: ModelPredefinedBehaviorListInput | null,
  customBehaviors?: ModelStringInput | null,
  isNeutered?: ModelBooleanInput | null,
  isMicrochipped?: ModelBooleanInput | null,
  microchipNumber?: ModelStringInput | null,
  hasMedicalCondition?: ModelBooleanInput | null,
  additionalCareInstructions?: ModelStringInput | null,
  questionAnswerIds?: ModelIDInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPetFilterInput | null > | null,
  or?: Array< ModelPetFilterInput | null > | null,
  not?: ModelPetFilterInput | null,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDInput | null,
  serviceCategory?: ModelServiceCategoryInput | null,
  questionString?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
};

export type ModelQuestionConnection = {
  __typename: "ModelQuestionConnection",
  items:  Array<Question | null >,
  nextToken?: string | null,
};

export type ModelQuestionAnswerPrimaryCompositeKeyConditionInput = {
  eq?: ModelQuestionAnswerPrimaryCompositeKeyInput | null,
  le?: ModelQuestionAnswerPrimaryCompositeKeyInput | null,
  lt?: ModelQuestionAnswerPrimaryCompositeKeyInput | null,
  ge?: ModelQuestionAnswerPrimaryCompositeKeyInput | null,
  gt?: ModelQuestionAnswerPrimaryCompositeKeyInput | null,
  between?: Array< ModelQuestionAnswerPrimaryCompositeKeyInput | null > | null,
  beginsWith?: ModelQuestionAnswerPrimaryCompositeKeyInput | null,
};

export type ModelQuestionAnswerPrimaryCompositeKeyInput = {
  customerUsername?: string | null,
  questionId?: string | null,
};

export type ModelQuestionAnswerFilterInput = {
  petName?: ModelStringInput | null,
  customerUsername?: ModelStringInput | null,
  customerId?: ModelIDInput | null,
  questionId?: ModelIDInput | null,
  answer?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelQuestionAnswerFilterInput | null > | null,
  or?: Array< ModelQuestionAnswerFilterInput | null > | null,
  not?: ModelQuestionAnswerFilterInput | null,
};

export type ModelQuestionAnswerConnection = {
  __typename: "ModelQuestionAnswerConnection",
  items:  Array<QuestionAnswer | null >,
  nextToken?: string | null,
};

export type ModelServiceProviderFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  description?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  website?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  isHeadquarters?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelServiceProviderFilterInput | null > | null,
  or?: Array< ModelServiceProviderFilterInput | null > | null,
  not?: ModelServiceProviderFilterInput | null,
  serviceProviderHeadquartersName?: ModelStringInput | null,
};

export type ModelServiceProviderConnection = {
  __typename: "ModelServiceProviderConnection",
  items:  Array<ServiceProvider | null >,
  nextToken?: string | null,
};

export type ModelTimeSlotFilterInput = {
  id?: ModelIDInput | null,
  serviceId?: ModelIDInput | null,
  startDateTime?: ModelStringInput | null,
  endDateTime?: ModelStringInput | null,
  capacity?: ModelIntInput | null,
  bookingCount?: ModelIntInput | null,
  isFull?: ModelBooleanInput | null,
  bookingIds?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTimeSlotFilterInput | null > | null,
  or?: Array< ModelTimeSlotFilterInput | null > | null,
  not?: ModelTimeSlotFilterInput | null,
  serviceProviderId?: ModelStringInput | null,
};

export type ModelTimeSlotConnection = {
  __typename: "ModelTimeSlotConnection",
  items:  Array<TimeSlot | null >,
  nextToken?: string | null,
};

export type ModelPetBookingsFilterInput = {
  id?: ModelIDInput | null,
  bookingCustomerUsername?: ModelStringInput | null,
  bookingtimeSlotId?: ModelIDInput | null,
  petName?: ModelStringInput | null,
  petcustomerUsername?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPetBookingsFilterInput | null > | null,
  or?: Array< ModelPetBookingsFilterInput | null > | null,
  not?: ModelPetBookingsFilterInput | null,
  owners?: ModelStringInput | null,
  customerId?: ModelStringInput | null,
};

export type ModelSubscriptionBookingFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  orderId?: ModelSubscriptionIDInput | null,
  customerUsername?: ModelSubscriptionStringInput | null,
  customerId?: ModelSubscriptionIDInput | null,
  serviceName?: ModelSubscriptionStringInput | null,
  serviceProviderName?: ModelSubscriptionStringInput | null,
  serviceCategory?: ModelSubscriptionStringInput | null,
  petType?: ModelSubscriptionStringInput | null,
  serviceId?: ModelSubscriptionIDInput | null,
  startDateTime?: ModelSubscriptionStringInput | null,
  timeSlotId?: ModelSubscriptionIDInput | null,
  petNames?: ModelSubscriptionStringInput | null,
  addOns?: ModelSubscriptionIDInput | null,
  bookingType?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  currency?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBookingFilterInput | null > | null,
  or?: Array< ModelSubscriptionBookingFilterInput | null > | null,
  owners?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBreedFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  petType?: ModelSubscriptionStringInput | null,
  coats?: ModelSubscriptionStringInput | null,
  undercoatRemoval?: ModelSubscriptionBooleanInput | null,
  durationUnit?: ModelSubscriptionStringInput | null,
  basicGroomingDuration?: ModelSubscriptionIntInput | null,
  fullGroomingDuration?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBreedFilterInput | null > | null,
  or?: Array< ModelSubscriptionBreedFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionCustomerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  isDeactivated?: ModelSubscriptionBooleanInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCustomerFilterInput | null > | null,
  or?: Array< ModelSubscriptionCustomerFilterInput | null > | null,
  username?: ModelStringInput | null,
};

export type ModelSubscriptionDisclaimerFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  serviceName?: ModelSubscriptionStringInput | null,
  serviceProviderName?: ModelSubscriptionStringInput | null,
  serviceCategory?: ModelSubscriptionStringInput | null,
  petType?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  s3Link?: ModelSubscriptionStringInput | null,
  supersessionDate?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionDisclaimerFilterInput | null > | null,
  or?: Array< ModelSubscriptionDisclaimerFilterInput | null > | null,
};

export type ModelSubscriptionDisclaimerAcceptanceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  disclaimerName?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionDisclaimerAcceptanceFilterInput | null > | null,
  or?: Array< ModelSubscriptionDisclaimerAcceptanceFilterInput | null > | null,
  customerId?: ModelStringInput | null,
};

export type ModelSubscriptionOrderFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  currency?: ModelSubscriptionStringInput | null,
  totalAmount?: ModelSubscriptionFloatInput | null,
  pendingRefundAmount?: ModelSubscriptionFloatInput | null,
  refundedAmount?: ModelSubscriptionFloatInput | null,
  bookingIds?: ModelSubscriptionIDInput | null,
  paymentRequestId?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  customerId?: ModelStringInput | null,
};

export type ModelSubscriptionPaymentFilterInput = {
  paymentRequestId?: ModelSubscriptionIDInput | null,
  orderId?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  currency?: ModelSubscriptionStringInput | null,
  requestCreatedAt?: ModelSubscriptionStringInput | null,
  requestUpdatedAt?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  purpose?: ModelSubscriptionStringInput | null,
  referenceNumber?: ModelSubscriptionIDInput | null,
  paymentId?: ModelSubscriptionIDInput | null,
  paymentMethod?: ModelSubscriptionStringInput | null,
  url?: ModelSubscriptionStringInput | null,
  webhookUrl?: ModelSubscriptionStringInput | null,
  redirectUrl?: ModelSubscriptionStringInput | null,
  sendSMS?: ModelSubscriptionBooleanInput | null,
  sendEmail?: ModelSubscriptionBooleanInput | null,
  smsStatus?: ModelSubscriptionBooleanInput | null,
  emailStatus?: ModelSubscriptionBooleanInput | null,
  allowRepeatedPayments?: ModelSubscriptionBooleanInput | null,
  expiryDateTime?: ModelSubscriptionStringInput | null,
  errors?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPaymentFilterInput | null > | null,
  or?: Array< ModelSubscriptionPaymentFilterInput | null > | null,
  customerId?: ModelStringInput | null,
};

export type ModelSubscriptionPetFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  customerUsername?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  petType?: ModelSubscriptionStringInput | null,
  isDeleted?: ModelSubscriptionBooleanInput | null,
  breedName?: ModelSubscriptionStringInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  birthdate?: ModelSubscriptionStringInput | null,
  weightValue?: ModelSubscriptionFloatInput | null,
  weightUnit?: ModelSubscriptionStringInput | null,
  additionalInfo?: ModelSubscriptionStringInput | null,
  predefinedBehaviors?: ModelSubscriptionStringInput | null,
  customBehaviors?: ModelSubscriptionStringInput | null,
  isNeutered?: ModelSubscriptionBooleanInput | null,
  isMicrochipped?: ModelSubscriptionBooleanInput | null,
  microchipNumber?: ModelSubscriptionStringInput | null,
  hasMedicalCondition?: ModelSubscriptionBooleanInput | null,
  additionalCareInstructions?: ModelSubscriptionStringInput | null,
  questionAnswerIds?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPetFilterInput | null > | null,
  or?: Array< ModelSubscriptionPetFilterInput | null > | null,
  customerId?: ModelStringInput | null,
};

export type ModelSubscriptionQuestionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  serviceCategory?: ModelSubscriptionStringInput | null,
  questionString?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
};

export type ModelSubscriptionQuestionAnswerFilterInput = {
  petName?: ModelSubscriptionStringInput | null,
  customerUsername?: ModelSubscriptionStringInput | null,
  questionId?: ModelSubscriptionIDInput | null,
  answer?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQuestionAnswerFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestionAnswerFilterInput | null > | null,
  customerId?: ModelStringInput | null,
};

export type ModelSubscriptionServiceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  serviceProviderName?: ModelSubscriptionStringInput | null,
  serviceCategory?: ModelSubscriptionStringInput | null,
  petType?: ModelSubscriptionStringInput | null,
  defaultDisplay?: ModelSubscriptionBooleanInput | null,
  displayPriority?: ModelSubscriptionIntInput | null,
  onlinePaymentAccepted?: ModelSubscriptionBooleanInput | null,
  currency?: ModelSubscriptionStringInput | null,
  basePrice?: ModelSubscriptionFloatInput | null,
  baseDuration?: ModelSubscriptionIntInput | null,
  baseDurationUnit?: ModelSubscriptionStringInput | null,
  additionalPetPrice?: ModelSubscriptionFloatInput | null,
  shortDescription?: ModelSubscriptionStringInput | null,
  longDescription?: ModelSubscriptionStringInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  serviceBreakdown?: ModelSubscriptionStringInput | null,
  additionalInfo?: ModelSubscriptionStringInput | null,
  faq?: ModelSubscriptionStringInput | null,
  goodToKnow?: ModelSubscriptionStringInput | null,
  parentServiceIds?: ModelSubscriptionIDInput | null,
  childServiceIds?: ModelSubscriptionIDInput | null,
  disclaimerName?: ModelSubscriptionStringInput | null,
  timeSlotIds?: ModelSubscriptionIDInput | null,
  bookingIds?: ModelSubscriptionIDInput | null,
  requiredQuestionIds?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionServiceFilterInput | null > | null,
  or?: Array< ModelSubscriptionServiceFilterInput | null > | null,
  serviceProviderId?: ModelStringInput | null,
};

export type ModelSubscriptionServiceProviderFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  displayName?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  website?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  isHeadquarters?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionServiceProviderFilterInput | null > | null,
  or?: Array< ModelSubscriptionServiceProviderFilterInput | null > | null,
  serviceProviderBookingsName?: ModelSubscriptionStringInput | null,
  serviceProviderHeadquartersName?: ModelSubscriptionStringInput | null,
  id?: ModelStringInput | null,
};

export type ModelSubscriptionTimeSlotFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  serviceId?: ModelSubscriptionIDInput | null,
  startDateTime?: ModelSubscriptionStringInput | null,
  endDateTime?: ModelSubscriptionStringInput | null,
  capacity?: ModelSubscriptionIntInput | null,
  bookingCount?: ModelSubscriptionIntInput | null,
  isFull?: ModelSubscriptionBooleanInput | null,
  bookingIds?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTimeSlotFilterInput | null > | null,
  or?: Array< ModelSubscriptionTimeSlotFilterInput | null > | null,
  timeSlotBookingsServiceId?: ModelSubscriptionIDInput | null,
  timeSlotBookingsStartDateTime?: ModelSubscriptionStringInput | null,
  serviceProviderId?: ModelStringInput | null,
};

export type ModelSubscriptionPetBookingsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  bookingCustomerUsername?: ModelSubscriptionStringInput | null,
  bookingtimeSlotId?: ModelSubscriptionIDInput | null,
  petName?: ModelSubscriptionStringInput | null,
  petcustomerUsername?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPetBookingsFilterInput | null > | null,
  or?: Array< ModelSubscriptionPetBookingsFilterInput | null > | null,
  owners?: ModelStringInput | null,
  customerId?: ModelStringInput | null,
};

export type CustomListServicesQueryVariables = {
  name?: string | null,
  serviceProviderNameServiceCategoryPetType?: ModelServicePrimaryCompositeKeyConditionInput | null,
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type CustomListServicesQuery = {
  listServices?:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      xsWeightPrice?:  {
        __typename: "CustomPrice",
        minWeight?: number | null,
        maxWeight?: number | null,
        amount: number,
      } | null,
      sWeightPrice?:  {
        __typename: "CustomPrice",
        minWeight?: number | null,
        maxWeight?: number | null,
        amount: number,
      } | null,
      mWeightPrice?:  {
        __typename: "CustomPrice",
        minWeight?: number | null,
        maxWeight?: number | null,
        amount: number,
      } | null,
      lWeightPrice?:  {
        __typename: "CustomPrice",
        minWeight?: number | null,
        maxWeight?: number | null,
        amount: number,
      } | null,
      xlWeightPrice?:  {
        __typename: "CustomPrice",
        minWeight?: number | null,
        maxWeight?: number | null,
        amount: number,
      } | null,
      xxlWeightPrice?:  {
        __typename: "CustomPrice",
        minWeight?: number | null,
        maxWeight?: number | null,
        amount: number,
      } | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CustomGetBookingQueryVariables = {
  customerUsername: string,
  timeSlotId: string,
};

export type CustomGetBookingQuery = {
  getBooking?:  {
    __typename: "Booking",
    id: string,
    customerUsername: string,
    owners: Array< string >,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    serviceName: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      address?:  {
        __typename: "Address",
        blockNumber?: string | null,
        postalCode: string,
        streetName: string,
        unitNumber?: string | null,
      } | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    serviceId: string,
    startDateTime: string,
    timeSlot:  {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    },
    timeSlotId: string,
    petNames: Array< string >,
    pets?:  {
      __typename: "ModelPetBookingsConnection",
      items:  Array< {
        __typename: "PetBookings",
        pet:  {
          __typename: "Pet",
          birthdate?: string | null,
          imageUrl?: string | null,
          name: string,
        },
      } | null >,
      nextToken?: string | null,
    } | null,
    addOns?: Array< string > | null,
    bookingType: BookingType,
    amount: number,
    currency: Currency,
    status: BookingStatus,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    serviceProviderBookingsName?: string | null,
    timeSlotBookingsServiceId?: string | null,
    timeSlotBookingsStartDateTime?: string | null,
  } | null,
};

export type CustomBookingByIdQueryVariables = {
  id: string,
};

export type CustomBookingByIdQuery = {
  bookingById?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
      petNames: Array< string >,
      pets?:  {
        __typename: "ModelPetBookingsConnection",
        items:  Array< {
          __typename: "PetBookings",
          pet:  {
            __typename: "Pet",
            birthdate?: string | null,
            imageUrl?: string | null,
            name: string,
          },
        } | null >,
        nextToken?: string | null,
      } | null,
      serviceProvider:  {
        __typename: "ServiceProvider",
        name: string,
        displayName?: string | null,
        address?:  {
          __typename: "Address",
          blockNumber?: string | null,
          postalCode: string,
          streetName: string,
          unitNumber?: string | null,
        } | null,
      },
      timeSlot:  {
        __typename: "TimeSlot",
        id: string,
        startDateTime: string,
        endDateTime?: string | null,
      },
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CustomBookingsByCustomerQueryVariables = {
  customerId: string,
};

export type CustomBookingsByCustomerQuery = {
  bookingsByCustomer?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
      petNames: Array< string >,
      pets?:  {
        __typename: "ModelPetBookingsConnection",
        items:  Array< {
          __typename: "PetBookings",
          pet:  {
            __typename: "Pet",
            name: string,
            birthdate?: string | null,
            imageUrl?: string | null,
          },
        } | null >,
      } | null,
    } | null >,
  } | null,
};

export type CreateBookingMutationVariables = {
  input: CreateBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type CreateBookingMutation = {
  createBooking?:  {
    __typename: "Booking",
    id: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerUsername: string,
    owners: Array< string >,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    serviceName: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    serviceId: string,
    startDateTime: string,
    timeSlot:  {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    },
    timeSlotId: string,
    petNames: Array< string >,
    pets?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    addOns?: Array< string > | null,
    bookingType: BookingType,
    amount: number,
    currency: Currency,
    status: BookingStatus,
    createdAt: string,
    updatedAt: string,
    serviceProviderBookingsName?: string | null,
    timeSlotBookingsServiceId?: string | null,
    timeSlotBookingsStartDateTime?: string | null,
  } | null,
};

export type UpdateBookingMutationVariables = {
  input: UpdateBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type UpdateBookingMutation = {
  updateBooking?:  {
    __typename: "Booking",
    id: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerUsername: string,
    owners: Array< string >,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    serviceName: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    serviceId: string,
    startDateTime: string,
    timeSlot:  {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    },
    timeSlotId: string,
    petNames: Array< string >,
    pets?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    addOns?: Array< string > | null,
    bookingType: BookingType,
    amount: number,
    currency: Currency,
    status: BookingStatus,
    createdAt: string,
    updatedAt: string,
    serviceProviderBookingsName?: string | null,
    timeSlotBookingsServiceId?: string | null,
    timeSlotBookingsStartDateTime?: string | null,
  } | null,
};

export type DeleteBookingMutationVariables = {
  input: DeleteBookingInput,
  condition?: ModelBookingConditionInput | null,
};

export type DeleteBookingMutation = {
  deleteBooking?:  {
    __typename: "Booking",
    id: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerUsername: string,
    owners: Array< string >,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    serviceName: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    serviceId: string,
    startDateTime: string,
    timeSlot:  {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    },
    timeSlotId: string,
    petNames: Array< string >,
    pets?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    addOns?: Array< string > | null,
    bookingType: BookingType,
    amount: number,
    currency: Currency,
    status: BookingStatus,
    createdAt: string,
    updatedAt: string,
    serviceProviderBookingsName?: string | null,
    timeSlotBookingsServiceId?: string | null,
    timeSlotBookingsStartDateTime?: string | null,
  } | null,
};

export type CreateBreedMutationVariables = {
  input: CreateBreedInput,
  condition?: ModelBreedConditionInput | null,
};

export type CreateBreedMutation = {
  createBreed?:  {
    __typename: "Breed",
    name: string,
    petType: PetType,
    coats?: Array< Coat > | null,
    undercoatRemoval?: boolean | null,
    durationUnit?: TimeUnit | null,
    basicGroomingDuration?: number | null,
    fullGroomingDuration?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBreedMutationVariables = {
  input: UpdateBreedInput,
  condition?: ModelBreedConditionInput | null,
};

export type UpdateBreedMutation = {
  updateBreed?:  {
    __typename: "Breed",
    name: string,
    petType: PetType,
    coats?: Array< Coat > | null,
    undercoatRemoval?: boolean | null,
    durationUnit?: TimeUnit | null,
    basicGroomingDuration?: number | null,
    fullGroomingDuration?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBreedMutationVariables = {
  input: DeleteBreedInput,
  condition?: ModelBreedConditionInput | null,
};

export type DeleteBreedMutation = {
  deleteBreed?:  {
    __typename: "Breed",
    name: string,
    petType: PetType,
    coats?: Array< Coat > | null,
    undercoatRemoval?: boolean | null,
    durationUnit?: TimeUnit | null,
    basicGroomingDuration?: number | null,
    fullGroomingDuration?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCustomerMutationVariables = {
  input: CreateCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type CreateCustomerMutation = {
  createCustomer?:  {
    __typename: "Customer",
    id: string,
    username: string,
    isDeactivated: boolean,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    acceptedDisclaimers?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    pets?:  {
      __typename: "ModelPetConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    payments?:  {
      __typename: "ModelPaymentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCustomerMutationVariables = {
  input: UpdateCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type UpdateCustomerMutation = {
  updateCustomer?:  {
    __typename: "Customer",
    id: string,
    username: string,
    isDeactivated: boolean,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    acceptedDisclaimers?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    pets?:  {
      __typename: "ModelPetConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    payments?:  {
      __typename: "ModelPaymentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCustomerMutationVariables = {
  input: DeleteCustomerInput,
  condition?: ModelCustomerConditionInput | null,
};

export type DeleteCustomerMutation = {
  deleteCustomer?:  {
    __typename: "Customer",
    id: string,
    username: string,
    isDeactivated: boolean,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    acceptedDisclaimers?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    pets?:  {
      __typename: "ModelPetConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    payments?:  {
      __typename: "ModelPaymentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDisclaimerMutationVariables = {
  input: CreateDisclaimerInput,
  condition?: ModelDisclaimerConditionInput | null,
};

export type CreateDisclaimerMutation = {
  createDisclaimer?:  {
    __typename: "Disclaimer",
    name: string,
    serviceName?: string | null,
    serviceProviderName?: string | null,
    serviceCategory?: ServiceCategory | null,
    petType?: PetType | null,
    service?:  {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    text?: string | null,
    s3Link?: string | null,
    supersededBy?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    supersessionDate?: string | null,
    customerAcceptances?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDisclaimerMutationVariables = {
  input: UpdateDisclaimerInput,
  condition?: ModelDisclaimerConditionInput | null,
};

export type UpdateDisclaimerMutation = {
  updateDisclaimer?:  {
    __typename: "Disclaimer",
    name: string,
    serviceName?: string | null,
    serviceProviderName?: string | null,
    serviceCategory?: ServiceCategory | null,
    petType?: PetType | null,
    service?:  {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    text?: string | null,
    s3Link?: string | null,
    supersededBy?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    supersessionDate?: string | null,
    customerAcceptances?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDisclaimerMutationVariables = {
  input: DeleteDisclaimerInput,
  condition?: ModelDisclaimerConditionInput | null,
};

export type DeleteDisclaimerMutation = {
  deleteDisclaimer?:  {
    __typename: "Disclaimer",
    name: string,
    serviceName?: string | null,
    serviceProviderName?: string | null,
    serviceCategory?: ServiceCategory | null,
    petType?: PetType | null,
    service?:  {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    text?: string | null,
    s3Link?: string | null,
    supersededBy?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    supersessionDate?: string | null,
    customerAcceptances?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDisclaimerAcceptanceMutationVariables = {
  input: CreateDisclaimerAcceptanceInput,
  condition?: ModelDisclaimerAcceptanceConditionInput | null,
};

export type CreateDisclaimerAcceptanceMutation = {
  createDisclaimerAcceptance?:  {
    __typename: "DisclaimerAcceptance",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    disclaimerName: string,
    disclaimer:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDisclaimerAcceptanceMutationVariables = {
  input: UpdateDisclaimerAcceptanceInput,
  condition?: ModelDisclaimerAcceptanceConditionInput | null,
};

export type UpdateDisclaimerAcceptanceMutation = {
  updateDisclaimerAcceptance?:  {
    __typename: "DisclaimerAcceptance",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    disclaimerName: string,
    disclaimer:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDisclaimerAcceptanceMutationVariables = {
  input: DeleteDisclaimerAcceptanceInput,
  condition?: ModelDisclaimerAcceptanceConditionInput | null,
};

export type DeleteDisclaimerAcceptanceMutation = {
  deleteDisclaimerAcceptance?:  {
    __typename: "DisclaimerAcceptance",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    disclaimerName: string,
    disclaimer:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    currency: Currency,
    totalAmount: number,
    pendingRefundAmount?: number | null,
    refundedAmount?: number | null,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    paymentRequestId?: string | null,
    status: OrderStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateOrderMutationVariables = {
  input: UpdateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type UpdateOrderMutation = {
  updateOrder?:  {
    __typename: "Order",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    currency: Currency,
    totalAmount: number,
    pendingRefundAmount?: number | null,
    refundedAmount?: number | null,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    paymentRequestId?: string | null,
    status: OrderStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteOrderMutationVariables = {
  input: DeleteOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type DeleteOrderMutation = {
  deleteOrder?:  {
    __typename: "Order",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    currency: Currency,
    totalAmount: number,
    pendingRefundAmount?: number | null,
    refundedAmount?: number | null,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    paymentRequestId?: string | null,
    status: OrderStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePaymentMutationVariables = {
  input: CreatePaymentInput,
  condition?: ModelPaymentConditionInput | null,
};

export type CreatePaymentMutation = {
  createPayment?:  {
    __typename: "Payment",
    paymentRequestId: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email?: string | null,
    phone?: string | null,
    amount: number,
    currency: Currency,
    requestCreatedAt: string,
    requestUpdatedAt: string,
    status: PaymentStatus,
    purpose?: string | null,
    referenceNumber?: string | null,
    paymentId?: string | null,
    paymentMethod?: PaymentMethod | null,
    url: string,
    webhookUrl: string,
    redirectUrl?: string | null,
    sendSMS?: boolean | null,
    sendEmail?: boolean | null,
    smsStatus?: boolean | null,
    emailStatus?: boolean | null,
    allowRepeatedPayments?: boolean | null,
    expiryDateTime?: string | null,
    errors?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePaymentMutationVariables = {
  input: UpdatePaymentInput,
  condition?: ModelPaymentConditionInput | null,
};

export type UpdatePaymentMutation = {
  updatePayment?:  {
    __typename: "Payment",
    paymentRequestId: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email?: string | null,
    phone?: string | null,
    amount: number,
    currency: Currency,
    requestCreatedAt: string,
    requestUpdatedAt: string,
    status: PaymentStatus,
    purpose?: string | null,
    referenceNumber?: string | null,
    paymentId?: string | null,
    paymentMethod?: PaymentMethod | null,
    url: string,
    webhookUrl: string,
    redirectUrl?: string | null,
    sendSMS?: boolean | null,
    sendEmail?: boolean | null,
    smsStatus?: boolean | null,
    emailStatus?: boolean | null,
    allowRepeatedPayments?: boolean | null,
    expiryDateTime?: string | null,
    errors?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePaymentMutationVariables = {
  input: DeletePaymentInput,
  condition?: ModelPaymentConditionInput | null,
};

export type DeletePaymentMutation = {
  deletePayment?:  {
    __typename: "Payment",
    paymentRequestId: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email?: string | null,
    phone?: string | null,
    amount: number,
    currency: Currency,
    requestCreatedAt: string,
    requestUpdatedAt: string,
    status: PaymentStatus,
    purpose?: string | null,
    referenceNumber?: string | null,
    paymentId?: string | null,
    paymentMethod?: PaymentMethod | null,
    url: string,
    webhookUrl: string,
    redirectUrl?: string | null,
    sendSMS?: boolean | null,
    sendEmail?: boolean | null,
    smsStatus?: boolean | null,
    emailStatus?: boolean | null,
    allowRepeatedPayments?: boolean | null,
    expiryDateTime?: string | null,
    errors?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePetMutationVariables = {
  input: CreatePetInput,
  condition?: ModelPetConditionInput | null,
};

export type CreatePetMutation = {
  createPet?:  {
    __typename: "Pet",
    name: string,
    customerUsername: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    gender: Gender,
    petType: PetType,
    isDeleted: boolean,
    breedName?: string | null,
    imageUrl?: string | null,
    birthdate?: string | null,
    weightValue?: number | null,
    weightUnit?: WeightUnit | null,
    additionalInfo?: string | null,
    predefinedBehaviors?: Array< PredefinedBehavior > | null,
    customBehaviors?: Array< string > | null,
    isNeutered?: boolean | null,
    isMicrochipped?: boolean | null,
    microchipNumber?: string | null,
    hasMedicalCondition?: boolean | null,
    additionalCareInstructions?: string | null,
    bookings?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    questionAnswerIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePetMutationVariables = {
  input: UpdatePetInput,
  condition?: ModelPetConditionInput | null,
};

export type UpdatePetMutation = {
  updatePet?:  {
    __typename: "Pet",
    name: string,
    customerUsername: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    gender: Gender,
    petType: PetType,
    isDeleted: boolean,
    breedName?: string | null,
    imageUrl?: string | null,
    birthdate?: string | null,
    weightValue?: number | null,
    weightUnit?: WeightUnit | null,
    additionalInfo?: string | null,
    predefinedBehaviors?: Array< PredefinedBehavior > | null,
    customBehaviors?: Array< string > | null,
    isNeutered?: boolean | null,
    isMicrochipped?: boolean | null,
    microchipNumber?: string | null,
    hasMedicalCondition?: boolean | null,
    additionalCareInstructions?: string | null,
    bookings?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    questionAnswerIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePetMutationVariables = {
  input: DeletePetInput,
  condition?: ModelPetConditionInput | null,
};

export type DeletePetMutation = {
  deletePet?:  {
    __typename: "Pet",
    name: string,
    customerUsername: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    gender: Gender,
    petType: PetType,
    isDeleted: boolean,
    breedName?: string | null,
    imageUrl?: string | null,
    birthdate?: string | null,
    weightValue?: number | null,
    weightUnit?: WeightUnit | null,
    additionalInfo?: string | null,
    predefinedBehaviors?: Array< PredefinedBehavior > | null,
    customBehaviors?: Array< string > | null,
    isNeutered?: boolean | null,
    isMicrochipped?: boolean | null,
    microchipNumber?: string | null,
    hasMedicalCondition?: boolean | null,
    additionalCareInstructions?: string | null,
    bookings?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    questionAnswerIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateQuestionMutationVariables = {
  input: CreateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type CreateQuestionMutation = {
  createQuestion?:  {
    __typename: "Question",
    id: string,
    serviceCategory: ServiceCategory,
    questionString: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionMutationVariables = {
  input: UpdateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type UpdateQuestionMutation = {
  updateQuestion?:  {
    __typename: "Question",
    id: string,
    serviceCategory: ServiceCategory,
    questionString: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionMutationVariables = {
  input: DeleteQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type DeleteQuestionMutation = {
  deleteQuestion?:  {
    __typename: "Question",
    id: string,
    serviceCategory: ServiceCategory,
    questionString: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateQuestionAnswerMutationVariables = {
  input: CreateQuestionAnswerInput,
  condition?: ModelQuestionAnswerConditionInput | null,
};

export type CreateQuestionAnswerMutation = {
  createQuestionAnswer?:  {
    __typename: "QuestionAnswer",
    petName: string,
    customerUsername: string,
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    questionId: string,
    question:  {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    },
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionAnswerMutationVariables = {
  input: UpdateQuestionAnswerInput,
  condition?: ModelQuestionAnswerConditionInput | null,
};

export type UpdateQuestionAnswerMutation = {
  updateQuestionAnswer?:  {
    __typename: "QuestionAnswer",
    petName: string,
    customerUsername: string,
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    questionId: string,
    question:  {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    },
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionAnswerMutationVariables = {
  input: DeleteQuestionAnswerInput,
  condition?: ModelQuestionAnswerConditionInput | null,
};

export type DeleteQuestionAnswerMutation = {
  deleteQuestionAnswer?:  {
    __typename: "QuestionAnswer",
    petName: string,
    customerUsername: string,
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    questionId: string,
    question:  {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    },
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateServiceMutationVariables = {
  input: CreateServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type CreateServiceMutation = {
  createService?:  {
    __typename: "Service",
    id: string,
    serviceProviderId: string,
    name: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    defaultDisplay: boolean,
    displayPriority?: number | null,
    onlinePaymentAccepted: boolean,
    currency: Currency,
    basePrice: number,
    baseDuration: number,
    baseDurationUnit: TimeUnit,
    additionalPetPrice?: number | null,
    additionalTimePrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xsWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    sWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    mWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    lWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xxlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    shortDescription?: string | null,
    longDescription?: string | null,
    imageUrl?: string | null,
    serviceBreakdown?: string | null,
    additionalInfo?: string | null,
    faq?: string | null,
    goodToKnow?: string | null,
    parentServiceIds?: Array< string > | null,
    childServiceIds?: Array< string > | null,
    disclaimerName?: string | null,
    disclaimer?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    timeSlotIds?: Array< string > | null,
    bookingIds?: Array< string > | null,
    requiredQuestionIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateServiceMutationVariables = {
  input: UpdateServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type UpdateServiceMutation = {
  updateService?:  {
    __typename: "Service",
    id: string,
    serviceProviderId: string,
    name: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    defaultDisplay: boolean,
    displayPriority?: number | null,
    onlinePaymentAccepted: boolean,
    currency: Currency,
    basePrice: number,
    baseDuration: number,
    baseDurationUnit: TimeUnit,
    additionalPetPrice?: number | null,
    additionalTimePrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xsWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    sWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    mWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    lWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xxlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    shortDescription?: string | null,
    longDescription?: string | null,
    imageUrl?: string | null,
    serviceBreakdown?: string | null,
    additionalInfo?: string | null,
    faq?: string | null,
    goodToKnow?: string | null,
    parentServiceIds?: Array< string > | null,
    childServiceIds?: Array< string > | null,
    disclaimerName?: string | null,
    disclaimer?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    timeSlotIds?: Array< string > | null,
    bookingIds?: Array< string > | null,
    requiredQuestionIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteServiceMutationVariables = {
  input: DeleteServiceInput,
  condition?: ModelServiceConditionInput | null,
};

export type DeleteServiceMutation = {
  deleteService?:  {
    __typename: "Service",
    id: string,
    serviceProviderId: string,
    name: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    defaultDisplay: boolean,
    displayPriority?: number | null,
    onlinePaymentAccepted: boolean,
    currency: Currency,
    basePrice: number,
    baseDuration: number,
    baseDurationUnit: TimeUnit,
    additionalPetPrice?: number | null,
    additionalTimePrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xsWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    sWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    mWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    lWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xxlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    shortDescription?: string | null,
    longDescription?: string | null,
    imageUrl?: string | null,
    serviceBreakdown?: string | null,
    additionalInfo?: string | null,
    faq?: string | null,
    goodToKnow?: string | null,
    parentServiceIds?: Array< string > | null,
    childServiceIds?: Array< string > | null,
    disclaimerName?: string | null,
    disclaimer?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    timeSlotIds?: Array< string > | null,
    bookingIds?: Array< string > | null,
    requiredQuestionIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateServiceProviderMutationVariables = {
  input: CreateServiceProviderInput,
  condition?: ModelServiceProviderConditionInput | null,
};

export type CreateServiceProviderMutation = {
  createServiceProvider?:  {
    __typename: "ServiceProvider",
    id: string,
    name: string,
    displayName?: string | null,
    description?: string | null,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    website?: string | null,
    email?: string | null,
    phone?: string | null,
    operatingTimes:  Array< {
      __typename: "TimeInterval",
      dayOfWeek: number,
      openTime: string,
      closeTime: string,
    } >,
    isHeadquarters: boolean,
    headquarters?:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null,
    services?:  {
      __typename: "ModelServiceConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderHeadquartersName?: string | null,
  } | null,
};

export type UpdateServiceProviderMutationVariables = {
  input: UpdateServiceProviderInput,
  condition?: ModelServiceProviderConditionInput | null,
};

export type UpdateServiceProviderMutation = {
  updateServiceProvider?:  {
    __typename: "ServiceProvider",
    id: string,
    name: string,
    displayName?: string | null,
    description?: string | null,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    website?: string | null,
    email?: string | null,
    phone?: string | null,
    operatingTimes:  Array< {
      __typename: "TimeInterval",
      dayOfWeek: number,
      openTime: string,
      closeTime: string,
    } >,
    isHeadquarters: boolean,
    headquarters?:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null,
    services?:  {
      __typename: "ModelServiceConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderHeadquartersName?: string | null,
  } | null,
};

export type DeleteServiceProviderMutationVariables = {
  input: DeleteServiceProviderInput,
  condition?: ModelServiceProviderConditionInput | null,
};

export type DeleteServiceProviderMutation = {
  deleteServiceProvider?:  {
    __typename: "ServiceProvider",
    id: string,
    name: string,
    displayName?: string | null,
    description?: string | null,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    website?: string | null,
    email?: string | null,
    phone?: string | null,
    operatingTimes:  Array< {
      __typename: "TimeInterval",
      dayOfWeek: number,
      openTime: string,
      closeTime: string,
    } >,
    isHeadquarters: boolean,
    headquarters?:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null,
    services?:  {
      __typename: "ModelServiceConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderHeadquartersName?: string | null,
  } | null,
};

export type CreateTimeSlotMutationVariables = {
  input: CreateTimeSlotInput,
  condition?: ModelTimeSlotConditionInput | null,
};

export type CreateTimeSlotMutation = {
  createTimeSlot?:  {
    __typename: "TimeSlot",
    id: string,
    serviceId: string,
    startDateTime: string,
    endDateTime?: string | null,
    capacity: number,
    bookingCount: number,
    isFull: boolean,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderId?: string | null,
  } | null,
};

export type UpdateTimeSlotMutationVariables = {
  input: UpdateTimeSlotInput,
  condition?: ModelTimeSlotConditionInput | null,
};

export type UpdateTimeSlotMutation = {
  updateTimeSlot?:  {
    __typename: "TimeSlot",
    id: string,
    serviceId: string,
    startDateTime: string,
    endDateTime?: string | null,
    capacity: number,
    bookingCount: number,
    isFull: boolean,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderId?: string | null,
  } | null,
};

export type DeleteTimeSlotMutationVariables = {
  input: DeleteTimeSlotInput,
  condition?: ModelTimeSlotConditionInput | null,
};

export type DeleteTimeSlotMutation = {
  deleteTimeSlot?:  {
    __typename: "TimeSlot",
    id: string,
    serviceId: string,
    startDateTime: string,
    endDateTime?: string | null,
    capacity: number,
    bookingCount: number,
    isFull: boolean,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderId?: string | null,
  } | null,
};

export type CreatePetBookingsMutationVariables = {
  input: CreatePetBookingsInput,
  condition?: ModelPetBookingsConditionInput | null,
};

export type CreatePetBookingsMutation = {
  createPetBookings?:  {
    __typename: "PetBookings",
    id: string,
    bookingCustomerUsername: string,
    bookingtimeSlotId: string,
    petName: string,
    petcustomerUsername: string,
    booking:  {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    },
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owners?: string | null,
    customerId?: string | null,
  } | null,
};

export type UpdatePetBookingsMutationVariables = {
  input: UpdatePetBookingsInput,
  condition?: ModelPetBookingsConditionInput | null,
};

export type UpdatePetBookingsMutation = {
  updatePetBookings?:  {
    __typename: "PetBookings",
    id: string,
    bookingCustomerUsername: string,
    bookingtimeSlotId: string,
    petName: string,
    petcustomerUsername: string,
    booking:  {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    },
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owners?: string | null,
    customerId?: string | null,
  } | null,
};

export type DeletePetBookingsMutationVariables = {
  input: DeletePetBookingsInput,
  condition?: ModelPetBookingsConditionInput | null,
};

export type DeletePetBookingsMutation = {
  deletePetBookings?:  {
    __typename: "PetBookings",
    id: string,
    bookingCustomerUsername: string,
    bookingtimeSlotId: string,
    petName: string,
    petcustomerUsername: string,
    booking:  {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    },
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owners?: string | null,
    customerId?: string | null,
  } | null,
};

export type GetBookingQueryVariables = {
  customerUsername: string,
  timeSlotId: string,
};

export type GetBookingQuery = {
  getBooking?:  {
    __typename: "Booking",
    id: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerUsername: string,
    owners: Array< string >,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    serviceName: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    serviceId: string,
    startDateTime: string,
    timeSlot:  {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    },
    timeSlotId: string,
    petNames: Array< string >,
    pets?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    addOns?: Array< string > | null,
    bookingType: BookingType,
    amount: number,
    currency: Currency,
    status: BookingStatus,
    createdAt: string,
    updatedAt: string,
    serviceProviderBookingsName?: string | null,
    timeSlotBookingsServiceId?: string | null,
    timeSlotBookingsStartDateTime?: string | null,
  } | null,
};

export type ListBookingsQueryVariables = {
  customerUsername?: string | null,
  timeSlotId?: ModelIDKeyConditionInput | null,
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListBookingsQuery = {
  listBookings?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BookingByIdQueryVariables = {
  id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookingByIdQuery = {
  bookingById?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BookingsByOrderQueryVariables = {
  orderId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookingsByOrderQuery = {
  bookingsByOrder?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BookingsByCustomerQueryVariables = {
  customerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookingsByCustomerQuery = {
  bookingsByCustomer?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BookingsByServiceQueryVariables = {
  serviceId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookingsByServiceQuery = {
  bookingsByService?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BookingsByStartDateTimeQueryVariables = {
  startDateTime: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookingsByStartDateTimeQuery = {
  bookingsByStartDateTime?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BookingsByTimeSlotQueryVariables = {
  timeSlotId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookingsByTimeSlotQuery = {
  bookingsByTimeSlot?:  {
    __typename: "ModelBookingConnection",
    items:  Array< {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBreedQueryVariables = {
  name: string,
};

export type GetBreedQuery = {
  getBreed?:  {
    __typename: "Breed",
    name: string,
    petType: PetType,
    coats?: Array< Coat > | null,
    undercoatRemoval?: boolean | null,
    durationUnit?: TimeUnit | null,
    basicGroomingDuration?: number | null,
    fullGroomingDuration?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBreedsQueryVariables = {
  name?: string | null,
  filter?: ModelBreedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListBreedsQuery = {
  listBreeds?:  {
    __typename: "ModelBreedConnection",
    items:  Array< {
      __typename: "Breed",
      name: string,
      petType: PetType,
      coats?: Array< Coat > | null,
      undercoatRemoval?: boolean | null,
      durationUnit?: TimeUnit | null,
      basicGroomingDuration?: number | null,
      fullGroomingDuration?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BreedsByPetTypeQueryVariables = {
  petType: PetType,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBreedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BreedsByPetTypeQuery = {
  breedsByPetType?:  {
    __typename: "ModelBreedConnection",
    items:  Array< {
      __typename: "Breed",
      name: string,
      petType: PetType,
      coats?: Array< Coat > | null,
      undercoatRemoval?: boolean | null,
      durationUnit?: TimeUnit | null,
      basicGroomingDuration?: number | null,
      fullGroomingDuration?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCustomerQueryVariables = {
  id: string,
};

export type GetCustomerQuery = {
  getCustomer?:  {
    __typename: "Customer",
    id: string,
    username: string,
    isDeactivated: boolean,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    acceptedDisclaimers?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    pets?:  {
      __typename: "ModelPetConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    payments?:  {
      __typename: "ModelPaymentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCustomersQueryVariables = {
  id?: string | null,
  filter?: ModelCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCustomersQuery = {
  listCustomers?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CustomerByUsernameQueryVariables = {
  username: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCustomerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CustomerByUsernameQuery = {
  customerByUsername?:  {
    __typename: "ModelCustomerConnection",
    items:  Array< {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDisclaimerQueryVariables = {
  name: string,
};

export type GetDisclaimerQuery = {
  getDisclaimer?:  {
    __typename: "Disclaimer",
    name: string,
    serviceName?: string | null,
    serviceProviderName?: string | null,
    serviceCategory?: ServiceCategory | null,
    petType?: PetType | null,
    service?:  {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    text?: string | null,
    s3Link?: string | null,
    supersededBy?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    supersessionDate?: string | null,
    customerAcceptances?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDisclaimersQueryVariables = {
  name?: string | null,
  filter?: ModelDisclaimerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDisclaimersQuery = {
  listDisclaimers?:  {
    __typename: "ModelDisclaimerConnection",
    items:  Array< {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDisclaimerAcceptanceQueryVariables = {
  id: string,
};

export type GetDisclaimerAcceptanceQuery = {
  getDisclaimerAcceptance?:  {
    __typename: "DisclaimerAcceptance",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    disclaimerName: string,
    disclaimer:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDisclaimerAcceptancesQueryVariables = {
  id?: string | null,
  filter?: ModelDisclaimerAcceptanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDisclaimerAcceptancesQuery = {
  listDisclaimerAcceptances?:  {
    __typename: "ModelDisclaimerAcceptanceConnection",
    items:  Array< {
      __typename: "DisclaimerAcceptance",
      id: string,
      customerId: string,
      disclaimerName: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AcceptancesByCustomerQueryVariables = {
  customerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDisclaimerAcceptanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AcceptancesByCustomerQuery = {
  acceptancesByCustomer?:  {
    __typename: "ModelDisclaimerAcceptanceConnection",
    items:  Array< {
      __typename: "DisclaimerAcceptance",
      id: string,
      customerId: string,
      disclaimerName: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AcceptancesByDisclaimerQueryVariables = {
  disclaimerName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDisclaimerAcceptanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AcceptancesByDisclaimerQuery = {
  acceptancesByDisclaimer?:  {
    __typename: "ModelDisclaimerAcceptanceConnection",
    items:  Array< {
      __typename: "DisclaimerAcceptance",
      id: string,
      customerId: string,
      disclaimerName: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetOrderQueryVariables = {
  id: string,
};

export type GetOrderQuery = {
  getOrder?:  {
    __typename: "Order",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    currency: Currency,
    totalAmount: number,
    pendingRefundAmount?: number | null,
    refundedAmount?: number | null,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    paymentRequestId?: string | null,
    status: OrderStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListOrdersQueryVariables = {
  id?: string | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListOrdersQuery = {
  listOrders?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OrdersByCustomerQueryVariables = {
  customerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type OrdersByCustomerQuery = {
  ordersByCustomer?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPaymentQueryVariables = {
  paymentRequestId: string,
};

export type GetPaymentQuery = {
  getPayment?:  {
    __typename: "Payment",
    paymentRequestId: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email?: string | null,
    phone?: string | null,
    amount: number,
    currency: Currency,
    requestCreatedAt: string,
    requestUpdatedAt: string,
    status: PaymentStatus,
    purpose?: string | null,
    referenceNumber?: string | null,
    paymentId?: string | null,
    paymentMethod?: PaymentMethod | null,
    url: string,
    webhookUrl: string,
    redirectUrl?: string | null,
    sendSMS?: boolean | null,
    sendEmail?: boolean | null,
    smsStatus?: boolean | null,
    emailStatus?: boolean | null,
    allowRepeatedPayments?: boolean | null,
    expiryDateTime?: string | null,
    errors?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPaymentsQueryVariables = {
  paymentRequestId?: string | null,
  filter?: ModelPaymentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPaymentsQuery = {
  listPayments?:  {
    __typename: "ModelPaymentConnection",
    items:  Array< {
      __typename: "Payment",
      paymentRequestId: string,
      orderId: string,
      customerId: string,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      amount: number,
      currency: Currency,
      requestCreatedAt: string,
      requestUpdatedAt: string,
      status: PaymentStatus,
      purpose?: string | null,
      referenceNumber?: string | null,
      paymentId?: string | null,
      paymentMethod?: PaymentMethod | null,
      url: string,
      webhookUrl: string,
      redirectUrl?: string | null,
      sendSMS?: boolean | null,
      sendEmail?: boolean | null,
      smsStatus?: boolean | null,
      emailStatus?: boolean | null,
      allowRepeatedPayments?: boolean | null,
      expiryDateTime?: string | null,
      errors?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PaymentsByOrderQueryVariables = {
  orderId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPaymentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PaymentsByOrderQuery = {
  paymentsByOrder?:  {
    __typename: "ModelPaymentConnection",
    items:  Array< {
      __typename: "Payment",
      paymentRequestId: string,
      orderId: string,
      customerId: string,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      amount: number,
      currency: Currency,
      requestCreatedAt: string,
      requestUpdatedAt: string,
      status: PaymentStatus,
      purpose?: string | null,
      referenceNumber?: string | null,
      paymentId?: string | null,
      paymentMethod?: PaymentMethod | null,
      url: string,
      webhookUrl: string,
      redirectUrl?: string | null,
      sendSMS?: boolean | null,
      sendEmail?: boolean | null,
      smsStatus?: boolean | null,
      emailStatus?: boolean | null,
      allowRepeatedPayments?: boolean | null,
      expiryDateTime?: string | null,
      errors?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PaymentsByCustomerQueryVariables = {
  customerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPaymentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PaymentsByCustomerQuery = {
  paymentsByCustomer?:  {
    __typename: "ModelPaymentConnection",
    items:  Array< {
      __typename: "Payment",
      paymentRequestId: string,
      orderId: string,
      customerId: string,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      amount: number,
      currency: Currency,
      requestCreatedAt: string,
      requestUpdatedAt: string,
      status: PaymentStatus,
      purpose?: string | null,
      referenceNumber?: string | null,
      paymentId?: string | null,
      paymentMethod?: PaymentMethod | null,
      url: string,
      webhookUrl: string,
      redirectUrl?: string | null,
      sendSMS?: boolean | null,
      sendEmail?: boolean | null,
      smsStatus?: boolean | null,
      emailStatus?: boolean | null,
      allowRepeatedPayments?: boolean | null,
      expiryDateTime?: string | null,
      errors?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PaymentsByRequestCreatedAtQueryVariables = {
  requestCreatedAt: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPaymentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PaymentsByRequestCreatedAtQuery = {
  paymentsByRequestCreatedAt?:  {
    __typename: "ModelPaymentConnection",
    items:  Array< {
      __typename: "Payment",
      paymentRequestId: string,
      orderId: string,
      customerId: string,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      amount: number,
      currency: Currency,
      requestCreatedAt: string,
      requestUpdatedAt: string,
      status: PaymentStatus,
      purpose?: string | null,
      referenceNumber?: string | null,
      paymentId?: string | null,
      paymentMethod?: PaymentMethod | null,
      url: string,
      webhookUrl: string,
      redirectUrl?: string | null,
      sendSMS?: boolean | null,
      sendEmail?: boolean | null,
      smsStatus?: boolean | null,
      emailStatus?: boolean | null,
      allowRepeatedPayments?: boolean | null,
      expiryDateTime?: string | null,
      errors?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PaymentsByRequestUpdatedAtQueryVariables = {
  requestUpdatedAt: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPaymentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PaymentsByRequestUpdatedAtQuery = {
  paymentsByRequestUpdatedAt?:  {
    __typename: "ModelPaymentConnection",
    items:  Array< {
      __typename: "Payment",
      paymentRequestId: string,
      orderId: string,
      customerId: string,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      amount: number,
      currency: Currency,
      requestCreatedAt: string,
      requestUpdatedAt: string,
      status: PaymentStatus,
      purpose?: string | null,
      referenceNumber?: string | null,
      paymentId?: string | null,
      paymentMethod?: PaymentMethod | null,
      url: string,
      webhookUrl: string,
      redirectUrl?: string | null,
      sendSMS?: boolean | null,
      sendEmail?: boolean | null,
      smsStatus?: boolean | null,
      emailStatus?: boolean | null,
      allowRepeatedPayments?: boolean | null,
      expiryDateTime?: string | null,
      errors?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PaymentsByPaymentMethodQueryVariables = {
  paymentMethod: PaymentMethod,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPaymentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PaymentsByPaymentMethodQuery = {
  paymentsByPaymentMethod?:  {
    __typename: "ModelPaymentConnection",
    items:  Array< {
      __typename: "Payment",
      paymentRequestId: string,
      orderId: string,
      customerId: string,
      name?: string | null,
      email?: string | null,
      phone?: string | null,
      amount: number,
      currency: Currency,
      requestCreatedAt: string,
      requestUpdatedAt: string,
      status: PaymentStatus,
      purpose?: string | null,
      referenceNumber?: string | null,
      paymentId?: string | null,
      paymentMethod?: PaymentMethod | null,
      url: string,
      webhookUrl: string,
      redirectUrl?: string | null,
      sendSMS?: boolean | null,
      sendEmail?: boolean | null,
      smsStatus?: boolean | null,
      emailStatus?: boolean | null,
      allowRepeatedPayments?: boolean | null,
      expiryDateTime?: string | null,
      errors?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPetQueryVariables = {
  name: string,
  customerUsername: string,
};

export type GetPetQuery = {
  getPet?:  {
    __typename: "Pet",
    name: string,
    customerUsername: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    gender: Gender,
    petType: PetType,
    isDeleted: boolean,
    breedName?: string | null,
    imageUrl?: string | null,
    birthdate?: string | null,
    weightValue?: number | null,
    weightUnit?: WeightUnit | null,
    additionalInfo?: string | null,
    predefinedBehaviors?: Array< PredefinedBehavior > | null,
    customBehaviors?: Array< string > | null,
    isNeutered?: boolean | null,
    isMicrochipped?: boolean | null,
    microchipNumber?: string | null,
    hasMedicalCondition?: boolean | null,
    additionalCareInstructions?: string | null,
    bookings?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    questionAnswerIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPetsQueryVariables = {
  name?: string | null,
  customerUsername?: ModelStringKeyConditionInput | null,
  filter?: ModelPetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPetsQuery = {
  listPets?:  {
    __typename: "ModelPetConnection",
    items:  Array< {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PetsByCustomerQueryVariables = {
  customerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PetsByCustomerQuery = {
  petsByCustomer?:  {
    __typename: "ModelPetConnection",
    items:  Array< {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PetsByBreedQueryVariables = {
  breedName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PetsByBreedQuery = {
  petsByBreed?:  {
    __typename: "ModelPetConnection",
    items:  Array< {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetQuestionQueryVariables = {
  id: string,
};

export type GetQuestionQuery = {
  getQuestion?:  {
    __typename: "Question",
    id: string,
    serviceCategory: ServiceCategory,
    questionString: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsQuery = {
  listQuestions?:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QuestionsByCategoryQueryVariables = {
  serviceCategory: ServiceCategory,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QuestionsByCategoryQuery = {
  questionsByCategory?:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetQuestionAnswerQueryVariables = {
  petName: string,
  customerUsername: string,
  questionId: string,
};

export type GetQuestionAnswerQuery = {
  getQuestionAnswer?:  {
    __typename: "QuestionAnswer",
    petName: string,
    customerUsername: string,
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    questionId: string,
    question:  {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    },
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuestionAnswersQueryVariables = {
  petName?: string | null,
  customerUsernameQuestionId?: ModelQuestionAnswerPrimaryCompositeKeyConditionInput | null,
  filter?: ModelQuestionAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListQuestionAnswersQuery = {
  listQuestionAnswers?:  {
    __typename: "ModelQuestionAnswerConnection",
    items:  Array< {
      __typename: "QuestionAnswer",
      petName: string,
      customerUsername: string,
      customerId: string,
      questionId: string,
      answer: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AnswersByPetQueryVariables = {
  petName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuestionAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AnswersByPetQuery = {
  answersByPet?:  {
    __typename: "ModelQuestionAnswerConnection",
    items:  Array< {
      __typename: "QuestionAnswer",
      petName: string,
      customerUsername: string,
      customerId: string,
      questionId: string,
      answer: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AnswersByCustomerQueryVariables = {
  customerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuestionAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AnswersByCustomerQuery = {
  answersByCustomer?:  {
    __typename: "ModelQuestionAnswerConnection",
    items:  Array< {
      __typename: "QuestionAnswer",
      petName: string,
      customerUsername: string,
      customerId: string,
      questionId: string,
      answer: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AnswersByQuestionQueryVariables = {
  questionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuestionAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AnswersByQuestionQuery = {
  answersByQuestion?:  {
    __typename: "ModelQuestionAnswerConnection",
    items:  Array< {
      __typename: "QuestionAnswer",
      petName: string,
      customerUsername: string,
      customerId: string,
      questionId: string,
      answer: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetServiceQueryVariables = {
  name: string,
  serviceProviderName: string,
  serviceCategory: ServiceCategory,
  petType: PetType,
};

export type GetServiceQuery = {
  getService?:  {
    __typename: "Service",
    id: string,
    serviceProviderId: string,
    name: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    defaultDisplay: boolean,
    displayPriority?: number | null,
    onlinePaymentAccepted: boolean,
    currency: Currency,
    basePrice: number,
    baseDuration: number,
    baseDurationUnit: TimeUnit,
    additionalPetPrice?: number | null,
    additionalTimePrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xsWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    sWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    mWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    lWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xxlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    shortDescription?: string | null,
    longDescription?: string | null,
    imageUrl?: string | null,
    serviceBreakdown?: string | null,
    additionalInfo?: string | null,
    faq?: string | null,
    goodToKnow?: string | null,
    parentServiceIds?: Array< string > | null,
    childServiceIds?: Array< string > | null,
    disclaimerName?: string | null,
    disclaimer?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    timeSlotIds?: Array< string > | null,
    bookingIds?: Array< string > | null,
    requiredQuestionIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListServicesQueryVariables = {
  name?: string | null,
  serviceProviderNameServiceCategoryPetType?: ModelServicePrimaryCompositeKeyConditionInput | null,
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListServicesQuery = {
  listServices?:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ServiceByIdQueryVariables = {
  id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ServiceByIdQuery = {
  serviceById?:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ServicesByServiceProviderQueryVariables = {
  serviceProviderName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ServicesByServiceProviderQuery = {
  servicesByServiceProvider?:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ServicesByCategoryQueryVariables = {
  serviceCategory: ServiceCategory,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ServicesByCategoryQuery = {
  servicesByCategory?:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ServicesByPetTypeQueryVariables = {
  petType: PetType,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ServicesByPetTypeQuery = {
  servicesByPetType?:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ServicesByPriceQueryVariables = {
  basePrice: number,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ServicesByPriceQuery = {
  servicesByPrice?:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ServicesByDurationQueryVariables = {
  baseDuration: number,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelServiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ServicesByDurationQuery = {
  servicesByDuration?:  {
    __typename: "ModelServiceConnection",
    items:  Array< {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetServiceProviderQueryVariables = {
  name: string,
};

export type GetServiceProviderQuery = {
  getServiceProvider?:  {
    __typename: "ServiceProvider",
    id: string,
    name: string,
    displayName?: string | null,
    description?: string | null,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    website?: string | null,
    email?: string | null,
    phone?: string | null,
    operatingTimes:  Array< {
      __typename: "TimeInterval",
      dayOfWeek: number,
      openTime: string,
      closeTime: string,
    } >,
    isHeadquarters: boolean,
    headquarters?:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null,
    services?:  {
      __typename: "ModelServiceConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderHeadquartersName?: string | null,
  } | null,
};

export type ListServiceProvidersQueryVariables = {
  name?: string | null,
  filter?: ModelServiceProviderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListServiceProvidersQuery = {
  listServiceProviders?:  {
    __typename: "ModelServiceProviderConnection",
    items:  Array< {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ServiceProviderByIdQueryVariables = {
  id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelServiceProviderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ServiceProviderByIdQuery = {
  serviceProviderById?:  {
    __typename: "ModelServiceProviderConnection",
    items:  Array< {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTimeSlotQueryVariables = {
  serviceId: string,
  startDateTime: string,
};

export type GetTimeSlotQuery = {
  getTimeSlot?:  {
    __typename: "TimeSlot",
    id: string,
    serviceId: string,
    startDateTime: string,
    endDateTime?: string | null,
    capacity: number,
    bookingCount: number,
    isFull: boolean,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderId?: string | null,
  } | null,
};

export type ListTimeSlotsQueryVariables = {
  serviceId?: string | null,
  startDateTime?: ModelStringKeyConditionInput | null,
  filter?: ModelTimeSlotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTimeSlotsQuery = {
  listTimeSlots?:  {
    __typename: "ModelTimeSlotConnection",
    items:  Array< {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TimeSlotByIdQueryVariables = {
  id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTimeSlotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TimeSlotByIdQuery = {
  timeSlotById?:  {
    __typename: "ModelTimeSlotConnection",
    items:  Array< {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TimeSlotsByStartDateTimeQueryVariables = {
  startDateTime: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTimeSlotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TimeSlotsByStartDateTimeQuery = {
  timeSlotsByStartDateTime?:  {
    __typename: "ModelTimeSlotConnection",
    items:  Array< {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TimeSlotsByEndDateTimeQueryVariables = {
  endDateTime: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTimeSlotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TimeSlotsByEndDateTimeQuery = {
  timeSlotsByEndDateTime?:  {
    __typename: "ModelTimeSlotConnection",
    items:  Array< {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TimeSlotsByCapacityQueryVariables = {
  capacity: number,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTimeSlotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TimeSlotsByCapacityQuery = {
  timeSlotsByCapacity?:  {
    __typename: "ModelTimeSlotConnection",
    items:  Array< {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TimeSlotsByBookingCountQueryVariables = {
  bookingCount: number,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTimeSlotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TimeSlotsByBookingCountQuery = {
  timeSlotsByBookingCount?:  {
    __typename: "ModelTimeSlotConnection",
    items:  Array< {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPetBookingsQueryVariables = {
  id: string,
};

export type GetPetBookingsQuery = {
  getPetBookings?:  {
    __typename: "PetBookings",
    id: string,
    bookingCustomerUsername: string,
    bookingtimeSlotId: string,
    petName: string,
    petcustomerUsername: string,
    booking:  {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    },
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owners?: string | null,
    customerId?: string | null,
  } | null,
};

export type ListPetBookingsQueryVariables = {
  filter?: ModelPetBookingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPetBookingsQuery = {
  listPetBookings?:  {
    __typename: "ModelPetBookingsConnection",
    items:  Array< {
      __typename: "PetBookings",
      id: string,
      bookingCustomerUsername: string,
      bookingtimeSlotId: string,
      petName: string,
      petcustomerUsername: string,
      createdAt: string,
      updatedAt: string,
      owners?: string | null,
      customerId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PetBookingsByBookingCustomerUsernameAndBookingtimeSlotIdQueryVariables = {
  bookingCustomerUsername: string,
  bookingtimeSlotId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPetBookingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PetBookingsByBookingCustomerUsernameAndBookingtimeSlotIdQuery = {
  petBookingsByBookingCustomerUsernameAndBookingtimeSlotId?:  {
    __typename: "ModelPetBookingsConnection",
    items:  Array< {
      __typename: "PetBookings",
      id: string,
      bookingCustomerUsername: string,
      bookingtimeSlotId: string,
      petName: string,
      petcustomerUsername: string,
      createdAt: string,
      updatedAt: string,
      owners?: string | null,
      customerId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PetBookingsByPetNameAndPetcustomerUsernameQueryVariables = {
  petName: string,
  petcustomerUsername?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPetBookingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PetBookingsByPetNameAndPetcustomerUsernameQuery = {
  petBookingsByPetNameAndPetcustomerUsername?:  {
    __typename: "ModelPetBookingsConnection",
    items:  Array< {
      __typename: "PetBookings",
      id: string,
      bookingCustomerUsername: string,
      bookingtimeSlotId: string,
      petName: string,
      petcustomerUsername: string,
      createdAt: string,
      updatedAt: string,
      owners?: string | null,
      customerId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateBookingSubscriptionVariables = {
  filter?: ModelSubscriptionBookingFilterInput | null,
};

export type OnCreateBookingSubscription = {
  onCreateBooking?:  {
    __typename: "Booking",
    id: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerUsername: string,
    owners: Array< string >,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    serviceName: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    serviceId: string,
    startDateTime: string,
    timeSlot:  {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    },
    timeSlotId: string,
    petNames: Array< string >,
    pets?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    addOns?: Array< string > | null,
    bookingType: BookingType,
    amount: number,
    currency: Currency,
    status: BookingStatus,
    createdAt: string,
    updatedAt: string,
    serviceProviderBookingsName?: string | null,
    timeSlotBookingsServiceId?: string | null,
    timeSlotBookingsStartDateTime?: string | null,
  } | null,
};

export type OnUpdateBookingSubscriptionVariables = {
  filter?: ModelSubscriptionBookingFilterInput | null,
};

export type OnUpdateBookingSubscription = {
  onUpdateBooking?:  {
    __typename: "Booking",
    id: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerUsername: string,
    owners: Array< string >,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    serviceName: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    serviceId: string,
    startDateTime: string,
    timeSlot:  {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    },
    timeSlotId: string,
    petNames: Array< string >,
    pets?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    addOns?: Array< string > | null,
    bookingType: BookingType,
    amount: number,
    currency: Currency,
    status: BookingStatus,
    createdAt: string,
    updatedAt: string,
    serviceProviderBookingsName?: string | null,
    timeSlotBookingsServiceId?: string | null,
    timeSlotBookingsStartDateTime?: string | null,
  } | null,
};

export type OnDeleteBookingSubscriptionVariables = {
  filter?: ModelSubscriptionBookingFilterInput | null,
};

export type OnDeleteBookingSubscription = {
  onDeleteBooking?:  {
    __typename: "Booking",
    id: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerUsername: string,
    owners: Array< string >,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    serviceName: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    serviceId: string,
    startDateTime: string,
    timeSlot:  {
      __typename: "TimeSlot",
      id: string,
      serviceId: string,
      startDateTime: string,
      endDateTime?: string | null,
      capacity: number,
      bookingCount: number,
      isFull: boolean,
      bookingIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      serviceProviderId?: string | null,
    },
    timeSlotId: string,
    petNames: Array< string >,
    pets?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    addOns?: Array< string > | null,
    bookingType: BookingType,
    amount: number,
    currency: Currency,
    status: BookingStatus,
    createdAt: string,
    updatedAt: string,
    serviceProviderBookingsName?: string | null,
    timeSlotBookingsServiceId?: string | null,
    timeSlotBookingsStartDateTime?: string | null,
  } | null,
};

export type OnCreateBreedSubscriptionVariables = {
  filter?: ModelSubscriptionBreedFilterInput | null,
};

export type OnCreateBreedSubscription = {
  onCreateBreed?:  {
    __typename: "Breed",
    name: string,
    petType: PetType,
    coats?: Array< Coat > | null,
    undercoatRemoval?: boolean | null,
    durationUnit?: TimeUnit | null,
    basicGroomingDuration?: number | null,
    fullGroomingDuration?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBreedSubscriptionVariables = {
  filter?: ModelSubscriptionBreedFilterInput | null,
};

export type OnUpdateBreedSubscription = {
  onUpdateBreed?:  {
    __typename: "Breed",
    name: string,
    petType: PetType,
    coats?: Array< Coat > | null,
    undercoatRemoval?: boolean | null,
    durationUnit?: TimeUnit | null,
    basicGroomingDuration?: number | null,
    fullGroomingDuration?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBreedSubscriptionVariables = {
  filter?: ModelSubscriptionBreedFilterInput | null,
};

export type OnDeleteBreedSubscription = {
  onDeleteBreed?:  {
    __typename: "Breed",
    name: string,
    petType: PetType,
    coats?: Array< Coat > | null,
    undercoatRemoval?: boolean | null,
    durationUnit?: TimeUnit | null,
    basicGroomingDuration?: number | null,
    fullGroomingDuration?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
  username?: string | null,
};

export type OnCreateCustomerSubscription = {
  onCreateCustomer?:  {
    __typename: "Customer",
    id: string,
    username: string,
    isDeactivated: boolean,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    acceptedDisclaimers?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    pets?:  {
      __typename: "ModelPetConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    payments?:  {
      __typename: "ModelPaymentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
  username?: string | null,
};

export type OnUpdateCustomerSubscription = {
  onUpdateCustomer?:  {
    __typename: "Customer",
    id: string,
    username: string,
    isDeactivated: boolean,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    acceptedDisclaimers?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    pets?:  {
      __typename: "ModelPetConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    payments?:  {
      __typename: "ModelPaymentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCustomerSubscriptionVariables = {
  filter?: ModelSubscriptionCustomerFilterInput | null,
  username?: string | null,
};

export type OnDeleteCustomerSubscription = {
  onDeleteCustomer?:  {
    __typename: "Customer",
    id: string,
    username: string,
    isDeactivated: boolean,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    acceptedDisclaimers?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    pets?:  {
      __typename: "ModelPetConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    orders?:  {
      __typename: "ModelOrderConnection",
      nextToken?: string | null,
    } | null,
    payments?:  {
      __typename: "ModelPaymentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDisclaimerSubscriptionVariables = {
  filter?: ModelSubscriptionDisclaimerFilterInput | null,
};

export type OnCreateDisclaimerSubscription = {
  onCreateDisclaimer?:  {
    __typename: "Disclaimer",
    name: string,
    serviceName?: string | null,
    serviceProviderName?: string | null,
    serviceCategory?: ServiceCategory | null,
    petType?: PetType | null,
    service?:  {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    text?: string | null,
    s3Link?: string | null,
    supersededBy?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    supersessionDate?: string | null,
    customerAcceptances?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDisclaimerSubscriptionVariables = {
  filter?: ModelSubscriptionDisclaimerFilterInput | null,
};

export type OnUpdateDisclaimerSubscription = {
  onUpdateDisclaimer?:  {
    __typename: "Disclaimer",
    name: string,
    serviceName?: string | null,
    serviceProviderName?: string | null,
    serviceCategory?: ServiceCategory | null,
    petType?: PetType | null,
    service?:  {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    text?: string | null,
    s3Link?: string | null,
    supersededBy?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    supersessionDate?: string | null,
    customerAcceptances?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDisclaimerSubscriptionVariables = {
  filter?: ModelSubscriptionDisclaimerFilterInput | null,
};

export type OnDeleteDisclaimerSubscription = {
  onDeleteDisclaimer?:  {
    __typename: "Disclaimer",
    name: string,
    serviceName?: string | null,
    serviceProviderName?: string | null,
    serviceCategory?: ServiceCategory | null,
    petType?: PetType | null,
    service?:  {
      __typename: "Service",
      id: string,
      serviceProviderId: string,
      name: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      defaultDisplay: boolean,
      displayPriority?: number | null,
      onlinePaymentAccepted: boolean,
      currency: Currency,
      basePrice: number,
      baseDuration: number,
      baseDurationUnit: TimeUnit,
      additionalPetPrice?: number | null,
      shortDescription?: string | null,
      longDescription?: string | null,
      imageUrl?: string | null,
      serviceBreakdown?: string | null,
      additionalInfo?: string | null,
      faq?: string | null,
      goodToKnow?: string | null,
      parentServiceIds?: Array< string > | null,
      childServiceIds?: Array< string > | null,
      disclaimerName?: string | null,
      timeSlotIds?: Array< string > | null,
      bookingIds?: Array< string > | null,
      requiredQuestionIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    text?: string | null,
    s3Link?: string | null,
    supersededBy?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    supersessionDate?: string | null,
    customerAcceptances?:  {
      __typename: "ModelDisclaimerAcceptanceConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDisclaimerAcceptanceSubscriptionVariables = {
  filter?: ModelSubscriptionDisclaimerAcceptanceFilterInput | null,
  customerId?: string | null,
};

export type OnCreateDisclaimerAcceptanceSubscription = {
  onCreateDisclaimerAcceptance?:  {
    __typename: "DisclaimerAcceptance",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    disclaimerName: string,
    disclaimer:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDisclaimerAcceptanceSubscriptionVariables = {
  filter?: ModelSubscriptionDisclaimerAcceptanceFilterInput | null,
  customerId?: string | null,
};

export type OnUpdateDisclaimerAcceptanceSubscription = {
  onUpdateDisclaimerAcceptance?:  {
    __typename: "DisclaimerAcceptance",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    disclaimerName: string,
    disclaimer:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDisclaimerAcceptanceSubscriptionVariables = {
  filter?: ModelSubscriptionDisclaimerAcceptanceFilterInput | null,
  customerId?: string | null,
};

export type OnDeleteDisclaimerAcceptanceSubscription = {
  onDeleteDisclaimerAcceptance?:  {
    __typename: "DisclaimerAcceptance",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    disclaimerName: string,
    disclaimer:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
  customerId?: string | null,
};

export type OnCreateOrderSubscription = {
  onCreateOrder?:  {
    __typename: "Order",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    currency: Currency,
    totalAmount: number,
    pendingRefundAmount?: number | null,
    refundedAmount?: number | null,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    paymentRequestId?: string | null,
    status: OrderStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
  customerId?: string | null,
};

export type OnUpdateOrderSubscription = {
  onUpdateOrder?:  {
    __typename: "Order",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    currency: Currency,
    totalAmount: number,
    pendingRefundAmount?: number | null,
    refundedAmount?: number | null,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    paymentRequestId?: string | null,
    status: OrderStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
  customerId?: string | null,
};

export type OnDeleteOrderSubscription = {
  onDeleteOrder?:  {
    __typename: "Order",
    id: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    currency: Currency,
    totalAmount: number,
    pendingRefundAmount?: number | null,
    refundedAmount?: number | null,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    paymentRequestId?: string | null,
    status: OrderStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePaymentSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentFilterInput | null,
  customerId?: string | null,
};

export type OnCreatePaymentSubscription = {
  onCreatePayment?:  {
    __typename: "Payment",
    paymentRequestId: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email?: string | null,
    phone?: string | null,
    amount: number,
    currency: Currency,
    requestCreatedAt: string,
    requestUpdatedAt: string,
    status: PaymentStatus,
    purpose?: string | null,
    referenceNumber?: string | null,
    paymentId?: string | null,
    paymentMethod?: PaymentMethod | null,
    url: string,
    webhookUrl: string,
    redirectUrl?: string | null,
    sendSMS?: boolean | null,
    sendEmail?: boolean | null,
    smsStatus?: boolean | null,
    emailStatus?: boolean | null,
    allowRepeatedPayments?: boolean | null,
    expiryDateTime?: string | null,
    errors?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePaymentSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentFilterInput | null,
  customerId?: string | null,
};

export type OnUpdatePaymentSubscription = {
  onUpdatePayment?:  {
    __typename: "Payment",
    paymentRequestId: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email?: string | null,
    phone?: string | null,
    amount: number,
    currency: Currency,
    requestCreatedAt: string,
    requestUpdatedAt: string,
    status: PaymentStatus,
    purpose?: string | null,
    referenceNumber?: string | null,
    paymentId?: string | null,
    paymentMethod?: PaymentMethod | null,
    url: string,
    webhookUrl: string,
    redirectUrl?: string | null,
    sendSMS?: boolean | null,
    sendEmail?: boolean | null,
    smsStatus?: boolean | null,
    emailStatus?: boolean | null,
    allowRepeatedPayments?: boolean | null,
    expiryDateTime?: string | null,
    errors?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePaymentSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentFilterInput | null,
  customerId?: string | null,
};

export type OnDeletePaymentSubscription = {
  onDeletePayment?:  {
    __typename: "Payment",
    paymentRequestId: string,
    orderId: string,
    order:  {
      __typename: "Order",
      id: string,
      customerId: string,
      currency: Currency,
      totalAmount: number,
      pendingRefundAmount?: number | null,
      refundedAmount?: number | null,
      bookingIds?: Array< string > | null,
      paymentRequestId?: string | null,
      status: OrderStatus,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    name?: string | null,
    email?: string | null,
    phone?: string | null,
    amount: number,
    currency: Currency,
    requestCreatedAt: string,
    requestUpdatedAt: string,
    status: PaymentStatus,
    purpose?: string | null,
    referenceNumber?: string | null,
    paymentId?: string | null,
    paymentMethod?: PaymentMethod | null,
    url: string,
    webhookUrl: string,
    redirectUrl?: string | null,
    sendSMS?: boolean | null,
    sendEmail?: boolean | null,
    smsStatus?: boolean | null,
    emailStatus?: boolean | null,
    allowRepeatedPayments?: boolean | null,
    expiryDateTime?: string | null,
    errors?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePetSubscriptionVariables = {
  filter?: ModelSubscriptionPetFilterInput | null,
  customerId?: string | null,
};

export type OnCreatePetSubscription = {
  onCreatePet?:  {
    __typename: "Pet",
    name: string,
    customerUsername: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    gender: Gender,
    petType: PetType,
    isDeleted: boolean,
    breedName?: string | null,
    imageUrl?: string | null,
    birthdate?: string | null,
    weightValue?: number | null,
    weightUnit?: WeightUnit | null,
    additionalInfo?: string | null,
    predefinedBehaviors?: Array< PredefinedBehavior > | null,
    customBehaviors?: Array< string > | null,
    isNeutered?: boolean | null,
    isMicrochipped?: boolean | null,
    microchipNumber?: string | null,
    hasMedicalCondition?: boolean | null,
    additionalCareInstructions?: string | null,
    bookings?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    questionAnswerIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePetSubscriptionVariables = {
  filter?: ModelSubscriptionPetFilterInput | null,
  customerId?: string | null,
};

export type OnUpdatePetSubscription = {
  onUpdatePet?:  {
    __typename: "Pet",
    name: string,
    customerUsername: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    gender: Gender,
    petType: PetType,
    isDeleted: boolean,
    breedName?: string | null,
    imageUrl?: string | null,
    birthdate?: string | null,
    weightValue?: number | null,
    weightUnit?: WeightUnit | null,
    additionalInfo?: string | null,
    predefinedBehaviors?: Array< PredefinedBehavior > | null,
    customBehaviors?: Array< string > | null,
    isNeutered?: boolean | null,
    isMicrochipped?: boolean | null,
    microchipNumber?: string | null,
    hasMedicalCondition?: boolean | null,
    additionalCareInstructions?: string | null,
    bookings?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    questionAnswerIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePetSubscriptionVariables = {
  filter?: ModelSubscriptionPetFilterInput | null,
  customerId?: string | null,
};

export type OnDeletePetSubscription = {
  onDeletePet?:  {
    __typename: "Pet",
    name: string,
    customerUsername: string,
    customerId: string,
    customer:  {
      __typename: "Customer",
      id: string,
      username: string,
      isDeactivated: boolean,
      imageUrl?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    gender: Gender,
    petType: PetType,
    isDeleted: boolean,
    breedName?: string | null,
    imageUrl?: string | null,
    birthdate?: string | null,
    weightValue?: number | null,
    weightUnit?: WeightUnit | null,
    additionalInfo?: string | null,
    predefinedBehaviors?: Array< PredefinedBehavior > | null,
    customBehaviors?: Array< string > | null,
    isNeutered?: boolean | null,
    isMicrochipped?: boolean | null,
    microchipNumber?: string | null,
    hasMedicalCondition?: boolean | null,
    additionalCareInstructions?: string | null,
    bookings?:  {
      __typename: "ModelPetBookingsConnection",
      nextToken?: string | null,
    } | null,
    questionAnswerIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion?:  {
    __typename: "Question",
    id: string,
    serviceCategory: ServiceCategory,
    questionString: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion?:  {
    __typename: "Question",
    id: string,
    serviceCategory: ServiceCategory,
    questionString: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion?:  {
    __typename: "Question",
    id: string,
    serviceCategory: ServiceCategory,
    questionString: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQuestionAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionAnswerFilterInput | null,
  customerId?: string | null,
};

export type OnCreateQuestionAnswerSubscription = {
  onCreateQuestionAnswer?:  {
    __typename: "QuestionAnswer",
    petName: string,
    customerUsername: string,
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    questionId: string,
    question:  {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    },
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionAnswerFilterInput | null,
  customerId?: string | null,
};

export type OnUpdateQuestionAnswerSubscription = {
  onUpdateQuestionAnswer?:  {
    __typename: "QuestionAnswer",
    petName: string,
    customerUsername: string,
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    questionId: string,
    question:  {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    },
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionAnswerSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionAnswerFilterInput | null,
  customerId?: string | null,
};

export type OnDeleteQuestionAnswerSubscription = {
  onDeleteQuestionAnswer?:  {
    __typename: "QuestionAnswer",
    petName: string,
    customerUsername: string,
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    customerId: string,
    questionId: string,
    question:  {
      __typename: "Question",
      id: string,
      serviceCategory: ServiceCategory,
      questionString: string,
      createdAt: string,
      updatedAt: string,
    },
    answer: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateServiceSubscriptionVariables = {
  filter?: ModelSubscriptionServiceFilterInput | null,
  serviceProviderId?: string | null,
};

export type OnCreateServiceSubscription = {
  onCreateService?:  {
    __typename: "Service",
    id: string,
    serviceProviderId: string,
    name: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    defaultDisplay: boolean,
    displayPriority?: number | null,
    onlinePaymentAccepted: boolean,
    currency: Currency,
    basePrice: number,
    baseDuration: number,
    baseDurationUnit: TimeUnit,
    additionalPetPrice?: number | null,
    additionalTimePrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xsWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    sWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    mWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    lWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xxlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    shortDescription?: string | null,
    longDescription?: string | null,
    imageUrl?: string | null,
    serviceBreakdown?: string | null,
    additionalInfo?: string | null,
    faq?: string | null,
    goodToKnow?: string | null,
    parentServiceIds?: Array< string > | null,
    childServiceIds?: Array< string > | null,
    disclaimerName?: string | null,
    disclaimer?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    timeSlotIds?: Array< string > | null,
    bookingIds?: Array< string > | null,
    requiredQuestionIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateServiceSubscriptionVariables = {
  filter?: ModelSubscriptionServiceFilterInput | null,
  serviceProviderId?: string | null,
};

export type OnUpdateServiceSubscription = {
  onUpdateService?:  {
    __typename: "Service",
    id: string,
    serviceProviderId: string,
    name: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    defaultDisplay: boolean,
    displayPriority?: number | null,
    onlinePaymentAccepted: boolean,
    currency: Currency,
    basePrice: number,
    baseDuration: number,
    baseDurationUnit: TimeUnit,
    additionalPetPrice?: number | null,
    additionalTimePrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xsWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    sWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    mWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    lWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xxlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    shortDescription?: string | null,
    longDescription?: string | null,
    imageUrl?: string | null,
    serviceBreakdown?: string | null,
    additionalInfo?: string | null,
    faq?: string | null,
    goodToKnow?: string | null,
    parentServiceIds?: Array< string > | null,
    childServiceIds?: Array< string > | null,
    disclaimerName?: string | null,
    disclaimer?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    timeSlotIds?: Array< string > | null,
    bookingIds?: Array< string > | null,
    requiredQuestionIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteServiceSubscriptionVariables = {
  filter?: ModelSubscriptionServiceFilterInput | null,
  serviceProviderId?: string | null,
};

export type OnDeleteServiceSubscription = {
  onDeleteService?:  {
    __typename: "Service",
    id: string,
    serviceProviderId: string,
    name: string,
    serviceProviderName: string,
    serviceProvider:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    },
    serviceCategory: ServiceCategory,
    petType: PetType,
    defaultDisplay: boolean,
    displayPriority?: number | null,
    onlinePaymentAccepted: boolean,
    currency: Currency,
    basePrice: number,
    baseDuration: number,
    baseDurationUnit: TimeUnit,
    additionalPetPrice?: number | null,
    additionalTimePrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xsWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    sWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    mWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    lWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    xxlWeightPrice?:  {
      __typename: "CustomPrice",
      additionalDuration?: number | null,
      additionalDurationUnit?: TimeUnit | null,
      minWeight?: number | null,
      maxWeight?: number | null,
      weightUnit?: WeightUnit | null,
      amount: number,
    } | null,
    shortDescription?: string | null,
    longDescription?: string | null,
    imageUrl?: string | null,
    serviceBreakdown?: string | null,
    additionalInfo?: string | null,
    faq?: string | null,
    goodToKnow?: string | null,
    parentServiceIds?: Array< string > | null,
    childServiceIds?: Array< string > | null,
    disclaimerName?: string | null,
    disclaimer?:  {
      __typename: "Disclaimer",
      name: string,
      serviceName?: string | null,
      serviceProviderName?: string | null,
      serviceCategory?: ServiceCategory | null,
      petType?: PetType | null,
      text?: string | null,
      s3Link?: string | null,
      supersessionDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    timeSlotIds?: Array< string > | null,
    bookingIds?: Array< string > | null,
    requiredQuestionIds?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateServiceProviderSubscriptionVariables = {
  filter?: ModelSubscriptionServiceProviderFilterInput | null,
  id?: string | null,
};

export type OnCreateServiceProviderSubscription = {
  onCreateServiceProvider?:  {
    __typename: "ServiceProvider",
    id: string,
    name: string,
    displayName?: string | null,
    description?: string | null,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    website?: string | null,
    email?: string | null,
    phone?: string | null,
    operatingTimes:  Array< {
      __typename: "TimeInterval",
      dayOfWeek: number,
      openTime: string,
      closeTime: string,
    } >,
    isHeadquarters: boolean,
    headquarters?:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null,
    services?:  {
      __typename: "ModelServiceConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderHeadquartersName?: string | null,
  } | null,
};

export type OnUpdateServiceProviderSubscriptionVariables = {
  filter?: ModelSubscriptionServiceProviderFilterInput | null,
  id?: string | null,
};

export type OnUpdateServiceProviderSubscription = {
  onUpdateServiceProvider?:  {
    __typename: "ServiceProvider",
    id: string,
    name: string,
    displayName?: string | null,
    description?: string | null,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    website?: string | null,
    email?: string | null,
    phone?: string | null,
    operatingTimes:  Array< {
      __typename: "TimeInterval",
      dayOfWeek: number,
      openTime: string,
      closeTime: string,
    } >,
    isHeadquarters: boolean,
    headquarters?:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null,
    services?:  {
      __typename: "ModelServiceConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderHeadquartersName?: string | null,
  } | null,
};

export type OnDeleteServiceProviderSubscriptionVariables = {
  filter?: ModelSubscriptionServiceProviderFilterInput | null,
  id?: string | null,
};

export type OnDeleteServiceProviderSubscription = {
  onDeleteServiceProvider?:  {
    __typename: "ServiceProvider",
    id: string,
    name: string,
    displayName?: string | null,
    description?: string | null,
    imageUrl?: string | null,
    address?:  {
      __typename: "Address",
      blockNumber?: string | null,
      streetName: string,
      unitNumber?: string | null,
      postalCode: string,
    } | null,
    website?: string | null,
    email?: string | null,
    phone?: string | null,
    operatingTimes:  Array< {
      __typename: "TimeInterval",
      dayOfWeek: number,
      openTime: string,
      closeTime: string,
    } >,
    isHeadquarters: boolean,
    headquarters?:  {
      __typename: "ServiceProvider",
      id: string,
      name: string,
      displayName?: string | null,
      description?: string | null,
      imageUrl?: string | null,
      website?: string | null,
      email?: string | null,
      phone?: string | null,
      isHeadquarters: boolean,
      createdAt: string,
      updatedAt: string,
      serviceProviderHeadquartersName?: string | null,
    } | null,
    services?:  {
      __typename: "ModelServiceConnection",
      nextToken?: string | null,
    } | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderHeadquartersName?: string | null,
  } | null,
};

export type OnCreateTimeSlotSubscriptionVariables = {
  filter?: ModelSubscriptionTimeSlotFilterInput | null,
  serviceProviderId?: string | null,
};

export type OnCreateTimeSlotSubscription = {
  onCreateTimeSlot?:  {
    __typename: "TimeSlot",
    id: string,
    serviceId: string,
    startDateTime: string,
    endDateTime?: string | null,
    capacity: number,
    bookingCount: number,
    isFull: boolean,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderId?: string | null,
  } | null,
};

export type OnUpdateTimeSlotSubscriptionVariables = {
  filter?: ModelSubscriptionTimeSlotFilterInput | null,
  serviceProviderId?: string | null,
};

export type OnUpdateTimeSlotSubscription = {
  onUpdateTimeSlot?:  {
    __typename: "TimeSlot",
    id: string,
    serviceId: string,
    startDateTime: string,
    endDateTime?: string | null,
    capacity: number,
    bookingCount: number,
    isFull: boolean,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderId?: string | null,
  } | null,
};

export type OnDeleteTimeSlotSubscriptionVariables = {
  filter?: ModelSubscriptionTimeSlotFilterInput | null,
  serviceProviderId?: string | null,
};

export type OnDeleteTimeSlotSubscription = {
  onDeleteTimeSlot?:  {
    __typename: "TimeSlot",
    id: string,
    serviceId: string,
    startDateTime: string,
    endDateTime?: string | null,
    capacity: number,
    bookingCount: number,
    isFull: boolean,
    bookingIds?: Array< string > | null,
    bookings?:  {
      __typename: "ModelBookingConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    serviceProviderId?: string | null,
  } | null,
};

export type OnCreatePetBookingsSubscriptionVariables = {
  filter?: ModelSubscriptionPetBookingsFilterInput | null,
  owners?: string | null,
  customerId?: string | null,
};

export type OnCreatePetBookingsSubscription = {
  onCreatePetBookings?:  {
    __typename: "PetBookings",
    id: string,
    bookingCustomerUsername: string,
    bookingtimeSlotId: string,
    petName: string,
    petcustomerUsername: string,
    booking:  {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    },
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owners?: string | null,
    customerId?: string | null,
  } | null,
};

export type OnUpdatePetBookingsSubscriptionVariables = {
  filter?: ModelSubscriptionPetBookingsFilterInput | null,
  owners?: string | null,
  customerId?: string | null,
};

export type OnUpdatePetBookingsSubscription = {
  onUpdatePetBookings?:  {
    __typename: "PetBookings",
    id: string,
    bookingCustomerUsername: string,
    bookingtimeSlotId: string,
    petName: string,
    petcustomerUsername: string,
    booking:  {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    },
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owners?: string | null,
    customerId?: string | null,
  } | null,
};

export type OnDeletePetBookingsSubscriptionVariables = {
  filter?: ModelSubscriptionPetBookingsFilterInput | null,
  owners?: string | null,
  customerId?: string | null,
};

export type OnDeletePetBookingsSubscription = {
  onDeletePetBookings?:  {
    __typename: "PetBookings",
    id: string,
    bookingCustomerUsername: string,
    bookingtimeSlotId: string,
    petName: string,
    petcustomerUsername: string,
    booking:  {
      __typename: "Booking",
      id: string,
      orderId: string,
      customerUsername: string,
      owners: Array< string >,
      customerId: string,
      serviceName: string,
      serviceProviderName: string,
      serviceCategory: ServiceCategory,
      petType: PetType,
      serviceId: string,
      startDateTime: string,
      timeSlotId: string,
      petNames: Array< string >,
      addOns?: Array< string > | null,
      bookingType: BookingType,
      amount: number,
      currency: Currency,
      status: BookingStatus,
      createdAt: string,
      updatedAt: string,
      serviceProviderBookingsName?: string | null,
      timeSlotBookingsServiceId?: string | null,
      timeSlotBookingsStartDateTime?: string | null,
    },
    pet:  {
      __typename: "Pet",
      name: string,
      customerUsername: string,
      customerId: string,
      gender: Gender,
      petType: PetType,
      isDeleted: boolean,
      breedName?: string | null,
      imageUrl?: string | null,
      birthdate?: string | null,
      weightValue?: number | null,
      weightUnit?: WeightUnit | null,
      additionalInfo?: string | null,
      predefinedBehaviors?: Array< PredefinedBehavior > | null,
      customBehaviors?: Array< string > | null,
      isNeutered?: boolean | null,
      isMicrochipped?: boolean | null,
      microchipNumber?: string | null,
      hasMedicalCondition?: boolean | null,
      additionalCareInstructions?: string | null,
      questionAnswerIds?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owners?: string | null,
    customerId?: string | null,
  } | null,
};
