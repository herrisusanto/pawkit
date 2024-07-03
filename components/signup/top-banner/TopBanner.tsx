import { View, Image, styled, Text, XStack } from "tamagui";
import { images } from "../../../constants";
import { ArrowLeftIcon } from "@/components/common/Icons";
import { useSetAtom } from "jotai";
import { authAtom } from "@/app/auth";

const TopBannerSignup = () => {
  const setAuthState = useSetAtom(authAtom);

  const ViewContainer = styled(View, {
    width: "100%",
    backgroundColor: "#DAF3EE",
    height: 350,
    alignItems: "center",
    justifyContent: "center",
  });

  const ViewImageWrapper = styled(View, {
    width: 330,
  });

  return (
    <ViewContainer>
      <XStack
        flex={0}
        jc="flex-start"
        ai="center"
        h="$6"
        w="$full"
        columnGap="$4"
        px="$5"
        onPress={() => setAuthState({ step: "SIGN_IN" })}
      >
        <View pt="$1.5">
          <ArrowLeftIcon />
        </View>
        <Text fontWeight="$6" fontSize="$b2">
          Verification
        </Text>
      </XStack>
      <ViewImageWrapper>
        <Image
          source={{ uri: images.signupIllustration }}
          resizeMode="contain"
          style={{
            width: "100%",
          }}
        />
      </ViewImageWrapper>
    </ViewContainer>
  );
};

export default TopBannerSignup;
