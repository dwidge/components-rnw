import { useMemo } from "react";
import { useAiApiPrompt } from "./useAiApiPrompt";

export const useAiApiPromptJson = () => {
  const prompt = useAiApiPrompt();

  return useMemo(
    () =>
      prompt
        ? async (system: string, user: string) =>
            prompt(system, user, "```json", "```")
        : undefined,
    [prompt],
  );
};
