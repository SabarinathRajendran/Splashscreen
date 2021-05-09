import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps {
  label: string;
  varient: "Primary" | "Default";
  onPress: () => void;
}

const Button = ({ label, varient, onPress }: ButtonProps) => {
  const BAckgroundColor =
    varient === "Primary" ? "#2CB9B0" : "rgba(12, 13, 52, 0.05)";

  const color = varient === "Primary" ? "#ffffff" : "#0C0D3A";

  return (
    <RectButton
      style={[styles.container, { backgroundColor: BAckgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.text, { color: color }]}>{label}</Text>
    </RectButton>
  );
};

Button.defaultProps = { varient: "default" };

export default Button;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    width: 275,
    height: 50,
    borderRadius: 25,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
