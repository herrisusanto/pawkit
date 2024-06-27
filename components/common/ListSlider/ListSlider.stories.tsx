import type { Meta, StoryObj } from "@storybook/react";
import { ListSlider } from "./ListSlider";
import React from "react";
import { Circle, Square, Text, View, XStack, YStack } from "tamagui";

const ListSliderMeta: Meta<typeof ListSlider> = {
  title: "Components/ListSlider",
  component: ListSlider,
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

export default ListSliderMeta;

export const Basic: StoryObj<typeof ListSlider> = {
  args: {
    items: [
      {
        content: (
          <View h="$12" px="$5">
            <YStack
              bw="$0.5"
              bc="$natural3"
              br="$4"
              flex={1}
              py="$3.5"
              rowGap="$3"
            >
              <XStack px="$3.5" jc="space-between" ai="center">
                <XStack ai="center" columnGap="$2">
                  <Square bg="$primary" size={50} />
                  <YStack rowGap="$2">
                    <Text fontSize="$b3" fontWeight="$5">
                      At-Home Grooming
                    </Text>
                    <Text fontSize="$c2" fontWeight="$4" color="$natural0">
                      05 Feb 11:30 AM - 12:30 AM
                    </Text>
                  </YStack>
                </XStack>
                <View
                  bg="$accent2"
                  ai="center"
                  jc="center"
                  py="$1"
                  px="$2.5"
                  br="$12"
                >
                  <Text fontSize="$c1" fontWeight="$5" color="$primary">
                    Confirmed
                  </Text>
                </View>
              </XStack>
              <XStack columnGap="$2" px="$5" ai="center">
                <Circle bg="$primary" size={35} />
                <YStack>
                  <Text fontSize="$c1" fontWeight="$5">
                    Milo
                  </Text>
                  <Text fontSize="$c2" fontWeight="$4" color="$natural0">
                    2y 6m
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </View>
        ),
      },
      {
        content: (
          <View h="$12" bg="$blue11" ai="center">
            <Text>Content Here</Text>
          </View>
        ),
      },
      {
        content: (
          <View h="$12" bg="$yellow11" ai="center">
            <Text>Content Here</Text>
          </View>
        ),
      },
      {
        content: (
          <View h="$12" bg="$green11" ai="center">
            <Text>Content Here</Text>
          </View>
        ),
      },
    ],
  },
};
