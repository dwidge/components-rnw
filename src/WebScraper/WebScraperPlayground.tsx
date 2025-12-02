import { useAsyncState, useStringNull } from "@dwidge/hooks-react";
import { FC, useState } from "react";
import { StringInput } from "../StringInput";
import { StyledButton } from "../StyledButton";
import { StyledText } from "../StyledText";
import { StyledView } from "../StyledView";
import { useWebScraper, WebScraperResponse } from "./useWebScraper";

/**
 * A playground component for testing the web scraping functionality.
 * It allows users to enter a URL, scrape it, and view the result.
 */
export const WebScraperPlayground: FC = () => {
  const scrape = useWebScraper();
  const [url, setUrl] = useAsyncState<string | null>("");
  const [response, setResponse] = useState<WebScraperResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setError(null);
    setResponse(null);
    setLoading(true);

    if (!scrape) {
      setError("Web Scraper API is not configured.");
      setLoading(false);
      return;
    }

    if (!url) {
      setError("Please enter a URL to scrape.");
      setLoading(false);
      return;
    }

    try {
      const result = await scrape(url);
      setResponse(result);
    } catch (e: any) {
      console.error("Web Scraper Error:", e.message, JSON.stringify(e));
      setError(e.cause?.error || e.message || "Failed to scrape URL.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const outputCharacterCount = response?.text ? response.text.length : 0;

  return (
    <StyledView gap pad outline>
      <StringInput
        label="URL to Scrape"
        value={useStringNull([url, setUrl])}
        placeholder="https://example.com"
      />

      <StyledView row gap>
        <StyledButton onPress={handleScrape} disabled={loading}>
          {loading ? "Scraping..." : "Scrape"}
        </StyledButton>
      </StyledView>

      {(response || error) && (
        <StyledView gap>
          <StyledText error={!!error} selectable>
            {response?.text || error}
          </StyledText>
          {!error && response?.text && (
            <StyledText right>Characters: {outputCharacterCount}</StyledText>
          )}
        </StyledView>
      )}
    </StyledView>
  );
};
