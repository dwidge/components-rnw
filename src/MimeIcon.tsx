// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { FontAwesomeGlyph } from "./IconName.js";
import { StyledFontAwesome } from "./StyledFontAwesome.js";

// https://gist.github.com/colemanw/9c9a12aae16a4bfe2678de86b661d922
// List of official MIME Types
// http://www.iana.org/assignments/media-types/media-types.xhtml

const specificGlyphs: Record<string, FontAwesomeGlyph> = {
  "application/pdf": "file-pdf-o",
  "application/msword": "file-word-o",
  "application/vnd.ms-word": "file-word-o",
  "application/vnd.oasis.opendocument.text": "file-word-o",
  "application/vnd.openxmlformats-officedocument.wordprocessingml":
    "file-word-o",
  "application/vnd.ms-excel": "file-excel-o",
  "application/vnd.openxmlformats-officedocument.spreadsheetml": "file-excel-o",
  "application/vnd.oasis.opendocument.spreadsheet": "file-excel-o",
  "application/vnd.ms-powerpoint": "file-powerpoint-o",
  "application/vnd.openxmlformats-officedocument.presentationml":
    "file-powerpoint-o",
  "application/vnd.oasis.opendocument.presentation": "file-powerpoint-o",
  "text/plain": "file-text-o",
  "text/html": "file-code-o",
  "application/json": "file-code-o",
  "application/gzip": "file-archive-o",
  "application/zip": "file-archive-o",
};
const generalGlyphs: Record<string, FontAwesomeGlyph> = {
  image: "file-image-o",
  audio: "file-audio-o",
  video: "file-video-o",
};

export const getFontAwesomeGlyphFromMime = (
  mimeType?: string,
): FontAwesomeGlyph =>
  mimeType == undefined
    ? "question"
    : (specificGlyphs[mimeType] ??
      generalGlyphs[mimeType.split("/")[0] ?? ""] ??
      "file-o");

export const MimeIcon = ({
  mime,
}: {
  mime?: string;
}): React.JSX.Element | null => (
  <StyledFontAwesome name={getFontAwesomeGlyphFromMime(mime)} />
);
