import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const TrashIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$natural0", "color"),
}) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 1.75V3h5.25a.75.75 0 1 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75m-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25M4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 1 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226z"
        fill={strokeColor}
      />
      <Path
        d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5a.75.75 0 1 1-1.5.088l-.5-8.5a.75.75 0 0 1 .706-.793m6.293.793a.75.75 0 1 0-1.5-.088l-.5 8.5a.75.75 0 0 0 1.499.088z"
        fill={strokeColor}
      />
    </Svg>
  );
};
