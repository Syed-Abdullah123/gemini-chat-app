import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/Input";
import { supabase } from "../lib/supabase";
import { COLORS } from "../theme/colors";
import PrimaryButton from "../components/PrimaryButton";
import { AuthAPI } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export default function RegisterScreen() {
  const { register, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister() {
    const success = await register(email, password);

    if (success) {
      setMessage("Check your email to verify your account");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Start your journey with Aetheris Prime</Text>

        {/* FORM */}
        <View style={{ marginTop: 30 }}>
          <Input
            label="Email"
            icon="mail-outline"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            label="Password"
            icon="lock-closed-outline"
            secure
            placeholder="********"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* ERROR TEXT */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <PrimaryButton
          title="Register"
          onPress={handleRegister}
          // icon="chevron-forward"
          style={{ marginTop: 30 }}
          disabled={!email || !password}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: "Lexend_SemiBold",
    fontSize: 34,
    color: COLORS.textDark,
  },
  subtitle: {
    fontFamily: "Lexend_Regular",
    fontSize: 16,
    marginTop: 4,
    color: COLORS.textLight,
  },
  errorText: {
    marginTop: 10,
    color: "red",
    fontFamily: "Lexend_Regular",
  },
  successText: {
    marginTop: 10,
    color: "green",
    fontFamily: "Lexend_Regular",
  },
  button: {
    flexDirection: "row",
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "Lexend_SemiBold",
    color: "#fff",
    fontSize: 16,
    marginRight: 8,
  },
});