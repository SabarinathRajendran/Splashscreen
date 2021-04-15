import React, { Component } from "react";
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
    color: "#FFDDDD",
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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slidercolor]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={onScroll}
        >
          <Slide label="Relaxed" />
          <Slide label="Playful" right />
          <Slide label="Excentric" />
          <Slide label="Funky" right />
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "cyan" }}
        >
          <View style={styles.footerOverlay}></View>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
