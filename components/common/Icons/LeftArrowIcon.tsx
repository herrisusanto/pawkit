import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface LeftArrowIconProps extends React.PropsWithChildren {
  fillColor?: string;
}

const LeftArrowIcon: React.FC<LeftArrowIconProps> = ({
  fillColor = "#00A79D",
}) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Path
      d="M3 16c0 7.18 5.82 13 13 13s13-5.82 13-13S23.18 3 16 3 3 8.82 3 16m13.29-5.71a1 1 0 0 1 .006 1.414L13.026 15h8.349a1 1 0 0 1 0 2h-8.349l3.27 3.296a1 1 0 1 1-1.421 1.408l-4.962-5a1 1 0 0 1 0-1.408l4.962-5a1 1 0 0 1 1.416-.006"
      fill={fillColor}
    />
  </Svg>
);
export default LeftArrowIcon;
