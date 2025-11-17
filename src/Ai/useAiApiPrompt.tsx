import { notNull } from "@dwidge/utils-js";
import { useMemo } from "react";
import { AiApi, useAiApiGet } from "./AiApiContext";
import { toString } from "./toString";

export interface AiApiResponse {
  text: string;
  sources?: { url: string; title?: string }[];
  suggestions?: string[];
}

const geminiNativePrompt = async (
  system: string,
  user: string,
  assistant: string | undefined,
  stop: string | undefined,
  online: boolean | undefined,
  config: AiApi,
): Promise<AiApiResponse> => {
  const { apiUrl, apiKey, model, maxOutputTokens } = config;

  if (!apiUrl || !apiKey || !model) {
    throw new Error("useAiApiE5: Gemini API configuration is incomplete.");
  }

  const contents = [
    { role: "user", parts: [{ text: user }] },
    assistant ? { role: "model", parts: [{ text: assistant }] } : undefined,
  ].filter(notNull);

  const body = {
    ...(system && { systemInstruction: { parts: [{ text: system }] } }),
    contents,
    ...(online && { tools: [{ googleSearch: {} }] }),
    ...((maxOutputTokens != null || stop) && {
      generationConfig: {
        ...(maxOutputTokens != null && { maxOutputTokens: maxOutputTokens }),
        ...(stop && { stopSequences: [stop] }),
      },
    }),
  };

  try {
    const response = await fetch(
      `${apiUrl}/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(
        "useAiApiE6",
        {
          error: `Gemini API Error: ${response.status} - ${response.statusText}`,
          details: errorData,
        },
        response,
      );
      throw new Error(
        "useAiApiE6: Gemini request failed: " + response.statusText,
        {
          cause: {
            error: `Gemini API Error: ${response.status} - ${response.statusText}`,
            details: errorData,
          },
        },
      );
    }

    const responseData = await response.json();
    const candidate = responseData.candidates?.[0];
    const text =
      candidate?.content?.parts
        ?.map((p: any) => p.text)
        .filter(Boolean)
        .join("") ?? "";

    let sources: AiApiResponse["sources"];
    const citationSources = candidate?.citationMetadata?.citationSources;
    if (citationSources) {
      sources = citationSources.map((s: any) => ({
        url: s.uri,
        title: s.uri,
      }));
    }

    return { text, sources, suggestions: undefined };
  } catch (error) {
    throw new Error("useAiApiE7: Gemini request failed", { cause: error });
  }
};

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
            online?: boolean,
          ): Promise<AiApiResponse> => {
            if (
              maxInputCharacters != null &&
              system.length + user.length > maxInputCharacters
            ) {
              throw new Error(
                `useAiApiE1: Input text length (${
                  system.length + user.length
                }) exceeds maximum allowed characters (${maxInputCharacters}).`,
              );
            }

            if (
              apiUrl.includes("generativelanguage.googleapis.com") &&
              !apiUrl.endsWith("/openai")
            ) {
              return geminiNativePrompt(
                system,
                user,
                assistant,
                stop,
                online,
                config,
              );
            }

            const tools = online
              ? [{ type: "function", function: { name: "search" } }]
              : undefined;

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
                  ...(online && {
                    tool_choice: "auto",
                    tools,
                  }),
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
              const message = responseData.choices?.[0]?.message;
              const messageContent = message?.content;
              const text = toString(messageContent ?? "");

              const toolCalls = message?.tool_calls;
              let sources: AiApiResponse["sources"];
              let suggestions: AiApiResponse["suggestions"];

              if (toolCalls) {
                for (const toolCall of toolCalls) {
                  if (
                    toolCall.type === "function" &&
                    toolCall.function.name === "search"
                  ) {
                    try {
                      const args = JSON.parse(toolCall.function.arguments);
                      if (args.results) {
                        sources = args.results.map((r: any) => ({
                          url: r.url,
                          title: r.title,
                        }));
                      }
                      if (args.search_suggestions) {
                        suggestions = args.search_suggestions;
                      }
                    } catch (e) {
                      console.error(
                        "useAiApiE4: Failed to parse tool call arguments",
                        e,
                      );
                    }
                  }
                }
              }

              return { text, sources, suggestions };
            } catch (error) {
              throw new Error("useAiApiE3: Request failed", { cause: error });
            }
          }
        : undefined,
    [apiUrl, apiKey, model, maxInputCharacters, maxOutputTokens],
  );
};
