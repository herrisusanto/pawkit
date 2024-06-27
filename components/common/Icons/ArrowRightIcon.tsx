import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const ArrowRightIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
}) => {
  return (
    <Svg width={15} height={16} viewBox="0 0 15 16" fill="none">
      <Path
        d="M5.569 13.419a.46.46 0 0 1-.332-.138.47.47 0 0 1 0-.662l4.076-4.075c.3-.3.3-.788 0-1.088L5.237 3.381a.47.47 0 0 1 0-.662.47.47 0 0 1 .663 0l4.075 4.075c.319.318.5.75.5 1.206s-.175.887-.5 1.206L5.9 13.281a.5.5 0 0 1-.331.138"
        fill={strokeColor}
      />
    </Svg>
  );
};
