import { Pet } from "@/api/graphql/API";
import { fetchPet } from "@/api/pet";
import { Button } from "@/components/common/Button/Button";
import { Header } from "@/components/common/Header/Header";
import { CameraIcon, DefaultAvatarIcon } from "@/components/common/Icons";
import AboutPet from "@/components/my-pet/about-pet/AboutPet";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { useCurrentUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { LogBox } from "react-native";
import { Avatar, ScrollView, View, styled } from "tamagui";

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

  console.log(pet?.s3ImageKey);

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
              <Avatar circular size="$8" height={60} width={60}>
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src={pet?.imageUrl ?? petDefaultAvatar(pet?.petType)}
                />
                <Avatar.Fallback backgroundColor="$blue10" />
              </Avatar>
              <CameraIconContainer>
                <CameraIcon strokeColor="#fff" />
              </CameraIconContainer>
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

const CameraIconContainer = styled(View, {
  width: 28,
  height: 28,
  backgroundColor: "$primary",
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: 0,
  right: 0,
});

export default MyAccount;
