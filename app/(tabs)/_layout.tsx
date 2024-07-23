import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import {
  BookingIcon,
  DefaultAvatarIcon,
  HomeIcon,
} from "@/components/common/Icons";
import { PortalProvider, View, getToken } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { TABS_HEIGHT } from "@/constants";
import { useMediaLibraryPermissions } from "expo-image-picker";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

const isAndroid = Platform.OS === "android";

export default function TabLayout() {
  const [, requestPermission] = useMediaLibraryPermissions();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const androidTabBarSytle = {
    paddingTop: 16,
    paddingBottom: 16,
    height: TABS_HEIGHT,
  };

  const iosTabBarStyle = {
    paddingTop: 16,
    height: TABS_HEIGHT + insets.bottom / 2,
  };

  const tabBarStyle = isAndroid ? androidTabBarSytle : iosTabBarStyle;

  return (
    <PortalProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: getToken("$primary"),
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: false,
          tabBarStyle: {
            shadowOffset: {
              width: 0,
              height: -2,
            },
            elevation: 28,
            shadowOpacity: 0.08,
            shadowRadius: 28,
            shadowColor: "#000",
            ...tabBarStyle,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon strokeColor={color} />,
          }}
        />

        <Tabs.Screen
          name="booking"
          options={{
            title: "Booking",
            tabBarIcon: ({ color }) => (
              <View style={{ width: 30, aspectRatio: "1/1" }}>
                <BookingIcon strokeColor={color} width={20} height={20} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <View style={{ width: 30, aspectRatio: "1/1" }}>
                <DefaultAvatarIcon fillColor={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </PortalProvider>
  );
}
