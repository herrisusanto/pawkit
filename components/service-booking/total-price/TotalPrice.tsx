import { Button } from "@/components/common/Button/Button";
import { useState } from "react";
import { Text, View, XStack, YStack } from "tamagui";
import PriceDetailsSheet from "../price-details-sheet/PriceDetailsSheet";
import { ArrowUpIcon, DashedDividerIcon } from "@/components/common/Icons";

export function TotalPrice() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <YStack
        jc="flex-end"
        bg="#fff"
        pt="$3.5"
        pb="$8"
        px="$5"
        rowGap="$3.5"
        onPress={handleOpen}
      >
        <XStack jc="space-between">
          <XStack ai="center" columnGap="$3.5">
            <View h="$1.5" w="$1.5">
              <ArrowUpIcon />
            </View>
            <Text fontSize="$b2" fontWeight="$7">
              Total Price
            </Text>
          </XStack>
          <Text fontSize="$b2" fontWeight="$7">
            S$ 220
          </Text>
        </XStack>
        <DashedDividerIcon />
        <Button type="primary" h="$4">
          Pay
        </Button>
      </YStack>

      <PriceDetailsSheet
        open={open}
        onClose={handleClose}
        onOpenChange={setOpen}
        title="Total Price"
      />
    </>
  );
}
