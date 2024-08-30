import { Pet } from "@/api/graphql/API";
import { downloadPetImage, fetchPet } from "@/api/pet";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/common/Button/Button";
import { Header } from "@/components/common/Header/Header";
import { DefaultAvatarIcon } from "@/components/common/Icons";
import AboutPet from "@/components/my-pet/about-pet/AboutPet";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { useCurrentUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { LogBox } from "react-native";
import { ScrollView, View, styled } from "tamagui";

function MyAccount() {
  LogBox.ignoreLogs(["??"]);
  const [isUserCreated] = useState<boolean>(true);
  const { data: user } = useCurrentUser();
  const { id } = useLocalSearchParams();

  const { data: pet } = useQuery({
    queryKey: ["pets", user?.userId, id],
    queryFn: () => fetchPet(id as string),
    enabled: !!user && !!id,
  });

  const { data: petImage, isLoading: isLoadingImage } = useQuery({
    queryKey: ["pet-image", user?.userId, pet?.id],
    queryFn: () => downloadPetImage(user?.userId as string, pet?.id as string),
    enabled: !!user && !!pet,
  });

  return (
    <ScrollView backgroundColor="$bgGrey" flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title={pet?.name ?? ""} />;
          },
        }}
      />

      <ProfileContainer>
        {isUserCreated ? (
          <>
            <View position="relative">
              <Avatar
                circular
                src={petImage?.href}
                loading={isLoadingImage}
                accessibilityLabel={pet?.name}
                defaultSource={petDefaultAvatar(pet?.petType)}
                size="$8"
              />
            </View>
          </>
        ) : (
          <>
            <View>
              <DefaultAvatarIcon />
            </View>
            <Button type="secondary" height={36} width={221}>
              Create My Profile
            </Button>
          </>
        )}
      </ProfileContainer>
      <AboutPet data={pet as Pet} />
    </ScrollView>
  );
}

const ProfileContainer = styled(View, {
  height: 132,
  width: "100%",
  backgroundColor: "#fff",

  paddingVertical: "$4",
  paddingHorizontal: "$4",
  alignItems: "center",
  justifyContent: "center",
});

export default MyAccount;
