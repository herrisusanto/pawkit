import type { Meta, StoryObj } from "@storybook/react";
import { DatePickerSheet } from "./DatePickerSheet";
import React from "react";
import { View } from "tamagui";
import { useForm } from "react-hook-form";

const DatePickerSheetMeta: Meta<typeof DatePickerSheet> = {
  title: "Components/DatePickerSheet",
  component: DatePickerSheet,
  args: {},
  argTypes: {},
  decorators: [
    (Story) => (
      <View alignItems="center" justifyContent="center" flex={1}>
        <Story />
      </View>
    ),
  ],
};

export default DatePickerSheetMeta;

export const Basic: StoryObj<typeof DatePickerSheet> = {
  render() {
    const DatePickerSheetView = () => {
      const { control } = useForm();
      return (
        <View w="$full" px="$5">
          <DatePickerSheet
            control={control}
            name="date"
            label="Date"
            placeholder="Select"
          />
        </View>
      );
    };

    return <DatePickerSheetView />;
  },
};
