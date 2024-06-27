import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";

export const DollarOutlinedIcon: React.FC<IconProps> = ({
  strokeColor = "#4F4F4F",
  height = 20,
  width = 20,
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z"
      stroke={strokeColor}
      strokeWidth={1.1}
    />
    <Path
      d="M10 5v10m2.5-7.083c0-1.15-1.12-2.084-2.5-2.084s-2.5.934-2.5 2.084S8.62 10 10 10s2.5.933 2.5 2.083-1.12 2.084-2.5 2.084-2.5-.934-2.5-2.084"
      stroke={strokeColor}
      strokeWidth={1.1}
      strokeLinecap="round"
    />
  </Svg>
);
