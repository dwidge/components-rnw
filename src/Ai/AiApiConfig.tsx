import {
  AsyncState,
  useField,
  useNonNullable,
  useStringNull,
  useStringNumberNull,
} from "@dwidge/hooks-react";
import { FC } from "react";
import { StringInput } from "../StringInput";
import { StyledButton } from "../StyledButton";
import { StyledView } from "../StyledView";
import { AiApi, defaultConfig, useAiApiConfig } from "./AiApiContext";

export const AiApiConfigView: FC = () => (
  <AiApiConfigForm value={useNonNullable(useAiApiConfig(), defaultConfig)} />
);

export const AiApiConfigForm = ({ value }: { value: AsyncState<AiApi> }) => (
  <>
    <StringInput
      label="API URL"
      value={useStringNull(useField(value, "apiUrl", null))}
      placeholder="API URL (https://api.groq.com/openai/v1)"
    />
    <PresetButtons apiUrl={useField(value, "apiUrl", null)} />
    <StringInput
      label="API Key"
      value={useStringNull(useField(value, "apiKey", null))}
      placeholder="API Key"
    />
    <StringInput
      label="Model Name"
      value={useStringNull(useField(value, "model", null))}
      placeholder="Model Name (llama-3.2-3b-preview)"
    />
    <ModelPresetButtons model={useField(value, "model", null)} />
    <StringInput
      label="Max Input Characters"
      value={useStringNull(
        useStringNumberNull(useField(value, "maxInputCharacters", null)),
      )}
      placeholder="Max Input Characters (e.g., 10000)"
    />
    <StringInput
      label="Max Output Tokens"
      value={useStringNull(
        useStringNumberNull(useField(value, "maxOutputTokens", null)),
      )}
      placeholder="Max Output Tokens (e.g., 1024)"
    />
  </>
);

const PresetButtons = ({
  apiUrl: [apiUrl, setApiUrl],
}: {
  apiUrl: AsyncState<string | null>;
}) => {
  const presets = [
    { label: "OpenAI", url: "https://api.openai.com/v1" },
    { label: "Groq", url: "https://api.groq.com/openai/v1" },
    {
      label: "Gemini (OpenAI)",
      url: "https://generativelanguage.googleapis.com/v1beta/openai",
    },
    {
      label: "Gemini (Native)",
      url: "https://generativelanguage.googleapis.com/v1beta",
    },
    { label: "OpenRouter", url: "https://openrouter.ai/api/v1" },
  ];

  const handlePresetClick = (url: string) =>
    setApiUrl ? () => setApiUrl(url) : undefined;

  return (
    <StyledView row wrap gap>
      {presets.map((preset) => (
        <StyledButton
          key={preset.label}
          title={preset.label}
          onPress={handlePresetClick(preset.url)}
        />
      ))}
    </StyledView>
  );
};

const ModelPresetButtons = ({
  model: [model, setModel],
}: {
  model: AsyncState<string | null>;
}) => {
  const presets = [
    { label: "Gemini Flash", modelName: "gemini-flash-lite-latest" },
    { label: "GPT-OSS-120B", modelName: "gpt-oss-120b" },
    { label: "GPT-5 Nano", modelName: "openai/gpt-5-nano" },
    { label: "Grok-4 Fast", modelName: "x-ai/grok-4-fast" },
  ];

  const handlePresetClick = (modelName: string) =>
    setModel ? () => setModel(modelName) : undefined;

  return (
    <StyledView row wrap gap>
      {presets.map((preset) => (
        <StyledButton
          key={preset.label}
          title={preset.label}
          onPress={handlePresetClick(preset.modelName)}
        />
      ))}
    </StyledView>
  );
};
