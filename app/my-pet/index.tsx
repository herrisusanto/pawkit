import { fetchPetsByCustomer } from "@/api/pet";
import { Button } from "@/components/common/Button/Button";
import { ArrowRightIcon } from "@/components/common/Icons/ArrowRightIcon";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { useCurrentUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import React from "react";
import { LogBox } from "react-native";
import {
  Avatar,
  Text,
  View,
  XStack,
  YStack,
  getToken,
  styled,
  ScrollView,
} from "tamagui";

function MyPet() {
  LogBox.ignoreLogs(["??"]);
  const { data: user } = useCurrentUser();
  const { data: pets } = useQuery({
    queryKey: ["pets", user?.userId],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    enabled: !!user,
  });

  return (
    <View
      backgroundColor="$bgGrey"
      flex={1}
      justifyContent="space-between"
      paddingHorizontal="$4"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {pets?.map((item) => (
          <ListItemView
            key={item.name}
            onPress={() => router.push(`/my-pet/${item.name}`)}
            m="$2"
          >
            <XStack gap="$3" alignItems="center">
              <Avatar circular size="$4">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src={item.imageUrl ?? petDefaultAvatar(item.petType)}
                />
                <Avatar.Fallback backgroundColor="$blue10" />
              </Avatar>

              <YStack>
                <Text fontSize="$b3" fontWeight="$5">
                  {item.name}
                </Text>
                <Text fontSize="$c1" color="$textSecondary" fontWeight="$4">
                  {item.breedName ? `${item.breedName} | ` : ""}
                  {item.birthdate}
                </Text>
              </YStack>
            </XStack>
            <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
          </ListItemView>
        ))}
      </ScrollView>
      <Link href="/pet-onboarding/about-your-pet" asChild>
        <Button type="primary" marginBottom={50}>
          + Add Pet
        </Button>
      </Link>
    </View>
  );
}

const ListItemView = styled(View, {
  // height: 52,
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

export default MyPet;
