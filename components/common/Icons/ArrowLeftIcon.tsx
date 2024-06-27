import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { IconProps } from ".";

export const ArrowLeftIcon: React.FC<IconProps & SvgProps> = ({
  fillColor = "#121315",
  ...props
}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M9.57043 18.8191C9.38043 18.8191 9.19043 18.7491 9.04043 18.5991L2.97043 12.5291C2.68043 12.2391 2.68043 11.7591 2.97043 11.4691L9.04043 5.39914C9.33043 5.10914 9.81043 5.10914 10.1004 5.39914C10.3904 5.68914 10.3904 6.16914 10.1004 6.45914L4.56043 11.9991L10.1004 17.5391C10.3904 17.8291 10.3904 18.3091 10.1004 18.5991C9.96043 18.7491 9.76043 18.8191 9.57043 18.8191Z"
      fill={fillColor}
    />
    <Path
      d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z"
      fill={fillColor}
    />
  </Svg>
);
export default ArrowLeftIcon;
