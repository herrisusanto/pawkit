import { Button } from "@/components/common/Button/Button";
import { Link } from "expo-router";
import { Text, YStack } from "tamagui";

export const GetStarted = () => {
  return (
    <YStack bg="#fff" p="$5" br="$9" mb="$3.5">
      <YStack
        jc="center"
        ai="center"
        bc="$natural0"
        bw="$0.5"
        br="$4"
        py="$8"
        rowGap="$3"
      >
        <Text>Book Your First Service</Text>
        <Link href="/services" asChild>
          <Button type="primary" h="$4" maxWidth={243} w="$full">
            Get Started
          </Button>
        </Link>
      </YStack>
    </YStack>
  );
};
