import { Pet } from "@/api/graphql/API";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { Dimensions } from "react-native";
import { Text, Avatar, YStack, styled } from "tamagui";

const { width } = Dimensions.get("screen");

type PetAvatarProps = {
  data: Pet;
  isSelected?: boolean;
  size?: string;
};

export const PetAvatar: React.FC<PetAvatarProps> = ({
  data,
  isSelected,
  size,
}) => {
  const containerWidth = width - 188;

  return (
    <PetAvatarContainer>
      <Avatar
        circular
        size={size ? size : containerWidth / 4}
        borderColor="$primary"
        borderWidth={isSelected ? "$1" : 0}
      >
        <Avatar.Image
          accessibilityLabel="Cam"
          src={data?.imageUrl || petDefaultAvatar(data?.petType)}
          resizeMode="cover"
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <YStack>
        <Text
          fontSize="$c1"
          fontWeight="$5"
          textAlign="center"
          color={isSelected ? "$primary" : "$textPrimary"}
        >
          {data?.name}
        </Text>
      </YStack>
    </PetAvatarContainer>
  );
};

export const PetAvatarContainer = styled(YStack, {
  ai: "center",
  maxWidth: (width - 188) / 4,
  w: "$full",
  rowGap: "$2",
});
