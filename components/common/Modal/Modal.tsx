import {
  Dimensions,
  ModalProps as RNModalProps,
  Modal as RNModal,
} from "react-native";
import { View, ViewProps } from "tamagui";

const { height, width } = Dimensions.get("screen");

type ModalProps = {
  open?: boolean;
  onClose?: () => void;
  overlayProps?: ViewProps;
  modalProps?: RNModalProps;
  contentProps?: ViewProps;
};

export const Modal = View.styleable<ModalProps>(
  (
    {
      open = false,
      onClose,
      modalProps,
      overlayProps,
      contentProps,
      children,
      ...props
    },
    ref
  ) => {
    const handleClose = () => {
      onClose && onClose();
    };

    return (
      <RNModal
        transparent
        animationType="fade"
        visible={open}
        onRequestClose={handleClose}
        {...modalProps}
      >
        <View ref={ref} position="relative" flex={1} jc="center" {...props}>
          <View
            testID="overlay"
            position="absolute"
            h={height}
            w={width}
            bg="#252C38"
            opacity={0.4}
            onPress={handleClose}
            {...overlayProps}
          />
          <View
            ai="center"
            jc="center"
            py="$5"
            bg="#fff"
            br="$6"
            {...contentProps}
          >
            {children}
          </View>
        </View>
      </RNModal>
    );
  }
);
