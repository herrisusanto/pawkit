import React from "react";
import { Modal } from "../Modal/Modal";
import { Image, Text, XStack, YStack } from "tamagui";
import { images } from "@/constants";
import { Button } from "../Button/Button";

const ForceUpdateModal = ({
  open,
  onUpdateNow,
}: {
  open: boolean;
  onUpdateNow: () => void;
}) => {
  return (
    <Modal open={open} px="$5" contentProps={{ px: 12 }}>
      <YStack gap="$4" alignItems="center" px="$3">
        <Image
          source={{ uri: images.dogIllustration, width: 140, height: 140 }}
          resizeMode="contain"
          width={140}
          height={140}
        />
        <Text fontSize="$b2" fontWeight="$7">
          App update available
        </Text>
        <Text fontSize="$c1" ta="center" lh={16.8}>
          {`You're using the older version of the app.\nTo enjoy our newest feature, Please\nupdate your app`}
        </Text>
        <XStack gap="$3">
          <Button type="primary" flex={1} onPress={onUpdateNow}>
            Update Now
          </Button>
        </XStack>
      </YStack>
    </Modal>
  );
};

export default ForceUpdateModal;
