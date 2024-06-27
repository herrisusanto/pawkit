import { View, Text, XStack, YStack, styled } from "tamagui";
import React, { useState } from "react";
import { Link } from "expo-router";
import { ChevronRight } from "@tamagui/lucide-icons";

const Records = () => {
  // temporary state
  const [vaccineHistoryData] = useState<any[]>([
    {
      id: 1,
      name: "Core Vaccine",
      admisteredDate: "03 Mar 2024",
      linkDetail: "/my-pet-records/vaccine-history/view/core-vaccine",
      linkUpdate: "/my-pet-records/vaccine-history/update/core-vaccine",
    },
    {
      id: 2,
      name: "Leptospirosis",
      admisteredDate: "",
      linkDetail: "/my-pet-records/vaccine-history/view/leptospirosis",
      linkUpdate: "/my-pet-records/vaccine-history/update/leptospirosis",
    },
    {
      id: 3,
      name: "Kennel Cough",
      admisteredDate: "05 Mar 2024",
      linkDetail: "/my-pet-records/vaccine-history/view/kennel-cough",
      linkUpdate: "/my-pet-records/vaccine-history/update/kennel-cough",
    },
    {
      id: 4,
      name: "Rabies",
      admisteredDate: "06 Mar 2024",
      linkDetail: "/my-pet-records/vaccine-history/view/rabies-vaccine",
      linkUpdate: "/my-pet-records/vaccine-history/update/rabies-vaccine",
    },
  ]);

  const [dewormingHistory] = useState<any[]>([
    {
      id: 1,
      name: "Dewormer",
      admisteredDate: "03 Mar 2024",
      linkDetail: "/my-pet-records/deworming-history/view/dewormer",
      linkUpdate: "/my-pet-records/deworming-history/update/dewormer",
    },
  ]);

  const [extParasitesControlHistory] = useState<any[]>([
    {
      id: 1,
      name: "Bravecto",
      admisteredDate: "03 Mar 2024",
      linkDetail: "/my-pet-records/external-parasites-control/view/bravecto",
      linkUpdate: "/my-pet-records/external-parasites-control/update/bravecto",
    },
  ]);

  const ListItemView = styled(View, {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "$4",
    paddingRight: "$4",
    paddingVertical: "$3",
    borderRadius: "$3",
    pressStyle: {
      backgroundColor: "$gray1",
    },
  });

  return (
    <YStack gap="$4">
      <XStack
        paddingHorizontal="$4"
        justifyContent="space-between"
        marginTop="$5"
      >
        <Text fontSize="$b3" fontWeight="$6">
          Vaccine History
        </Text>
        <Link href="/my-pet-records/vaccine-history">
          <Text fontSize="$b3" color="$primary">
            +Add
          </Text>
        </Link>
      </XStack>

      <YStack px="$4" gap="$2">
        {vaccineHistoryData.map((item) => (
          <ListItemView key={item.id}>
            <YStack rowGap="$1">
              <Text fontSize="$b3" fontWeight="$4" color="$textPrimary">
                {item.name}
              </Text>
              {item.admisteredDate && (
                <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                  {item.admisteredDate}
                </Text>
              )}
            </YStack>
            {item.admisteredDate ? (
              <Link href={item.linkDetail}>
                <XStack ai="center" gap="$1">
                  <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                    Detail
                  </Text>
                  <ChevronRight size="$1" color="$textSecondary" />
                </XStack>
              </Link>
            ) : (
              <Link href={item.linkUpdate}>
                <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                  +Add
                </Text>
              </Link>
            )}
          </ListItemView>
        ))}
      </YStack>

      <XStack
        paddingHorizontal="$4"
        justifyContent="space-between"
        marginTop="$5"
      >
        <Text fontSize="$b3" fontWeight="$6">
          Deworming History
        </Text>
        <Link href="/my-pet-records/deworming-history">
          <Text fontSize="$b3" color="$primary">
            +Add
          </Text>
        </Link>
      </XStack>

      <YStack px="$4" gap="$2">
        {dewormingHistory.map((item) => (
          <ListItemView key={item.id}>
            <YStack rowGap="$1">
              <Text fontSize="$b3" fontWeight="$4" color="$textPrimary">
                {item.name}
              </Text>
              {item.admisteredDate && (
                <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                  {item.admisteredDate}
                </Text>
              )}
            </YStack>
            {item.admisteredDate ? (
              <Link href={item.linkDetail}>
                <XStack ai="center" gap="$1">
                  <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                    Detail
                  </Text>
                  <ChevronRight size="$1" color="$textSecondary" />
                </XStack>
              </Link>
            ) : (
              <Link href={item.linkUpdate}>
                <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                  +Add
                </Text>
              </Link>
            )}
          </ListItemView>
        ))}
      </YStack>

      <XStack
        paddingHorizontal="$4"
        justifyContent="space-between"
        marginTop="$5"
      >
        <Text fontSize="$b3" fontWeight="$6">
          External Parasite Control
        </Text>
        <Link href="/my-pet-records/external-parasites-control">
          <Text fontSize="$b3" color="$primary">
            +Add
          </Text>
        </Link>
      </XStack>
      <YStack px="$4" gap="$2">
        {extParasitesControlHistory.map((item) => (
          <ListItemView key={item.id}>
            <YStack rowGap="$1">
              <Text fontSize="$b3" fontWeight="$4" color="$textPrimary">
                {item.name}
              </Text>
              {item.admisteredDate && (
                <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                  {item.admisteredDate}
                </Text>
              )}
            </YStack>
            {item.admisteredDate ? (
              <Link href={item.linkDetail}>
                <XStack ai="center" gap="$1">
                  <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                    Detail
                  </Text>
                  <ChevronRight size="$1" color="$textSecondary" />
                </XStack>
              </Link>
            ) : (
              <Link href={item.linkUpdate}>
                <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                  +Add
                </Text>
              </Link>
            )}
          </ListItemView>
        ))}
      </YStack>
    </YStack>
  );
};

export default Records;
