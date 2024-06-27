import { Pet } from "@/api/graphql/API";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import moment from "moment";
import { Dimensions } from "react-native";
import { Text, Avatar, YStack } from "tamagui";

const { width } = Dimensions.get("screen");

export const PetAvatar = YStack.styleable<{ data: Pet }>(
  ({ data, ...props }, ref) => {
    const containerWidth = width - 188;

    const petBirthdateInMonths = moment().diff(
      moment(data.birthdate),
      "months"
    );
    const petYearsOld = (petBirthdateInMonths / 12).toFixed();
    const petMonthsOld = (petBirthdateInMonths / 12)
      .toFixed(1)
      .toString()
      .split(".")[1]
      ?.slice(0, 1);

    return (
      <YStack
        ref={ref}
        ai="center"
        maxWidth={containerWidth / 4}
        w="$full"
        rowGap="$2"
        {...props}
      >
        <Avatar circular size={containerWidth / 4}>
          <Avatar.Image
            accessibilityLabel="Cam"
            src={data?.imageUrl ?? petDefaultAvatar(data?.petType)}
            resizeMode="cover"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <YStack>
          <Text
            fontSize="$c1"
            fontWeight="$5"
            textAlign="center"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {data.name}
          </Text>
          <Text
            fontSize="$c2"
            fontWeight="$4"
            textAlign="center"
            color="$natural1"
          >
            {data.birthdate ? `${petYearsOld}y ${petMonthsOld}m` : "unknown"}
          </Text>
        </YStack>
      </YStack>
    );
  }
);
