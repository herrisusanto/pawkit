import { createFont, createTamagui, createTokens } from "@tamagui/core";
import { config } from "@tamagui/config/v3";

const fontSizes = {
  h1: 48,
  h2: 42,
  t1: 28,
  t2: 24,
  t3: 22,
  b1: 20,
  b2: 18,
  b3: 16,
  c1: 14,
  c2: 12,
  c3: 10,
};

const fontWeights = {
  4: 400,
  5: 500,
  6: 600,
  7: 700,
  8: 800,
};

const fontFaces = {
  400: { normal: "LatoRegular" },
  500: { normal: "LatoMedium" },
  600: { normal: "LatoSemibold" },
  700: { normal: "LatoBold" },
  800: { normal: "LatoHeavy" },
};

const latoRegularFont = createFont({
  family: "LatoRegular",
  size: {
    ...fontSizes,
    true: 18,
  },
  weight: fontWeights,
  face: fontFaces,
});

const latoBoldFont = createFont({
  family: "LatoBold",
  size: {
    ...fontSizes,
    true: 28,
  },
  weight: fontWeights,
  face: fontFaces,
});

const tokens = createTokens({
  ...config.tokens,
  color: {
    primary: "#00A79D",
    secondary: "#25434D",
    thirdy: "#C7FFF6",
    accent0: "#FBFBFB",
    accent1: "#F2FCFA",
    accent2: "#B5E5DE",
    accent3: "#263D39",
    accent4: "#1D3330",
    natural0: "#BDBDBD",
    natural1: "#828282",
    natural2: "#4F4F4F",
    natural3: "#121315",
    green: "#027A48",
    blue: "#026AA2",
    highlightBlue: "#00B8FF",
    gold: "#A27F02",
    red: "#B42318",
    error: "#EB5757",
    bgError: "#FDECEA",
    bgGrey: "#FBFBFB",
    bgCard: "#F4F4F4",
    textPrimary: "#121315",
    textSecondary: "#4F4F4F",
    textThirdy: "#828282",
    textFourty: "#BDBDBD",
    formColor: "#FCFCFC",
  },
  size: {
    ...config.tokens.size,
    full: "100%",
  },
});

export const tamaguiConfig = createTamagui({
  ...config,
  tokens,
  fonts: {
    ...config.fonts,
    heading: latoBoldFont,
    body: latoRegularFont,
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
