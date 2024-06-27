import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import React from "react";
import { View } from "tamagui";
import { useForm } from "react-hook-form";
import { MaleIcon } from "../Icons";

const InputMeta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
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

export default InputMeta;

export const Basic: StoryObj<typeof Input> = {
  render() {
    function FormInput() {
      const { control } = useForm();
      return (
        <Input
          w="$full"
          control={control}
          label="Name"
          name="basic"
          placeholder="Pet Name"
        />
      );
    }

    return <FormInput />;
  },
};

export const WithIcon: StoryObj<typeof Input> = {
  render() {
    function FormInputWithIcon() {
      const { control } = useForm({ mode: "onBlur" });
      return (
        <Input
          prefixIcon={<MaleIcon />}
          control={control}
          label="Name"
          name="basic"
          placeholder="Pet Name"
        />
      );
    }
    return <FormInputWithIcon />;
  },
};

export const WithNumericKeyboard: StoryObj<typeof Input> = {
  render() {
    function FormInputWithIcon() {
      const { control } = useForm({ mode: "onBlur" });
      return (
        <Input
          control={control}
          name="number"
          label="Number"
          placeholder="Number"
          rules={{ required: "Number is required" }}
          inputProps={{ keyboardType: "number-pad" }}
        />
      );
    }
    return <FormInputWithIcon />;
  },
};

export const Required: StoryObj<typeof Input> = {
  render() {
    function FormInputWithIcon() {
      const { control } = useForm({ mode: "onBlur" });
      return (
        <Input
          control={control}
          name="basic"
          label="Pet Name"
          placeholder="Pet Name"
          rules={{ required: "Pet Name is required" }}
        />
      );
    }
    return <FormInputWithIcon />;
  },
};
