import {
  BookingType,
  Currency,
  Order,
  Pet,
  Question,
  Service,
  TimeSlot,
} from "@/api/graphql/API";
import { addOrder, fetchOrder } from "@/api/order";
import { createPaymentRequest } from "@/api/payment";
import {
  addQuestionAnswer,
  fetchPetsByCustomer,
  fetchQuestionsByService,
} from "@/api/pet";
import { Header } from "@/components/common/Header/Header";
import {
  PriceDetailsSheet,
  PriceDetailsSheetRef,
} from "@/components/price-details-sheet/PriceDetailsSheet";
import { StepsIndicator } from "@/components/service-booking/steps-indicator/StepsIndicator";
import { PetAvatar } from "@/components/services/pet-avatar/PetAvatar";
import {
  useCurrentUser,
  useServiceBookingAtom,
  useUserAttributes,
} from "@/hooks";
import { SelectedPetServiceType } from "@/types/services/selected-pet-service.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import moment from "moment";
import { useMemo, useState, useRef } from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { getToken, ScrollView, Text, View, XStack, YStack } from "tamagui";
import { serviceBookingAtom } from "@/atoms/service-booking/state.atom";
import _ from "lodash";
import { QuestionAnswer } from "@/components/service-booking/question-answer/QuestionAnswer";
import PopupController from "@/components/common/GlobalPopupError/PopUpController";
import { addBooking, AddBookingInput } from "@/api/service-booking";
import { BookingConfirmedSheet } from "@/components/services/booking-confirmed-sheet";

const ONLINE_PAYMENT_SERVICES = ["vaccination", "grooming"];

export default function RequiredQuestions() {
  const router = useRouter();
  const { serviceName } = useLocalSearchParams();
  const { control, handleSubmit, watch, formState } = useFormContext();
  const { isSubmitting } = formState;
  const name = watch("name");
  const address = watch("address", "");
  const priceDetailsRef = useRef<PriceDetailsSheetRef>({ estimatedPrice: 0 });
  const { data: user } = useCurrentUser();
  const [bookingConfirmedOpen, setBookingConfirmedOpen] =
    useState<boolean>(false);
  const userAttributes = useUserAttributes();
  const serviceAtom = useServiceBookingAtom(serviceName as string);
  const [selectedPetsServices, setSelectedPetsServices] = useAtom(serviceAtom);
  const [serviceBookingState, setServiceBooking] = useAtom(serviceBookingAtom);
  const { orderId } = serviceBookingState;
  const [selectedPetService, setSelectedPetService] =
    useState<SelectedPetServiceType>(selectedPetsServices[0]);
  const queryClient = useQueryClient();
  const { data: pets } = useQuery({
    queryKey: ["pets", user?.userId],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    enabled: !!user && !!selectedPetService,
  });
  const selectedPet = useMemo(() => {
    return pets?.find((pet) => pet.id === selectedPetService.petId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPetService, pets]);

  const mutationFetchOrder = useMutation({ mutationFn: fetchOrder });
  const mutationCreateOrder = useMutation({
    mutationFn: ({
      customerId,
      currency,
    }: {
      customerId: string;
      currency: Currency;
    }) => addOrder(customerId, currency),
  });

  const mutationCreatePaymentRequest = useMutation({
    mutationFn: createPaymentRequest,
  });
  const mutationAddBooking = useMutation({
    mutationFn: addBooking,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["time_slots"] });
    },
  });
  const { data: questionsByService, isFetched: questionsFetched } = useQuery({
    queryKey: [
      "essential-questions",
      user?.userId,
      selectedPetService.serviceId,
    ],
    queryFn: () =>
      fetchQuestionsByService(selectedPetService.serviceId as string),
    enabled: !!user && !!selectedPetService,
  });

  const submit: SubmitHandler<FieldValues> = async (values) => {
    try {
      let fetchedOrder: Order;
      if (!orderId) {
        const order = await mutationCreateOrder.mutateAsync({
          currency: Currency.SGD,
          customerId: user?.userId as string,
        });
        setServiceBooking({ orderId: order.id });
        fetchedOrder = (await mutationFetchOrder.mutateAsync(
          order.id
        )) as Order;
      } else {
        fetchedOrder = (await mutationFetchOrder.mutateAsync(orderId)) as Order;
      }

      const questionFields = _.omit(values, [
        "address",
        "email",
        "name",
        "phone_number",
      ]);

      const questionAnswerKeys = Object.keys(questionFields).filter(
        (field) => !field.includes("undefined")
      );

      // eslint-disable-next-line
      questionAnswerKeys.map(async (key) => {
        const petId = key.split("_")[0];
        const questionId = key.split("_")[1];
        const answer = questionFields[key];
        const questionAnswerRequest = await addQuestionAnswer(
          petId,
          questionId,
          answer
        );
        return questionAnswerRequest;
      });

      if (ONLINE_PAYMENT_SERVICES.includes(serviceName as string)) {
        await handleCreatePayment({ order: fetchedOrder });
      } else {
        await handleCreateBooking({ order: fetchedOrder });
      }
      // eslint-disable-next-line
    } catch (error) {
      PopupController.showGlobalPopup();
    }
  };

  const handleCreatePayment = async ({ order }: { order?: Order }) => {
    const paymentRequest = await mutationCreatePaymentRequest.mutateAsync({
      customerId: user?.userId as string,
      orderId: order?.id as string,
      input: {
        amount: priceDetailsRef.current.estimatedPrice,
        currency: order?.currency as Currency,
        name,
        phone: userAttributes?.phone_number as string,
        purpose: "Service Booking",
        redirectUrl: "https://blank.org",
      },
    });
    router.push(
      `/service-booking/${serviceName}/hitpay-checkout?amount=${paymentRequest.payment?.amount}&url=${paymentRequest.url}`
    );
  };

  const handleCreateBooking = async ({ order }: { order?: Order }) => {
    try {
      for (const petService of selectedPetsServices) {
        const service = petService.service as Service;
        const petId = petService?.petId as string;
        const timeSlot = petService?.timeSlot as TimeSlot;
        const input: AddBookingInput = {
          currency: service.currency,
          amount: priceDetailsRef.current.estimatedPrice,
          bookingType: BookingType.PAID,
          customerId: user?.userId as string,
          serviceId: service.id,
          addOns: petService.addons,
          startDateTime: timeSlot.startDateTime,
          orderId: order?.id as string,
          customerUsername: name,
          petIds: [petId],
          address,
        };
        await mutationAddBooking.mutateAsync(input);
        await queryClient.invalidateQueries({
          queryKey: ["bookings", user?.userId],
        });
        setBookingConfirmedOpen(true);
        setSelectedPetsServices([]);
        setServiceBooking({});
      }
    } catch (error) {
      console.log(error);
      PopupController.showGlobalPopup();
    }
  };

  const handleBookingConfirmedClose = () => {
    setBookingConfirmedOpen(false);
    router.replace("/home");
  };

  const renderSelectedPets = () => (
    <>
      <Text fontSize="$b1" fontWeight="$5">
        Selected Pet(s)
      </Text>
      <XStack fw="wrap" columnGap="$5" rowGap="$4">
        {selectedPetsServices?.map((item) => {
          const pet = pets?.find((pet) => pet.id === item.petId);
          return (
            <TouchableOpacity
              key={item.petId}
              onPress={() => {
                setSelectedPetService(item);
              }}
            >
              <PetAvatar
                data={pet as Pet}
                isSelected={item.petId === selectedPetService?.petId}
              />
            </TouchableOpacity>
          );
        })}
      </XStack>
    </>
  );

  const petBirthdateInMonths = moment().diff(
    moment(selectedPet?.birthdate),
    "months"
  );
  const petYearsOld = (petBirthdateInMonths / 12).toFixed();

  return (
    <>
      <Stack.Screen
        options={{
          header() {
            return (
              <Header title="Essential Questions" disableBack={isSubmitting} />
            );
          },
        }}
      />
      <ScrollView
        bg="$accent0"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
      >
        <YStack rowGap="$5" pb={99 + getToken("$5", "space")}>
          <YStack rowGap="$2">
            {/** Steps Indicator */}
            <StepsIndicator currentStep={2} />
            {/** Information */}
            <YStack p="$5" rowGap="$5" bg="#fff">
              {/** Owner's Details */}
              <YStack rowGap="$3.5">
                <Text fontSize="$b3" fontWeight="$6">
                  Owner's Details
                </Text>
                <YStack>
                  <XStack>
                    <View w="$10">
                      <Text>Name</Text>
                    </View>
                    <Text>: {userAttributes?.name}</Text>
                  </XStack>
                  <XStack>
                    <View w="$10">
                      <Text>Phone Number</Text>
                    </View>
                    <Text>: {userAttributes?.phone_number}</Text>
                  </XStack>
                  <XStack>
                    <View w="$10">
                      <Text>Email</Text>
                    </View>
                    <Text>: {userAttributes?.email}</Text>
                  </XStack>
                  <XStack>
                    <View w="$10">
                      <Text>Home Address</Text>
                    </View>
                    <Text>: {address}</Text>
                  </XStack>
                </YStack>
              </YStack>
              {/** Selected Pets */}
              <YStack rowGap="$5">{renderSelectedPets()}</YStack>
              {/** Required Questions */}
              <YStack rowGap="$3.5">
                <Text fontSize="$b3" fontWeight="$6">
                  Essential Questions
                </Text>
                <YStack>
                  <XStack>
                    <View w="$10">
                      <Text>Name</Text>
                    </View>
                    <Text>: {selectedPet?.name}</Text>
                  </XStack>
                  <XStack>
                    <View w="$10">
                      <Text>Breed</Text>
                    </View>
                    <Text>: {selectedPet?.breedName}</Text>
                  </XStack>
                  <XStack>
                    <View w="$10">
                      <Text>Age</Text>
                    </View>
                    <Text>: {petYearsOld} years old</Text>
                  </XStack>
                  <XStack>
                    <View w="$10">
                      <Text>Gender</Text>
                    </View>
                    <Text>: {selectedPet?.gender}</Text>
                  </XStack>
                </YStack>
                {questionsFetched &&
                  questionsByService?.map((question) => (
                    <QuestionAnswer
                      key={question?.id}
                      question={question as Question}
                      control={control}
                      name={`${selectedPet?.id}_${question?.id}`}
                    />
                  ))}
              </YStack>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
      <BookingConfirmedSheet
        open={bookingConfirmedOpen}
        onClose={handleBookingConfirmedClose}
      />
      <PriceDetailsSheet
        ref={priceDetailsRef}
        serviceName={serviceName as string}
        loading={isSubmitting}
        okText="Confirm"
        onOk={handleSubmit(submit)}
      />
    </>
  );
}
