import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import { Text, View } from "tamagui";

const VetConsultScreen = () => {
  return (
    <View flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Vet Consult" />;
          },
        }}
      />
      <Text>VetConsultScreen</Text>
    </View>
  );
};

export default VetConsultScreen;
