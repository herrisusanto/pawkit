const path = require("path");
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { generate } = require("@storybook/react-native/scripts/generate");

generate({
  configPath: path.resolve(__dirname, "./.storybook"),
});

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.unstable_allowRequireContext = true;

config.resolver = {
  ...config.resolver,
  blockList: [config.resolver.blockList, /\.(spec|test)\.tsx?$/],
  resolveRequest(context, moduleName, platform) {
    const defaultResolveResult = context.resolveRequest(
      context,
      moduleName,
      platform
    );
    if (
      !process.env.STORYBOOK_ENABLED &&
      defaultResolveResult?.filePath?.includes?.(".storybook/")
    ) {
      return {
        type: "empty",
      };
    }

    return defaultResolveResult;
  },
};

module.exports = config;
