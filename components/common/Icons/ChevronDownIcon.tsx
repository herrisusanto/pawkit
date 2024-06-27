import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";

export const ChevronDownIcon: React.FC<IconProps> = ({
  fillColor = "#121315",
}) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M9 12.6c-.525 0-1.05-.203-1.448-.6l-4.89-4.89a.566.566 0 0 1 0-.795.566.566 0 0 1 .795 0l4.89 4.89c.36.36.945.36 1.305 0l4.89-4.89a.566.566 0 0 1 .795 0 .566.566 0 0 1 0 .795L10.447 12c-.397.397-.922.6-1.447.6"
      fill={fillColor}
    />
  </Svg>
);
