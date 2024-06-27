import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const HomeIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
  height = 36,
  width = 36,
}) => {
  return (
    <Svg
      width={height}
      height={width}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <Path
        d="M15.42 7H8.08A1.08 1.08 0 0 0 7 8.08v7.34c0 .597.483 1.08 1.08 1.08h7.34a1.08 1.08 0 0 0 1.08-1.08V8.08A1.08 1.08 0 0 0 15.42 7m12.5 0h-7.34a1.08 1.08 0 0 0-1.08 1.08v7.34c0 .597.483 1.08 1.08 1.08h7.34A1.08 1.08 0 0 0 29 15.42V8.08A1.08 1.08 0 0 0 27.92 7m-12.5 12.5H8.08A1.08 1.08 0 0 0 7 20.58v7.34c0 .597.483 1.08 1.08 1.08h7.34a1.08 1.08 0 0 0 1.08-1.08v-7.34a1.08 1.08 0 0 0-1.08-1.08m12.5 0h-7.34a1.08 1.08 0 0 0-1.08 1.08v7.34c0 .597.483 1.08 1.08 1.08h7.34A1.08 1.08 0 0 0 29 27.92v-7.34a1.08 1.08 0 0 0-1.08-1.08"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
