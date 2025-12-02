import {
  AsyncState,
  useField,
  useNonNullable,
  useStringNull,
} from "@dwidge/hooks-react";
import { FC } from "react";
import { StringInput } from "../StringInput";
import { StyledButton } from "../StyledButton";
import { StyledView } from "../StyledView";
import {
  defaultWebScraperConfig,
  useWebScraperApiConfig,
  WebScraperApi,
  WebScraperProvider,
} from "./WebScraperApiContext";

/**
 * A view that displays the web scraper API configuration form.
 * It uses the configuration from the `WebScraperApiContext`.
 */
export const WebScraperApiConfigView: FC = () => (
  <WebScraperApiConfigForm
    value={useNonNullable(useWebScraperApiConfig(), defaultWebScraperConfig)}
  />
);

/**
 * A form for configuring the Web Scraper API.
 * @param {object} props - The component props.
 * @param {AsyncState<WebScraperApi>} props.value - The async state for the API configuration.
 */
export const WebScraperApiConfigForm = ({
  value,
}: {
  value: AsyncState<WebScraperApi>;
}) => (
  <>
    <PresetButtons
      provider={useField(value, "provider", null)}
      apiUrl={useField(value, "apiUrl", null)}
    />
    <StringInput
      label="API URL"
      value={useStringNull(useField(value, "apiUrl", null))}
      placeholder="API URL"
    />
    <StringInput
      label="API Key"
      value={useStringNull(useField(value, "apiKey", null))}
      placeholder="API Key"
    />
  </>
);

const PresetButtons = ({
  provider: [, setProvider],
  apiUrl: [, setApiUrl],
}: {
  provider: AsyncState<WebScraperProvider | null>;
  apiUrl: AsyncState<string | null>;
}) => {
  const presets: {
    label: string;
    provider: WebScraperProvider;
    url: string;
  }[] = [
    {
      label: "ExtractorAPI",
      provider: "extractorapi",
      url: "https://api.extractorapi.com/v1/extractor",
    },
    {
      label: "URLToText",
      provider: "urltotext",
      url: "https://urltotext.com/api/scrape",
    },
    {
      label: "API.market",
      provider: "apimarket",
      url: "https://api.market/v1/web/scrape",
    },
  ];

  const handlePresetClick = (provider: WebScraperProvider, url: string) =>
    setProvider && setApiUrl
      ? () => {
          setProvider(provider);
          setApiUrl(url);
        }
      : undefined;

  return (
    <StyledView row wrap gap>
      {presets.map((preset) => (
        <StyledButton
          key={preset.label}
          title={preset.label}
          onPress={handlePresetClick(preset.provider, preset.url)}
        />
      ))}
    </StyledView>
  );
};
