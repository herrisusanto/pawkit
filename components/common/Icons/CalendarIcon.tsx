import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";

export const CalendarIcon: React.FC<IconProps> = ({
  strokeColor = "#fff",
  height = 22,
  width = 22,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Path
        d="M1 11c0-3.771 0-5.657 1.172-6.828S5.229 3 9 3h4c3.771 0 5.657 0 6.828 1.172S21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21H9c-3.771 0-5.657 0-6.828-1.172S1 16.771 1 13z"
        stroke={strokeColor}
        strokeWidth={1.5}
      />
      <Path
        d="M6 3V1.5M16 3V1.5M1.5 8h19"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M17 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
        fill={strokeColor}
      />
    </Svg>
  );
};
