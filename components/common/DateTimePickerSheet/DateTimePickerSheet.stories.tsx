import type { Meta, StoryObj } from "@storybook/react";
import { DateTimePickerSheet } from "./DateTimePickerSheet";
import React from "react";
import { View } from "tamagui";
import { useForm } from "react-hook-form";

const DateTimePickerSheetMeta: Meta<typeof DateTimePickerSheet> = {
  title: "Components/DateTimePickerSheet",
  component: DateTimePickerSheet,
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

export default DateTimePickerSheetMeta;

export const Basic: StoryObj<typeof DateTimePickerSheet> = {
  render() {
    const DateTimePickerSheetView = () => {
      const { control } = useForm();
      return (
        <View w="$full" px="$5">
          <DateTimePickerSheet
            control={control}
            name="datetime"
            label="Date & Time"
            placeholder="Select"
          />
        </View>
      );
    };

    return <DateTimePickerSheetView />;
  },
};
