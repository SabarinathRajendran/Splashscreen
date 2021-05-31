import React, { createRef } from "react";
import { View, StyleSheet, Dimensions, Image, Alert } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Slide from "./Slide";
import SubSlide from "./SubSlide";
import Pagination from "./Pagination";

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
    overflow: "hidden",
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
  pagination: {
    alignItems: "center",
    justifyContent: "center",
    height: BORDER_RADIUS,
    width: width,

    flexDirection: "row",
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

const slide = [
  {
    title: "Relaxed",
    color: "#BFEAF5",
    subtitle: "Find Your Outfits",
    description:
      "confused about your outfit? Dont worry! Find the best outfit here",
    picture: require("../../../../assets/images/girl_7.png"),
  },
  {
    title: "PLayful",
    color: "#FF7D6A",
    subtitle: "Hear it First, Wear it First",
    description:
      "HAting the clothes in your collections?, Explore hundreds of outfit ideas",
    picture: require("../../../../assets/images/girl_3.png"),
  },
  {
    title: "Excentric",
    color: "#FFE4D9",
    subtitle: "Look Good, Feel Good",
    description:
      "My feeling is that it’s not about how much something costs. If it looks great, It looks great.",
    picture: require("../../../../assets/images/girl_2.png"),
  },
  {
    title: "Funky",
    color: "#FFD868",
    subtitle: "Your Style, Your Way",
    description:
      "Create your unique & individual outfits and look amazing everyday",
    picture: require("../../../../assets/images/girl_5.png"),
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

  const scroll = createRef<Animated.ScrollView>();

  const currentindex = useDerivedValue(() => x.value / width);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slidercolor]}>
        {slide.map((slide, i) => {
          const opacity = useAnimatedStyle(() => ({
            opacity: interpolate(
              x.value,
              [(i - 0.5) * width, i * width, (i + 0.5) * width],
              [0, 1, 0],
              Extrapolate.CLAMP
            ),
          }));

          return (
            <Animated.View key={i} style={[styles.imageContainer, opacity]}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={slide.picture}
              ></Image>
            </Animated.View>
          );
        })}

        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={onScroll}
        >
          {slide.map(({ title, picture }, index) => (
            <Slide
              key={index}
              right={!!(index % 2)}
              currentIndex={currentindex}
              index={index}
              title={title}
              source={picture}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[styles.footer, footercolor]}>
          <View style={styles.footerOverlay}>
            <View style={styles.pagination}>
              {slide.map((_, index) => (
                //currentindex = divide{x, width}
                <Pagination
                  key={index}
                  {...{ index }}
                  currentindex={currentindex}
                />
              ))}
            </View>
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
                  onPress={() => {
                    if (index === slide.length - 1) {
                      Alert.alert(
                        "OnBoarding Project",
                        "You Reached the Last Slide",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ]
                      );
                    } else if (scroll.current) {
                      //@ts-ignore  getNode is Deprecated
                      scroll.current.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}
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
