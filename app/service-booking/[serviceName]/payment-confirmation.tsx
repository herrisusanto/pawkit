import { Header } from "@/components/common/Header/Header";
import { PriceDetailsSheet } from "@/components/price-details-sheet/PriceDetailsSheet";
import PaymentOption from "@/components/service-booking/payment-option/PaymentOption";
import { StepsIndicator } from "@/components/service-booking/steps-indicator/StepsIndicator";
import { Link, Stack } from "expo-router";
import moment, { Moment } from "moment";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, Text, View, XStack, YStack } from "tamagui";

const PaymentConfirmation = () => {
  const [timer, setTimer] = useState<Moment>(moment());
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const paymentTimer = moment().add(24, "hour");

    if (paymentTimer.diff(moment(), "second") > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(moment(paymentTimer).subtract(1, "second"));

        if (paymentTimer.diff(moment(), "second") === 0) {
          clearInterval(intervalRef.current);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remainingTime = moment.duration(timer.diff(moment()), "milliseconds");

  const remainingHours =
    remainingTime.hours().toString().length === 1
      ? "0" + remainingTime.hours()
      : remainingTime.hours();
  const remainingMinutes =
    remainingTime.minutes().toString().length === 1
      ? "0" + remainingTime.minutes()
      : remainingTime.minutes();
  const remainingSeconds =
    remainingTime.seconds().toString().length === 1
      ? "0" + remainingTime.seconds()
      : remainingTime.seconds();

  return (
    <>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Payment Confirmation" />;
          },
        }}
      />

      <ScrollView bg="$accent0" showsVerticalScrollIndicator={false}>
        <YStack flex={1} rowGap="$5">
          <YStack rowGap="$2">
            <StepsIndicator
              currentStep={4}
              steps={["Details", "Vaccine", "Review", "Payment"]}
              containerProps={{ columnGap: "$3.5" }}
            />
            {/** Countdown */}
            <YStack bg="#fff" rowGap="$2.5" py="$3.5">
              <XStack columnGap="$2" ai="center" jc="center">
                <Text fontSize="$c2" fontWeight="$6" color="$primary">
                  Complete payment in
                </Text>
                <XStack ai="center" columnGap="$1">
                  <View
                    bg="$primary"
                    w={22}
                    h={22}
                    jc="center"
                    px="$1.5"
                    br="$2"
                  >
                    <Text
                      fontSize="$c2"
                      fontWeight="$6"
                      color="#fff"
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {remainingHours}
                    </Text>
                  </View>
                  <Text fontSize="$c2" fontWeight="$5" color="$primary">
                    :
                  </Text>
                  <View
                    bg="$primary"
                    w={22}
                    h={22}
                    px="$1.5"
                    jc="center"
                    br="$2"
                  >
                    <Text
                      fontSize="$c2"
                      fontWeight="$6"
                      color="#fff"
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {remainingMinutes}
                    </Text>
                  </View>
                  <Text fontSize="$c2" fontWeight="$5" color="$primary">
                    :
                  </Text>
                  <View
                    bg="$primary"
                    w={22}
                    h={22}
                    px="$1.5"
                    jc="center"
                    br="$2"
                  >
                    <Text
                      fontSize="$c2"
                      fontWeight="$6"
                      color="#fff"
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {remainingSeconds}
                    </Text>
                  </View>
                </XStack>
              </XStack>
              <Text fontSize="$c1" fontWeight="$4" textAlign="center">
                Confirm payment, by sending proof of payment
              </Text>
            </YStack>
            {/** END of Countdown */}
            {/** Change Payment Method */}
            <XStack bg="#fff" jc="space-between" py="$3.5" px="$5">
              <Text fontWeight="$5">Payment Method</Text>
              <Link href="/service-booking/1/change-payment-method" asChild>
                <TouchableOpacity>
                  <Text color="$primary" fontWeight="$5">
                    Change
                  </Text>
                </TouchableOpacity>
              </Link>
            </XStack>
            {/** Payment Method */}
            <YStack bg="#fff" py="$3.5" px="$5">
              <PaymentOption
                key="PAYNOW_QR_CODE"
                value="PAYNOW_QR_CODE"
                checked
              />
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
      <PriceDetailsSheet
        // NOTE: empty service name to prevent error
        serviceName=""
        title="Total price"
        onOk={() => {
          console.log("meong");
        }}
      />
    </>
  );
};

export default PaymentConfirmation;
