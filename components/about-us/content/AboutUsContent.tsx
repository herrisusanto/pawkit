import { Text, XStack, Image, YStack } from "tamagui";
import React from "react";
import { Container } from "@/components/common/Container/Container";
import { images } from "@/constants";

const AboutUsContent = () => {
  return (
    <Container bg="$background" flex={1} px="$0" py="$0">
      <XStack jc="center" ai="center" bg="#DAF3EE" p="$5">
        <Image source={images.aboutUsTc} h={163} w={276} />
      </XStack>
      <YStack p="$3" px="$4" rowGap="$3">
        <Text fontWeight="$7" fontSize="$b3">
          Who are we?
        </Text>
        <Text lineHeight={16.8} textAlign="justify">
          Uncomplicated, high-quality pet care. At{" "}
          <Text lineHeight={16.8} fontWeight="$7">
            Pawkit
          </Text>
          , we're a team of passionate pet enthusiasts, professionals,
          veterinarians, and caregivers who believe in creating a seamless and
          joyful experience for both pets and their owners.
        </Text>
        <Text lineHeight={16.8} textAlign="justify">
          Our journey began with a simple idea: to build a one-stop solution
          that caters to every aspect of pet care, making it easy, accessible,
          and stress-free.
        </Text>
      </YStack>
    </Container>
  );
};

export default AboutUsContent;
