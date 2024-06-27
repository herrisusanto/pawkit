import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";
import React from "react";
import { View, YStack } from "tamagui";
import { Text } from "react-native";
import { useForm } from "react-hook-form";

const TextAreaMeta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  args: {
    children: <Text>TextArea</Text>,
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

export default TextAreaMeta;

export const Basic: StoryObj<typeof TextArea> = {
  render() {
    function TextAreaFormField() {
      const { control } = useForm({
        mode: "onBlur",
      });
      return (
        <YStack flex={1} w="$full" px="$5" rowGap="$5">
          <TextArea
            control={control}
            name="message"
            label="Message"
            placeholder="Message"
          />
        </YStack>
      );
    }
    return <TextAreaFormField />;
  },
};

export const Required: StoryObj<typeof TextArea> = {
  render() {
    function TextAreaFormField() {
      const { control } = useForm({
        mode: "onBlur",
      });
      return (
        <YStack flex={1} w="$full" px="$5" rowGap="$5">
          <TextArea
            control={control}
            name="message"
            label="Message"
            placeholder="Message"
            rules={{ required: `Message is required` }}
          />
        </YStack>
      );
    }
    return <TextAreaFormField />;
  },
};
