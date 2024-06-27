import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const AddressIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
  height = 24,
  width = 24,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 10a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0M12 6.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.524 8.857a8.29 8.29 0 0 1 8.26-7.607h.432a8.29 8.29 0 0 1 8.26 7.607 8.94 8.94 0 0 1-1.99 6.396l-4.793 5.861a2.186 2.186 0 0 1-3.386 0l-4.793-5.861a8.94 8.94 0 0 1-1.99-6.396m8.26-6.107A6.79 6.79 0 0 0 5.02 8.98a7.44 7.44 0 0 0 1.656 5.323l4.793 5.862a.686.686 0 0 0 1.064 0l4.793-5.862A7.44 7.44 0 0 0 18.98 8.98a6.79 6.79 0 0 0-6.765-6.23z"
        fill={strokeColor}
      />
    </Svg>
  );
};
