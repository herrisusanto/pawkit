import { petOnboardingAtom } from "@/app/pet-onboarding/state";
import { Button } from "@/components/common/Button/Button";
import { DatePicker } from "@/components/common/DatePicker/DatePicker";
import { InputNumber } from "@/components/common/InputNumber/InputNumber";
import { Select } from "@/components/common/Select/Select";
import { TextArea } from "@/components/common/TextArea/TextArea";
import { PetType } from "@/api/graphql/API";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Text, View, XStack, YStack } from "tamagui";
import { fetchBreedsByPetType } from "@/api/breed";
import moment from "moment";

type DetailYourPetFormProps = {
  onSubmit: SubmitHandler<any>;
};

export const DetailYourPetForm: React.FC<DetailYourPetFormProps> = ({
  onSubmit,
}) => {
  const state = useAtomValue(petOnboardingAtom);
  const { petType } = state;
  const { control, handleSubmit, formState } = useFormContext();
  const { isValid, isSubmitting } = formState;
  const { data: breeds } = useQuery({
    queryKey: ["breeds", petType],
    queryFn: () => fetchBreedsByPetType(petType as PetType),
    select(data) {
      return data?.map((breed) => ({ label: breed.name, value: breed.name }));
    },
    enabled: !!petType,
  });

  return (
    <YStack rowGap="$5">
      <YStack rowGap="$6">
        {/** Avatar */}
        <YStack ai="center" rowGap="$2">
          <Text fontSize={22} fontWeight="$7">
            Your Pet's Detail
          </Text>
          <Text fontSize="$c2" fontWeight="$4" color="$textThirdy">
            Let's get to know your pet better
          </Text>
        </YStack>
        {/** Inputs */}
        <YStack rowGap="$3.5">
          <DatePicker
            control={control}
            name="birthdate"
            label="Birthday"
            placeholder="I Don't Know"
            disabledDates={(date) => {
              return date.isAfter(moment());
            }}
          />
          <Select
            control={control}
            name="breedName"
            label="Breed"
            placeholder="I Don't Know"
            options={
              breeds
                ? [
                    { label: "I Don't Know", value: "" },
                    ...breeds.sort((a, b) => a.label.localeCompare(b.label)),
                  ]
                : [{ label: "I Don't Know", value: "" }]
            }
          />
          <YStack flex={1} width="100%" gap="$2">
            <XStack
              gap="$2"
              alignItems={formState.errors["weight"] ? "center" : "flex-end"}
              justifyContent="center"
            >
              <InputNumber
                control={control}
                name="weightValue"
                flex={1}
                label="Weight"
                placeholder="Input Pet Weight"
                suffix={<Text>Kg</Text>}
                requiredMark
                rules={{
                  required: "Weight is required",
                  pattern: {
                    value: /^(?!0+(\.0+)?$)\d+(\.\d+)?$/,
                    message: "Invalid Weight format",
                  },
                }}
              />
            </XStack>
          </YStack>
          <TextArea
            textAlignVertical="top"
            control={control}
            name="additionalInfo"
            label="Additional Information"
            placeholder="Details"
            maxLength={500}
          />
        </YStack>
      </YStack>
      {/** Button */}
      <View flex={1} h={144} jc="center">
        <Button
          disabled={!isValid}
          type={isValid ? "primary" : "default"}
          h="$4"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Next
        </Button>
      </View>
    </YStack>
  );
};
