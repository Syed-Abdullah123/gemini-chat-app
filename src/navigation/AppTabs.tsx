import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#132F36",
        tabBarInactiveTintColor: "#D4D2D1",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home")
            iconName = focused ? "search" : "search-outline";
          // if (route.name === "Chat")
          //   iconName = focused ? "chatbubble" : "chatbubble-outline";
          if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName as any} size={26} color={color} />;
        },
        headerStyle: {
          backgroundColor: COLORS.textDark,
        },
        headerTitle:
          route.name === "Home"
            ? "Dashboard"
            : route.name === "Chat"
              ? "Conversations"
              : "Profile",
        headerTitleStyle: {
          color: COLORS.white,
          fontFamily: "Lexend_SemiBold",
        },
        tabBarLabelStyle: {
          fontFamily: "Lexend_Regular",
          // marginTop: 2
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Chat" component={ChatScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}