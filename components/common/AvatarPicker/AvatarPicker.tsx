import {
  AvatarProps,
  Spinner,
  View as TamaguiView,
  View,
  styled,
} from "tamagui";
import { CameraIcon } from "../Icons";
import { Avatar } from "../Avatar";

type AvatarPickerProps = {
  avatarProps?: AvatarProps;
  source?: string;
  onImagePicker?: () => void;
  isLoading?: boolean;
};

const StyledView = styled(TamaguiView, {
  position: "relative",
});

export const AvatarPicker = StyledView.styleable<AvatarPickerProps>(
  (
    { avatarProps, source, onImagePicker, isLoading = false, ...props },
    ref
  ) => {
    return (
      <StyledView ref={ref} {...props} onPress={onImagePicker}>
        <Avatar
          circular
          size={100}
          src={source}
          accessibilityLabel="Avatar"
          {...avatarProps}
        />

        <View
          position="absolute"
          bottom={0}
          right={0}
          h={28}
          w={28}
          bg="$primary"
          br="$12"
          jc="center"
          ai="center"
        >
          {isLoading ? (
            <Spinner size="small" color="#fff" />
          ) : (
            <CameraIcon strokeColor="#fff" />
          )}
        </View>
      </StyledView>
    );
  }
);
