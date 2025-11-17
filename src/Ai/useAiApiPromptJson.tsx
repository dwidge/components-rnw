import { useMemo } from "react";
import { AiApiResponse, useAiApiPrompt } from "./useAiApiPrompt";

export const useAiApiPromptJson = () => {
  const prompt = useAiApiPrompt();

  return useMemo(
    () =>
      prompt
        ? (
            system: string,
            user: string,
            online?: boolean,
          ): Promise<AiApiResponse> =>
            prompt(system, user, "```json", "```", online)
        : undefined,
    [prompt],
  );
};
