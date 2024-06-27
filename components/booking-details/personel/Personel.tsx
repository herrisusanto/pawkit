import { WhatsAppIcon } from "@/components/common/Icons";
import { VerifiedIcon } from "@/components/common/Icons/VerifiedIcon";
import { Avatar, Text, View, XStack, YStack } from "tamagui";

export const Personel = () => {
  return (
    <YStack p="$5" bg="#fff" rowGap="$4">
      <Text fontSize="$b2" fontWeight="$7">
        Personel
      </Text>
      <YStack rowGap="$3.5">
        {/** Personel Item */}
        {Array.from({ length: 2 }).map((_, i) => {
          return <PersonelItem key={i} />;
        })}
        {/** END / Personel Item */}
      </YStack>
    </YStack>
  );
};

const PersonelItem = () => {
  return (
    <XStack columnGap="$3.5" ai="center">
      <View position="relative">
        <Avatar circular>
          <Avatar.Image src="https://via.placeholder.com/60" />
        </Avatar>
        <View position="absolute" bottom={-4} right={-4}>
          <VerifiedIcon />
        </View>
      </View>
      <YStack flex={1} rowGap="$2">
        <XStack ai="center" columnGap="$2">
          <XStack w="$full" maxWidth={60} ai="center" columnGap="$2">
            <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
              Name
            </Text>
          </XStack>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            : Nayla Firly
          </Text>
        </XStack>
        <XStack ai="center" columnGap="$2">
          <XStack w="$full" maxWidth={60} ai="center" columnGap="$2">
            <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
              Staff ID
            </Text>
          </XStack>
          <Text fontSize="$c1" fontWeight="$4" color="$textSecondary">
            : P0010
          </Text>
        </XStack>
      </YStack>
      <View h={50} w={50} bg="$thirdy" jc="center" ai="center" br="$1">
        <View left={0} right={0}>
          <WhatsAppIcon />
        </View>
      </View>
    </XStack>
  );
};
