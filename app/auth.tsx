import React, { useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  signIn,
  signUp,
  confirmSignIn,
  confirmSignUp,
  resendSignUpCode,
} from "aws-amplify/auth";
import SignInScreen from "./signin";
import { atom, useAtom } from "jotai";
import AuthConfirmationScreen from "./auth-confirmation";
import { Redirect } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks";
import FullScreenLoadingState from "@/components/common/FullScreenLoadingState/FullScreenLoadingState";

type SignInScreenProps = {
  onSubmit: (username: string) => void;
};

type AuthAtomType = {
  step: string;
};

export const authAtom = atom<AuthAtomType>({
  step: "SIGN_IN",
});

const AuthScreen: React.FC<SignInScreenProps> = () => {
  const form = useForm({ mode: "onChange" });
  const { data: user } = useCurrentUser();
  const [authState, setAuthState] = useAtom(authAtom);
  const { step } = authState;
  const mutationSignIn = useMutation({ mutationFn: signIn });
  const mutationSignUp = useMutation({ mutationFn: signUp });
  const mutationConfirmSignIn = useMutation({ mutationFn: confirmSignIn });
  const mutationResendSignUpCode = useMutation({
    mutationFn: resendSignUpCode,
  });
  const mutationConfirmSignUp = useMutation({ mutationFn: confirmSignUp });
  const isPending =
    mutationSignIn.isPending ||
    mutationSignUp.isPending ||
    mutationConfirmSignIn.isPending ||
    mutationConfirmSignUp.isPending ||
    mutationResendSignUpCode.isPending;

  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    const phoneNumber = "+65" + values["phone_number"];
    try {
      const result = await mutationSignIn.mutateAsync({
        username: phoneNumber,
        options: { authFlowType: "CUSTOM_WITHOUT_SRP" },
      });
      const signInStep = result.nextStep.signInStep;
      setAuthState({ step: signInStep });
    } catch (error) {
      if (JSON.stringify(error).includes("UserNotFoundException")) {
        handleSignUp(phoneNumber);
      }
    }
  };

  const handleSignUp = async (username: string) => {
    try {
      const result = await mutationSignUp.mutateAsync({
        username,
        password: Math.random().toString(36).slice(-8),
        options: {
          autoSignIn: true,
          userAttributes: {
            phone_number: username,
          },
        },
      });
      const signUpStep = result.nextStep.signUpStep;
      setAuthState({ step: signUpStep });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const handleSignUpConfirmation: SubmitHandler<FieldValues> = async (
    values
  ) => {
    const username = "+65" + values["phone_number"];
    const confirmationCode = values["confirmation_code"];
    try {
      const result = await mutationConfirmSignUp.mutateAsync({
        username,
        confirmationCode,
      });
      const signUpStep = result.nextStep.signUpStep;
      setAuthState({ step: signUpStep });
      if (signUpStep === "CONFIRM_SIGN_UP") {
        showInvalidCodeError();
      }
    } catch (error) {
      if (JSON.stringify(error).includes("CodeMismatchException")) {
        showInvalidCodeError();
      }
    }
  };

  const handleSignInConfirmation: SubmitHandler<FieldValues> = async (
    values
  ) => {
    const challengeResponse = values["confirmation_code"];
    try {
      const result = await mutationConfirmSignIn.mutateAsync({
        challengeResponse,
      });
      const signInStep = result.nextStep.signInStep;
      setAuthState({ step: signInStep });
      if (
        signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE" ||
        signInStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE"
      ) {
        showInvalidCodeError();
      }
    } catch (error) {
      if (JSON.stringify(error).includes("CodeMismatchException")) {
        showInvalidCodeError();
      }
    }
  };

  const showInvalidCodeError = () => {
    form.setError("confirmation_code", {
      message: "Invalid verification code",
    });
  };

  const handleResendSignInCode = async () => {
    const values = form.getValues();
    const phoneNumber = "+65" + values["phone_number"];
    return mutationSignIn.mutateAsync({
      username: phoneNumber,
      options: { authFlowType: "CUSTOM_WITHOUT_SRP" },
    });
  };

  const handleResendSignUpCode = async () => {
    const values = form.getValues();
    const phoneNumber = "+65" + values["phone_number"];
    return mutationResendSignUpCode.mutateAsync({
      username: phoneNumber,
    });
  };

  useEffect(() => {
    if (user) {
      setAuthState({ step: "DONE" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  let screen;

  switch (step) {
    case "DONE":
      screen = <Redirect href="/pet-onboarding" />;
      break;
    case "COMPLETE_AUTO_SIGN_IN":
      screen = <FullScreenLoadingState shouldAutoSignIn />;
      break;
    case "CONFIRM_SIGN_UP":
      screen = (
        <AuthConfirmationScreen
          onSubmit={handleSignUpConfirmation}
          onResendCode={handleResendSignUpCode}
          loading={isPending}
        />
      );
      break;
    case "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE":
      screen = (
        <AuthConfirmationScreen
          onSubmit={handleSignInConfirmation}
          onResendCode={handleResendSignInCode}
          loading={isPending}
        />
      );
      break;
    case "CONFIRM_SIGN_IN_WITH_SMS_CODE":
      screen = (
        <AuthConfirmationScreen
          onSubmit={handleSignInConfirmation}
          onResendCode={handleResendSignInCode}
          loading={isPending}
        />
      );
      break;
    case "SIGN_IN":
    default:
      screen = <SignInScreen onSubmit={handleSignIn} loading={isPending} />;
  }

  return <FormProvider {...form}>{screen}</FormProvider>;
};

export default AuthScreen;
