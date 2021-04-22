import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolateColor,
  multiply,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Slide from "./Slide";
import SubSlide from "./SubSlide";

const { width, height } = Dimensions.get("window");

const BORDER_RADIUS = 75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  slider: {
    height: 0.62 * height,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerOverlay: {
    flex: 1,
    width: width,
    borderTopLeftRadius: BORDER_RADIUS,
    backgroundColor: "#ffffff",
  },
  footerText: {
    flex: 1,
    flexDirection: "row",
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

  const footerslider = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: -x.value,
      },
    ],
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
          {slide.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} title={title} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[styles.footer, footercolor]}>
          <View style={styles.footerOverlay}>
            <Animated.View
              style={[
                styles.footerText,
                { width: width * slide.length },
                footerslider,
              ]}
            >
              {slide.map(({ subtitle, description }, index) => (
                <SubSlide
                  key={index}
                  last={index === slide.length - 1}
                  subtitle={subtitle}
                  description={description}
                />
              ))}
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default OnBoarding;
