import { ExpoConfig, ConfigContext } from "expo/config";

const mode = process.env.APP_MODE as "development" | "preview" | "production";

const getBundleID = () => {
  switch (mode) {
    case "production":
      return "com.pawkit.production";
    case "preview":
      return "com.nodal.pawkit.preview";
    default:
      return "com.nodal.pawkit.development";
  }
};

const getAppName = () => {
  switch (mode) {
    case "production":
      return "Pawkit";
    case "preview":
      return "Pawkit (Preview)";
    default:
      return "Pawkit (Dev)";
  }
};

const appName = getAppName();
const bundleID = getBundleID();

export default (_: ConfigContext): ExpoConfig => ({
  scheme: "pawkit",
  name: appName,
  slug: "pawkit",
  owner: "pawkit_tech", // TODO: If necessary owner should be determined later
  version: "3.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: bundleID,
    supportsTablet: true,
  },
  android: {
    package: bundleID,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-font", "expo-router"],
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    eas: {
      projectId: "d0def609-df17-4d6a-90ec-8a066c68f0f1",
    },
  },
  updates: {
    url: "https://u.expo.dev/d0def609-df17-4d6a-90ec-8a066c68f0f1",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
});
