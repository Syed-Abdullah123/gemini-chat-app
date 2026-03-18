import { StyleSheet, Text, View, FlatList, TextInput, Button, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image } from "react-native";
import React, { use, useEffect, useRef, useState } from "react";
import { useMessageStore } from "../store/message.store";
import { COLORS } from "../theme/colors";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";
import { useChatStore } from "../store/chat.store";
import { useAuthStore } from "../store/auth.store";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import BottomSheet from "../components/BottomSheet";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import ThinkingBubble from "../components/ThinkingBubble";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from 'react-native-markdown-display';

export default function ChatScreen({ route }: any) {
  const { chatId } = route.params ?? {};

  const { messages, fetchMessages, sendMessage, thinking  } = useMessageStore();

  const [input, setInput] = useState("");

  const insets = useSafeAreaInsets();

  const { createChat } = useChatStore();
  const user = useAuthStore((state) => state.user);
  const navigation = useNavigation();

  const listRef = useRef(null);

  const [historyVisible, setHistoryVisible] = useState(false);
  const { chats, fetchChats } = useChatStore();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // showing the header right icon in our header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={async () => {
            const user = useAuthStore.getState().user;
            await fetchChats(user.id);
            setHistoryVisible(true);
          }}
        >
          <Ionicons name="time-outline" size={26} color={COLORS.white} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
          // }} 

  useEffect(() => {
    if (!chatId) return;

    useMessageStore.getState().clearMessages();

    setTimeout(() => fetchMessages(chatId), 50);
  }, [chatId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const msg = input;
    setInput("");

    await sendMessage(chatId, msg);
  };

  return (
    <>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      {/* <View
        style={{ flex: 1, paddingBottom: keyboardHeight }}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={90}
      > */}
      {/* <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={26} color={COLORS.textDark} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Chat</Text>

            <TouchableOpacity
              onPress={async () => {
                const user = useAuthStore.getState().user;
                await fetchChats(user.id);
                setHistoryVisible(true);
              }}
            >
              <Ionicons name="time-outline" size={26} color={COLORS.textDark} />
            </TouchableOpacity>
          </View> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={40}
      >
        {/* <LinearGradient
          colors={["#132f36", "#132f3680", "#132f3650"]}
          // colors={["red", "green", "blue"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        > */}
        <View style={styles.container}>
          <FlatList
            inverted
            ref={listRef}
            data={messages ?? []}
            keyExtractor={(item) => item?.id ?? Math.random().toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.role === "user" ? styles.userBubble : styles.aiBubble,
                ]}
              >
                {item.image_url ? (
                  <Image
                    source={{ uri: item.image_url }}
                    style={{ width: 220, height: 220, borderRadius: 12 }}
                    resizeMode="cover"
                  />
                ) : item.role === "assistant" ? (
                  <Markdown
                    style={{
                      body: {
                        color: COLORS.textDark,
                        fontFamily: "Lexend_Regular",
                        fontSize: 14,
                      },
                      strong: {
                        fontFamily: "Lexend_SemiBold",
                        fontWeight: "normal",
                      },
                      bullet_list: { marginVertical: 4 },
                      ordered_list: { marginVertical: 4 },
                      code_inline: {
                        backgroundColor: "#f0f0f0",
                        borderRadius: 4,
                        paddingHorizontal: 4,
                      },
                      fence: {
                        backgroundColor: "#f0f0f0",
                        borderRadius: 8,
                        padding: 10,
                      },
                    }}
                  >
                    {item.content}
                  </Markdown>
                ) : (
                  <Text style={[styles.messageText, styles.userText]}>
                    {item.content}
                  </Text>
                )}
              </View>
            )}
            keyboardDismissMode="interactive"
            ListHeaderComponent={thinking ? <ThinkingBubble /> : null}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !thinking ? (
                // <View style={{ transform: [{ scaleY: -1 }] }}>
                <View style={styles.emptyContainer}>
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={56}
                    color={COLORS.textDark}
                    style={{ opacity: 0.4 }}
                  />
                  <Text style={styles.emptyTitle}>Start a conversation</Text>
                  <Text style={styles.emptySubtitle}>
                    Ask me anything — I'm here to help
                  </Text>
                </View>
                // </View>
              ) : null
            }
            // onContentSizeChange={() =>
            //   listRef.current.scrollToEnd({ animated: true })
            // }
            // onLayout={() => listRef.current.scrollToEnd({ animated: true })}
          />

          {/* <View
              style={[styles.inputRow, { paddingBottom: insets.bottom + 10 }]}
            > */}
          <View style={[styles.inputRow, { paddingBottom: 50 }]}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                value={input}
                onChangeText={setInput}
                placeholder="Ask something..."
                multiline
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons name="mic" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              {/* <Ionicons name="send" size={24} color={COLORS.white} /> */}
              <FontAwesome name="send-o" size={22} color={COLORS.white} />
              {/* <Feather name="send" size={24} color={COLORS.white} /> */}
            </TouchableOpacity>
          </View>
        </View>
        {/* </LinearGradient> */}
      </KeyboardAvoidingView>
      {/* </View> */}
      {/* </TouchableWithoutFeedback> */}
      <BottomSheet
        visible={historyVisible}
        onClose={() => setHistoryVisible(false)}
      >
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
            onPress={() => {
              setHistoryVisible(false);

              useMessageStore.getState().clearMessages();

              navigation.navigate("Chat", { chatId: chat.id });
            }}
          >
            <Text style={{ fontFamily: "Lexend_Regular", fontSize: 15 }}>
              {chat.title || "Untitled Chat"}
            </Text>
            <Text
              style={{
                color: "#999",
                marginTop: 4,
                fontSize: 12,
                fontFamily: "Lexend_Regular",
              }}
            >
              {new Date(chat.created_at).toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}
      </BottomSheet>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 14,
  },
  userBubble: {
    backgroundColor: COLORS.white,
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.accentSoft,
  },
  aiBubble: {
    backgroundColor: COLORS.white,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.accentSoft,
  },
  userText: { color: COLORS.textDark, fontSize: 14 },
  aiText: { color: COLORS.textDark },

  messageText: {
    fontSize: 16,
    fontFamily: "Lexend_Regular",
  },

  emptyContainer: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  // paddingTop: 120,
  gap: 10,
  top: 100
},
emptyTitle: {
  fontFamily: "Lexend_SemiBold",
  fontSize: 18,
  color: COLORS.textDark,
  opacity: 0.6,
},
emptySubtitle: {
  fontFamily: "Lexend_Regular",
  fontSize: 14,
  color: COLORS.textDark,
  opacity: 0.4,
  textAlign: "center",
  paddingHorizontal: 40,
},

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.accentSoft,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginRight: 10,
    padding: 5,
  },

  inputText: {
    flex: 1,
    // fontSize: 16,
    fontFamily: "Lexend_Regular",
  },

  sendButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: COLORS.accent,
    paddingRight: 4,
  },
});