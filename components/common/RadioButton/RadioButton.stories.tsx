import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioButton";
import React from "react";
import { View } from "tamagui";
import { Text } from "react-native";
import { MaleIcon } from "../Icons";
import { useForm } from "react-hook-form";
import { FemaleIcon } from "../Icons/FemaleIcon";

const RadioButtonMeta: Meta<typeof RadioButton> = {
  title: "Components/RadioButton",
  component: RadioButton,
  args: {
    children: <Text>RadioButton</Text>,
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <View alignItems="center" justifyContent="center" flex={1} px="$5">
        <Story />
      </View>
    ),
  ],
};

export default RadioButtonMeta;

export const Basic: StoryObj<typeof RadioButton> = {
  args: {
    icon: <MaleIcon />,
  },
  render() {
    function Form() {
      const { control } = useForm();
      return (
        <RadioButton
          icon={<FemaleIcon />}
          w="$full"
          control={control}
          name="gender"
          value="male"
        >
          Male
        </RadioButton>
      );
    }
    return <Form />;
  },
};

export const WithDefaultValues: StoryObj<typeof RadioButton> = {
  args: {
    icon: <MaleIcon />,
  },
  render() {
    function Form() {
      const { control } = useForm<{ gender: string }>({
        defaultValues: { gender: "male" },
      });
      return (
        <RadioButton
          icon={<FemaleIcon />}
          control={control}
          name="gender"
          value="male"
        >
          Male
        </RadioButton>
      );
    }
    return <Form />;
  },
};
