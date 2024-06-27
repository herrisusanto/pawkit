import { CheckIcon, CloseIcon } from "@/components/common/Icons";
import { RadioButton } from "@/components/common/RadioButton/RadioButton";
import React from "react";
import { Control, useFormContext } from "react-hook-form";
import { Text, YStack, XStack } from "tamagui";

export const CareInfoForm = () => {
  const { control } = useFormContext();

  return (
    <YStack rowGap={20}>
      <Text fontSize="$b3" fontWeight="$6">
        Care Information
      </Text>
      <YStack rowGap="$3.5">
        <YesNoInput control={control} name="isNeutered" label="Neutered?" />
        <YesNoInput
          control={control}
          name="isMicrochipped"
          label="Microchipped?"
        />
        <YesNoInput
          control={control}
          name="hasMedicalCondition"
          label="Ongoing medical condition(s)?"
        />
      </YStack>
    </YStack>
  );
};

type YesNoInputProps = {
  control: Control<any>;
  name: string;
  label: string;
};

const YesNoInput: React.FC<YesNoInputProps> = ({ control, name, label }) => {
  return (
    <XStack jc="space-between" ai="center">
      <Text fontSize="$c1" fontWeight="$5" maxWidth={120}>
        {label}
      </Text>
      <XStack columnGap="$3.5">
        <RadioButton
          control={control}
          name={name}
          value="true"
          jc="center"
          ai="center"
          w="100%"
          h={42}
          maxWidth={102}
          py={0}
          icon={<CheckIcon />}
        >
          Yes
        </RadioButton>
        <RadioButton
          control={control}
          name={name}
          value="false"
          jc="center"
          ai="center"
          w="100%"
          h={42}
          maxWidth={102}
          py={0}
          icon={<CloseIcon />}
        >
          No
        </RadioButton>
      </XStack>
    </XStack>
  );
};
