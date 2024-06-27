import type { Meta, StoryObj } from "@storybook/react";
import { AvatarPicker } from "./AvatarPicker";
import React from "react";
import { View } from "tamagui";

const AvatarPickerMeta: Meta<typeof AvatarPicker> = {
  title: "Components/AvatarPicker",
  component: AvatarPicker,
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

export default AvatarPickerMeta;

export const Basic: StoryObj<typeof AvatarPicker> = {};
