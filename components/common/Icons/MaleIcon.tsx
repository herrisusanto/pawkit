import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const MaleIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.232 9.747a6 6 0 1 0-8.465 8.506 6 6 0 0 0 8.465-8.506m0 0L20 4m0 0h-4m4 0v4"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
