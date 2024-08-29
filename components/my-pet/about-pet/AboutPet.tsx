import {
  View,
  Text,
  XStack,
  YStack,
  styled,
  Separator,
  getToken,
} from "tamagui";
import React, { useState } from "react";
import { CheckIcon } from "@/components/common/Icons";
import { TouchableOpacity } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { petOnboardingAtom } from "@/app/pet-onboarding/state";
import { ChevronRight, Trash2 } from "@tamagui/lucide-icons";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import { useCurrentUser } from "@/hooks";
import { removePet } from "@/api/pet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pet } from "@/api/graphql/API";
import moment from "moment";
import PopupController from "@/components/common/GlobalPopupError/PopUpController";

type AboutPetProps = {
  data?: Pet;
};

const AboutPet: React.FC<AboutPetProps> = ({ data }) => {
  const setState = useSetAtom(petOnboardingAtom);
  const { data: user } = useCurrentUser();

  const queryClient = useQueryClient();

  const mutationDeletePet = useMutation({
    mutationFn: ({ id }: { id: string }) => removePet(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["pet-image", user?.userId, data?.id],
      });
    },
  });

  const [openDeletePetModal, setOpenDeletePetModal] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleUpdate = () => {
    if (data) {
      setState({ petId: data?.id as string });
      router.push({
        pathname: "/pet-onboarding/about-your-pet",
        params: { from: pathname },
      });
    }
  };

  const handleRemove = async () => {
    try {
      await mutationDeletePet.mutateAsync({
        id: (data?.id as string) ?? "",
      });
      router.canGoBack() && router.back();
      // eslint-disable-next-line
    } catch (error) {
      PopupController.showGlobalPopup();
    }
  };

  const calculateAge = (birthdate?: string | null) => {
    if (birthdate) {
      const birth = moment(birthdate);
      const today = moment();
      const years = today.diff(birth, "years");
      birth.add(years, "years");
      const months = today.diff(birth, "months");
      birth.add(months, "months");
      const days = today.diff(birth, "days");

      const formattedYears =
        years > 0 ? `${years} year${years !== 1 ? "s" : ""}, ` : "";
      const formattedMonths =
        months > 0 ? `${months} month${months !== 1 ? "s" : ""}, ` : "";

      const ageString =
        `${formattedYears}` +
        `${formattedMonths}` +
        `${days} day${days !== 1 ? "s" : ""}`;

      return ageString;
    } else {
      return "-";
    }
  };

  return (
    <View>
      <XStack
        paddingHorizontal="$4"
        justifyContent="space-between"
        marginTop="$5"
        marginBottom="$3"
      >
        <Text fontSize="$b3" fontWeight="600">
          About Pet
        </Text>
        <TouchableOpacity onPress={handleUpdate}>
          <Text fontSize="$b3" color={data ? "$primary" : "$natural0"}>
            Update
          </Text>
        </TouchableOpacity>
      </XStack>

      <YStack>
        <ListItemView>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            Pet Name
          </Text>
          <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
            {data?.name}
          </Text>
        </ListItemView>
        <Separator />
        <ListItemView>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            Gender
          </Text>
          <Text
            fontSize="$c1"
            fontWeight="$6"
            color="$textPrimary"
            tt="capitalize"
          >
            {data?.gender}
          </Text>
        </ListItemView>
        <Separator />

        <ListItemView>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            Age
          </Text>
          <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
            {calculateAge(data?.birthdate)}
          </Text>
        </ListItemView>
        <Separator />

        <ListItemView>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            Birthday
          </Text>
          <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
            {data?.birthdate || "-"}
          </Text>
        </ListItemView>
        <Separator />
        <ListItemView>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            Pet Breed
          </Text>
          <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
            {data?.breedName || "-"}
          </Text>
        </ListItemView>
        <Separator />
        <ListItemView>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            Pet Weight
          </Text>
          <Text fontSize="$c1" fontWeight="$6" color="$textPrimary">
            {data?.weightValue}
            {data?.weightUnit}
          </Text>
        </ListItemView>
        <Separator />
        <ListItemView>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            Additional Information
          </Text>
          <Text
            fontSize="$c1"
            fontWeight="$6"
            color="$textPrimary"
            maxWidth="60%"
          >
            {data?.additionalInfo}
          </Text>
        </ListItemView>
        <Separator />
      </YStack>

      <SectionContainer>
        <Text fontSize="$b3" fontWeight="600">
          Pet's Personality Trait
        </Text>
        <XStack flexWrap="wrap" gap="$3">
          {(data?.predefinedBehaviors || []).map((behavior: any) => (
            <PetBehaviorChip key={behavior}>
              <Text color="$textSecondary">
                {behavior.toLowerCase().replaceAll("_", " ")}
              </Text>
            </PetBehaviorChip>
          ))}
          {(data?.customBehaviors || []).map((behavior: any) => (
            <PetBehaviorChip key={behavior}>
              <Text color="$textSecondary">
                {behavior.toLowerCase().replaceAll("_", " ")}
              </Text>
            </PetBehaviorChip>
          ))}
        </XStack>
      </SectionContainer>

      <SectionContainer>
        <Text fontSize="$b3" fontWeight="600">
          Care Information
        </Text>
        <YStack gap="$4">
          <ListItemViewCare>
            <Text fontSize="$c1" fontWeight="$4" color="$textPrimary">
              Neutered?
            </Text>
            <CareInfoCheckbox>
              <CheckIcon strokeColor={getToken("$textSecondary")} />
              <Text fontSize="$c1" fontWeight="$6" color="$textSecondary">
                {data?.isNeutered ? "Yes" : "No"}
              </Text>
            </CareInfoCheckbox>
          </ListItemViewCare>
          {/* Alergies? */}
          <ListItemViewCare>
            <Text fontSize="$c1" fontWeight="$4" color="$textPrimary">
              Microchipped?
            </Text>
            <CareInfoCheckbox>
              <CheckIcon strokeColor={getToken("$textSecondary")} />
              <Text fontSize="$c1" fontWeight="$6" color="$textSecondary">
                {data?.isMicrochipped ? "Yes" : "No"}
              </Text>
            </CareInfoCheckbox>
          </ListItemViewCare>
          {/* Vaccinated? */}
          <ListItemViewCare>
            <Text fontSize="$c1" fontWeight="$4" color="$textPrimary">
              Medication?
            </Text>
            <CareInfoCheckbox>
              <CheckIcon strokeColor={getToken("$textSecondary")} />
              <Text fontSize="$c1" fontWeight="$6" color="$textSecondary">
                {data?.hasMedicalCondition ? "Yes" : "No"}
              </Text>
            </CareInfoCheckbox>
          </ListItemViewCare>
          {data?.additionalCareInstructions && (
            <ListItemViewCare>
              <YStack gap="$2">
                <Text fontSize="$c1" fontWeight="$5" color="$textPrimary">
                  Additional care instructions
                </Text>
                <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
                  {data?.additionalCareInstructions}
                </Text>
              </YStack>
            </ListItemViewCare>
          )}
        </YStack>
      </SectionContainer>

      <ListItemView
        bg="$background"
        mt="$3"
        mb="$5"
        onPress={() => setOpenDeletePetModal(true)}
      >
        <XStack ai="center" gap="$2">
          <Trash2 size="$1" />
          <Text fontSize="$c1" fontWeight="$4">
            Remove Pet
          </Text>
        </XStack>
        <ChevronRight />
      </ListItemView>

      <ConfirmModal
        open={openDeletePetModal}
        onClose={() => setOpenDeletePetModal(false)}
        title="Delete Pet"
        subTitle="Are you sure you want to delete this pet? This cannot be recovered."
        onConfirm={() => {
          handleRemove();
          setOpenDeletePetModal(false);
        }}
        onCancel={() => setOpenDeletePetModal(false)}
      />
    </View>
  );
};

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

const ListItemViewCare = styled(View, {
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

const SectionContainer = styled(View, {
  padding: "$4",
  marginTop: "$2",
  backgroundColor: "#fff",
  gap: "$4",
});

const PetBehaviorChip = styled(View, {
  paddingVertical: "$2",
  paddingHorizontal: "$3",
  backgroundColor: "$bgCard",
  borderRadius: 50,
});

const CareInfoCheckbox = styled(XStack, {
  gap: "$2",
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  backgroundColor: "$bgCard",
  borderRadius: "$3",
});

export default AboutPet;
