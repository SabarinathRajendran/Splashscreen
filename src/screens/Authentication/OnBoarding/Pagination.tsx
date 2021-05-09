import React from "react";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PaginationProps {
  index: number;
  currentindex: Animated.SharedValue<number>;
}

const Pagination = ({ index, currentindex }: PaginationProps) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentindex.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      currentindex.value,
      [index - 1, index, index + 1],
      [1, 1.5, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ scale }],
      width: 5,
      height: 5,
      margin: 5,
      backgroundColor: "#2ef",
      borderRadius: 50,
    };
  });
  return <Animated.View style={style} />;
};

export default Pagination;
