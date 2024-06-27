import { View, Text } from "tamagui";
import React from "react";
import { Stack } from "expo-router";

const ContactUsPage = () => {
  return (
    <View flex={1} ai="center" jc="center">
      <Stack.Screen options={{ headerTitle: "Contact Us" }} />
      <Text fontSize="$b1">Contact Us Page</Text>
    </View>
  );
};

export default ContactUsPage;
