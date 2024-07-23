import { Link, router, usePathname } from "expo-router";
import { Text, XStack, YStack } from "tamagui";
import { AddNewPet } from "../add-new-pet/AddNewPet";
import { PetAvatar } from "@/components/home/pet-avatar/PetAvatar";
import { TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchPetsByCustomer } from "@/api/pet";
import { Pet } from "@/api/graphql/API";
import { useCurrentUser } from "@/hooks";

export const MyPets = () => {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const { data: pets } = useQuery({
    queryKey: ["pets", user?.userId],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    enabled: !!user,
  });

  return (
    <YStack bg="#fff" rowGap="$4" py="$3">
      <Text fontSize="$b2" fontWeight="$7" px="$5">
        My Pets
      </Text>
      <XStack fw="wrap" columnGap="$6" rowGap="$4" px="$8">
        {pets?.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/my-pet/${item.id}`)}
            >
              <PetAvatar data={item as Pet} />
            </TouchableOpacity>
          );
        })}
        <Link href={`/pet-onboarding/about-your-pet?from=${pathname}`} asChild>
          <AddNewPet />
        </Link>
      </XStack>
    </YStack>
  );
};
