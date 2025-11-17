import { WebView } from "@dwidge/react-native-web-webview";
import { FC } from "react";
import { Linking } from "react-native";
import { StyledText } from "../StyledText";
import { StyledView } from "../StyledView";
import { AiApiResponse } from "./useAiApiPrompt";

export const AiSourcesList: FC<{
  sources: AiApiResponse["sources"];
}> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }
  return (
    <StyledView sgap>
      <StyledText h4>Sources</StyledText>
      {sources.map((source, index) => (
        <StyledText
          key={index}
          onPress={() => Linking.openURL(source.url)}
          style={{ textDecorationLine: "underline", color: "blue" }}
        >
          {index + 1}. {source.title || source.url}
        </StyledText>
      ))}
    </StyledView>
  );
};

export const AiSuggestions: FC<{
  suggestions?: AiApiResponse["suggestions"];
  suggestionsHtml?: AiApiResponse["suggestionsHtml"];
}> = ({ suggestions, suggestionsHtml }) => {
  if (suggestionsHtml) {
    return (
      <StyledView sgap>
        <StyledText h4>Suggestions</StyledText>
        <WebView
          originWhitelist={["*"]}
          source={{ html: suggestionsHtml }}
          style={{ height: 60 }}
          onShouldStartLoadWithRequest={(event) => {
            if (event.navigationType === "click") {
              Linking.openURL(event.url);
              return false;
            }
            return true;
          }}
        />
      </StyledView>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <StyledView sgap>
      <StyledText h4>Suggestions</StyledText>
      {suggestions.map((suggestion, index) => (
        <StyledText key={index}>- {suggestion}</StyledText>
      ))}
    </StyledView>
  );
};
