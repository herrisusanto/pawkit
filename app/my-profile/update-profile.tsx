import { Button } from "@/components/common/Button/Button";
import { Header } from "@/components/common/Header/Header";
import { Input } from "@/components/common/Input/Input";
import { InputNumber } from "@/components/common/InputNumber/InputNumber";
import ReadOnlyInput from "@/components/common/ReadOnlyInput/ReadOnlyInput";
import { icons } from "@/constants";
import { handleUpdateAttributes } from "@/api/user";
import { useUserAttributes } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ReactNativeModal from "react-native-modal";
import { Image, Text, View, XStack, YStack, styled } from "tamagui";

export default function UpdatePersonalData() {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone_number: "",
      email: "",
    },
  });
  const router = useRouter();

  const { control, handleSubmit, formState, setValue } = form;

  const { isValid } = formState;

  const queryClient = useQueryClient();
  const userAttributes = useUserAttributes();

  const mutateUpdateUserAttributes = useMutation({
    mutationFn: handleUpdateAttributes,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_attributes"],
      });

      setOpenAlert(true);

      setTimeout(() => {
        router.back();
      }, 1000);
    },
  });

  useEffect(() => {
    if (userAttributes) {
      setValue("name", userAttributes?.name ?? "");
      setValue(
        "phone_number",
        userAttributes?.phone_number
          ? userAttributes?.phone_number?.substring(3)
          : ""
      );
      setValue("email", userAttributes?.email ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAttributes]);

  const onSubmit: SubmitHandler<any> = async (values) => {
    await mutateUpdateUserAttributes.mutateAsync({
      name: values["name"],
      email: values["email"],
      phone_number: "+65" + values["phone_number"],
    });
  };

  return (
    <YStack px="$3" bg="$background" flex={1} jc="space-between" py="$5">
      <Stack.Screen
        options={{
          header() {
            return <Header title="Update Personal Data" />;
          },
        }}
      />

      <FormProvider {...form}>
        <YStack rowGap="$6">
          {/** Inputs */}
          <YStack rowGap="$3.5">
            <Input
              control={control}
              name="name"
              label="Full Name"
              placeholder="Input Full Name"
              rules={{ required: "Full name is required" }}
            />
            <YStack width="100%" gap="$2">
              <Text fontSize="$c1" fontWeight="600">
                Phone Number
              </Text>
              <XStack gap="$2">
                <ReadOnlyInput>
                  <Text color="$natural0">+65</Text>
                </ReadOnlyInput>
                <InputNumber
                  name="phone_number"
                  control={control}
                  flex={1}
                  placeholder="Input phone number"
                  inputProps={{
                    readOnly: true,
                  }}
                  rules={{
                    required: "Phone number is required",
                    pattern: /^\d{8}$/,
                  }}
                />
              </XStack>
            </YStack>
            <Input
              control={control}
              name="email"
              label="Email"
              placeholder="Email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid Email",
                },
              }}
            />
          </YStack>
        </YStack>
        {/** Button */}
        <View jc="center">
          <Button
            type={isValid ? "primary" : "default"}
            h="$4"
            onPress={handleSubmit(onSubmit)}
            loading={formState.isSubmitting}
          >
            Save Changes
          </Button>
        </View>
      </FormProvider>
      <ReactNativeModal
        onBackdropPress={() => setOpenAlert((x) => !x)}
        isVisible={openAlert}
        style={{ alignItems: "center", justifyContent: "center" }}
        onDismiss={() => {
          setOpenAlert((x) => !x);
        }}
      >
        <ModalContainer>
          <Image
            source={{ uri: icons.successIcon, width: 120, height: 120 }}
            height={120}
            width={120}
          />

          <Text fontSize="$b2" fontWeight="$6">
            Success
          </Text>
        </ModalContainer>
      </ReactNativeModal>
    </YStack>
  );
}

const ModalContainer = styled(View, {
  width: 200,
  height: 200,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
});
