import React from "react";
import Svg, { Path } from "react-native-svg";

import { SVGIconProps } from "@appTypes";
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_ICON_STROKE_COLOR,
  DEFAULT_ICON_STROKE_WIDTH,
  getIconSize,
} from "@/src/utils/icon.utils";

export const SearchIcon: React.FC<SVGIconProps> = ({
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
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21.309 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
