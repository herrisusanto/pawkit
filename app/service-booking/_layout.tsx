import { Header } from "@/components/common/Header/Header";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "tamagui";

export default function () {
  const insets = useSafeAreaInsets();
  const form = useForm({ mode: "onBlur" });

  return (
    <View flex={1} pt={insets.top} bg="#fff">
      <FormProvider {...form}>
        <Stack
          screenOptions={{
            header() {
              return <Header title="Select Vaccination" />;
            },
          }}
        />
      </FormProvider>
    </View>
  );
}
