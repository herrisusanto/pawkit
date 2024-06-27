import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import React from "react";
import { View } from "tamagui";
import { Text } from "react-native";
import { useController, useForm } from "react-hook-form";

const DropdownMeta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    children: <Text>Dropdown</Text>,
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <View alignItems="center" justifyContent="center" flex={1}>
        <Story />
      </View>
    ),
  ],
};

export default DropdownMeta;

export const Basic: StoryObj<typeof Dropdown> = {
  render() {
    const DropdownView = () => {
      const { control } = useForm();
      const { field } = useController({ control, name: "dropdown" });
      return (
        <Dropdown
          items={[
            { label: "2023", value: "2023" },
            { label: "2024", value: "2024" },
            { label: "2025", value: "2025" },
            { label: "2026", value: "2026" },
            { label: "2027", value: "2027" },
            { label: "2028", value: "2028" },
            { label: "2029", value: "2029" },
            { label: "2030", value: "2030" },
            { label: "2031", value: "2031" },
            { label: "2032", value: "2032" },
          ]}
          onChange={field.onChange}
          menuProps={{ minWidth: "$5" }}
        >
          <Text>{field.value || "Click here to open dropdown menu"}</Text>
        </Dropdown>
      );
    };
    return <DropdownView />;
  },
};
