import { PropsWithChildren, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export const FontLoader = ({ children }: PropsWithChildren) => {
  const [fontsLoaded, fontError] = useFonts({
    LatoRegular: require("@/assets/fonts/Lato-Regular.ttf"),
    LatoMedium: require("@/assets/fonts/Lato-Medium.ttf"),
    LatoSemibold: require("@/assets/fonts/Lato-Semibold.ttf"),
    LatoBold: require("@/assets/fonts/Lato-Bold.ttf"),
    LatoHeavy: require("@/assets/fonts/Lato-Heavy.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }} testID="fontloader">
      {children}
    </View>
  );
};

export default FontLoader;
