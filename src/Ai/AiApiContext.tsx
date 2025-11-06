import { AsyncState } from "@dwidge/hooks-react";
import { createContext, useContext } from "react";

export interface AiApi {
  apiUrl: string | null;
  apiKey: string | null;
  model: string | null;
  maxInputCharacters: number | null;
  maxOutputTokens: number | null;
}

export const defaultConfig: AiApi = {
  apiUrl: "https://api.groq.com/openai/v1",
  apiKey: null,
  model: "llama-3.1-8b-instant",
  maxInputCharacters: 32 * 1024,
  maxOutputTokens: 4 * 1024,
};

export const AiApiContext = createContext<AsyncState<AiApi | null>>([
  defaultConfig,
]);

export const useAiApiConfig = () => useContext(AiApiContext);

export const useAiApiGet = () => useAiApiConfig()[0] ?? defaultConfig;
export const useAiApiSet = () => useAiApiConfig()[1];
