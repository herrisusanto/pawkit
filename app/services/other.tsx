import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { Text, View } from "tamagui";

const OtherScreen = () => {
  return (
    <View flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Other" />;
          },
        }}
      />
      <Text>OtherScreen</Text>
    </View>
  );
};

export default OtherScreen;
