import { useAsyncState } from "@dwidge/hooks-react";
import { FC, useState } from "react";
import { StyledButton } from "../StyledButton";
import { StyledTextInput } from "../StyledNumberInput";
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
    <StyledView gap pad outline>
      <StyledTextInput
        label="System"
        value={[systemPrompt, setSystemPrompt]}
        placeholder="System prompt..."
        numberOfLines={3}
      />
      <StyledTextInput
        label="User"
        value={[userMessage, setUserMessage]}
        placeholder="User message..."
        numberOfLines={10}
      />
      <StyledText>Characters: {inputCharacterCount}</StyledText>

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
