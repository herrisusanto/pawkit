import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, View, styled } from "tamagui";

import { Pet } from "@/api/graphql/API";
import { downloadPetImage, fetchPet, uploadPetImage } from "@/api/pet";
import { AvatarPicker } from "@/components/common/AvatarPicker/AvatarPicker";
import { Button } from "@/components/common/Button/Button";
import { Header } from "@/components/common/Header/Header";
import { DefaultAvatarIcon } from "@/components/common/Icons";
import AboutPet from "@/components/my-pet/about-pet/AboutPet";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import { useCurrentUser } from "@/hooks";

function MyAccount() {
  LogBox.ignoreLogs(["??"]);
  const queryClient = useQueryClient();
  const [isUserCreated] = useState<boolean>(true);
  const { data: user } = useCurrentUser();
  const { id } = useLocalSearchParams();
  const [status, requestPermission] = useMediaLibraryPermissions();

  const [petImageUrl, setPetImageUrl] = useState<string>();

  const { mutateAsync: handleUploadPetImage, isPending } = useMutation({
    mutationFn: ({
      userId,
      petId,
      file,
    }: {
      userId: string;
      petId: string;
      file: File;
    }) => uploadPetImage(userId, petId, file),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["pet-image", user?.userId, pet?.id],
      });
    },
  });

  const handleImagePicker = async () => {
    if (status?.granted) {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });

      const firstAsset = result.assets?.[0];
      setPetImageUrl(firstAsset?.uri);
      const image = firstAsset?.uri;
      if (image && String(image).startsWith("file:///")) {
        const petName = pet?.name as string;
        const imageFile = await fetch(image);
        const blob = await imageFile.blob();
        const file = new File([blob], petName);
        await handleUploadPetImage({
          userId: user?.userId as string,
          petId: pet?.id!,
          file,
        });
      }
    } else {
      await requestPermission();
    }
  };

  const { data: pet } = useQuery({
    queryKey: ["pets", user?.userId, id],
    queryFn: () => fetchPet(id as string),
    enabled: !!user && !!id,
  });

  const { data: petImage } = useQuery({
    queryKey: ["pet-image", user?.userId, pet?.id],
    queryFn: () => downloadPetImage(user?.userId as string, pet?.id as string),
    enabled: !!user && !!pet,
  });

  useEffect(() => {
    if (petImage) {
      setPetImageUrl(petImage.href);
    }
  }, [petImage]);

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
              <AvatarPicker
                source={petImageUrl ?? petDefaultAvatar(pet?.petType)}
                onImagePicker={handleImagePicker}
                isLoading={isPending}
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
