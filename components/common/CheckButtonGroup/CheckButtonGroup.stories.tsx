import type { Meta, StoryObj } from "@storybook/react";
import { CheckButtonGroup } from "./CheckButtonGroup";
import React from "react";
import { View, Text } from "tamagui";
import { useForm } from "react-hook-form";
import { Dimensions } from "react-native";
import { mockOptions, mockPetTypesOptions } from "./__mock__";

const CheckButtonGroupMeta: Meta<typeof CheckButtonGroup> = {
  title: "Components/CheckButtonGroup",
  component: CheckButtonGroup,
  args: {
    children: <Text>CheckButtonGroup</Text>,
  },
  argTypes: {},
};

export default CheckButtonGroupMeta;

export const Basic: StoryObj<typeof CheckButtonGroup> = {
  decorators: [
    (Story) => (
      <View alignItems="center" justifyContent="center" flex={1} px="$5">
        <Story />
      </View>
    ),
  ],
  render() {
    function CheckButtonGroupForm() {
      const { control } = useForm({ mode: "all" });

      return (
        <CheckButtonGroup
          control={control}
          name="checkbuttongroup"
          items={mockOptions}
        />
      );
    }
    return <CheckButtonGroupForm />;
  },
};

export const CustomItemRender: StoryObj<typeof CheckButtonGroup> = {
  decorators: [
    (Story) => (
      <View alignItems="center" justifyContent="center" flex={1} px="$5">
        <Story />
      </View>
    ),
  ],
  render() {
    function CheckButtonGroupForm() {
      const { control } = useForm({ mode: "all" });

      return (
        <CheckButtonGroup
          control={control}
          name="checkbuttongroup"
          items={mockOptions}
          renderItem={({ children, checked, value, onChange }) => (
            <View
              key={value}
              px="$2"
              py="$1.5"
              bw="$1"
              bc={checked ? "$blue" : "$natural0"}
            >
              <Text
                color={checked ? "$blue" : "$natural0"}
                onPress={() => {
                  onChange && onChange(value);
                }}
              >
                {children}
              </Text>
            </View>
          )}
        />
      );
    }
    return <CheckButtonGroupForm />;
  },
};

export const SingleChoice: StoryObj<typeof CheckButtonGroup> = {
  render() {
    function CheckButtonGroupForm() {
      const { control } = useForm({ mode: "all" });

      return (
        <CheckButtonGroup
          multiple={false}
          control={control}
          name="checkbuttongroup"
          items={mockPetTypesOptions}
          containerProps={{
            gap: "$3.5",
            jc: "center",
          }}
          renderItem={({ children, checked, value, onChange }) => {
            const itemSize = Dimensions.get("screen").width / 3;
            return (
              <View
                key={value}
                py="$4"
                w={itemSize - 24}
                flexShrink={0}
                h={itemSize - 24}
                br="$4"
                bw="$1"
                jc="center"
                ai="center"
                bc={checked ? "$primary" : "$natural0"}
                onPress={() => {
                  onChange && onChange(value);
                }}
              >
                <Text color={checked ? "$primary" : "$natural0"}>
                  {children}
                </Text>
              </View>
            );
          }}
        />
      );
    }
    return <CheckButtonGroupForm />;
  },
};
