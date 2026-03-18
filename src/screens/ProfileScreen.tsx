import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/colors";
import PrimaryButton from "../components/PrimaryButton";
import { AuthAPI } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export default function ProfileScreen() {
  const { logout } = useAuthStore();
  return (
    <View style={styles.container}>
      <PrimaryButton title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
  },
});
