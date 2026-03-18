import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../theme/colors";
import PrimaryButton from "../components/PrimaryButton";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/welcome-image.png")}
        />

        {/* TEXT CONTENT */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Intelligence Redefined</Text>

          <Text style={styles.subtitle}>Meet your</Text>
          <Text style={styles.gradientText}>AI partner</Text>

          <Text style={styles.description}>
            Aetheris Prime synchronizes with your workflow, transforming raw
            data into high-fidelity creative output in seconds.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Get Started"
            onPress={() => navigation.navigate("Login")}
            icon="chevron-forward"
          />
        </View>
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
    backgroundColor: COLORS.background,
    paddingHorizontal: 22,
  },

  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginTop: 20,
  },

  textContainer: {
    // paddingHorizontal: 16,
    // marginTop: 150,
    // alignItems: "center",
  },

  title: {
    fontSize: 14,
    color: COLORS.accentSoft,
    marginBottom: 10,
    fontFamily: "Lexend_SemiBold",
  },

  subtitle: {
    fontSize: 42,
    color: COLORS.textDark,
    fontFamily: "Lexend_SemiBold",
  },

  gradientText: {
    fontSize: 42,
    fontFamily: "Lexend_SemiBold",
    color: COLORS.accentSoft,
    paddingHorizontal: 4,
  },

  description: {
    marginTop: 12,
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 22,
    fontFamily: "Lexend_Regular",
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    marginHorizontal: 16,
    marginTop: 24,
    alignSelf: "center",
  },
});
