const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;;
// const GEMINI_URL =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
// const GEMINI_URL =
  // "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:streamGenerateContent";

const IMAGEN_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-003:predict";

export const AIAPI = {
  // generateText: async (prompt: string): Promise<string> => {
  //   try {
  //     const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         contents: [{ role: "user", parts: [{ text: prompt }] }],
  //       }),
  //     });

  //     const data = await response.json();
  //     // console.log("AI Response:", data);
  //     return (
  //       data?.candidates?.[0]?.content?.parts?.[0]?.text ??
  //       "Sorry, I couldn't generate a response."
  //     );
  //   } catch (err) {
  //     console.log("AI Error:", err);
  //     return "Error talking to AI.";
  //   }
  // },

  generateTextStream: async (
    prompt: string,
    onChunk: (token: string) => void,
  ): Promise<void> => {
    try {
      // alt=sse makes Gemini return proper SSE format React Native can handle
      const response = await fetch(`${GEMINI_URL}?key=${apiKey}&alt=sse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      });

      const text = await response.text(); // ← read full SSE text at once

      // SSE lines look like:  data: {...json...}
      const lines = text.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.replace("data: ", "").trim();
        if (!jsonStr || jsonStr === "[DONE]") continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const token =
            parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (token) onChunk(token);
        } catch {
          // skip malformed lines
        }
      }
    } catch (err) {
      console.log("Streaming Error:", err);
      onChunk("⚠️ Error receiving streamed response.");
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