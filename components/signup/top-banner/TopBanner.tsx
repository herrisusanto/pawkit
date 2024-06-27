import { View } from "react-native";

import { Image, styled } from "tamagui";

import { images } from "../../../constants";

const TopBannerSignup = () => {
  const ViewContainer = styled(View, {
    width: "100%",
    backgroundColor: "#DAF3EE",
    height: 281,
    alignItems: "center",
    justifyContent: "center",
  });

  const ViewImageWrapper = styled(View, {
    width: 330,
  });

  return (
    <ViewContainer>
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
