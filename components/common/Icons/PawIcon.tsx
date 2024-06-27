import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const PawIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.571 16.286c.947 0 1.715-1.152 1.715-2.572s-.768-2.571-1.715-2.571c-.946 0-1.714 1.152-1.714 2.571s.768 2.572 1.714 2.572M7.714 8.57C8.66 8.571 9.428 7.42 9.428 6S8.66 3.428 7.714 3.428 6 4.58 6 6s.768 2.57 1.714 2.57m8.571 0C17.232 8.571 18 7.42 18 6s-.768-2.572-1.715-2.572c-.946 0-1.714 1.152-1.714 2.572s.768 2.571 1.714 2.571m5.143 7.715c.947 0 1.715-1.152 1.715-2.572s-.768-2.571-1.715-2.571c-.946 0-1.714 1.152-1.714 2.571s.768 2.572 1.714 2.572m-4.285.857c0 2.366-2.777 3.428-5.143 3.428s-5.143-1.062-5.143-3.428 1.714-6 5.143-6 5.143 3.634 5.143 6"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
