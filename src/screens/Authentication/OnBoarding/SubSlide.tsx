import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../../components/Button";

interface SubSlideProps {
  subtitle: string;
  description: string;
  last: boolean;
}

const { width, height } = Dimensions.get("window");

const subtitlesize = Platform.OS === "ios" ? 20 : 30;

const descsize = Platform.OS === "ios" ? 12 : 18;

const SubSlide = ({ subtitle, description, last }: SubSlideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
};

export default SubSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignContent: "center",
  },
  subtitle: {
    fontSize: subtitlesize,
    fontFamily: "Inter_900Black",
    textAlign: "center",
    marginBottom: 20,
  },
  desc: {
    fontSize: descsize,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    paddingHorizontal: 50,
    marginBottom: 20,
  },
});
