import { Button } from "@/components/common/Button/Button";
import { CameraIcon } from "@/components/common/Icons";
import { images } from "@/constants";
import { useUserAttributes } from "@/hooks";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { LogBox, TouchableOpacity } from "react-native";
import { Avatar, Separator, Text, View, XStack, YStack, styled } from "tamagui";

function MyProfileDetail() {
  LogBox.ignoreLogs(["??"]);
  const [isUserCreated] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    phone_number: string;
  }>({
    name: "",
    email: "",
    phone_number: "",
  });

  const userAttributes = useUserAttributes();

  const router = useRouter();

  const ListItemView = styled(View, {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "$4",
    paddingRight: "$4",
    paddingVertical: "$3",
    pressStyle: {
      backgroundColor: "$gray1",
    },
  });

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

  useEffect(() => {
    if (userAttributes) {
      setUserInfo({
        name: userAttributes?.name ?? "",
        phone_number: userAttributes?.phone_number ?? "",
        email: userAttributes?.email ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAttributes]);

  return (
    <View backgroundColor="$bgGrey" flex={1}>
      <ProfileContainer>
        {isUserCreated ? (
          <>
            <View position="relative">
              <Avatar circular size="$8" height={60} width={60}>
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src={userAttributes?.picture ?? images.defaultProfile}
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
            <Avatar circular size="$8" height={60} width={60} mb="$3">
              <Avatar.Image
                accessibilityLabel="Cam"
                src={images.defaultProfile}
              />
            </Avatar>
            <Button type="secondary" height={36} width={221}>
              Create My Profile
            </Button>
          </>
        )}
      </ProfileContainer>

      <XStack
        paddingHorizontal="$4"
        justifyContent="space-between"
        marginTop="$5"
        marginBottom="$3"
      >
        <Text fontSize="$b3" fontWeight="600">
          Personal Data
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/my-profile/update-profile")}
        >
          <Text fontSize="$b3" color="$primary">
            Update
          </Text>
        </TouchableOpacity>
      </XStack>

      <YStack justifyContent="space-between" flex={1} paddingBottom={50}>
        <YStack>
          <ListItemView>
            <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
              Full Name
            </Text>
            <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
              {userInfo.name}
            </Text>
          </ListItemView>
          <Separator />
          <ListItemView>
            <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
              Email
            </Text>
            <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
              {userInfo.email}
            </Text>
          </ListItemView>
          <Separator />

          <ListItemView>
            <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
              Phone Number
            </Text>
            <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
              {userInfo.phone_number}
            </Text>
          </ListItemView>
        </YStack>
      </YStack>
    </View>
  );
}

export default MyProfileDetail;
