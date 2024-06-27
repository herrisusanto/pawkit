import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const CloseIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
}) => {
  return (
    <Svg width={21} height={20} viewBox="0 0 21 20" fill="none">
      <Path
        d="M16.567 15.183a.625.625 0 1 1-.884.884L10.5 10.884l-5.183 5.183a.626.626 0 0 1-.884-.884L9.616 10 4.433 4.817a.625.625 0 0 1 .884-.884L10.5 9.116l5.183-5.183a.625.625 0 1 1 .884.884L11.384 10z"
        fill={strokeColor}
      />
    </Svg>
  );
};
