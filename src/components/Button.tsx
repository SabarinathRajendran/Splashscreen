import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
      onPress={onPress}
    >
      <Text style={[styles.text, { color: color }]}>{label}</Text>
    </RectButton>
  );
};

Button.defaultProps = { varient: "default" };

export default Button;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
