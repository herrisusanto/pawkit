import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";
import { IconProps } from ".";

export const SolidCheckIcon: React.FC<IconProps> = ({
  height = 24,
  width = 25,
}) => (
  <Svg viewBox="0 0 25 24" fill="none">
    <G clipPath="url(#a)">
      <Mask
        id="b"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={25}
        height={24}
      >
        <Path
          d="M12.5 22.909a10.88 10.88 0 0 0 7.715-3.195A10.87 10.87 0 0 0 23.41 12a10.88 10.88 0 0 0-3.195-7.714A10.88 10.88 0 0 0 12.5 1.091a10.88 10.88 0 0 0-7.714 3.195A10.88 10.88 0 0 0 1.592 12a10.88 10.88 0 0 0 3.195 7.714 10.87 10.87 0 0 0 7.714 3.195Z"
          fill="#fff"
          stroke="#fff"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <Path
          d="m8.137 12 3.272 3.273 6.546-6.546"
          stroke="#000"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Mask>
      <G mask="url(#b)">
        <Path d="M-.59-1.09h26.182v26.18H-.59z" fill="#00A79D" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h24v24H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
