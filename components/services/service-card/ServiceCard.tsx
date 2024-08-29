import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Sheet, Spinner, Text, XStack, YStack, View } from "tamagui";

import { CustomPrice, Service } from "@/api/graphql/API";
import { downloadServiceImage } from "@/api/service-booking";
import { Button } from "@/components/common/Button/Button";
import { CloseOutlinedIcon } from "@/components/common/Icons";
import { useQuery } from "@tanstack/react-query";

type ServiceCardProps = {
  data: Service;
  isSelected?: boolean;
  onSelected: () => void;
  removeSelected: () => void;
  hidePricing?: boolean;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  data,
  isSelected,
  onSelected,
  removeSelected,
  hidePricing,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const servicePrice = () => {
    const keys: (keyof Service)[] = [
      "xsWeightPrice",
      "sWeightPrice",
      "mWeightPrice",
      "lWeightPrice",
      "xlWeightPrice",
      "xxlWeightPrice",
    ];
    const maxSizeKey = keys.reverse().find((key) => data[key] != null);
    if (maxSizeKey && data[maxSizeKey]) {
      const maxPrice = data[maxSizeKey] as CustomPrice;
      const priceRange =
        maxPrice.amount > 0
          ? `S$ ${data.basePrice} - S$ ${data.basePrice + maxPrice.amount}`
          : `S$ ${data.basePrice}`;
      return priceRange;
    } else {
      return `S$ ${data.basePrice}`;
    }
  };

  const { data: image, isLoading } = useQuery({
    queryKey: ["service-image", data.id],
    queryFn: () => downloadServiceImage(data.id),
  });

  return (
    <>
      <YStack p="$4" gap="$2" bg="$background">
        <XStack flex={1} gap="$4">
          <YStack gap="$2" flex={1}>
            <YStack gap="$1">
              <Text fontSize="$b3" fontWeight="$7">
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
                {data?.shortDescription} <Text color="$primary">show more</Text>
              </Text>
            </TouchableOpacity>
          </YStack>
          {isLoading ? (
            <View w={82} h={82} jc="center" ai="center">
              <Spinner color="$accent3" size="small" />
            </View>
          ) : (
            <Image
              key={data.id}
              source={{
                uri: image?.href,
                width: 82,
                height: 82,
              }}
              height={82}
              width={82}
              borderRadius="$2"
            />
          )}
        </XStack>

        <XStack gap="$3" jc="space-between" ai="center">
          {!hidePricing && (
            <XStack gap="$2" ai="flex-end">
              <Text fontSize="$c1" fontWeight="$4">
                Start from
              </Text>
              <Text fontSize="$b3" fontWeight="$7">
                {servicePrice()}
              </Text>
            </XStack>
          )}
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
