import { DetailYourPetForm } from "@/components/pet-onboarding/detail-your-pet-form/DetailYourPetForm";
import { StepsIndicator } from "@/components/pet-onboarding/steps-indicator/StepsIndicator";
import { useCurrentUser } from "@/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { ScrollView, YStack } from "tamagui";
import { petOnboardingAtom } from "./state";
import { addPet, fetchPet, modifyPet } from "@/api/pet";
import { useEffect } from "react";
import moment from "moment";
import { CreatePetInput, UpdatePetInput } from "@/api/graphql/API";

export default function DetailsYourPet() {
  const form = useFormContext();
  const { from } = useLocalSearchParams();
  const router = useRouter();
  const [state, setState] = useAtom(petOnboardingAtom);
  const { petId } = state;
  const fromPetOnboarding = from?.includes("/pet-onboarding");
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { data: pet } = useQuery({
    queryKey: ["pets", user?.userId, petId],
    queryFn: () => fetchPet(user?.userId as string, petId as string),
    enabled: !!user && !!petId,
  });
  const mutationCreatePet = useMutation({
    mutationFn: addPet,
  });
  const mutationUpdatePet = useMutation({
    mutationFn: modifyPet,
  });

  const goBack = () => {
    setState({ petId });
  };

  const nextStep = () => {
    router.push({ pathname: "/pet-onboarding/pet-behavior", params: { from } });
  };

  const handleSkip: SubmitHandler<FieldValues> = async (values) => {
    await saveChanges(values);
    setState({ petId: null });
    router.replace("/home");
  };

  const submit: SubmitHandler<FieldValues> = async (values) => {
    const formattedValues = {
      ...values,
      weightValue: Number(values["weightValue"]),
    } as CreatePetInput | UpdatePetInput;
    if (values["birthdate"]) {
      formattedValues["birthdate"] = moment(values["birthdate"]).format(
        "YYYY-MM-DD"
      );
    }
    await saveChanges(formattedValues);
    nextStep();
  };

  const saveChanges: SubmitHandler<FieldValues> = async (values) => {
    try {
      let pet;
      if (petId) {
        pet = await mutationUpdatePet.mutateAsync({
          name: petId,
          customerId: user?.userId as string,
          customerUsername: user?.username as string,
          ...values,
        });
      } else {
        pet = await mutationCreatePet.mutateAsync({
          name: values["name"],
          gender: values["gender"],
          breedName: values["breedName"],
          petType: values["petType"],
          customerId: user?.userId as string,
          customerUsername: user?.username as string,
          ...values,
          isDeleted: false,
        });
      }
      setState({ petId: pet?.name });
      invalidateQueries();
    } catch (error) {
      console.log("mutationCreatePet", JSON.stringify(error));
    }
  };

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["pets", user?.userId],
    });
  };

  useEffect(() => {
    if (pet) {
      pet.birthdate &&
        form.resetField("birthdate", { defaultValue: pet.birthdate });
      pet.breedName &&
        form.resetField("breedName", { defaultValue: pet.breedName });
      pet.weightValue &&
        form.resetField("weightValue", {
          defaultValue: String(pet.weightValue),
        });
      pet.additionalInfo &&
        form.resetField("additionalInfo", { defaultValue: pet.additionalInfo });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pet]);

  return (
    <ScrollView>
      <YStack rowGap="$5" flex={1} px="$5">
        <StepsIndicator
          onBack={goBack}
          currentStep={2}
          onSkip={fromPetOnboarding ? form.handleSubmit(handleSkip) : undefined}
        />
        <DetailYourPetForm onSubmit={submit} />
      </YStack>
    </ScrollView>
  );
}
