import { Dimensions } from "react-native";
import { Text, YStack } from "tamagui";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import { Pet } from "@/api/graphql/API";
import { downloadPetImage } from "@/api/pet";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { useCurrentUser } from "@/hooks";
import { Avatar } from "@/components/common/Avatar";

const { width } = Dimensions.get("screen");

export const PetAvatar = YStack.styleable<{ data: Pet }>(
  ({ data, ...props }, ref) => {
    const { data: user } = useCurrentUser();
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

    const { data: petImage, isFetching: isImageLoading } = useQuery({
      queryKey: ["pet-image", user?.userId, data?.id],
      queryFn: () =>
        downloadPetImage(user?.userId as string, data?.id as string),
      enabled: !!user && !!data,
    });

    return (
      <YStack
        ref={ref}
        ai="center"
        maxWidth={containerWidth / 4}
        w="$full"
        rowGap="$2"
        {...props}
      >
        <Avatar
          circular
          src={petImage?.href}
          loading={isImageLoading}
          accessibilityLabel={data?.name}
          defaultSource={petDefaultAvatar(data?.petType)}
          size={containerWidth / 4}
        />
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
