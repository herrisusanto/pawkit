import React, { useState, FC } from "react";
import { Heading, styled, Text, View, YStack } from "tamagui";
import TopBannerSignup from "@/components/signup/top-banner/TopBanner";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { OtpInput } from "react-native-otp-entry";
import { Button } from "@/components/common/Button/Button";
import Countdown from "@/components/common/Countdown/Countdown";
import { TouchableOpacity } from "react-native";
import { ResendSignUpCodeOutput, SignInOutput } from "aws-amplify/auth";

type AuthConfirmationScreenProps = {
  onSubmit: SubmitHandler<FieldValues>;
  onResendCode?: () => Promise<SignInOutput | ResendSignUpCodeOutput>;
  loading?: boolean;
};

const AuthConfirmationScreen: FC<AuthConfirmationScreenProps> = ({
  onSubmit,
  onResendCode,
  loading,
}) => {
  const { control, handleSubmit, getValues, formState } = useFormContext();
  const [timer, setTimer] = useState(60 * 2);
  const { isValid } = formState;
  const [timeout, setTimeout] = useState(false);

  const handleResendCode = async () => {
    try {
      if (onResendCode) {
        await onResendCode();
        setTimeout(false);
        setTimer(60 * 2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignUpContainer>
      <TopBannerSignup />
      <YStackContainer gap="$5">
        <YStack alignItems="center" gap="$4">
          <Heading fontSize="$b1" fontWeight="$5">
            Verification Code
          </Heading>

          <Text fontSize="$c1" color="$textSecondary" textAlign="center">
            We have sent a verification code to{" "}
            <Text fontWeight="$6">{"+65" + getValues()?.phone_number}</Text>{" "}
            Please enter the code to verify your account.
          </Text>
        </YStack>
        <Controller
          control={control}
          name="confirmation_code"
          rules={{
            required: "Verification code is required",
            pattern: /^\d{6}$/,
          }}
          render={({ field, fieldState }) => {
            const errorMessage = fieldState.error?.message;
            return (
              <>
                <OtpInput
                  numberOfDigits={6}
                  onTextChange={field.onChange}
                  focusColor="#00A79D"
                  theme={{
                    inputsContainerStyle: {
                      justifyContent: "center",
                      gap: 10,
                    },
                    pinCodeContainerStyle: {
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                      borderColor: errorMessage ? "#EB5757" : "#BDBDBD",
                    },
                    pinCodeTextStyle: {
                      fontSize: 20,
                    },
                  }}
                />
                {errorMessage && (
                  <Text
                    fontSize="$c2"
                    color="$error"
                    textAlign="center"
                    marginTop="$-4"
                  >
                    {errorMessage}
                  </Text>
                )}
              </>
            );
          }}
        />
        <Button
          disabled={!isValid}
          loading={loading}
          type="primary"
          width="100%"
          onPress={handleSubmit(onSubmit)}
        >
          Verify
        </Button>
        <YStack justifyContent="center" alignItems="center" gap="$2">
          {timeout && (
            <TouchableOpacity onPress={handleResendCode}>
              <Text fontSize="$c1" color="$primary" fontWeight="$7">
                Resend verification code?
              </Text>
            </TouchableOpacity>
          )}
          {!timeout && (
            <>
              <Text fontSize="$c1" color="$textPrimary" fontWeight="$4">
                Didn't receive the code?
              </Text>
              <Text fontSize="$b3" color="$textPrimary" fontWeight="$7">
                <Countdown value={timer} onTimeout={() => setTimeout(true)} />
              </Text>
            </>
          )}
        </YStack>
      </YStackContainer>
    </SignUpContainer>
  );
};

const SignUpContainer = styled(View, {
  flex: 1,
});

const YStackContainer = styled(YStack, {
  flex: 1,
  width: "100%",
  padding: 16,
  backgroundColor: "#fff",
  height: 281,
});

export default AuthConfirmationScreen;
