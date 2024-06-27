import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { Container } from "@/components/common/Container/Container";
import { YStack, View, Text, styled, Separator } from "tamagui";
import { Button } from "@/components/common/Button/Button";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

const ViewExtParasitesControlHistoryItem = () => {
  const ListItemView = styled(View, {
    backgroundColor: "$background",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: "$3",
    pressStyle: {
      backgroundColor: "$gray1",
    },
  });

  const { id } = useLocalSearchParams();
  const [openDeleteRecordModal, setOpenDeleteRecordModal] =
    useState<boolean>(false);

  const slugToHeaderTitle = (str: any) => {
    return str
      .toLowerCase()
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <View bg="$background" flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title={slugToHeaderTitle(id)} />;
          },
        }}
      />

      <Container flex={1}>
        <YStack flex={1}>
          <ListItemView>
            <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
              Product Name
            </Text>
            <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
              Bravecto
            </Text>
          </ListItemView>
          <Separator />
          <ListItemView>
            <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
              Admistered Date
            </Text>
            <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
              03 Mar 2024
            </Text>
          </ListItemView>
          <Separator />

          <ListItemView>
            <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
              Description
            </Text>
            <Text
              fontSize="$c1"
              fontWeight="$6"
              color="$textPrimary"
              maxWidth="60%"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
              perspiciatis quaerat eveniet modi cum asperiores earum harum animi
              delectus exercitationem.
            </Text>
          </ListItemView>
          <Separator />
        </YStack>

        <YStack>
          <Link href={`/my-pet-records/deworming-history/update/${id}`} asChild>
            <Button type="secondary" mt="$4">
              Edit Record
            </Button>
          </Link>
          <Button
            type="secondaryError"
            mt="$4"
            onPress={() => setOpenDeleteRecordModal(true)}
          >
            Delete Record
          </Button>
        </YStack>
      </Container>
      <ConfirmModal
        open={openDeleteRecordModal}
        onClose={() => setOpenDeleteRecordModal(false)}
        title="Delete Record"
        subTitle="Are you sure you want to delete this record? This cannot be
        recovered."
        onConfirm={() => setOpenDeleteRecordModal(false)}
        onCancel={() => setOpenDeleteRecordModal(false)}
      />
    </View>
  );
};

export default ViewExtParasitesControlHistoryItem;
