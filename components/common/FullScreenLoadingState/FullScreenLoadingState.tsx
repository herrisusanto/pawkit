import { View, Text, Image } from "tamagui";
import React, { useEffect } from "react";
import { images } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { autoSignIn } from "aws-amplify/auth";
import { authAtom } from "@/app/auth";
import { useSetAtom } from "jotai";

type FullScreenLoadingStateProps = {
  shouldAutoSignIn?: boolean;
};

const FullScreenLoadingState: React.FC<FullScreenLoadingStateProps> = ({
  shouldAutoSignIn,
}) => {
  const setAuthState = useSetAtom(authAtom);
  const mutationAutoSignIn = useMutation({ mutationFn: autoSignIn });

  useEffect(() => {
    (async () => {
      if (shouldAutoSignIn) {
        const autoSignInResult = await mutationAutoSignIn.mutateAsync();
        const autoSignInStep = autoSignInResult.nextStep.signInStep;
        if (
          autoSignInStep === "DONE" ||
          autoSignInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
        ) {
          setAuthState({ step: autoSignInStep });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAutoSignIn]);

  return (
    <View
      bg="#F2FCFA"
      flex={1}
      ai="center"
      justifyContent="center"
      zIndex={99}
      pos="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
    >
      <Image
        source={{ uri: images.logoPawkitBlack, width: 230, height: 100 }}
        height={100}
        width={230}
        resizeMode="contain"
      />
      <Text fontSize="$b2" fontWeight="$6">
        Loading...
      </Text>
      <View pos="absolute" zIndex={100} bottom={-10} left={0}>
        <Image
          source={{ uri: images.logoPawkitBackdrop, width: 250, height: 350 }}
          height={350}
          width={250}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default FullScreenLoadingState;
