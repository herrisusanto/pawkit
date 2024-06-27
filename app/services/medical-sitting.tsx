import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { Text, View } from "tamagui";

const MedicalSittingScreen = () => {
  return (
    <View flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Home Grooming" />;
          },
        }}
      />
      <Text>MedicalSittingScreen</Text>
    </View>
  );
};

export default MedicalSittingScreen;
