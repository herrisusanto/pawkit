import {
  Avatar,
  AvatarProps,
  View as TamaguiView,
  View,
  styled,
} from "tamagui";
import { CameraIcon } from "../Icons";

type AvatarPickerProps = {
  avatarProps?: AvatarProps;
};

const StyledView = styled(TamaguiView, {
  position: "relative",
});

export const AvatarPicker = StyledView.styleable<AvatarPickerProps>(
  ({ avatarProps, ...props }, ref) => {
    return (
      <StyledView ref={ref} {...props}>
        <Avatar circular size={100} {...avatarProps}>
          <Avatar.Image
            accessibilityLabel="Avatar"
            aria-label="Avatar"
            src="https://via.placeholder.com/150"
          />
          <Avatar.Fallback backgroundColor="$natural0" />
        </Avatar>
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
