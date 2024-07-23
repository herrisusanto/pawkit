import { Currency, Order, Pet, ServiceCategory } from "@/api/graphql/API";
import { addOrder, fetchOrder } from "@/api/order";
import { createPaymentRequest } from "@/api/payment";
import {
  fetchPetQuestionAnswersForService,
  fetchPetsByCustomer,
} from "@/api/pet";
import { DatePickerSheet } from "@/components/common/DatePickerSheet/DatePickerSheet";
import { Header } from "@/components/common/Header/Header";
import { RadioButton } from "@/components/common/RadioButton/RadioButton";
import { TextArea } from "@/components/common/TextArea/TextArea";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import { useMemo, useState, useRef } from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { Alert, TouchableOpacity } from "react-native";
import { getToken, ScrollView, Text, View, XStack, YStack } from "tamagui";
import { serviceBookingAtom } from "@/atoms/service-booking/state.atom";

export default function RequiredQuestions() {
  const router = useRouter();
  const { serviceName } = useLocalSearchParams();
  const { control, handleSubmit, watch, formState } = useFormContext();
  const { isSubmitting } = formState;
  const watchVaccinated = watch("vaccinated", "false");
  const address = watch("address", "");
  const priceDetailsRef = useRef<PriceDetailsSheetRef>({ estimatedPrice: 0 });
  const { data: user } = useCurrentUser();
  const userAttributes = useUserAttributes();
  const serviceAtom = useServiceBookingAtom(serviceName as string);
  const selectedPetsServices = useAtomValue(serviceAtom);
  const [serviceBookingState, setServiceBooking] = useAtom(serviceBookingAtom);
  const { orderId } = serviceBookingState;
  const [selectedPetService, setSelectedPetService] =
    useState<SelectedPetServiceType>(selectedPetsServices[0]);
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
  // eslint-disable-next-line
  const { data: questions } = useQuery({
    queryKey: ["essential-questions", user?.userId],
    queryFn: () =>
      fetchPetQuestionAnswersForService(
        selectedPetService.serviceId as string,
        selectedPet?.id as string
      ),
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
      const paymentRequest = await mutationCreatePaymentRequest.mutateAsync({
        customerId: user?.userId as string,
        orderId: fetchedOrder?.id as string,
        input: {
          amount: priceDetailsRef.current.estimatedPrice,
          currency: fetchedOrder?.currency as Currency,
          name: user?.userId as string,
          phone: userAttributes?.phone_number as string,
          purpose: "Service Booking",
          redirectUrl: "https://blank.org",
        },
      });
      router.push(
        `/service-booking/${serviceName}/hitpay-checkout?amount=${paymentRequest.payment?.amount}&url=${paymentRequest.url}`
      );
    } catch (error) {
      Alert.alert("Couldn't continue the booking");
      console.log(error);
    }
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

  const renderVaccinatedQuestion = () => (
    <YStack rowGap="$1.5">
      <Text>Has your pet/pets been vaccinated?</Text>
      <XStack columnGap="$4">
        <RadioButton
          flex={1}
          control={control}
          name="vaccinated"
          value="true"
          jc="center"
        >
          Yes
        </RadioButton>
        <RadioButton
          flex={1}
          control={control}
          name="vaccinated"
          value="false"
          jc="center"
        >
          No
        </RadioButton>
      </XStack>
    </YStack>
  );

  const renderGroomedQuestion = () => (
    <>
      <YStack rowGap="$1.5">
        <Text>Has your pet/pets been professionally groomed?</Text>
        <XStack columnGap="$4">
          <RadioButton
            flex={1}
            control={control}
            name="groomed"
            value="true"
            jc="center"
          >
            Yes
          </RadioButton>
          <RadioButton
            flex={1}
            control={control}
            name="groomed"
            value="false"
            jc="center"
          >
            No
          </RadioButton>
        </XStack>
      </YStack>
      <YStack rowGap="$1.5">
        <Text>
          Does your pet have history of snapping/scratching towards non-family
          members?
        </Text>
        <XStack columnGap="$4">
          <RadioButton
            flex={1}
            control={control}
            name="snapped"
            value="true"
            jc="center"
          >
            Yes
          </RadioButton>
          <RadioButton
            flex={1}
            control={control}
            name="snapped"
            value="false"
            jc="center"
          >
            No
          </RadioButton>
        </XStack>
      </YStack>
    </>
  );
  const generateEssentialServiceQuestion = (category?: ServiceCategory) => {
    switch (category) {
      case "GROOMING":
        return renderGroomedQuestion();
      case "VACCINATION":
        return renderVaccinatedQuestion();
      default:
        return undefined;
    }
  };
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
                {generateEssentialServiceQuestion(
                  selectedPetService.service?.serviceCategory
                )}
                {/** Another Question */}
                {watchVaccinated === "true" && (
                  <DatePickerSheet
                    control={control}
                    disabledDates="after"
                    name="vaccinated_date"
                    label="If yes, when was the last vaccination?"
                  />
                )}
                {/** Another Question */}
                <TextArea
                  textAlignVertical="top"
                  control={control}
                  name="description"
                  label="Does your pet have any existing medical conditions or allergies that we should be aware of? (optional)"
                  labelProps={{ maxWidth: 327 }}
                />
              </YStack>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
      <PriceDetailsSheet
        ref={priceDetailsRef}
        serviceName={serviceName as string}
        loading={isSubmitting}
        onOk={handleSubmit(submit)}
      />
    </>
  );
}
