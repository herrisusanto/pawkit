import type { Meta, StoryObj } from "@storybook/react";
import { InputNumber } from "./InputNumber";
import React from "react";
import { Text, View } from "tamagui";
import { useForm } from "react-hook-form";

const InputNumberMeta: Meta<typeof InputNumber> = {
  title: "Components/InputNumber",
  component: InputNumber,
  args: {},
  argTypes: {},
  decorators: [
    (Story) => (
      <View alignItems="center" justifyContent="center" flex={1} px="$5">
        <Story />
      </View>
    ),
  ],
};

export default InputNumberMeta;

export const Basic: StoryObj<typeof InputNumber> = {
  render() {
    function FormInputNumber() {
      const { control } = useForm({ mode: "all" });
      return (
        <InputNumber
          w="$full"
          control={control}
          label="Phone Number"
          name="phone_number"
          placeholder="Input Phone Number"
        />
      );
    }

    return <FormInputNumber />;
  },
};

export const WithPrefix: StoryObj<typeof InputNumber> = {
  render() {
    function FormInputNumber() {
      const { control } = useForm({ mode: "all" });
      return (
        <InputNumber
          w="$full"
          control={control}
          label="Phone Number"
          name="phone_number"
          placeholder="Input Phone Number"
          prefix={<Text>+65</Text>}
          rules={{ required: "Phone number is required" }}
        />
      );
    }

    return <FormInputNumber />;
  },
};
