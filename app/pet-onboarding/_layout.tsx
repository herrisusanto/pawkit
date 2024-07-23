import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "tamagui";

export default function PetOnboardingLayout() {
  const insets = useSafeAreaInsets();
  const form = useForm({
    mode: "all",
    defaultValues: { birthdate: null, breedName: "", image: null },
  });

  return (
    <View flex={1} pt={insets.top} bg="#fff">
      <FormProvider {...form}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#fff" },
          }}
        />
      </FormProvider>
    </View>
  );
}
