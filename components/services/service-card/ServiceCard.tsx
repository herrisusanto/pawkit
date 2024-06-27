import { Button } from "@/components/common/Button/Button";
import { CloseOutlinedIcon } from "@/components/common/Icons";
import { Service } from "@/api/graphql/API";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Sheet, Text, XStack, YStack } from "tamagui";
import { images } from "@/constants";

type ServiceCardProps = {
  data: Service;
  isSelected?: boolean;
  onSelected: () => void;
  removeSelected: () => void;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  data,
  isSelected,
  onSelected,
  removeSelected,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const servicePrice = () => {
    if (data.xxlWeightPrice && data.xxlWeightPrice.amount > 0) {
      return `S$ ${data.basePrice} - S$ ${data.basePrice + data.xxlWeightPrice.amount}`;
    } else {
      return `S$ ${data.basePrice}`;
    }
  };

  return (
    <>
      <YStack p="$4" gap="$2" bg="$background">
        <XStack flex={1} gap="$4">
          <YStack gap="$2" flex={1}>
            <Text fontSize="$b3" fontWeight="$7">
              {data?.name}
            </Text>
            <TouchableOpacity onPress={handleOpen}>
              <Text lineHeight={16.8} fontSize="$c2" fontWeight="$4">
                {data?.shortDescription} <Text color="$primary">show more</Text>
              </Text>
            </TouchableOpacity>
          </YStack>
          <Image
            source={{
              uri: data?.imageUrl || images.serviceDefaultImage,
              width: 82,
              height: 82,
            }}
            height={82}
            width={82}
            borderRadius="$2"
          />
        </XStack>

        <XStack gap="$3" jc="space-between" ai="center">
          <XStack gap="$2" ai="flex-end">
            <Text fontSize="$c1" fontWeight="$4">
              Start from
            </Text>
            <Text fontSize="$b3" fontWeight="$7">
              {servicePrice()}
            </Text>
          </XStack>
          {isSelected ? (
            <Button type="secondaryError" onPress={() => removeSelected()}>
              Remove
            </Button>
          ) : (
            <Button type="secondary" onPress={() => onSelected()}>
              Add
            </Button>
          )}
        </XStack>
      </YStack>
      <Sheet
        open={open}
        snapPointsMode="fit"
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        modal
      >
        <Sheet.Overlay />
        <Sheet.Frame>
          <Sheet.ScrollView>
            <YStack px="$5">
              <XStack py="$3" jc="space-between">
                <XStack ai="center" columnGap="$3.5">
                  <Text fontSize="$b2" fontWeight="$6">
                    Service Details
                  </Text>
                </XStack>
                <TouchableOpacity onPress={handleClose}>
                  <CloseOutlinedIcon />
                </TouchableOpacity>
              </XStack>
              <YStack pt="$2" pb="$6" rowGap="$3.5">
                <Text fontSize="$c1" fontWeight="$7">
                  {data.name}
                </Text>
                <Text whiteSpace="pre-wrap" lineHeight={16.8}>
                  {data?.longDescription}
                </Text>
              </YStack>
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default ServiceCard;
