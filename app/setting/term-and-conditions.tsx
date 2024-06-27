import { ScrollView } from "tamagui";
import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/common/Header/Header";
import TncContent from "@/components/terms-and-condition/content/TncContent";

const TermAndConditionsPage = () => {
  return (
    <ScrollView flex={1}>
      <Stack.Screen
        options={{
          header() {
            return <Header title="Terms of Use" />;
          },
        }}
      />
      <TncContent />
    </ScrollView>
  );
};

export default TermAndConditionsPage;
