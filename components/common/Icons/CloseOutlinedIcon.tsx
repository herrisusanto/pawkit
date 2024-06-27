import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";

export const CloseOutlinedIcon: React.FC<IconProps> = ({
  fillColor = "#000",
}) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
    <Path
      d="M19.247 11.747 15.994 15l3.253 3.253a.702.702 0 1 1-.994.994L15 15.994l-3.253 3.253a.703.703 0 0 1-.994-.994L14.006 15l-3.253-3.253a.703.703 0 0 1 .994-.994L15 14.006l3.253-3.253a.703.703 0 0 1 .994.994M26.953 15A11.953 11.953 0 1 1 15 3.047 11.967 11.967 0 0 1 26.953 15m-1.406 0A10.547 10.547 0 1 0 15 25.547 10.56 10.56 0 0 0 25.547 15"
      fill={fillColor}
    />
  </Svg>
);
