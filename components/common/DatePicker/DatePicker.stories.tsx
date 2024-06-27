import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import React from "react";
import { View } from "tamagui";
import { useForm } from "react-hook-form";
import { Moment } from "moment";

const DatePickerMeta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
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

export default DatePickerMeta;

export const Basic: StoryObj<typeof DatePicker> = {
  render() {
    const DatePickerView = () => {
      const { control } = useForm<{ birth_date: Moment }>();

      return (
        <View flex={1} h="$full" w="$full" jc="center">
          <DatePicker
            control={control}
            name="birth_date"
            label="Pet Birthday"
          />
        </View>
      );
    };
    return <DatePickerView />;
  },
};
