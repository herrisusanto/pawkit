import { TouchableOpacity } from "react-native";
import { Text, View, XStack } from "tamagui";
import { ArrowLeftIcon } from "../Icons";
import { useRouter } from "expo-router";

type HeaderProps = {
  title?: string | React.ReactNode;
  disableBack?: boolean;
};

export const Header = XStack.styleable<HeaderProps>(
  ({ title, disableBack, ...props }, ref) => {
    const router = useRouter();
    const canGoBack = router.canGoBack() && !disableBack;

    const handleBack = () => {
      canGoBack && router.back();
    };

    return (
      <XStack
        ref={ref}
        jc="space-between"
        ai="center"
        h="$6"
        px="$5"
        bg="#fff"
        {...props}
      >
        <View w="$1.5">
          {canGoBack && (
            <TouchableOpacity onPress={handleBack}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          )}
        </View>
        <XStack jc="center">
          {typeof title === "string" ? (
            <Text fontSize="$b2" fontWeight="$6" color="$textPrimary">
              {title}
            </Text>
          ) : (
            title
          )}
        </XStack>
        <View w="$1.5" />
      </XStack>
    );
  }
);
