import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { Container } from "@/components/common/Container/Container";
import { XStack, YStack, View, Text, ScrollView } from "tamagui";
import HeadlessCheckbox from "@/components/common/HeadlessCheckbox/HeadlessCheckbox";
import { Input } from "@/components/common/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { DatePicker } from "@/components/common/DatePicker/DatePicker";
import { ImagePlus } from "@tamagui/lucide-icons";
import { Button } from "@/components/common/Button/Button";

const vaccineTypeData = [
  {
    id: 1,
    name: "Core Vaccination",
  },
  {
    id: 2,
    name: "Kennel Cough",
  },
  {
    id: 3,
    name: "Distemper",
  },
  {
    id: 4,
    name: "Parvovirus",
  },
  {
    id: 6,
    name: "Corona Virus",
  },
  {
    id: 7,
    name: "ExtraAmerican Parainfluenza Bull Terrier",
  },
  {
    id: 8,
    name: "Bordetella",
  },
  {
    id: 9,
    name: "Leptospirosis",
  },
  {
    id: 10,
    name: "Rabies",
  },
];

const AddVaccineHistory = () => {
  const form = useForm({
    mode: "onSubmit",
    defaultValues: {
      administered_date: "",
      next_vaccine_due: "",
      vet_name: "",
    },
  });

  const { control, handleSubmit } = form;

  const submit: SubmitHandler<any> = (values) => {
    console.log(values);
    // router.replace("/my-pet/cilo");
  };

  return (
    <View bg="$background" flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Vaccine History" />;
          },
        }}
      />

      <ScrollView>
        <Container>
          <YStack gap="$4">
            <YStack gap="$3">
              <Text>Vaccine Type</Text>
              <YStack gap="$2">
                {vaccineTypeData.map((item) => (
                  <XStack key={item.id} ai="center" columnGap="$2">
                    <HeadlessCheckbox />
                    <Text fontSize="$c1">{item.name}</Text>
                  </XStack>
                ))}
              </YStack>
            </YStack>

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
          <Button type="primary" mt="$4" onPress={handleSubmit(submit)}>
            Save
          </Button>
        </Container>
      </ScrollView>
    </View>
  );
};

export default AddVaccineHistory;
