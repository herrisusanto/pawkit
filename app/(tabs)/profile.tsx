import { Button } from "@/components/common/Button/Button";
import {
  DefaultAvatarIcon,
  LogoutIcon,
  PawIcon,
  AboutUsIcon,
  TermsAndConditionsIcon,
  TrashIcon,
} from "@/components/common/Icons";
import { ArrowRightIcon } from "@/components/common/Icons/ArrowRightIcon";
import { images } from "@/constants";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { LogBox } from "react-native";
import {
  AlertDialog,
  Avatar,
  Image,
  Separator,
  Text,
  View,
  XStack,
  YStack,
  getToken,
  styled,
} from "tamagui";
import { signOut } from "aws-amplify/auth";
import { authAtom } from "../auth";
import { useSetAtom } from "jotai";
import { useCurrentUser, useUserAttributes } from "@/hooks";
import { Phone } from "@tamagui/lucide-icons";
import { disableUser } from "@/api/admin";
import { useMutation } from "@tanstack/react-query";

function Profile() {
  LogBox.ignoreLogs(["??"]);
  const setAuthState = useSetAtom(authAtom);
  const { data: user } = useCurrentUser();
  const router = useRouter();
  const [isUserCreated] = useState<boolean>(true);
  const [alertType, setAlertType] = useState<"logout" | "deleteAccount" | null>(
    null
  );

  const userAttributes = useUserAttributes();

  const mutationDisableUser = useMutation({
    mutationFn: disableUser,
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      setAuthState({ step: "SIGN_IN" });
      router.replace("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await mutationDisableUser.mutateAsync(user?.username!);
      handleSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlertAction = () => {
    if (alertType === "logout") {
      handleSignOut();
    } else {
      handleDeleteAccount();
    }
  };
  const profileList = [
    {
      link: "/my-pet",
      Icon: () => <PawIcon strokeColor={getToken("$primary")} />,
      label: "My Pets",
    },
    {
      link: "/setting/about-us",
      Icon: () => <AboutUsIcon strokeColor={getToken("$primary")} />,
      label: "About Us",
    },
    {
      link: "/setting/term-and-conditions",
      Icon: () => <TermsAndConditionsIcon strokeColor={getToken("$primary")} />,
      label: "Terms And Conditions",
    },
  ];

  const alertTitle = alertType === "logout" ? "Logging Out" : "Delete Account";
  const alertDescription =
    alertType === "logout"
      ? "Are you sure you want to log out?"
      : "Are you sure want to delete your account?\nThis cannot be reversed";
  const alertCancelLabel = alertType === "logout" ? "No" : "Cancel";
  const alertActionLabel = alertType === "logout" ? "Yes" : "Delete Account";

  return (
    <AlertDialog>
      <View backgroundColor="#fff" flex={1}>
        <BackgroundTop />

        <View paddingHorizontal="$4" marginBottom="$5" marginTop="$-12">
          <ProfileContainer>
            {isUserCreated ? (
              <>
                <XStack width="100%" gap="$3">
                  <Avatar circular size="$5" height={60} width={60}>
                    <Avatar.Image
                      accessibilityLabel="Cam"
                      src={
                        userAttributes?.picture ?? images.defaultAvatarCircle
                      }
                    />
                    <Avatar.Fallback backgroundColor="$blue10" />
                  </Avatar>
                  <YStack gap="$2">
                    <Text fontWeight="$7">{userAttributes?.name}</Text>
                    <XStack columnGap="$2" alignItems="center">
                      <Phone size={16} color="$natural1" />
                      <Text
                        fontWeight="$4"
                        fontSize="$c1"
                        color="$textSecondary"
                      >
                        {userAttributes?.phone_number}
                      </Text>
                    </XStack>
                  </YStack>
                </XStack>
                <Button
                  type="secondary"
                  height={36}
                  width={221}
                  onPress={() => router.push("/my-profile/")}
                >
                  View My Profile
                </Button>
              </>
            ) : (
              <>
                <View>
                  <View style={{ width: 60, aspectRatio: "1/1" }}>
                    <DefaultAvatarIcon />
                  </View>
                </View>
                <Button type="secondary" height={36} width={221}>
                  Create My Profile
                </Button>
              </>
            )}
          </ProfileContainer>
        </View>
        {profileList.map((item) => (
          <View key={item.link}>
            <Link href={item.link} asChild>
              <ListItemView>
                <XStack gap="$3" alignItems="center">
                  <View style={{ width: 24, aspectRatio: "1/1" }}>
                    <item.Icon />
                  </View>

                  <Text fontSize="$b3" fontWeight="$5">
                    {item.label}
                  </Text>
                </XStack>
                <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
              </ListItemView>
            </Link>
            <Separator />
          </View>
        ))}
        <AlertDialog.Trigger asChild>
          <ListItemView onPress={() => setAlertType("logout")}>
            <XStack gap="$3" alignItems="center">
              <LogoutIcon strokeColor={getToken("$primary")} />
              <Text fontSize="$b3" fontWeight="$5">
                Logout
              </Text>
            </XStack>
            <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
          </ListItemView>
        </AlertDialog.Trigger>
        <View flex={1} />
        <AlertDialog.Trigger asChild my="$6">
          <ListItemView onPress={() => setAlertType("deleteAccount")}>
            <XStack gap="$3" alignItems="center">
              <TrashIcon strokeColor={getToken("$error")} />
              <Text fontSize="$b3" fontWeight="$5" color="$error">
                Delete Account
              </Text>
            </XStack>
            <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
          </ListItemView>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
            minWidth={320}
          >
            <YStack gap="$4" alignItems="center">
              <AlertDialog.Title fontSize="$b2" fontWeight="700">
                {alertTitle}
              </AlertDialog.Title>
              <AlertDialog.Description>
                <YStack gap="$4" alignItems="center">
                  <Image
                    source={{
                      uri: images.dogIllustration,
                      width: 120,
                      height: 120,
                    }}
                    height={120}
                    width={120}
                  />
                  <Text fontSize="$c1" fontWeight="600" textAlign="center">
                    {alertDescription}
                  </Text>
                </YStack>
              </AlertDialog.Description>
              <XStack gap="$3" justifyContent="center">
                <AlertDialog.Cancel asChild>
                  <Button flex={1} type="secondary">
                    {alertCancelLabel}
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild onPress={handleAlertAction}>
                  <Button
                    flex={1}
                    type="primary"
                    bg={alertType === "logout" ? "$primary" : "$error"}
                  >
                    {alertActionLabel}
                  </Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </View>
    </AlertDialog>
  );
}

const ListItemView = styled(View, {
  height: 58,
  backgroundColor: "#ffffff",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "$4",
  paddingRight: "$4",
  pressStyle: {
    backgroundColor: "$gray1",
  },
});

const BackgroundTop = styled(View, {
  backgroundColor: "$primary",
  height: 148,
  width: "100%",
});

const ProfileContainer = styled(View, {
  height: 140,
  width: "100%",
  backgroundColor: "#fff",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  elevationAndroid: 2,
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  borderRadius: "$4",
  paddingVertical: "$4",
  paddingHorizontal: "$4",
  alignItems: "center",
  justifyContent: "space-between",
});

export default Profile;
