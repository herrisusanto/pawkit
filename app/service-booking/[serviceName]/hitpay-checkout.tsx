import { BookingType, Service, TimeSlot } from "@/api/graphql/API";
import { addBooking, AddBookingInput } from "@/api/service-booking";
import { serviceBookingAtom } from "@/atoms/service-booking/state.atom";
import { Button } from "@/components/common/Button/Button";
import { Header } from "@/components/common/Header/Header";
import TickCircleIcon from "@/components/common/Icons/TickCircleIcon";
import { Modal } from "@/components/common/Modal/Modal";
import { images } from "@/constants";
import { useCurrentUser, useServiceBookingAtom } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import WebView from "react-native-webview";
import { Image, Text, View, YStack } from "tamagui";

const HitpayCheckout = () => {
  const { data: user } = useCurrentUser();
  const { serviceName } = useLocalSearchParams();
  const webViewRef = useRef<WebView>(null);
  const { watch } = useFormContext();
  const address = watch("address");
  const name = watch("name");
  const [showCompleted, setShowCompleted] = useState(false);
  const [showError, setShowError] = useState(false);
  const serviceAtom = useServiceBookingAtom(serviceName as string);
  const [serviceBookingState, setServiceBooking] = useAtom(serviceBookingAtom);
  const { orderId } = serviceBookingState;
  const [selectedPetsServices, setSelectedPetsServices] = useAtom(serviceAtom);
  const { url, amount } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutationAddBooking = useMutation({
    mutationFn: addBooking,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["time_slots"] });
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header title="Checkout" />,
        }}
      />
      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        source={{ uri: url as string }}
        onNavigationStateChange={async (state) => {
          if (state.url.includes("&status=completed")) {
            webViewRef.current?.stopLoading();
            for (const petService of selectedPetsServices) {
              const service = petService.service as Service;
              const petId = petService?.petId as string;
              const timeSlot = petService?.timeSlot as TimeSlot;
              const input: AddBookingInput = {
                currency: service.currency,
                amount: Number(amount),
                bookingType: BookingType.PAID,
                customerId: user?.userId as string,
                serviceId: service.id,
                addOns: petService.addons,
                startDateTime: timeSlot.startDateTime,
                orderId: orderId as string,
                customerUsername: name,
                petIds: [petId],
                address,
              };
              mutationAddBooking.mutate(input);
            }
            setSelectedPetsServices([]);
            setShowCompleted(true);
            setServiceBooking({});
          } else if (state.url.includes("&status=failed")) {
            webViewRef.current?.stopLoading();
            setShowError(true);
          }
        }}
      />
      <View>
        <Modal
          open={showCompleted || showError}
          contentProps={{ bg: "$colorTransparent", px: "$10" }}
        >
          <YStack
            jc="center"
            ai="center"
            bg="white"
            p="$5"
            pb="$3.5"
            w="$full"
            rowGap="$4.5"
            br="$6"
          >
            {showCompleted ? (
              <TickCircleIcon />
            ) : (
              <Image src={images.failed} h={80} w={80} />
            )}
            <YStack ai="center">
              <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
                {showCompleted ? "Congratulations!" : "Uh Oh!"}
              </Text>
              <Text
                fontSize="$c1"
                fontWeight="$6"
                color="$textPrimary"
                textAlign="center"
              >
                {showCompleted
                  ? "Your payment has been confirmed"
                  : "It seems there’s a problem in the payment process"}
              </Text>
            </YStack>
            {showCompleted && (
              <Button
                type="primary"
                h="$4"
                w="$full"
                onPress={() => {
                  setShowCompleted(false);
                  setTimeout(() => {
                    router.replace("/booking");
                  }, 0);
                }}
              >
                See My Bookings
              </Button>
            )}
            {showError && (
              <Button
                type="primary"
                h="$4"
                w="$full"
                onPress={() => {
                  setShowError(false);
                  setTimeout(() => {
                    router.replace(
                      `/service-booking/${serviceName}/hitpay-checkout?amount=${amount}&url=${url}`
                    );
                  }, 0);
                }}
              >
                Try Again
              </Button>
            )}
          </YStack>
        </Modal>
      </View>
    </>
  );
};

export default HitpayCheckout;
