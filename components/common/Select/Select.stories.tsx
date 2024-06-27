import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Select } from "./Select";
import { View, YStack } from "tamagui";
import { useForm } from "react-hook-form";

const SelectMeta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
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

export default SelectMeta;

export const Basic: StoryObj<typeof Select> = {
  render() {
    function SelectFormField() {
      const { control } = useForm({ mode: "onBlur" });

      const options = [
        { label: "item1", value: "value1" },
        { label: "item2", value: "value2" },
        { label: "item3", value: "value3" },
        { label: "item4", value: "value4" },
        { label: "item5", value: "value5" },
        { label: "item6", value: "value6" },
        { label: "item7", value: "value7" },
        { label: "item8", value: "value8" },
        { label: "item9", value: "value9" },
        { label: "item10", value: "value10" },
        { label: "item11", value: "value11" },
        { label: "item12", value: "value12" },
      ];

      return (
        <YStack rowGap="$5" w="$full">
          <Select
            control={control}
            name="pet_breed"
            label="Pet Breed"
            placeholder="Select"
            rules={{ required: "Pet Breed is required" }}
            options={options}
          />
          <Select
            control={control}
            name="pet_weight"
            label="Pet Weight"
            placeholder="Select"
            options={options}
          />
        </YStack>
      );
    }
    return <SelectFormField />;
  },
};
