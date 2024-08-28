import { Button } from "@/components/common/Button/Button";
import { CloseOutlinedIcon } from "@/components/common/Icons";
import { useCurrentUser } from "@/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, FC, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Sheet, Text, View, XStack, YStack, Image } from "tamagui";
import { images } from "@/constants";
import {
  addDisclaimerAcceptance,
  hasCustomerAcceptedServiceDisclaimer,
} from "@/api/customer";
import { fetchServiceById } from "@/api/service-booking";

type DisclaimerSheetProps = {
  serviceId: string;
};

export const DisclaimerByServiceIdSheet: FC<DisclaimerSheetProps> = ({
  serviceId,
}) => {
  const { data: user } = useCurrentUser();
  const [open, setOpen] = useState(false);

  const { data: service } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: () => fetchServiceById(serviceId),
    enabled: !!serviceId,
  });

  const { data: disclaimerAcceptance } = useQuery({
    queryKey: ["disclaimerAcceptance", user?.userId, service?.disclaimerName],
    queryFn: () =>
      hasCustomerAcceptedServiceDisclaimer(
        user?.userId as string,
        service?.disclaimerName as string
      ),
    enabled: !!user?.userId && !!service?.disclaimerName,
  });

  const mutationAddDisclaimerAcceptance = useMutation({
    mutationFn: addDisclaimerAcceptance,
  });

  const handleIUnderstandButton = async () => {
    try {
      await mutationAddDisclaimerAcceptance.mutateAsync({
        customerId: user?.userId as string,
        disclaimerName: service?.disclaimerName as string,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (disclaimerAcceptance === false) {
      setOpen(true);
    }
  }, [disclaimerAcceptance]);

  return (
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
            <XStack py="$5" jc="space-between">
              <XStack ai="center" columnGap="$3.5">
                {/* <Text fontSize="$b2" fontWeight="$6">
                  Disclaimer for{" "} */}
                <Text fontSize="$b2" fontWeight="$6" textTransform="capitalize">
                  {service?.disclaimerName}
                </Text>
                {/* </Text> */}
              </XStack>

              <TouchableOpacity onPress={handleClose}>
                <CloseOutlinedIcon />
              </TouchableOpacity>
            </XStack>
            <YStack rowGap="$2">
              <XStack ai="center" jc="center">
                <Image source={images.dogIllustration} width={96} height={96} />
              </XStack>
              {/* <Text fontSize="$c1" fontWeight="$7">
                {disclaimer.header}
              </Text>
              <Text fontSize="$c2" fontWeight="$4">
              {disclaimer.subHeader}
              </Text> */}
              <Text fontSize="$c2" fontWeight="$4">
                {service?.disclaimer?.text}
              </Text>
            </YStack>
            <View py="$6">
              <Button
                h="$4"
                type="primary"
                disabled={false}
                onPress={handleIUnderstandButton}
              >
                I Understand
              </Button>
            </View>
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
};
