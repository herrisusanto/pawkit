import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import React, { useState } from "react";
import { View, Button } from "tamagui";
import { Text } from "react-native";
import { Calendar } from "../Calendar/Calendar";

const ModalMeta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
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

export default ModalMeta;

export const Basic: StoryObj<typeof Modal> = {
  render() {
    const ModalView = () => {
      const [open, setOpen] = useState(false);

      const openModal = () => {
        setOpen(true);
      };

      return (
        <>
          <Modal open={open} onClose={() => setOpen(false)} px="$5">
            <Text>Modal Content Here</Text>
          </Modal>
          <Button onPress={openModal}>Open</Button>
        </>
      );
    };
    return <ModalView />;
  },
};

export const WithCalendar: StoryObj<typeof Modal> = {
  render() {
    const ModalView = () => {
      const [open, setOpen] = useState(false);

      const openModal = () => {
        setOpen(true);
      };

      return (
        <>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            px="$5"
            contentProps={{ px: 12 }}
          >
            <Calendar headerContainerProps={{ px: "$5" }} px={36} />
          </Modal>
          <Button onPress={openModal}>Open Calendar</Button>
        </>
      );
    };
    return <ModalView />;
  },
};
