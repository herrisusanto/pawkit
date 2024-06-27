import { AboutYourPetForm } from "@/components/pet-onboarding/about-your-pet-form/AboutYourPetForm";
import { StepsIndicator } from "@/components/pet-onboarding/steps-indicator/StepsIndicator";
import { fetchPet } from "@/api/pet";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { ScrollView, View, YStack } from "tamagui";
import { petOnboardingAtom } from "./state";
import { useCurrentUser } from "@/hooks";
import { useEffect } from "react";
import { PetType } from "@/api/graphql/API";

export default function AboutYourPet() {
  const form = useFormContext();
  const { from } = useLocalSearchParams();
  const [state, setState] = useAtom(petOnboardingAtom);
  const { petId } = state;
  const fromPetOnboarding = from?.includes("/pet-onboarding");
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const { data: pet } = useQuery({
    queryKey: ["pets", user?.userId, petId],
    queryFn: () => fetchPet(user?.userId as string, petId as string),
    enabled: !!petId,
  });

  const goBack = () => {
    setState({ petId: null });
  };

  const nextStep = () => {
    router.push({
      pathname: "/pet-onboarding/details-your-pet",
      params: { from },
    });
  };

  const handleSkip: SubmitHandler<FieldValues> = async (values) => {
    await saveChanges(values);
    setState({ petId: null });
    router.replace("/home");
  };

  const submit: SubmitHandler<FieldValues> = async (values) => {
    await saveChanges(values);
    nextStep();
  };

  const saveChanges: SubmitHandler<FieldValues> = async (values) => {
    try {
      setState({
        petId: petId ?? null,
        petType: PetType[values["petType"] as keyof typeof PetType],
      });
    } catch (error) {
      console.log("mutationCreatepet", error);
    }
  };

  useEffect(() => {
    form.reset();
    if (pet) {
      pet.name && form.setValue("name", pet.name);
      pet.gender && form.setValue("gender", pet.gender);
      pet.petType && form.setValue("petType", pet.petType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pet]);

  return (
    <ScrollView>
      <View flex={1} alignItems="center" px="$5">
        <YStack rowGap="$3">
          <StepsIndicator
            onBack={goBack}
            currentStep={1}
            onSkip={
              fromPetOnboarding ? form.handleSubmit(handleSkip) : undefined
            }
          />
          <AboutYourPetForm onSubmit={form.handleSubmit(submit)} />
        </YStack>
      </View>
    </ScrollView>
  );
}
