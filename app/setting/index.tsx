import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import {
  DocumentTextIcon,
  HelpIcon,
  InfoIcon,
  TrashIcon,
} from "@/components/common/Icons";
import { ArrowRightIcon } from "@/components/common/Icons/ArrowRightIcon";
import { router } from "expo-router";
import React, { useState } from "react";
import { LogBox } from "react-native";
import { Text, View, XStack, YStack, getToken, styled } from "tamagui";

function SettingPage() {
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  LogBox.ignoreLogs(["??"]);

  const ListItemView = styled(View, {
    // height: 52,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "$4",
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
  return (
    <View
      backgroundColor="$bgGrey"
      flex={1}
      justifyContent="space-between"
      paddingHorizontal="$4"
    >
      <YStack gap="$3" paddingVertical="$4">
        <ListItemView
          onPress={() => router.push("/setting/term-and-conditions")}
        >
          <XStack gap="$3" alignItems="center">
            <DocumentTextIcon strokeColor={getToken("$primary")} />

            <Text fontSize="$b3" fontWeight="$5">
              Terms of Use
            </Text>
          </XStack>
          <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
        </ListItemView>
        <ListItemView onPress={() => router.push("/setting/about-us")}>
          <XStack gap="$3" alignItems="center">
            <InfoIcon strokeColor={getToken("$primary")} />

            <Text fontSize="$b3" fontWeight="$5">
              About Us
            </Text>
          </XStack>
          <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
        </ListItemView>
        <ListItemView onPress={() => router.push("/setting/help-center")}>
          <XStack gap="$3" alignItems="center">
            <HelpIcon strokeColor={getToken("$primary")} />

            <Text fontSize="$b3" fontWeight="$5">
              Help Center
            </Text>
          </XStack>
          <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
        </ListItemView>
        <ListItemView onPress={() => setOpenConfirmModal(true)}>
          <XStack gap="$3" alignItems="center">
            <TrashIcon strokeColor={getToken("$primary")} />

            <Text fontSize="$b3" fontWeight="$5">
              Delete Account
            </Text>
          </XStack>
          <ArrowRightIcon strokeColor={getToken("$textPrimary")} />
        </ListItemView>
      </YStack>

      <ConfirmModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        title="Delete Account"
        subTitle="Are you sure you want to delete this account? This action cannot be
        recovered."
        onConfirm={() => setOpenConfirmModal(false)}
        onCancel={() => setOpenConfirmModal(false)}
      />
    </View>
  );
}

export default SettingPage;
