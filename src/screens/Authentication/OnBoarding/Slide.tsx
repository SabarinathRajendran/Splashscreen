import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

interface SlideProps {
  title: string;
  right?: boolean;
  source: number;
  currentIndex: Animated.SharedValue<number>;
  index: number;
}

const { width, height } = Dimensions.get("window");

const SLIDER_HEIGHT = 0.5 * height;

const Slide = ({ title, right }: SlideProps) => {
  const transform = [
    {
      translateY: SLIDER_HEIGHT / 2,
    },
    {
      translateX: right ? width / 2 - 50 : -width / 2 + 50,
    },
    {
      rotate: right ? "-90deg" : "90deg",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ ...styles.titlecontainer, transform }}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  titlecontainer: {
    height: "auto",
    width: "auto",
    justifyContent: "center",
  },
  title: {
    fontSize: height / 15,
    fontFamily: "Inter_900Black",
    textAlign: "center",
    color: "#ffffff",
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    marginTop: 20,
  },
});
