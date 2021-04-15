import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
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
    backgroundColor: "cyan",
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

export default class OnBoarding extends Component {
  x = useValue(0);
  onScrollhandler = useAnimatedScrollHandler;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.slider}>
          <Animated.ScrollView
            horizontal
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            {...{ onScroll }}
          >
            <Slide label="Relaxed" />
            <Slide label="Playful" right />
            <Slide label="Excentric" />
            <Slide label="Funky" right />
          </Animated.ScrollView>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "cyan",
            }}
          >
            <View style={styles.footerOverlay}></View>
          </View>
        </View>
      </View>
    );
  }
}
