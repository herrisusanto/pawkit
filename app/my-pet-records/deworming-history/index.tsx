import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { Container } from "@/components/common/Container/Container";
import { YStack, View } from "tamagui";
import { DatePicker } from "@/components/common/DatePicker/DatePicker";
import { Input } from "@/components/common/Input/Input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/Button/Button";
import { TextArea } from "@/components/common/TextArea/TextArea";

const DewormingHistory = () => {
  const form = useForm({
    mode: "onBlur",
  });

  const { control } = form;

  return (
    <View bg="$background" flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Deworming History" />;
          },
        }}
      />

      <Container flex={1}>
        <YStack gap="$4" flex={1}>
          <Input
            control={control}
            name="product_name"
            label="Product Name"
            placeholder="Input Product Name"
            rules={{ required: "Product Name is required" }}
          />

          <DatePicker
            control={control}
            name="administered_date"
            label="Administered Date"
            placeholder="Select"
            rules={{ required: "Administered Date is required" }}
          />

          <TextArea
            textAlignVertical="top"
            control={control}
            name="description"
            label="Description"
            placeholder="Description"
          />
        </YStack>

        <Button type="primary" mt="$4">
          Save
        </Button>
      </Container>
    </View>
  );
};

export default DewormingHistory;
