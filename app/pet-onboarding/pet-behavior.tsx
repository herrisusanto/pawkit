import { Button } from "@/components/common/Button/Button";
import {
  CheckButtonGroup,
  CheckButtonProps,
} from "@/components/common/CheckButtonGroup/CheckButtonGroup";
import { TextArea } from "@/components/common/TextArea/TextArea";
import { CareInfoForm } from "@/components/pet-onboarding/pet-behavior/care-info-form/CareInfoForm";
import { StepsIndicator } from "@/components/pet-onboarding/steps-indicator/StepsIndicator";
import { PredefinedBehavior } from "@/api/graphql/API";
import { fetchPet, modifyPet } from "@/api/pet";
import { useCurrentUser } from "@/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import {
  Input,
  ScrollView,
  Text,
  View,
  XStack,
  YStack,
  Button as ButtonTamagui,
} from "tamagui";
import { petOnboardingAtom } from "./state";

export default function DetailsYourPet() {
  const form = useFormContext();
  const { from } = useLocalSearchParams();
  const router = useRouter();
  const { control, handleSubmit, formState } = form;
  const { isValid } = formState;
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
  const mutationUpdatePet = useMutation({
    mutationFn: modifyPet,
  });
  const petBehaviorOptions = Object.keys(PredefinedBehavior).map((key) => ({
    value: key,
    children: key.replaceAll("_", " ").toLowerCase(),
  }));
  const [customPetBehavior, setCustomPetBehavior] = useState({
    value: "",
    error: "",
  });
  const [customPetBehaviorOptions, setCustomPetBehaviorOptions] = useState<
    CheckButtonProps[]
  >([]);

  const submit: SubmitHandler<FieldValues> = async ({ petType, ...values }) => {
    const formattedValues = {
      ...values,
      weightValue: Number(values["weightValue"]),
    };
    saveChanges(formattedValues);
  };

  const saveChanges: SubmitHandler<FieldValues> = async (values) => {
    try {
      if (petId) {
        await mutationUpdatePet.mutateAsync({
          name: petId,
          customerId: user?.userId as string,
          customerUsername: user?.username as string,
          weightValue: Number(values["weightValue"]),
          ...values,
        });
        setState({ petId: null });
        invalidateQueries();
        if (from) {
          if (fromPetOnboarding) {
            router.dismissAll();
            router.replace("/home");
          } else {
            router.navigate(from as string);
          }
        } else {
          router.navigate("/home");
        }
      }
    } catch (error) {
      console.log("mutationCreatepet", error);
    }
  };

  const invalidateQueries = async () => {
    queryClient.invalidateQueries({
      queryKey: ["pets", user?.userId],
    });
  };

  const handleAddBehavior = () => {
    setCustomPetBehaviorOptions((prev: any) => [
      ...prev,
      {
        key: Math.random().toString(36).slice(-8),
        value: customPetBehavior.value,
        children: customPetBehavior.value,
        isCustom: true,
      },
    ]);
    form.setValue("customBehaviors", [
      ...form.getValues()["customBehaviors"],
      customPetBehavior.value,
    ]);
    setCustomPetBehavior({
      value: "",
      error: "",
    });
  };

  const handleDeleteBehavior = (value: string) => {
    setCustomPetBehaviorOptions((prev: any) => [
      ...prev.filter((item: any) => item.value !== value),
    ]);
    form.setValue(
      "customBehaviors",
      Array.from(form.getValues()["customBehaviors"]).filter(
        (val) => val !== value
      )
    );
  };

  const handleInputCustomPetBehavior = (value: string) => {
    //Allow alphabet and space only.
    const regex = /^[A-Za-z\s]+$/;
    if (regex.test(value)) {
      setCustomPetBehavior({
        value,
        error: "",
      });
    } else {
      setCustomPetBehavior({
        value,
        error: "Invalid Pet Behavior format",
      });
    }
  };

  useEffect(() => {
    if (pet) {
      pet.predefinedBehaviors &&
        form.setValue("predefinedBehaviors", pet.predefinedBehaviors);
      if (pet.customBehaviors) {
        form.setValue("customBehaviors", pet.customBehaviors);
        setCustomPetBehaviorOptions(
          pet.customBehaviors.map((val) => ({
            key: Math.random().toString(36).slice(-8),
            value: val,
            children: val,
            isCustom: true,
          }))
        );
      }
      pet.isNeutered && form.setValue("isNeutered", String(pet.isNeutered));
      pet.isMicrochipped &&
        form.setValue("isMicrochipped", String(pet.isMicrochipped));
      pet.hasMedicalCondition &&
        form.setValue("hasMedicalCondition", String(pet.hasMedicalCondition));
      pet.additionalCareInstructions &&
        form.setValue(
          "additionalCareInstructions",
          pet.additionalCareInstructions
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pet]);

  return (
    <ScrollView>
      <View bg="$accent0">
        <YStack rowGap="$5" bg="#fff" pb="$5" px="$5" mb="$3">
          <StepsIndicator
            onBack={router.back}
            currentStep={3}
            onSkip={fromPetOnboarding ? handleSubmit(submit) : undefined}
          />
          <YStack rowGap="$6">
            {/** Avatar */}
            <YStack ai="center" rowGap="$2">
              <Text fontSize={22} fontWeight="$7">
                Pet Behavior & Care
              </Text>
              <Text fontSize="$c2" fontWeight="$4" color="$textThirdy">
                Tell us about your pet’s behavior and care instruction
              </Text>
            </YStack>
            {/** Inputs */}
            <YStack>
              <YStack rowGap="$4">
                <Text fontSize="$b3" fontWeight="$6">
                  Your pet's personality traits
                </Text>
                <View rowGap="$3">
                  <CheckButtonGroup
                    control={control}
                    name="predefinedBehaviors"
                    items={petBehaviorOptions}
                  />
                  <CheckButtonGroup
                    control={control}
                    name="customBehaviors"
                    items={customPetBehaviorOptions}
                    handleDeleteBehavior={handleDeleteBehavior}
                  />
                </View>
                <YStack gap="$2">
                  <Text fontSize="$b3" fontWeight="$6">
                    Other options
                  </Text>
                  <XStack alignItems="center" gap="$2">
                    <Input
                      onChangeText={(val) => handleInputCustomPetBehavior(val)}
                      value={customPetBehavior.value}
                      flex={1}
                      size="b3"
                      placeholder="Write here"
                    />
                    <ButtonTamagui
                      size="$b3"
                      onPress={() => handleAddBehavior()}
                      disabled={customPetBehavior.value === ""}
                      color={
                        customPetBehavior.value === ""
                          ? "$natural0"
                          : "$natural3"
                      }
                    >
                      Add
                    </ButtonTamagui>
                  </XStack>
                  {customPetBehavior.error && (
                    <Text fontSize="$c2" color="$error">
                      {customPetBehavior.error}
                    </Text>
                  )}
                </YStack>
              </YStack>
            </YStack>
          </YStack>
        </YStack>
        <YStack bg="#fff" rowGap="$3.5" p="$5">
          {/** Inputs */}
          <CareInfoForm />
          <TextArea
            textAlignVertical="top"
            control={control}
            name="additionalCareInstructions"
            label="Additional care instructions"
          />
          {/** Button */}
          <View flex={1} h={144} jc="center">
            <Button
              disabled={!isValid}
              type={isValid ? "primary" : "default"}
              h="$4"
              onPress={handleSubmit(submit)}
              loading={mutationUpdatePet.isPending}
            >
              Finish
            </Button>
          </View>
        </YStack>
      </View>
    </ScrollView>
  );
}
