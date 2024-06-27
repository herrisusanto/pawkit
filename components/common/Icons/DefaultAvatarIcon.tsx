import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const DefaultAvatarIcon: React.FC<IconProps> = ({
  fillColor = getToken("$natural0", "color"),
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
      <Path d="M42 24a12 12 0 1 1-24 0 12 12 0 0 1 24 0" fill={fillColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.776 59.975C12.776 59.333 0 46.157 0 30 0 13.43 13.43 0 30 0c16.569 0 30 13.43 30 30 0 16.569-13.431 30-30 30h-.411q-.408-.001-.813-.025M10.749 48.93a4.542 4.542 0 0 1 3.784-6.007c11.694-1.294 19.311-1.177 30.948.027a4.486 4.486 0 0 1 3.747 6.003A26.9 26.9 0 0 0 56.999 30C57 15.088 44.911 3 30 3S3 15.088 3 30a26.9 26.9 0 0 0 7.749 18.93"
        fill={fillColor}
      />
    </Svg>
  );
};
