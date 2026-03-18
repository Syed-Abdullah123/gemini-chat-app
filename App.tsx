import { useEffect } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "./src/store/auth.store";
import { AuthProvider } from "./src/context/AuthContext";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function App() {
  const loadSession = useAuthStore((state) => state.loadSession);
  const sessionLoading = useAuthStore((state) => state.sessionLoading);
  const [fontsLoaded] = useFonts({
    Lexend_Regular: require("./assets/fonts/Lexend-Regular.ttf"),
    Lexend_Medium: require("./assets/fonts/Lexend-Medium.ttf"),
    Lexend_SemiBold: require("./assets/fonts/Lexend-SemiBold.ttf"),
    Lexend_Bold: require("./assets/fonts/Lexend-Bold.ttf"),
  });

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  if (sessionLoading) return null;

  if (!fontsLoaded) return null;

  return (
    <KeyboardProvider>
    <SafeAreaProvider>
      {/* <AuthProvider> */}
      <RootNavigator />
      {/* </AuthProvider> */}
    </SafeAreaProvider>
    </KeyboardProvider>
  );
}
