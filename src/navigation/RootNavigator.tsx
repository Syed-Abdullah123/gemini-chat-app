import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";
import { useAuthStore } from "../store/auth.store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screens/ChatScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import { useState } from "react";
import { useChatStore } from "../store/chat.store";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const user = useAuthStore((state) => state.user);
  const [historyVisible, setHistoryVisible] = useState(false);
    const { chats, fetchChats } = useChatStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Tabs" component={AppTabs} />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerTitle: "Chat",
                headerStyle: { backgroundColor: COLORS.textDark },
                headerTitleStyle: {
                  color: COLORS.white,
                  fontFamily: "Lexend_SemiBold",
                },
                headerTintColor: COLORS.white,
                // headerRight: () => (
                //   <TouchableOpacity
                //     style={{ marginRight: 16 }}
                //     onPress={async () => {
                //       const user = useAuthStore.getState().user;
                //       await fetchChats(user.id);
                //       setHistoryVisible(true);
                //     }}
                //   >
                //     <Ionicons
                //       name="time-outline"
                //       size={24}
                //       color={COLORS.white}
                //     />
                //   </TouchableOpacity>
                // ),
              })}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
