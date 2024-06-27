import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { Text, View } from "tamagui";

const NursingScreen = () => {
  return (
    <View flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Nursing" />;
          },
        }}
      />
      <Text>NursingScreen</Text>
    </View>
  );
};

export default NursingScreen;
