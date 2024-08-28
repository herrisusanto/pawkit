import { Button } from "@/components/common/Button/Button";
import { images } from "@/constants";
import React from "react";
import { Image, Sheet, Text, View, YStack } from "tamagui";

type BookingConfirmedSheetProps = {
  open: boolean;
  onClose?: () => void;
};

export const BookingConfirmedSheet: React.FC<BookingConfirmedSheetProps> = ({
  open,
  onClose,
}) => {
  const handleClose = () => {
    onClose && onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  return (
    <>
      <Sheet
        open={open}
        snapPointsMode="mixed"
        onOpenChange={handleOpenChange}
        dismissOnSnapToBottom
        modal
      >
        <Sheet.Overlay />
        <Sheet.Frame>
          <YStack pt="$5" ai="center" rowGap="$3.5">
            <Image src={images.bookingConfirmed} w={197} h={213} />
            <YStack rowGap="$2" ai="center">
              <Text fontWeight="$7" fontSize="$b1">
                Booking Confirmed
              </Text>
              <Text fontWeight="$4" fontSize="$b3">
                We have received you booking request
              </Text>
            </YStack>
            <View w="$full" px="$5" py="$6">
              <Button type="secondary" onPress={handleClose}>
                Go to Homepage
              </Button>
            </View>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
