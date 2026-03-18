import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

interface Props {
  title?: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  backgroundColor?: string;
  iconSize?: number;
}

export default function PrimaryButton({
  title,
  onPress,
  icon,
  style,
  textStyle,
  disabled = false,
  backgroundColor = COLORS.accent,
  iconSize = 20,
}: Props) {
  const containerStyle: ViewStyle = {
    ...styles.button,
    backgroundColor: disabled ? "#b5e4c0" : backgroundColor,
    justifyContent: icon ? "space-between" : "center",
    opacity: disabled ? 1 : 1,
    ...style,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={!disabled ? onPress : undefined}
      style={containerStyle}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>

      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color="#fff"
          style={{ marginLeft: 8 }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Lexend_SemiBold",
  },
});