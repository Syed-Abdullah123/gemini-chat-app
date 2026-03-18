import { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps {
    label?: string;
    icon?: string;
    secure?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
}

export default function Input({
  label,
  icon,
  secure,
  value,
  onChangeText,
  placeholder,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {icon && <Ionicons name={icon} size={20} color="#aaaaaa" style={styles.icon} />}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#cccccc"
          secureTextEntry={secure && !showPassword}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />

        {secure && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#aaaaaa"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  label: {
    fontFamily: "Lexend_SemiBold",
    fontSize: 16,
    marginBottom: 8,
    color: "#132f36",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: "Lexend_Regular",
    fontSize: 15,
  },
});