import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "tamagui";

export default function MyPetLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View flex={1} pt={insets.top} bg="#fff">
      <Stack />
    </View>
  );
}
