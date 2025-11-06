import { useAsyncState, useStringNull } from "@dwidge/hooks-react";
import { FC, useState } from "react";
import { StringInput } from "../StringInput";
import { StyledButton } from "../StyledButton";
import { StyledText } from "../StyledText";
import { StyledView } from "../StyledView";
import { stripHtmlJunk } from "./stripHtmlJunk";
import { useAiApiPrompt } from "./useAiApiPrompt";
import { useAiApiPromptJson } from "./useAiApiPromptJson";

export const AiPlayground: FC = () => {
  const aiApi = useAiApiPrompt();
  const aiApiJson = useAiApiPromptJson();
  const [userMessage, setUserMessage] = useAsyncState<string | null>("");
  const [systemPrompt, setSystemPrompt] = useAsyncState<string | null>("");
  const [aiResponse, setAiResponse] = useState<string | null>("");
  const [aiError, setAiError] = useState<string | null>(null);

  const handleTestAi = async (api = aiApi) => {
    setAiError(null);

    if (!api || !aiApi) {
      setAiError("AI API configuration is incomplete.");
      setAiResponse(null);
      return;
    }

    setAiError(null);
    setAiResponse(null);

    if (!userMessage) return;

    try {
      const response = await api(systemPrompt || "", userMessage || "");
      setAiResponse(response);
    } catch (error: any) {
      console.error("AI Test Error:", error.message, JSON.stringify(error));
      setAiError(
        error.cause?.error || error.message || "Failed to get AI response.",
      );
      setAiResponse(null);
    } finally {
    }
  };

  const handleStripInput = async () => {
    const cleanedInput = await new Promise<string | null>((res) =>
      res(stripHtmlJunk(userMessage ?? null)),
    );
    setUserMessage?.(cleanedInput || "");
  };

  const inputCharacterCount =
    (systemPrompt ? systemPrompt.length : 0) +
    (userMessage ? userMessage.length : 0);
  const outputCharacterCount = aiResponse ? aiResponse.length : 0;

  return (
    <StyledView sgap pad outline>
      <StringInput
        label="System"
        value={useStringNull([systemPrompt, setSystemPrompt])}
        placeholder="System prompt..."
        numberOfLines={3}
      />
      <StringInput
        label="User"
        value={useStringNull([userMessage, setUserMessage])}
        placeholder="User message..."
        numberOfLines={10}
      />
      <StyledText right>Characters: {inputCharacterCount}</StyledText>

      <StyledView row gap>
        <StyledButton onPress={() => handleTestAi(aiApi)}>Send</StyledButton>
        <StyledButton onPress={() => handleTestAi(aiApiJson)}>
          Json
        </StyledButton>
        <StyledButton onPress={handleStripInput}>Strip</StyledButton>
      </StyledView>

      {(aiResponse || aiError) && (
        <StyledView>
          <StyledText numberOfLines={2000} error={!!aiError}>
            {aiResponse || aiError}
          </StyledText>
          {!aiError && (
            <StyledText>Characters: {outputCharacterCount}</StyledText>
          )}
        </StyledView>
      )}
    </StyledView>
  );
};
