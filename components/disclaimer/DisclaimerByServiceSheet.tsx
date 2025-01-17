import { Button } from "@/components/common/Button/Button";
import { CloseOutlinedIcon } from "@/components/common/Icons";
import { useCurrentUser } from "@/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  ImageSourcePropType,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import { Sheet, Text, View, XStack, YStack, Image } from "tamagui";
import {
  addDisclaimerAcceptance,
  hasCustomerAcceptedServiceDisclaimer,
} from "@/api/customer";
import { fetchServiceById } from "@/api/service-booking";
import PopupController from "../common/GlobalPopupError/PopUpController";
import { Checkbox } from "../common/Checkbox/Checkbox";
import { Check } from "@tamagui/lucide-icons";

export type DisclaimerHandleRef = {
  selectServiceId: (serviceId: string) => void;
  removeServiceId: () => void;
};

export type DisclaimerByServiceIdSheetProps = {
  onClose?: (serviceId: string) => void;
};

export const DisclaimerByServiceIdSheet = forwardRef<
  DisclaimerHandleRef,
  DisclaimerByServiceIdSheetProps
>(({ onClose }, ref) => {
  const { data: user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [serviceId, setServiceId] = useState<string | undefined>();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const queryClient = useQueryClient();
  const { data: service } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: () => fetchServiceById(serviceId!),
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

  const { mutateAsync: addDisclaimer, isPending } = useMutation({
    mutationFn: addDisclaimerAcceptance,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          "disclaimerAcceptance",
          user?.userId,
          service?.disclaimerName,
        ],
      });
    },
  });

  const handleIUnderstandButton = async () => {
    try {
      await addDisclaimer({
        customerId: user?.userId as string,
        disclaimerName: service?.disclaimerName as string,
      });
      setOpen(false);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      PopupController.showGlobalPopup();
    }
  };

  const handleClose = () => {
    onClose && onClose(serviceId as string);
    setOpen(false);
  };

  useEffect(() => {
    if (disclaimerAcceptance === false) {
      setOpen(true);
    }
  }, [disclaimerAcceptance]);

  useImperativeHandle(ref, () => {
    return {
      selectServiceId(serviceId: string) {
        setServiceId(serviceId);
      },
      removeServiceId() {
        setServiceId(undefined);
      },
    };
  });

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onCheckedChange = () => {
    setIsChecked(!isChecked);
  };

  const enableButton = isChecked && hasScrolledToBottom;

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
        <Sheet.ScrollView
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setHasScrolledToBottom(true);
            }
          }}
          scrollEventThrottle={400}
        >
          <YStack px="$5">
            <XStack py="$5" jc="space-between">
              <XStack ai="center" columnGap="$3.5">
                <Text fontSize="$b2" fontWeight="$6" textTransform="capitalize">
                  {service?.disclaimerName}
                </Text>
              </XStack>

              <TouchableOpacity onPress={handleClose}>
                <CloseOutlinedIcon />
              </TouchableOpacity>
            </XStack>
            <YStack rowGap="$2">
              {service?.disclaimer?.s3Link && (
                <XStack ai="center" jc="center" p="$3">
                  <Image
                    source={service?.disclaimer?.s3Link as ImageSourcePropType}
                    width={96}
                    height={96}
                  />
                </XStack>
              )}
              <Text fontSize="$c1" fontWeight="$7">
                {service?.disclaimer?.header}
              </Text>
              <Text fontSize="$c2" fontWeight="$7">
                {service?.disclaimer?.subheader}
              </Text>
              <Text fontSize="$c2" fontWeight="$4">
                {service?.disclaimer?.text}
              </Text>
            </YStack>
          </YStack>
        </Sheet.ScrollView>
        <View p="$4" jc="flex-end">
          <XStack columnGap="$2" ai="center" my="$3">
            <Checkbox checked={isChecked} onCheckedChange={onCheckedChange}>
              <Checkbox.Indicator bg="$primary" br="$3">
                <Check color="#fff" />
              </Checkbox.Indicator>
            </Checkbox>
            <YStack flex={1} gap="$4">
              <XStack gap="$2" ai="flex-end">
                <Text fontSize="$c2" fontWeight="$4">
                  I understand and will not want to be shown this again
                </Text>
              </XStack>
            </YStack>
          </XStack>
          <Button
            h="$4"
            type="primary"
            disabled={isPending || !enableButton}
            loading={isPending}
            onPress={handleIUnderstandButton}
          >
            I Understand
          </Button>
        </View>
      </Sheet.Frame>
    </Sheet>
  );
});
