import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const InfoIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.75 16.5v-6h-3V12h1.5v4.5H9V18h6v-1.5zM12 6a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 6"
        fill={strokeColor}
      />
      <Path
        d="M12 22.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18"
        fill={strokeColor}
      />
    </Svg>
  );
};
