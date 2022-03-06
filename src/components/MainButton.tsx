import React, { FC } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Colors, Dimensions } from "../constants";

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: object;
}

const MainButton: FC<ButtonProps> = ({ onPress, title, disabled, style }) => {
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: !disabled
            ? Colors.DEFAULT_GREEN
            : Colors.DEFAULT_GREY,
        },
        style,
      ]}
      onPress={!disabled ? onPress : () => {}}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    height: Dimensions.setHeight(8),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Poppins_400Regular",
  },
});

export default MainButton;
