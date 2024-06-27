import type { Meta, StoryObj } from "@storybook/react";
import { Example as ExampleComponent } from "./Example";
import React from "react";
import { View } from "tamagui";
import { Text } from "react-native";

const ExampleMeta: Meta<typeof ExampleComponent> = {
  title: "Components/Example",
  component: ExampleComponent,
  args: {
    children: <Text>Example</Text>,
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

export default ExampleMeta;

export const Basic: StoryObj<typeof ExampleComponent> = {};
