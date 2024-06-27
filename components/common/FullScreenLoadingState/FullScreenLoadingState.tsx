import { View, Text, Image } from "tamagui";
import React from "react";
import { images } from "@/constants";

const FullScreenLoadingState = () => {
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
