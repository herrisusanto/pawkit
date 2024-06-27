import { Header } from "@/components/common/Header/Header";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "tamagui";

export default function BookingsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View flex={1} pt={insets.top} bg="#fff">
      <Stack
        screenOptions={{
          header() {
            return <Header title="Booking Details" />;
          },
        }}
      />
    </View>
  );
}
