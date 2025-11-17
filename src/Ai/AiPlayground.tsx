import { useAsyncState, useStringNull } from "@dwidge/hooks-react";
import { FC, useState } from "react";
import { StringInput } from "../StringInput";
import { StyledButton } from "../StyledButton";
import { StyledText } from "../StyledText";
import { StyledView } from "../StyledView";
import { AiSourcesList, AiSuggestions } from "./AiResponseViews";
import { stripHtmlJunk } from "./stripHtmlJunk";
import { AiApiResponse, useAiApiPrompt } from "./useAiApiPrompt";
import { useAiApiPromptJson } from "./useAiApiPromptJson";

export const AiPlayground: FC = () => {
  const aiApi = useAiApiPrompt();
  const aiApiJson = useAiApiPromptJson();
  const [userMessage, setUserMessage] = useAsyncState<string | null>("");
  const [systemPrompt, setSystemPrompt] = useAsyncState<string | null>("");
  const [aiResponse, setAiResponse] = useState<AiApiResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [online, setOnline] = useState(false);

  const handleTestAi = async (json = false) => {
    setAiError(null);
    setAiResponse(null);

    if ((json && !aiApiJson) || (!json && !aiApi)) {
      setAiError("AI API configuration is incomplete.");
      return;
    }

    if (!userMessage) return;

    try {
      const response = json
        ? await aiApiJson!(systemPrompt || "", userMessage || "", online)
        : await aiApi!(
            systemPrompt || "",
            userMessage || "",
            undefined,
            undefined,
            online,
          );
      setAiResponse(response);
    } catch (error: any) {
      console.error("AI Test Error:", error.message, JSON.stringify(error));
      setAiError(
        error.cause?.error || error.message || "Failed to get AI response.",
      );
      setAiResponse(null);
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
  const outputCharacterCount = aiResponse?.text ? aiResponse.text.length : 0;

  return (
    <StyledView gap pad outline>
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
        <StyledButton onPress={() => handleTestAi()}>Send</StyledButton>
        <StyledButton onPress={() => handleTestAi(true)}>Json</StyledButton>
        <StyledButton onPress={handleStripInput}>Strip</StyledButton>
        <StyledButton
          onPress={() => setOnline((o) => !o)}
          icon={online ? "checkbox" : "square-outline"}
        >
          Online
        </StyledButton>
      </StyledView>

      {(aiResponse || aiError) && (
        <StyledView gap>
          <StyledText numberOfLines={2000} error={!!aiError}>
            {aiResponse?.text || aiError}
          </StyledText>
          {!aiError && aiResponse?.text && (
            <StyledText right>Characters: {outputCharacterCount}</StyledText>
          )}
          <AiSourcesList sources={aiResponse?.sources} />
          <AiSuggestions
            suggestions={aiResponse?.suggestions}
            suggestionsHtml={aiResponse?.suggestionsHtml}
          />
        </StyledView>
      )}
    </StyledView>
  );
};
