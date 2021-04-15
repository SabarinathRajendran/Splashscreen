import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface SlideProps {
  label: string;
  right?: boolean;
}

const { width, height } = Dimensions.get("window");

const SLIDER_HEIGHT = 0.5 * height;

const Slide = ({ label, right }: SlideProps) => {
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
        <Text style={styles.title}>{label}</Text>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
});
