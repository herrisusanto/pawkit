import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { CloseOutlinedIcon } from "@/components/common/Icons";
import { Service } from "@/api/graphql/API";
import { Check } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Sheet, Text, XStack, YStack } from "tamagui";
import { useQuery } from "@tanstack/react-query";
import { downloadServiceImage } from "@/api/service-booking";

type ServiceCardAddonProps = {
  data: Service;
  isChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

const ServiceCardAddon: React.FC<ServiceCardAddonProps> = ({
  data,
  isChecked,
  onCheckedChange,
}) => {
  const [open, setOpen] = useState(false);
  const { data: image } = useQuery({
    queryKey: ["service-image", data.id],
    queryFn: () => downloadServiceImage(data.id),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <YStack p="$4" gap="$3" bg="$background">
        <XStack>
          <YStack gap="$2" flex={1}>
            <YStack gap="$1">
              <Text fontSize="$c1" fontWeight="$7">
                {data?.name}
              </Text>
              <XStack columnGap="$1">
                <Text fontSize="$c2">Estimated duration:</Text>
                <Text fontSize="$c2" fontWeight="$6">
                  {`${data?.baseDuration} ${data?.baseDurationUnit.toLowerCase()}`}
                </Text>
              </XStack>
            </YStack>
            <TouchableOpacity onPress={handleOpen}>
              <Text lineHeight={16.8} fontSize="$c2" fontWeight="$4">
                {data.shortDescription} <Text color="$primary">show more</Text>
              </Text>
            </TouchableOpacity>
          </YStack>
          <Image
            source={{
              uri: image?.href,
              width: 62,
              height: 54,
            }}
            height={54}
            width={62}
            borderRadius="$2"
          />
        </XStack>
        <XStack>
          <YStack flex={1} gap="$4">
            <XStack gap="$2" ai="flex-end">
              <Text fontSize="$c1" fontWeight="$4">
                + Add Service To Cart
              </Text>
            </XStack>
          </YStack>
          <Checkbox checked={isChecked} onCheckedChange={onCheckedChange}>
            <Checkbox.Indicator bg="$primary" br="$3">
              <Check color="#fff" />
            </Checkbox.Indicator>
          </Checkbox>
        </XStack>
      </YStack>
      <Sheet
        open={open}
        snapPointsMode="mixed"
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
                <YStack gap="$1">
                  <Text fontSize="$c1" fontWeight="$7">
                    {data?.name}
                  </Text>
                  <XStack columnGap="$1">
                    <Text fontSize="$c2">Estimated duration:</Text>
                    <Text fontSize="$c2" fontWeight="$6">
                      {`${data?.baseDuration} ${data?.baseDurationUnit.toLowerCase()}`}
                    </Text>
                  </XStack>
                </YStack>
                <Text whiteSpace="pre-wrap">{data?.longDescription}</Text>
              </YStack>
            </YStack>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default ServiceCardAddon;
