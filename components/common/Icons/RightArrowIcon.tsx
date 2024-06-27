import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface RightArrowIconProps extends React.PropsWithChildren {
  fillColor?: string;
}

const RightArrowIcon: React.FC<RightArrowIconProps> = ({
  fillColor = "#00A79D",
}) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Path
      d="M29 16c0-7.18-5.82-13-13-13S3 8.82 3 16s5.82 13 13 13 13-5.82 13-13m-13.29 5.71a1 1 0 0 1-.006-1.414L18.974 17h-8.349a1 1 0 0 1 0-2h8.349l-3.27-3.296a1 1 0 1 1 1.421-1.408l4.962 5a1 1 0 0 1 0 1.408l-4.962 5a1 1 0 0 1-1.416.006"
      fill={fillColor}
    />
  </Svg>
);
export default RightArrowIcon;
