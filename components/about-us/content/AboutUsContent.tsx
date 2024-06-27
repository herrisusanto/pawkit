import { Text } from "tamagui";
import React from "react";
import { Container } from "@/components/common/Container/Container";

const AboutUsContent = () => {
  return (
    <Container bg="$background" flex={1}>
      <Text lineHeight={16.8} textAlign="justify">
        Uncomplicated, high-quality pet care. At{" "}
        <Text lineHeight={16.8} fontWeight="$7">
          Pawkit
        </Text>
        , we're a team of passionate pet enthusiasts, professionals,
        veterinarians, and caregivers who believe in creating a seamless and
        joyful experience for both pets and their owners. {"\n"}Our journey
        began with a simple idea: to build a one-stop solution that caters to
        every aspect of pet care, making it easy, accessible, and stress-free.
      </Text>
    </Container>
  );
};

export default AboutUsContent;
