import React from "react";
import { Modal } from "../Modal/Modal";
import { Image, Text, XStack, YStack } from "tamagui";
import { images } from "@/constants";
import { Button } from "../Button/Button";

const ConfirmModal = ({
  open,
  onClose,
  title = "Delete Record",
  subTitle = "Are you sure you want to delete this record? This cannot be recovered.",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose} px="$5" contentProps={{ px: 12 }}>
      <YStack gap="$4" alignItems="center" px="$3">
        <Text fontSize="$b2" fontWeight="$7">
          {title}
        </Text>
        <Image
          source={{ uri: images.dogIllustration, width: 140, height: 140 }}
          resizeMode="contain"
          width={140}
          height={140}
        />
        <Text fontSize="$c1" ta="center" lh={16.8}>
          {subTitle}
        </Text>
        <XStack gap="$3">
          <Button type="secondary" flex={1} onPress={onCancel}>
            No
          </Button>
          <Button type="primary" flex={1} onPress={onConfirm}>
            Yes
          </Button>
        </XStack>
      </YStack>
    </Modal>
  );
};

export default ConfirmModal;
