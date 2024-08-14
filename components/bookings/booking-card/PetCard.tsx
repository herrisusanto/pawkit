import React, { FC } from "react";
import { XStack, Image, YStack, Text, View } from "tamagui";
import { useQuery } from "@tanstack/react-query";

import { PetType } from "@/api/graphql/API";
import { downloadPetImage } from "@/api/pet";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { useCurrentUser } from "@/hooks";

type PetItem = {
  id?: string;
  petType?: PetType;
  name?: string;
  birthdate?: string | null;
  s3ImageKey?: string | null;
};

type Props = {
  pet?: PetItem;
};
export const PetCard: FC<Props> = ({ pet }) => {
  const { data: user } = useCurrentUser();

  const { data: petImage } = useQuery({
    queryKey: ["pet-image", user?.userId, pet?.id],
    queryFn: () => downloadPetImage(user?.userId as string, pet?.id as string),
    enabled: !!user && !!pet,
  });

  return (
    <XStack columnGap="$2" alignItems="center">
      <View width={50} height={50} ai="center" jc="center">
        <Image
          source={{
            uri: petImage?.href ?? petDefaultAvatar(pet?.petType),
            width: 50,
            height: 50,
          }}
          borderRadius={200}
          height={35}
          width={35}
        />
      </View>
      <YStack>
        <Text fontSize="$b3" fontWeight="$5">
          {pet?.name}
        </Text>
        <Text fontSize="$c2" fontWeight="$4" color="$textSecondary">
          {pet?.birthdate}
        </Text>
      </YStack>
    </XStack>
  );
};
