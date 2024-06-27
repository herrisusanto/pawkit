import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const CircleDotIcon: React.FC<IconProps> = ({
  height = 24,
  width = 25,
  fillColor = getToken("$primary", "color"),
}) => (
  <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
    <G clipPath="url(#a)">
      <Path
        d="M22.25 12a9.75 9.75 0 1 0-19.5 0 9.75 9.75 0 0 0 19.5 0M.5 12a12 12 0 1 1 24 0 12 12 0 0 1-24 0m12-4.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9"
        fill={fillColor}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h24v24H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
