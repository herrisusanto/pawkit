import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const HelpIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22.5C6.21 22.5 1.5 17.79 1.5 12S6.21 1.5 12 1.5 22.5 6.21 22.5 12 17.79 22.5 12 22.5M12 3c-4.965 0-9 4.035-9 9s4.035 9 9 9 9-4.035 9-9-4.035-9-9-9"
        fill={strokeColor}
      />
      <Path
        d="M12 6.75a2.99 2.99 0 0 0-3 3h1.5c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5c0 1.5-2.25 1.32-2.25 3.75h1.5c0-1.68 2.25-1.875 2.25-3.75 0-1.665-1.335-3-3-3m0 10.68a.93.93 0 1 0 0-1.86.93.93 0 0 0 0 1.86"
        fill={strokeColor}
      />
      <Path
        d="M9.75 10.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M12 14.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
        fill={strokeColor}
      />
    </Svg>
  );
};
