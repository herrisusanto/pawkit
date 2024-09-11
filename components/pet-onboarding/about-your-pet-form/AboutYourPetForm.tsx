import { AvatarPicker } from "@/components/common/AvatarPicker/AvatarPicker";
import { Button } from "@/components/common/Button/Button";
import {
  CheckButtonGroup,
  CheckButtonProps,
} from "@/components/common/CheckButtonGroup/CheckButtonGroup";
import {
  MaleIcon,
  FemaleIcon,
  TypeGuineaPigIcon,
} from "@/components/common/Icons";
import { TypeCatIcon } from "@/components/common/Icons/TypeCatIcon";
import { TypeDogIcon } from "@/components/common/Icons/TypeDogIcon";
import { TypeRabbitIcon } from "@/components/common/Icons/TypeRabbitIcon";
import { TypeTurtleIcon } from "@/components/common/Icons/TypeTurtleIcon";
import { Input } from "@/components/common/Input/Input";
import { RadioButton } from "@/components/common/RadioButton/RadioButton";
import { PetType } from "@/api/graphql/API";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Dimensions } from "react-native";
import { YStack, Text, View, XStack, getToken } from "tamagui";
import { petDefaultAvatar } from "@/components/my-pet/pet-default-avatar/petDefaultAvatar";
import {
  useMediaLibraryPermissions,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { useQuery } from "@tanstack/react-query";
import { downloadPetImage } from "@/api/pet";
import { useCurrentUser } from "@/hooks";
import { useAtom } from "jotai";
import { petOnboardingAtom } from "@/app/pet-onboarding/state";

const { width } = Dimensions.get("screen");

type AboutYourPetFormProps = {
  onSubmit: SubmitHandler<any>;
};

export const AboutYourPetForm: React.FC<AboutYourPetFormProps> = ({
  onSubmit,
}) => {
  const { control, handleSubmit, formState, watch, setValue } =
    useFormContext();
  const { isSubmitting, isValid } = formState;
  const { data: user } = useCurrentUser();
  const [state] = useAtom(petOnboardingAtom);
  const { petId } = state;
  const petType = watch("petType");

  const [status, requestPermission] = useMediaLibraryPermissions();
  const [petImageUrl, setPetImageUrl] = useState<string>();

  const { data: petImage } = useQuery({
    queryKey: ["pet-image", user?.userId, petId],
    queryFn: () => downloadPetImage(user?.userId as string, petId as string),
    enabled: !!user && !!petId,
  });

  const handleImagePicker = async () => {
    if (status?.granted) {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });

      const firstAsset = result.assets?.[0];
      setValue("image", firstAsset?.uri);
      setPetImageUrl(firstAsset?.uri);
    } else {
      await requestPermission();
    }
  };

  const petTypes: CheckButtonProps[] = [
    {
      petIcon: (strokeColor) => <TypeDogIcon strokeColor={strokeColor} />,
      value: PetType.DOG,
      available: true,
    },
    {
      petIcon: (strokeColor) => <TypeCatIcon strokeColor={strokeColor} />,
      value: PetType.CAT,
      available: true,
    },
    {
      petIcon: (strokeColor) => <TypeRabbitIcon strokeColor={strokeColor} />,
      value: PetType.RABBIT,
      available: true,
    },
    {
      petIcon: (strokeColor) => <TypeGuineaPigIcon strokeColor={strokeColor} />,
      value: PetType.GUINEA_PIG,
      available: true,
    },
    // {
    //   petIcon: (strokeColor) => <TypeHamsterIcon strokeColor={strokeColor} />,
    //   value: PetType.HAMSTER,
    //   available: false,
    // },
    {
      petIcon: (strokeColor) => <TypeTurtleIcon strokeColor={strokeColor} />,
      children: <TypeTurtleIcon />,
      value: PetType.OTHER,
      available: false,
    },
  ];

  const disableNextButton = () => {
    if (!isValid) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (petImage) {
      setPetImageUrl(petImage.href);
    }
  }, [petImage]);

  const formatData = (data: CheckButtonProps[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ value: `blank-${numberOfElementsLastRow}` });
      numberOfElementsLastRow++;
    }

    return data;
  };

  return (
    <>
      <YStack rowGap="$3.5" pb="$5">
        {/** Avatar */}
        <YStack ai="center" rowGap={28}>
          <Text fontSize={22} fontWeight="$7">
            About Your Pet
          </Text>
          <AvatarPicker
            source={petImageUrl ?? petDefaultAvatar(petType)}
            onImagePicker={handleImagePicker}
          />
        </YStack>
        {/** Inputs */}
        <Input
          control={control}
          name="name"
          label="Pet Name"
          placeholder="Input Pet Name"
          requiredMark
          rules={{
            required: "Pet name is required",
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
          <XStack gap="$1">
            <Text fontSize="$c1" fontWeight="$5">
              Gender
            </Text>
            <Text color="$error">*</Text>
          </XStack>
          <XStack columnGap="$3.5">
            <RadioButton
              control={control}
              name="gender"
              value="MALE"
              flex={1}
              icon={<MaleIcon />}
              rules={{ required: "Gender is required" }}
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
          <XStack gap="$1">
            <Text fontSize="$t3" fontWeight="$7">
              Select Species
            </Text>
            <Text color="$error">*</Text>
          </XStack>
        </YStack>
        <CheckButtonGroup
          multiple={false}
          control={control}
          name="petType"
          items={formatData(petTypes, 3)}
          rules={{ required: "Pet type is required" }}
          renderItem={({ value, onChange, checked, petIcon, available }) => {
            const itemWidth = width - 48;
            const size = itemWidth / 3;
            if (value && value.includes("blank")) {
              return (
                <View
                  w={size - 13}
                  h={size - 13}
                  bg="transparent"
                  flexGrow={1}
                />
              );
            }
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
