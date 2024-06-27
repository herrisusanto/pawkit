import { View } from "react-native";

import { Image, styled } from "tamagui";

import { images } from "../../../constants";

const TopBannerHelpCenter = () => {
  const ViewContainer = styled(View, {
    width: "100%",
    backgroundColor: "#DAF3EE",
    height: 281,
    alignItems: "center",
    justifyContent: "flex-start",
  });

  const ViewImageWrapper = styled(View, {
    width: 330,
    paddingTop: 20,
  });

  return (
    <ViewContainer>
      <ViewImageWrapper>
        <Image
          source={{ uri: images.helpCenter }}
          resizeMode="contain"
          style={{
            width: "100%",
          }}
        />
      </ViewImageWrapper>
    </ViewContainer>
  );
};

export default TopBannerHelpCenter;
