import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const BellIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18v.75a3 3 0 0 1-6 0V18m11.048-1.527c-1.204-1.473-2.054-2.223-2.054-6.285 0-3.72-1.9-5.044-3.463-5.688a.84.84 0 0 1-.466-.495C13.79 3.072 13.022 2.25 12 2.25s-1.791.823-2.063 1.756a.83.83 0 0 1-.466.494c-1.565.645-3.463 1.965-3.463 5.688-.002 4.062-.852 4.812-2.056 6.285-.498.61-.061 1.527.811 1.527h14.479c.867 0 1.301-.92.805-1.527"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
