import React from "react";
import Svg, { Path } from "react-native-svg";

import { SVGIconProps } from "@appTypes";
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_ICON_STROKE_COLOR,
  DEFAULT_ICON_STROKE_WIDTH,
  getIconSize,
} from "@/src/utils/icon.utils";

export const FilterIcon: React.FC<SVGIconProps> = ({
  size = DEFAULT_ICON_SIZE,
  strokeWidth = DEFAULT_ICON_STROKE_WIDTH,
  strokeColor = DEFAULT_ICON_STROKE_COLOR,
  ...props
}) => {
  const iconSize = getIconSize(size);

  return (
    <Svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
