import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { Container } from "@/components/common/Container/Container";
import { YStack, View, Text } from "tamagui";
import { DatePicker } from "@/components/common/DatePicker/DatePicker";
import { Input } from "@/components/common/Input/Input";
import { useForm } from "react-hook-form";
import { ImagePlus } from "@tamagui/lucide-icons";
import { Button } from "@/components/common/Button/Button";

const UpdateVaccineHistoryItem = () => {
  const { id } = useLocalSearchParams();
  const form = useForm({
    mode: "onBlur",
  });

  const { control } = form;

  const slugToHeaderTitle = (str: any) => {
    return str
      .toLowerCase()
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <View bg="$background" flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title={slugToHeaderTitle(id)} />;
          },
        }}
      />

      <Container flex={1}>
        <YStack gap="$4" flex={1}>
          <DatePicker
            control={control}
            name="administered_date"
            label="Administered Date"
            placeholder="Select"
            rules={{ required: "Administered Date is required" }}
          />

          <DatePicker
            control={control}
            name="next_vaccine_due"
            label="Next Vaccine Due"
            placeholder="Select"
            rules={{ required: "Next Vaccine Due is required" }}
          />

          <Input
            control={control}
            name="vet_name"
            label="Vet Name"
            placeholder="Input Vet Name"
            rules={{ required: "Vet Name is required" }}
          />

          <YStack gap="$2">
            <Text fontSize="$c1" fontWeight="$5">
              Vaccine Label
            </Text>
            <View
              width="100%"
              height={80}
              borderStyle="dashed"
              borderWidth="$0.5"
              borderColor="$textThirdy"
              ai="center"
              jc="center"
            >
              <ImagePlus size="$4" color="$textThirdy" />
            </View>
          </YStack>
        </YStack>

        <Button type="primary" mt="$4">
          Save
        </Button>
      </Container>
    </View>
  );
};

export default UpdateVaccineHistoryItem;
