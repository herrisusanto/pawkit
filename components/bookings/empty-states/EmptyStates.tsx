import { Button } from "@/components/common/Button/Button";
import { images } from "@/constants";
import { Link } from "expo-router";
import { Image, Text, YStack } from "tamagui";

const EmptyStates = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <YStack ai="center" padding="$3" pt="$8" flex={1} gap="$4">
      <Image
        resizeMode="contain"
        source={{
          uri: images.noBooking,
        }}
        height={191 / 2}
        width={192}
      />
      <YStack ai="center" gap="$2">
        <Text fontSize="$b3" fontWeight="$6">
          {title}
        </Text>
        <Text fontSize="$c2" fontWeight="$4">
          {subtitle}
        </Text>
      </YStack>
      <Link href="/home" asChild>
        <Button width="50%" type="secondary">
          Home
        </Button>
      </Link>
    </YStack>
  );
};

export default EmptyStates;
