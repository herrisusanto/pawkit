import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { IconProps } from ".";

export const TermsAndConditionsIcon: React.FC<IconProps & SvgProps> = ({
  strokeColor = "#00A79D",
  ...props
}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M3 10C3 6.229 3 4.343 4.172 3.172C5.343 2 7.229 2 11 2H13C16.771 2 18.657 2 19.828 3.172C21 4.343 21 6.229 21 10V14C21 17.771 21 19.657 19.828 20.828C18.657 22 16.771 22 13 22H11C7.229 22 5.343 22 4.172 20.828C3 19.657 3 17.771 3 14V10Z"
      stroke={strokeColor}
      stroke-width="1.5"
    />
    <Path
      d="M8 12H16M8 8H16M8 16H13"
      stroke={strokeColor}
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </Svg>
);
export default TermsAndConditionsIcon;
