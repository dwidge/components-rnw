import { AsyncState } from "@dwidge/hooks-react";
import { createContext, useContext } from "react";

/**
 * The supported web scraper providers.
 * 'custom' can be used for any other API endpoint.
 */
export type WebScraperProvider =
  | "apimarket"
  | "urltotext"
  | "extractorapi"
  | "custom";

/**
 * Configuration for the Web Scraper API.
 */
export interface WebScraperApi {
  /** The selected provider. */
  provider: WebScraperProvider | null;
  /** The API endpoint URL. */
  apiUrl: string | null;
  /** The API key for authentication. */
  apiKey: string | null;
  /** Whether to render JavaScript on the page. */
  renderJs: boolean | null;
}

/**
 * Default configuration for the Web Scraper API.
 */
export const defaultWebScraperConfig: WebScraperApi = {
  provider: "extractorapi",
  apiUrl: "https://api.extractorapi.com/v1/extractor",
  apiKey: null,
  renderJs: false,
};

/**
 * React context for the Web Scraper API configuration.
 */
export const WebScraperApiContext = createContext<
  AsyncState<WebScraperApi | null>
>([defaultWebScraperConfig]);

/**
 * Hook to get the entire async state [value, setValue] for the Web Scraper API configuration.
 */
export const useWebScraperApiConfig = () => useContext(WebScraperApiContext);

/**
 * Hook to get the current Web Scraper API configuration value.
 * Falls back to the default configuration if the context value is null.
 */
export const useWebScraperApiGet = () =>
  useWebScraperApiConfig()[0] ?? defaultWebScraperConfig;

/**
 * Hook to get the setter function for the Web Scraper API configuration.
 */
export const useWebScraperApiSet = () => useWebScraperApiConfig()[1];
