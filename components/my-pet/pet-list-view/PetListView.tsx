import React, { FC } from "react";
import { styled, View, XStack, YStack, Text, getToken } from "tamagui";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { ArrowRightIcon } from "../../common/Icons/ArrowRightIcon";
import { Pet } from "@/api/graphql/API";
import { useCurrentUser } from "@/hooks";
import { downloadPetImage } from "@/api/pet";
import { Avatar } from "@/components/common/Avatar";

type PetListViewProps = {
  pet?: Pet;
};

const PetListView: FC<PetListViewProps> = ({ pet }) => {
  const { data: user } = useCurrentUser();
  const { data: petImage, isFetching: petImageLoading } = useQuery({
    queryKey: ["pet-image", user?.userId, pet?.id],
    queryFn: () => downloadPetImage(user?.userId as string, pet?.id as string),
    enabled: !!user && !!pet,
  });
  return (
    <ListItemView
      key={pet?.id}
      onPress={() => router.push(`/my-pet/${pet?.id}`)}
      m="$2"
    >
      <XStack gap="$3" alignItems="center">
        <Avatar
          circular
          size="$4"
          loading={petImageLoading}
          accessibilityLabel={pet?.name}
          src={petImage?.href}
          defaultSource={petDefaultAvatar(pet?.petType)}
        />
        <YStack>
          <Text fontSize="$b3" fontWeight="$5">
            {pet?.name}
          </Text>
          <Text fontSize="$c1" color="$textSecondary" fontWeight="$4">
            {pet?.breedName ? `${pet.breedName} | ` : ""}
            {pet?.birthdate}
          </Text>
        </YStack>
      </XStack>
      <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
    </ListItemView>
  );
};

const ListItemView = styled(View, {
  backgroundColor: "#ffffff",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  elevationAndroid: 2,
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  borderRadius: 12,
  pressStyle: {
    backgroundColor: "$gray1",
  },
});

export default PetListView;
