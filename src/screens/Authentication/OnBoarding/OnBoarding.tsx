import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Slide from "./Slide";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  slider: {
    height: 0.62 * height,
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
  footerOverlay: {
    flex: 1,
    borderTopLeftRadius: 75,
    backgroundColor: "#ffffff",
  },
});

const slide = [
  {
    title: "Relaxed",
    color: "#BFEAF5",
    subtitle: "Find Your Outfits",
    description:
      "confused about your outfit? Dont worry! Find the best outfit here",
  },
  {
    title: "PLayful",
    color: "#BEECC4",
    subtitle: "Find Your Outfits",
    description:
      "confused about your outfit? Dont worry! Find the best outfit here",
  },
  {
    title: "Excentric",
    color: "#FFE4D9",
    subtitle: "Find Your Outfits",
    description:
      "confused about your outfit? Dont worry! Find the best outfit here",
  },
  {
    title: "Funky",
    color: "#FFDDAA",
    subtitle: "Find Your Outfits",
    description:
      "confused about your outfit? Dont worry! Find the best outfit here",
  },
];

const OnBoarding = () => {
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const slidercolor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      x.value,
      slide.map((_, i) => i * width),
      slide.map((i) => i.color)
    ),
  }));

  const footercolor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      x.value,
      slide.map((_, i) => i * width),
      slide.map((i) => i.color)
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slidercolor]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="normal"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={onScroll}
        >
          {slide.map(({ title }, index) => (
            <Slide key={index} right={!!(index / 2)} title={title} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[styles.footer, footercolor]}>
          <View style={styles.footerOverlay}></View>
        </Animated.View>
      </View>
    </View>
  );
};

export default OnBoarding;
