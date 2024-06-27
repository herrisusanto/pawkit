import { CircleDotIcon } from "@/components/common/Icons";
import { Check } from "@tamagui/lucide-icons";
import { Fragment } from "react";
import { Text, View, XStack, YStack, XStackProps, getToken } from "tamagui";

type StepsIndicatorProps = {
  currentStep: number;
  steps?: string[];
  containerProps?: XStackProps;
};

export const StepsIndicator: React.FC<StepsIndicatorProps> = ({
  currentStep,
  steps = ["details", "required Questions", "Payment"],
  containerProps,
}) => {
  const getIconByStatus = (status?: string) => {
    switch (status) {
      case "done":
        return (
          <View
            h="$1.5"
            w="$1.5"
            pt="$0.5"
            jc="center"
            ai="center"
            bg="$primary"
            br="$12"
          >
            <Check size={16} strokeWidth={4} color="#fff" />
          </View>
        );
      case "pending":
        return <CircleDotIcon fillColor={getToken("$primary", "color")} />;
      default:
        return <CircleDotIcon fillColor={getToken("$natural0", "color")} />;
    }
  };

  return (
    <XStack
      p="$4.5"
      pt="$5"
      ai="center"
      jc="space-between"
      columnGap="$5"
      {...containerProps}
    >
      {steps.map((step, i) => {
        const isPending = currentStep === i + 1;
        const isDone = currentStep > i + 1;
        return (
          <Fragment key={i}>
            <YStack ai="center" rowGap="$1">
              {getIconByStatus(isPending ? "pending" : isDone ? "done" : "")}
              <Text fontSize="$c2" fontWeight="$5" textTransform="capitalize">
                {step}
              </Text>
            </YStack>
            {i < steps.length - 1 && (
              <View
                flex={1}
                h={16}
                borderTopColor={isPending || isDone ? "$primary" : "$natural0"}
                borderTopWidth="$1"
              />
            )}
          </Fragment>
        );
      })}
    </XStack>
  );
};
