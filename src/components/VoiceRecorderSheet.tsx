import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { COLORS } from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  onClose: () => void;
  onResult: (text: string) => void;
}

export default function VoiceRecorderSheet({ onClose, onResult }: Props) {
  const {
    isRecording,
    partialText,
    finalText,
    hasFinal,
    startRecording,
    stopRecording,
    reset,
  } = useSpeechToText();

  // Accept final text
  const handleAccept = () => {
    if (finalText.trim().length > 0) {
      onResult(finalText);
    }
    reset();
    onClose();
  };

  // Try again
  const handleRetry = () => {
    reset();
    startRecording();
  };

  // Cancel sheet
  const handleCancel = () => {
    stopRecording();
    reset();
    onClose();
  };

  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>Voice Input</Text>

            {/* Content Text */}
            <View style={styles.textBox}>
              <Text style={styles.textPreview}>
                {isRecording
                  ? partialText || "Listening..."
                  : hasFinal
                    ? finalText || "No speech detected"
                    : "Press start and begin speaking..."}
              </Text>
            </View>

            {/* Buttons */}
            {!hasFinal && (
              <TouchableOpacity
                onPress={isRecording ? stopRecording : startRecording}
                style={[
                  styles.mainButton,
                  { backgroundColor: isRecording ? "#ff4d4d" : COLORS.accent },
                ]}
              >
                <Text style={styles.buttonText}>
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Text>
              </TouchableOpacity>
            )}

            {hasFinal && (
              <View style={styles.finalButtonsRow}>
                <TouchableOpacity
                  onPress={handleRetry}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryText}>Try Again</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAccept}
                  style={styles.acceptButton}
                >
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity onPress={handleCancel} style={styles.cancelRow}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 22,
    paddingBottom: 40,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    minHeight: 260,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  safeArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontFamily: "Lexend_SemiBold",
    color: COLORS.textDark,
  },
  textBox: {
    marginTop: 16,
    minHeight: 60,
    paddingVertical: 10,
  },
  textPreview: {
    fontSize: 16,
    fontFamily: "Lexend_Regular",
    color: COLORS.gray,
  },
  mainButton: {
    marginTop: 15,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "Lexend_SemiBold",
    fontSize: 16,
  },
  finalButtonsRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 8,
  },
  acceptText: {
    color: COLORS.white,
    fontFamily: "Lexend_SemiBold",
    fontSize: 16,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: COLORS.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.accentSoft,
  },
  secondaryText: {
    color: COLORS.textDark,
    fontFamily: "Lexend_Medium",
  },
  cancelRow: {
    marginTop: 12,
    alignSelf: "center",
  },
  cancelText: {
    color: COLORS.gray,
    fontFamily: "Lexend_Regular",
  },
});
