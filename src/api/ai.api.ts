// import Constants from "expo-constants";
// // import { GoogleGenAI } from "@google/genai";
// import { GoogleGenAI } from "@google/genai";

// const apiKey = Constants.expoConfig?.extra?.geminiApiKey;

// const client = new GoogleGenAI({ apiKey });

// export const AIAPI = {
//   generateText: async (prompt: string) => {
//     try {
//       const response = await client.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: [{ role: "user", parts: [{ text: prompt }] }],
//       });

//       return response.text();
//     } catch (err) {
//       console.log("AI Error:", err);
//       return "Error talking to AI.";
//     }
//   },
// };

import Constants from "expo-constants";

// const apiKey = Constants.expoConfig?.extra?.geminiApiKey;
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;;
// const GEMINI_URL =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent";

const IMAGEN_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-003:predict";

export const AIAPI = {
  generateText: async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      // console.log("AI Response:", data);
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Sorry, I couldn't generate a response."
      );
    } catch (err) {
      console.log("AI Error:", err);
      return "Error talking to AI.";
    }
  },

  generateImage: async (prompt: string): Promise<string | null> => {
    try {
      const response = await fetch(`${IMAGEN_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: { sampleCount: 1 },
        }),
      });

      const data = await response.json();
      const base64 = data?.predictions?.[0]?.bytesBase64Encoded;
      return base64 ? `data:image/png;base64,${base64}` : null;
    } catch (err) {
      console.log("Image Gen Error:", err);
      return null;
    }
  },
};