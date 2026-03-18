import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { supabase } from "../lib/supabase";
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/auth.store';
import { useChatStore } from '../store/chat.store';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const { createChat } = useChatStore();
  const username = user?.email
    ? user.email.split("@")[0].charAt(0).toUpperCase() +
      user.email.split("@")[0].slice(1)
    : "Guest";
    
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <Text style={styles.title}>Welcome {username}!</Text>
        <Text style={styles.subtitle}>
          Here's what's possible with our app —
          fast, smart and built just for you.
        </Text>

        {/* Feature Section */}
        <View style={styles.featuresRow}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>AI Powered</Text>
            <Text style={styles.featureDesc}>Smart recommendations tailored to you.</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Secure</Text>
            <Text style={styles.featureDesc}>Protected with modern encryption and Supabase Auth.</Text>
          </View>
        </View>

        <View style={styles.featuresRow}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Cloud Sync</Text>
            <Text style={styles.featureDesc}>Your data stays updated across devices.</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Fast</Text>
            <Text style={styles.featureDesc}>Optimized for performance and low loading time.</Text>
          </View>
        </View>

        {/* Highlight Card */}
        <View style={styles.highlightCard}>
          <Text style={styles.highlightTitle}>🚀 Pro Tip</Text>
          <Text style={styles.highlightDesc}>
            Stay tuned — more features coming soon including chat, realtime updates and custom AI tools!
          </Text>

          <PrimaryButton
            title="Start a New Chat"
            onPress={async () => {
              const user = useAuthStore.getState().user;
              const chat = await createChat(user.id);
              navigation.navigate("Chat", { chatId: chat.id });
            }}
            style={{ marginTop: 20 }}
            icon='chatbox-ellipses-outline'
            iconSize={24}
            textStyle={{ fontSize: 14}}
          />
        </View>
<Text style={styles.sectionTitle}>Your Activity</Text>

<View style={styles.statsRow}>
  <View style={styles.statCard}>
    <Text style={styles.statNumber}>12</Text>
    <Text style={styles.statLabel}>Chats Created</Text>
  </View>

  <View style={styles.statCard}>
    <Text style={styles.statNumber}>3</Text>
    <Text style={styles.statLabel}>Active Today</Text>
  </View>

  <View style={styles.statCard}>
    <Text style={styles.statNumber}>24</Text>
    <Text style={styles.statLabel}>Messages Sent</Text>
  </View>
</View>

<Text style={styles.sectionTitle}>Latest Updates</Text>

<View style={styles.updateCard}>
  <Text style={styles.updateTitle}>💬 Chat System</Text>
  <Text style={styles.updateDesc}>
    Our AI chat system is now faster and more responsive.
  </Text>
</View>

<View style={styles.updateCard}>
  <Text style={styles.updateTitle}>⚡ Performance Boost</Text>
  <Text style={styles.updateDesc}>
    We've improved loading times across the app.
  </Text>
</View>
      </ScrollView>

      {/* Logout Button */}
      <PrimaryButton
        title="Logout"
        onPress={() => supabase.auth.signOut()}
        style={{ position: "absolute", bottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontFamily: "Lexend_Bold",
    marginTop: 20,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    fontFamily: "Lexend_Regular",
    color: COLORS.gray,
    marginBottom: 20,
  },

  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  featureCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    // borderColor: "#E0E0E0",
    borderColor: COLORS.accentSoft,
  },

  featureTitle: {
    fontSize: 16,
    fontFamily: "Lexend_SemiBold",
    marginBottom: 4,
    color: COLORS.textDark,
  },

  featureDesc: {
    fontSize: 13,
    fontFamily: "Lexend_Regular",
    color: COLORS.textLight,
  },

  highlightCard: {
    backgroundColor: COLORS.textDark,
    padding: 20,
    borderRadius: 20,
    marginTop: 16,
  },

  highlightTitle: {
    fontSize: 18,
    fontFamily: "Lexend_Bold",
    color: COLORS.white,
    marginBottom: 6,
  },

  highlightDesc: {
    fontSize: 14,
    fontFamily: "Lexend_Regular",
    color: "#d7e2e4",
  },
  startChatBtn: {
    marginTop: 14,
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startChatText: {
    color: COLORS.white,
    fontFamily: "Lexend_SemiBold",
    fontSize: 16,
  },

  sectionTitle: {
  fontSize: 18,
  // fontWeight: "600",
  marginTop: 25,
  marginBottom: 10,
  fontFamily: "Lexend_SemiBold",
},

statsRow: {
  flexDirection: "row",
  justifyContent: "space-between"
},

statCard: {
  flex: 1,
  padding: 15,
  borderRadius: 12,
  backgroundColor: COLORS.white,
  alignItems: "center",
  marginRight: 10,
  borderWidth: 1,
  borderColor: COLORS.accentSoft
},

statNumber: {
  fontSize: 20,
  // fontWeight: "bold",
  fontFamily: "Lexend_Bold"
},

statLabel: {
  fontSize: 12,
  marginTop: 4,
  color: "#666",
  fontFamily: "Lexend_Regular",
  textAlign: "center",
},

updateCard: {
  padding: 15,
  borderRadius: 12,
  backgroundColor: COLORS.white,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: COLORS.accentSoft
},

updateTitle: {
  // fontWeight: "600",
  marginBottom: 4,
  fontFamily: "Lexend_SemiBold"
},

updateDesc: {
  fontSize: 13,
  color: "#555",
  fontFamily: "Lexend_Regular"
},
});