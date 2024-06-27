import Constants from "expo-constants";
import { App } from "expo-router/build/qualified-entry";
import { renderRootComponent } from "expo-router/build/renderRootComponent";
import registerRootComponent from "expo/build/launch/registerRootComponent";
import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

if (Constants.expoConfig.extra.storybookEnabled) {
  registerRootComponent(require(".storybook").default);
} else {
  // This file should only import and register the root. No components or exports
  // should be added here.
  renderRootComponent(App);
}
