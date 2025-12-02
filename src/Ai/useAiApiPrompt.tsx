import { notNull } from "@dwidge/utils-js";
import { useMemo } from "react";
import { AiApi, useAiApiGet } from "./AiApiContext";
import { retryWithBackoff } from "./retryWithBackoff";
import { toString } from "./toString";

export interface AiApiResponse {
  text: string;
  sources?: { url: string; title?: string }[];
  suggestions?: string[];
  suggestionsHtml?: string;
}

const isAiApiErrorRetryable = (error: any): boolean => {
  const status =
    error instanceof Error && (error.cause as { status?: number })?.status;
  const isNetworkError = typeof status !== "number";
  return isNetworkError || [429, 502, 503, 504].includes(status);
};

const geminiNativePrompt = async (
  system: string,
  user: string,
  assistant: string | undefined,
  stop: string | undefined,
  online: boolean | undefined,
  config: AiApi,
  image: string | undefined,
): Promise<AiApiResponse> => {
  const { apiUrl, apiKey, model, maxOutputTokens } = config;

  if (!apiUrl || !apiKey || !model) {
    throw new Error("useAiApiE5: Gemini API configuration is incomplete.");
  }

  const userParts: any[] = image
    ? [
        { text: user },
        {
          inline_data: {
            mime_type: image.substring(5, image.indexOf(";")),
            data: image.substring(image.indexOf(",") + 1),
          },
        },
      ]
    : [{ text: user }];

  const contents = [
    { role: "user", parts: userParts },
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

  const response = await retryWithBackoff(
    () =>
      fetch(`${apiUrl}/models/${model}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    { isRetryableError: isAiApiErrorRetryable },
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
          status: response.status,
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
  let suggestionsHtml: string | undefined;

  const groundingMetadata = candidate?.groundingMetadata;
  if (groundingMetadata) {
    if (groundingMetadata.groundingChunks) {
      sources = groundingMetadata.groundingChunks.map((chunk: any) => ({
        url: chunk.web.uri,
        title: chunk.web.title,
      }));
    }
    if (groundingMetadata.searchEntryPoint?.renderedContent) {
      suggestionsHtml = groundingMetadata.searchEntryPoint.renderedContent;
    }
  } else {
    const citationSources = candidate?.citationMetadata?.citationSources;
    if (citationSources) {
      sources = citationSources.map((s: any) => ({
        url: s.uri,
        title: s.uri,
      }));
    }
  }

  return { text, sources, suggestions: undefined, suggestionsHtml };
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
            image?: string,
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
                image,
              );
            }

            const tools = online
              ? [{ type: "function", function: { name: "search" } }]
              : undefined;

            const response = await retryWithBackoff(
              () =>
                fetch(`${apiUrl}/chat/completions`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    model,
                    messages: [
                      { role: "system", content: system },
                      {
                        role: "user",
                        content: image
                          ? [
                              { type: "text", text: user },
                              {
                                type: "image_url",
                                image_url: { url: image },
                              },
                            ]
                          : user,
                      },
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
                }),
              { isRetryableError: isAiApiErrorRetryable },
            );

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
                    status: response.status,
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
          }
        : undefined,
    [apiUrl, apiKey, model, maxInputCharacters, maxOutputTokens],
  );
};
