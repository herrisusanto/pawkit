import { Pet } from "@/api/graphql/API";
import { fetchPetsByCustomer } from "@/api/pet";
import { Button } from "@/components/common/Button/Button";
import PetListView from "@/components/my-pet/pet-list-view/PetListView";
import { useCurrentUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { LogBox } from "react-native";
import { View, ScrollView } from "tamagui";

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
        {pets?.map((item) => <PetListView pet={item as Pet} />)}
      </ScrollView>
      <Link href="/pet-onboarding/about-your-pet" asChild>
        <Button type="primary" marginBottom={50}>
          + Add Pet
        </Button>
      </Link>
    </View>
  );
}

export default MyPet;
