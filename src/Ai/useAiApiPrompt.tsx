import { notNull } from "@dwidge/utils-js";
import { useMemo } from "react";
import { toString } from "./toString";
import { useAiApiGet } from "./AiApiContext";

export const useAiApiPrompt = () => {
  const config = useAiApiGet();
  const { apiUrl, apiKey, model, maxInputCharacters, maxOutputTokens } = config;

  return useMemo(
    () =>
      apiUrl && apiKey && model
        ? async (
            system: string,
            user: string,
            assistant?: string,
            stop?: string,
          ) => {
            if (
              maxInputCharacters != null &&
              system.length + user.length > maxInputCharacters
            ) {
              throw new Error(
                `useAiApiE1: Input text length (${system.length + user.length}) exceeds maximum allowed characters (${maxInputCharacters}).`,
              );
            }

            try {
              const response = await fetch(`${apiUrl}/chat/completions`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  model,
                  messages: [
                    { role: "system", content: system },
                    { role: "user", content: user },
                    assistant
                      ? { role: "assistant", content: assistant }
                      : undefined,
                  ].filter(notNull),
                  ...(maxOutputTokens != null && {
                    max_tokens: maxOutputTokens,
                  }),
                  ...(stop && { stop }),
                }),
              });

              if (!response.ok) {
                const errorData = await response.json();
                console.log(
                  "useAiApiE2",
                  {
                    error: `API Error: ${response.status} - ${response.statusText}`,
                    details: errorData,
                  },
                  response,
                );
                throw new Error(
                  "useAiApiE2: Request failed: " + response.statusText,
                  {
                    cause: {
                      error: `API Error: ${response.status} - ${response.statusText}`,
                      details: errorData,
                    },
                  },
                );
              }

              const responseData = await response.json();
              const messageContent =
                responseData.choices?.[0]?.message?.content;
              return toString(messageContent);
            } catch (error) {
              throw new Error("useAiApiE3: Request failed", { cause: error });
            }
          }
        : undefined,
    [apiUrl, apiKey, model, maxInputCharacters, maxOutputTokens],
  );
};
