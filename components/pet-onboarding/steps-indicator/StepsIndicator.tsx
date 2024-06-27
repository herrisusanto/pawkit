import { ArrowLeftIcon } from "@/components/common/Icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, XStack } from "tamagui";

type StepsIndicatorProps = {
  onBack?: () => void;
  onSkip?: () => void;
  currentStep?: number;
};

export const StepsIndicator: React.FC<StepsIndicatorProps> = ({
  onSkip,
  onBack,
  currentStep = 1,
}) => {
  const router = useRouter();
  const canGoBack = router.canGoBack();

  const handleBack = () => {
    if (canGoBack) {
      onBack && onBack();
      router.back();
    }
  };

  const handleSkip = () => {
    onSkip && onSkip();
  };

  return (
    <XStack jc="space-between" ai="center" h="$6">
      <View w="$1.5">
        {canGoBack && (
          <TouchableOpacity onPress={handleBack}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )}
      </View>
      <XStack jc="center">
        <XStack columnGap="$3.5">
          {Array.from({ length: 3 }).map((_, i) => {
            const isHighlighted = currentStep === i + 1;
            return (
              <View
                key={i}
                bg={isHighlighted ? "$primary" : "#D9D9D9"}
                w="$4"
                h={6}
                br="$12"
              />
            );
          })}
        </XStack>
      </XStack>
      {onSkip ? (
        <Text fontSize="$b3" fontWeight="$5" onPress={handleSkip}>
          Skip
        </Text>
      ) : (
        <View />
      )}
    </XStack>
  );
};
