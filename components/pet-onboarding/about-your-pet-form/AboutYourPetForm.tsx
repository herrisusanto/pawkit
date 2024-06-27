import { petOnboardingAtom } from "@/app/pet-onboarding/state";
import { AvatarPicker } from "@/components/common/AvatarPicker/AvatarPicker";
import { Button } from "@/components/common/Button/Button";
import { CheckButtonGroup } from "@/components/common/CheckButtonGroup/CheckButtonGroup";
import { MaleIcon, FemaleIcon } from "@/components/common/Icons";
import { TypeBirdIcon } from "@/components/common/Icons/TypeBirdIcon";
import { TypeCatIcon } from "@/components/common/Icons/TypeCatIcon";
import { TypeDogIcon } from "@/components/common/Icons/TypeDogIcon";
import { TypeGuineaPigIcon } from "@/components/common/Icons/TypeGuineaPigIcon";
import { TypeRabbitIcon } from "@/components/common/Icons/TypeRabbitIcon";
import { TypeTurtleIcon } from "@/components/common/Icons/TypeTurtleIcon";
import { Input } from "@/components/common/Input/Input";
import { RadioButton } from "@/components/common/RadioButton/RadioButton";
import { PetType } from "@/api/graphql/API";
import { useAtomValue } from "jotai";
import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Dimensions } from "react-native";
import { YStack, Text, View, XStack, getToken } from "tamagui";

const { width } = Dimensions.get("screen");

type AboutYourPetFormProps = {
  onSubmit: SubmitHandler<any>;
};

export const AboutYourPetForm: React.FC<AboutYourPetFormProps> = ({
  onSubmit,
}) => {
  const state = useAtomValue(petOnboardingAtom);
  const { petId } = state;
  const { control, handleSubmit, formState } = useFormContext();
  const { isSubmitting, isValid } = formState;

  const disableNextButton = () => {
    if (!isValid) {
      return true;
    }
    return false;
  };

  return (
    <>
      <YStack rowGap="$3.5" pb="$5">
        {/** Avatar */}
        <YStack ai="center" rowGap={28}>
          <Text fontSize={22} fontWeight="$7">
            About Your Pet
          </Text>
          <AvatarPicker />
        </YStack>
        {/** Inputs */}
        <Input
          control={control}
          name="name"
          label="Pet Name"
          placeholder="Input Pet Name"
          disabled={!!petId}
          rules={{
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Invalid Pet name format",
            },
            maxLength: {
              value: 15,
              message: "Invalid Pet name format",
            },
          }}
        />
        <YStack rowGap="$1.5">
          <Text fontSize="$c1" fontWeight="$5">
            Gender
          </Text>
          <XStack columnGap="$3.5">
            <RadioButton
              control={control}
              name="gender"
              value="MALE"
              flex={1}
              icon={<MaleIcon />}
            >
              Male
            </RadioButton>
            <RadioButton
              control={control}
              name="gender"
              value="FEMALE"
              flex={1}
              icon={<FemaleIcon />}
            >
              Female
            </RadioButton>
          </XStack>
        </YStack>
      </YStack>
      {/** Select Input */}
      <YStack rowGap={28} pt="$5">
        <YStack ai="center" rowGap="$2">
          <Text fontSize="$t3" fontWeight="$7">
            Select Species
          </Text>
        </YStack>
        <CheckButtonGroup
          multiple={false}
          control={control}
          name="petType"
          items={[
            {
              petIcon: (strokeColor) => (
                <TypeDogIcon strokeColor={strokeColor} />
              ),
              value: PetType.DOG,
              available: true,
            },
            {
              petIcon: (strokeColor) => (
                <TypeCatIcon strokeColor={strokeColor} />
              ),
              value: PetType.CAT,
              available: true,
            },
            {
              petIcon: (strokeColor) => (
                <TypeRabbitIcon strokeColor={strokeColor} />
              ),
              value: PetType.RABBIT,
              available: false,
            },
            {
              petIcon: (strokeColor) => (
                <TypeGuineaPigIcon strokeColor={strokeColor} />
              ),
              value: PetType.GUINEA_PIG,
              available: false,
            },
            {
              petIcon: (strokeColor) => (
                <TypeBirdIcon strokeColor={strokeColor} />
              ),
              value: PetType.BIRD,
              available: false,
            },
            {
              petIcon: (strokeColor) => (
                <TypeTurtleIcon strokeColor={strokeColor} />
              ),
              children: <TypeTurtleIcon />,
              value: PetType.OTHER,
              available: false,
            },
          ]}
          renderItem={({ value, onChange, checked, petIcon, available }) => {
            const itemWidth = width - 48;
            const size = itemWidth / 3;
            return (
              <View
                key={value}
                w={size - 13}
                h={size - 13}
                flexGrow={1}
                bc={checked ? "$primary" : "$natural0"}
                bw="$0.5"
                jc="center"
                ai="center"
                br="$4"
                pos="relative"
                onPress={() => onChange && onChange(value)}
                disabled={!available}
              >
                {!available && (
                  <View
                    pos="absolute"
                    bg="$red9"
                    py="$1"
                    px="$2"
                    br="$5"
                    top={0}
                    transform={[{ translateY: -12 }]}
                  >
                    <Text fontSize="$c3" color="$gray1">
                      Coming Soon
                    </Text>
                  </View>
                )}

                <YStack ai="center">
                  {petIcon
                    ? available
                      ? checked
                        ? petIcon(getToken("$primary", "color"))
                        : petIcon(getToken("$textSecondary", "color"))
                      : petIcon(getToken("$natural0", "color"))
                    : ""}
                  <Text
                    fontSize="$c1"
                    fontWeight="$5"
                    color={checked ? "$primary" : "$textThirdy"}
                    textTransform="capitalize"
                  >
                    {value?.split("_").join(" ")}
                  </Text>
                </YStack>
              </View>
            );
          }}
        />
      </YStack>
      <View h={144} jc="center">
        <Button
          disabled={disableNextButton()}
          type={disableNextButton() ? "default" : "primary"}
          h="$4"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Next
        </Button>
      </View>
    </>
  );
};
