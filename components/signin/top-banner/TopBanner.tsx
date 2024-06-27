import { View } from "react-native";

import { Image, styled } from "tamagui";

import { images } from "../../../constants";

const TopBanner = () => {
  const ViewContainer = styled(View, {
    width: "100%",
    backgroundColor: "#DAF3EE",
    height: 281,
    alignItems: "center",
    justifyContent: "center",
  });

  const ViewImageWrapper = styled(View, {
    width: 276,
  });

  return (
    <ViewContainer>
      <ViewImageWrapper>
        <Image
          source={{ uri: images.petLogin }}
          resizeMode="contain"
          style={{
            width: "100%",
          }}
        />
      </ViewImageWrapper>
    </ViewContainer>
  );
};

export default TopBanner;
