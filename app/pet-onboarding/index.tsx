import { Button } from "@/components/common/Button/Button";
import FullScreenLoadingState from "@/components/common/FullScreenLoadingState/FullScreenLoadingState";
import { images } from "@/constants";
import { fetchPetsByCustomer } from "@/api/pet";
import { useCurrentUser } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { Redirect, usePathname, useRouter } from "expo-router";
import { Image, Text, View } from "tamagui";

export default function PetOnboarding() {
  const { data: user } = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();
  const { data: petsCount = 0, isPending = true } = useQuery({
    queryKey: ["pets_count", user?.userId],
    queryFn: () => fetchPetsByCustomer(user?.userId as string),
    select(data) {
      return data?.length;
    },
    enabled: !!user,
  });

  const handleCreatePetProfile = () => {
    router.push({
      pathname: "/pet-onboarding/about-your-pet",
      params: { from: pathname },
    });
  };

  return isPending ? (
    <FullScreenLoadingState />
  ) : petsCount ? (
    <Redirect href="/home" />
  ) : (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      px="$5"
      rowGap="$6"
    >
      <Image
        source={{ uri: images.petOnboarding }}
        resizeMode="contain"
        style={{
          width: "100%",
          maxWidth: 340,
        }}
      />
      <Text fontSize="$b3" fontWeight="$5" textAlign="center" maxWidth={275}>
        You have no active pet profile. Let’s create a pet profile for your pet
        to get started.
      </Text>
      <Button type="primary" width="100%" onPress={handleCreatePetProfile}>
        Create Pet Profile
      </Button>
    </View>
  );
}
