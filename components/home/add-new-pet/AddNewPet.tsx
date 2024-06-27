import { AddIcon } from "@/components/common/Icons";
import { Dimensions } from "react-native";
import { Text, YStack, View } from "tamagui";

const { width } = Dimensions.get("screen");

export const AddNewPet = YStack.styleable((props, ref) => {
  const containerWidth = width - 188;

  return (
    <YStack
      ref={ref}
      ai="center"
      maxWidth={containerWidth / 4}
      w="$full"
      rowGap="$2"
      {...props}
    >
      <View bg="$accent2" br="$12">
        <AddIcon height={containerWidth / 4} width={containerWidth / 4} />
      </View>
      <Text textAlign="center" adjustsFontSizeToFit numberOfLines={2}>
        Add New Pet
      </Text>
    </YStack>
  );
});
