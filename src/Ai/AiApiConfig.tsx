import { FC } from "react";
import { StyledNumberInput, StyledTextInput } from "../StyledNumberInput";
import { StyledView } from "../StyledView";
import { defaultConfig, useAiApiGet, useAiApiSet } from "./AiApiContext";

export const AiApiConfig: FC = () => {
  const config = useAiApiGet();
  const setConfig = useAiApiSet();

  return (
    <StyledView gap pad outline>
      <StyledTextInput
        label="API URL"
        value={[
          config.apiUrl || "",
          async (getV) => {
            const v = await (typeof getV === "function" ? getV(null) : getV);
            setConfig?.((prevConfig) => ({
              ...(prevConfig ?? defaultConfig),
              apiUrl: v,
            }));
            return v;
          },
        ]}
        placeholder="API URL (https://api.groq.com/openai/v1)"
      />
      <StyledTextInput
        label="API Key"
        value={[
          config.apiKey || "",
          async (getV) => {
            const v = await (typeof getV === "function" ? getV(null) : getV);
            setConfig?.((prevConfig) => ({
              ...(prevConfig ?? defaultConfig),
              apiKey: v,
            }));
            return v;
          },
        ]}
        placeholder="API Key"
        secureTextEntry
      />
      <StyledTextInput
        label="Model Name"
        value={[
          config.model || "",
          async (getV) => {
            const v = await (typeof getV === "function" ? getV(null) : getV);
            setConfig?.((prevConfig) => ({
              ...(prevConfig ?? defaultConfig),
              model: v,
            }));
            return v;
          },
        ]}
        placeholder="Model Name (llama-3.2-3b-preview)"
      />
      <StyledNumberInput
        label="Max Input Characters"
        value={[
          config.maxInputCharacters ?? null,
          async (getV) => {
            const v = await (typeof getV === "function" ? getV(null) : getV);
            setConfig?.((prevConfig) => ({
              ...(prevConfig ?? defaultConfig),
              maxInputCharacters: v,
            }));
            return v;
          },
        ]}
        placeholder="Max Input Characters (e.g., 10000)"
      />
      <StyledNumberInput
        label="Max Output Tokens"
        value={[
          config.maxOutputTokens ?? null,
          async (getV) => {
            const v = await (typeof getV === "function" ? getV(null) : getV);
            setConfig?.((prevConfig) => ({
              ...(prevConfig ?? defaultConfig),
              maxOutputTokens: v,
            }));
            return v;
          },
        ]}
        placeholder="Max Output Tokens (e.g., 1024)"
      />
    </StyledView>
  );
};
