import { useMemo } from "react";
import { retryWithBackoff } from "../Ai/retryWithBackoff";
import { useWebScraperApiGet } from "./WebScraperApiContext";

/**
 * The response from a successful web scraping request.
 */
export interface WebScraperResponse {
  /** The main text content extracted from the URL. */
  text: string;
}

const isScraperApiErrorRetryable = (error: any): boolean => {
  const status =
    error instanceof Error &&
    (error.cause as { error?: Error; status?: number })?.status;
  const isNetworkError = typeof status !== "number";
  return isNetworkError || [429, 502, 503, 504].includes(status);
};

/**
 * A hook that provides a function to scrape text content from a URL using the configured API.
 * The hook abstracts the implementation details of different web scraping providers.
 *
 * @returns A function to call for scraping, or `undefined` if the API is not configured.
 * The function takes a URL string and returns a promise that resolves to a `WebScraperResponse`.
 */
export const useWebScraper = () => {
  const config = useWebScraperApiGet();
  const { provider, apiUrl, apiKey, renderJs } = config;

  return useMemo(
    () =>
      provider && apiUrl && apiKey
        ? async (url: string): Promise<WebScraperResponse> => {
            let requestUrl: string;
            const fetchOptions: RequestInit = {
              method: "GET",
              headers: {},
            };

            switch (provider) {
              case "extractorapi":
                requestUrl = `${apiUrl}?apikey=${apiKey}&url=${encodeURIComponent(
                  url,
                )}`;
                if (renderJs) {
                  requestUrl += "&render=true";
                }
                break;
              case "urltotext": {
                requestUrl = apiUrl;
                fetchOptions.method = "POST";
                (fetchOptions.headers as Record<string, string>)[
                  "Authorization"
                ] = `Token ${apiKey}`;
                (fetchOptions.headers as Record<string, string>)[
                  "Content-Type"
                ] = "application/json";
                const body: { url: string; render_javascript?: boolean } = {
                  url,
                };
                if (renderJs) {
                  body.render_javascript = true;
                }
                fetchOptions.body = JSON.stringify(body);
                break;
              }
              case "apimarket":
                requestUrl = `${apiUrl}?url=${encodeURIComponent(url)}`;
                fetchOptions.method = "GET";
                (fetchOptions.headers as Record<string, string>)[
                  "x-magicapi-key"
                ] = apiKey;
                break;
              case "custom":
              default:
                requestUrl = apiUrl;
                fetchOptions.method = "POST";
                (fetchOptions.headers as Record<string, string>)[
                  "Content-Type"
                ] = "application/json";
                (fetchOptions.headers as Record<string, string>)[
                  "Authorization"
                ] = `Bearer ${apiKey}`;
                const body: { url: string; render_js?: boolean } = { url };
                if (renderJs) {
                  body.render_js = true;
                }
                fetchOptions.body = JSON.stringify(body);
                break;
            }

            const scraperFetch = async () => {
              const response = await fetch(requestUrl, fetchOptions).catch(
                (networkError) => {
                  throw new Error("Network request failed", {
                    cause: { error: networkError },
                  });
                },
              );

              if (!response.ok) {
                const errorData = await response.text();
                throw new Error(
                  `useWebScraperE1: Request failed: ${response.statusText}`,
                  {
                    cause: {
                      error: `API Error: ${response.status} - ${response.statusText}`,
                      details: errorData,
                      status: response.status,
                    },
                  },
                );
              }

              return response.json();
            };

            const responseData = await retryWithBackoff(scraperFetch, {
              isRetryableError: isScraperApiErrorRetryable,
            });

            const text =
              responseData.text ||
              responseData.content ||
              responseData.data?.text ||
              responseData.data?.content ||
              responseData.main_text ||
              "";

            if (typeof text !== "string") {
              throw new Error(
                "useWebScraperE2: Invalid response format, text content not found.",
              );
            }

            return { text };
          }
        : undefined,
    [provider, apiUrl, apiKey, renderJs],
  );
};
