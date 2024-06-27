import { Button } from "@/components/common/Button/Button";
import { Header } from "@/components/common/Header/Header";
import TickCircleIcon from "@/components/common/Icons/TickCircleIcon";
import { Modal } from "@/components/common/Modal/Modal";
import { images } from "@/constants";
import { useServiceBookingAtom } from "@/hooks";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import WebView from "react-native-webview";
import { Image, Text, View, YStack } from "tamagui";

const HitpayCheckout = () => {
  const { serviceName } = useLocalSearchParams();
  const webViewRef = useRef<WebView>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showError, setShowError] = useState(false);
  const serviceAtom = useServiceBookingAtom(serviceName as string);
  const setSelectedPetsServices = useSetAtom(serviceAtom);
  const { url } = useLocalSearchParams();
  const router = useRouter();

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
        onNavigationStateChange={(state) => {
          if (state.url.includes("&status=completed")) {
            webViewRef.current?.stopLoading();
            setSelectedPetsServices([]);
            setShowCompleted(true);
          } else if (state.url.includes("&status=failed")) {
            webViewRef.current?.stopLoading();
            setSelectedPetsServices([]);
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
                  ? "Your order have been paid"
                  : "It seems there’s a problem in the payment process"}
              </Text>
            </YStack>
            <Button
              type="primary"
              h="$4"
              w="$full"
              onPress={() => {
                setShowCompleted(false);
                setShowError(false);
                setTimeout(() => {
                  router.replace("/booking");
                }, 0);
              }}
            >
              See My Bookings
            </Button>
          </YStack>
        </Modal>
      </View>
    </>
  );
};

export default HitpayCheckout;
