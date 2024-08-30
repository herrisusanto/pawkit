import { AvatarProps, View as TamaguiView, View, styled } from "tamagui";
import { CameraIcon } from "../Icons";
import { Avatar } from "../Avatar";

type AvatarPickerProps = {
  avatarProps?: AvatarProps;
  source?: string;
  onImagePicker?: () => void;
};

const StyledView = styled(TamaguiView, {
  position: "relative",
});

export const AvatarPicker = StyledView.styleable<AvatarPickerProps>(
  ({ avatarProps, source, onImagePicker, ...props }, ref) => {
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
          <CameraIcon strokeColor="#fff" />
        </View>
      </StyledView>
    );
  }
);
