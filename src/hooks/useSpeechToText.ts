import { useState } from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

export function useSpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [partialText, setPartialText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [hasFinal, setHasFinal] = useState(false);

  useSpeechRecognitionEvent("start", () => {
    setIsRecording(true);
    setPartialText("");
    setFinalText("");
    setHasFinal(false);
  });

  useSpeechRecognitionEvent("end", () => {
    setIsRecording(false);
  });

  useSpeechRecognitionEvent("result", (event) => {
    const text = event.results?.[0]?.transcript ?? "";

    if (event.isFinal) {
      setFinalText(text);
      setHasFinal(true);
      setIsRecording(false);
    } else {
      setPartialText(text);
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.log("Speech error:", event.error, event.message);
    setIsRecording(false);
  });

  const startRecording = async () => {

    const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!perm.granted) {
      alert("Microphone permission denied");
      return;
    }

    setPartialText("");
    setFinalText("");
    setHasFinal(false);

    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: false,
      addsPunctuation: true,
    });
  };

  const stopRecording = async () => {
    ExpoSpeechRecognitionModule.stop();
  };

  const reset = () => {
    setIsRecording(false);
    setPartialText("");
    setFinalText("");
    setHasFinal(false);
  };

  return {
    isRecording,
    partialText,
    finalText,
    hasFinal,
    startRecording,
    stopRecording,
    reset,
  };
}