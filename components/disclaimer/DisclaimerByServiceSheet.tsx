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
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import { Sheet, Text, View, XStack, YStack, Image } from "tamagui";
import {
  addDisclaimerAcceptance,
  hasCustomerAcceptedServiceDisclaimer,
} from "@/api/customer";
import { fetchServiceById } from "@/api/service-booking";
import PopupController from "../common/GlobalPopupError/PopUpController";

export type DisclaimerHandleRef = {
  selectServiceId: (serviceId: string) => void;
  removeServiceId: () => void;
};

export const DisclaimerByServiceIdSheet = forwardRef<DisclaimerHandleRef>(
  (props, ref) => {
    const { data: user } = useCurrentUser();
    const [open, setOpen] = useState(false);
    const [serviceId, setServiceId] = useState<string | undefined>();
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

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
            onMomentumScrollEnd={({ nativeEvent }) => {
              setHasScrolledToBottom(true);
            }}
          >
            <YStack px="$5">
              <XStack py="$5" jc="space-between">
                <XStack ai="center" columnGap="$3.5">
                  <Text
                    fontSize="$b2"
                    fontWeight="$6"
                    textTransform="capitalize"
                  >
                    {service?.disclaimerName}
                  </Text>
                </XStack>

                <TouchableOpacity onPress={handleClose}>
                  <CloseOutlinedIcon />
                </TouchableOpacity>
              </XStack>
              <YStack rowGap="$2">
                <XStack ai="center" jc="center" p="$3">
                  <Image
                    source={service?.disclaimer?.s3Link as ImageSourcePropType}
                    width={96}
                    height={96}
                  />
                </XStack>
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
              <View py="$6">
                <Button
                  h="$4"
                  type="primary"
                  disabled={isPending || !hasScrolledToBottom}
                  loading={isPending}
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
  }
);
