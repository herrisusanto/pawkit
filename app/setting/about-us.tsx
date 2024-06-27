import { View } from "tamagui";
import React from "react";
import { Stack } from "expo-router";
import AboutUsContent from "@/components/about-us/content/AboutUsContent";
import { Header } from "@/components/common/Header/Header";

const AboutUsPage = () => {
  return (
    <View flex={1} ai="center" jc="center">
      <Stack.Screen
        options={{
          header() {
            return <Header title="About Us" />;
          },
        }}
      />
      <AboutUsContent />
    </View>
  );
};

export default AboutUsPage;
