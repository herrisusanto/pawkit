import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const DashedDividerIcon = (props: SvgProps) => (
  <Svg width="100%" height={2} viewBox="0 0 379 2" fill="none" {...props}>
    <Path d="M0 1L379 0.999967" stroke="#BDBDBD" strokeDasharray="4 4" />
  </Svg>
);
