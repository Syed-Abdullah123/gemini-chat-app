import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import { supabase } from "../lib/supabase";
import { COLORS } from "../theme/colors";
import PrimaryButton from "../components/PrimaryButton";
import { AuthAPI } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export default function LoginScreen() {
  const { login, error } = useAuthStore();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    const success = await login(email, password);

    if (!success) return;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your work</Text>

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

        {/* ERROR */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <PrimaryButton
          title="Login"
          onPress={handleLogin}
          // icon="log-in-outline"
          style={{ marginTop: 30 }}
          disabled={!email || !password}
        />

        {/* REGISTER LINK */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 20, alignSelf: "center" }}
        >
          <Text style={styles.linkText}>
            Don't have an account?
            <Text style={{ color: COLORS.accent }}> Register</Text>
          </Text>
        </TouchableOpacity>
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
    linkText: {
      fontFamily: "Lexend_Regular",
      color: COLORS.textLight,
    },
});