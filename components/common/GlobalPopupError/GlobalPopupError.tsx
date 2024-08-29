import React, {
  MutableRefObject,
  useLayoutEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { Modal } from "../Modal/Modal";
import { Image, Text, XStack, YStack } from "tamagui";
import { images } from "@/constants";
import { Button } from "../Button/Button";
import { QueryKey } from "@tanstack/react-query";
import PopupController, { PopupRef } from "./PopUpController";

const GlobalPopupError = () => {
  const [visible, setVisible] = useState(false);
  const [failedQueries, setFailedQueries] = useState<QueryKey[]>([]);
  const popupRef = useRef<PopupRef>();

  useLayoutEffect(() => {
    PopupController.setGlobalPopupRef(popupRef as MutableRefObject<PopupRef>);
  }, []);

  useImperativeHandle(
    popupRef,
    () => ({
      show: (failedQuery?: QueryKey) => {
        setVisible(true);
        if (failedQuery && !failedQueries.includes(failedQuery)) {
          setFailedQueries([...failedQueries, failedQuery]);
        }
      },
      hide: () => {
        setVisible(false);
        setFailedQueries([]);
      },
    }),
    [failedQueries]
  );

  const handleOk = () => {
    setVisible(false);
  };
  return (
    <Modal open={visible} px="$5" contentProps={{ px: 12 }}>
      <YStack gap="$4" alignItems="center" px="$3">
        <Image
          source={{ uri: images.dogIllustration, width: 140, height: 140 }}
          resizeMode="contain"
          width={140}
          height={140}
        />
        <Text fontSize="$c1" ta="center" lh={16.8}>
          {`Something went wrong!\nPlease try again`}
        </Text>
        <XStack gap="$3">
          <Button type="primary" flex={1} onPress={handleOk}>
            Okay
          </Button>
        </XStack>
      </YStack>
    </Modal>
  );
};

export default GlobalPopupError;
