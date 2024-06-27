import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { IconProps } from ".";

export const AddIcon: React.FC<IconProps> = ({
  strokeColor = "#00A79D",
  fillColor = "#C7FFF6",
  height = 60,
  width = 60,
}) => (
  <Svg width={width} height={height} viewBox="0 0 60 60" fill="none">
    <Circle cx={30} cy={30} r={29.5} fill={fillColor} stroke={strokeColor} />
    <Path
      d="M30 20v20M20 30h20"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
