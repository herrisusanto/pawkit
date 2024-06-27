import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import React from "react";
import { View } from "tamagui";

const ButtonMeta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    type: "primary",
    children: "Hello world",
  },
  argTypes: {
    type: {
      options: ["primary", "secondary", "thirdy"],
      control: { type: "select" },
    },
  },
  decorators: [
    (Story) => (
      <View alignItems="center" justifyContent="center" flex={1}>
        <Story />
      </View>
    ),
  ],
};

export default ButtonMeta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: "Primary Button",
    // disabled: true,
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    type: "secondary",
    children: "Secondary Button",
  },
};

export const Thirdy: StoryObj<typeof Button> = {
  args: {
    type: "thirdy",
    children: "Thirdy Button",
  },
};

export const Disabled: StoryObj<typeof Button> = {
  args: {
    type: "thirdy",
    children: "Thirdy Button",
    disabled: true,
  },
};
