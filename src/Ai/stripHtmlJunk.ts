export const stripHtmlJunk = (htmlString: string | null): string | null => {
  if (!htmlString) {
    return htmlString;
  }

  let cleanedString = htmlString;

  cleanedString = removeImageAttributes(cleanedString);
  cleanedString = removeStyleAttributes(cleanedString);
  cleanedString = removeClassIdAttributes(cleanedString);
  cleanedString = removeImageDimensionAttributes(cleanedString);
  cleanedString = removeAriaAttributes(cleanedString);
  cleanedString = removeAriaAttributes_explicit(cleanedString);
  cleanedString = removeTabindexAttribute(cleanedString);
  // cleanedString = removeRoleAttribute(cleanedString);
  // cleanedString = removeTitleAttribute(cleanedString);
  // cleanedString = removeAltAttribute(cleanedString);
  // cleanedString = removeDataAttributes(cleanedString);
  cleanedString = removeComments(cleanedString);
  cleanedString = removeScriptTags(cleanedString);
  cleanedString = removeStyleTagsAndContent(cleanedString);
  cleanedString = removeMetaTags(cleanedString);
  cleanedString = removeLinkTags(cleanedString);
  cleanedString = removeSvgTags(cleanedString);
  cleanedString = condenseWhitespace(cleanedString);

  return cleanedString;
};

const removeImageAttributes = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<img[^>]*src=['"]([^'"]*)['"][^>]*>/gi,
    "<img >",
  );
  cleanedString = cleanedString.replace(
    /<img[^>]*srcset=['"]([^'"]*)['"][^>]*>/gi,
    "<img >",
  );
  cleanedString = cleanedString.replace(
    /<img[^>]*data-[\w\-]+=['"]([^'"]*)['"][^>]*>/gi,
    (match, attributeName) => {
      if (match.startsWith("<img")) {
        return match.replace(/data-[\w\-]+=['"]([^'"]*)['"]/, "");
      }
      return match;
    },
  );
  return cleanedString;
};

const removeStyleAttributes = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)style=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)style=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  return cleanedString;
};

const removeClassIdAttributes = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)class=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)id=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  return cleanedString;
};

const removeImageDimensionAttributes = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<img([^>]*)(width=['"]([^'"]*)['"])([^>]*)/gi,
    "<img$1$4",
  );
  cleanedString = cleanedString.replace(
    /<img([^>]*)(height=['"]([^'"]*)['"])([^>]*)/gi,
    "<img$1$4",
  );
  cleanedString = cleanedString.replace(
    /<img([^>]*)(width=([^ >]*))([^>]*)/gi,
    "<img$1$4",
  );
  cleanedString = cleanedString.replace(
    /<img([^>]*)(height=([^ >]*))([^>]*)/gi,
    "<img$1$4",
  );
  return cleanedString;
};

const removeAriaAttributes = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)aria-[\w\-]+=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)aria-[\w\-]+=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  return cleanedString;
};

const removeAriaAttributes_explicit = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)aria-controls=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)aria-controls=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)aria-labelledby=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)aria-labelledby=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  // Add more specific aria-* attributes if needed, or keep the general regex if it should work.
  return cleanedString;
};

const removeTabindexAttribute = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)tabindex=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)tabindex=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  return cleanedString;
};

const removeRoleAttribute = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)role=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)role=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  return cleanedString;
};

const removeTitleAttribute = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)title=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)title=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  return cleanedString;
};

const removeAltAttribute = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)alt=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)alt=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  return cleanedString;
};

const removeDataAttributes = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(
    /<([^>]*)data-[\w\-]+=['"]([^'"]*)['"]([^>]*)/gi,
    "<$1$3",
  );
  cleanedString = cleanedString.replace(
    /<([^>]*)data-[\w\-]+=([^ >]*)([^>]*)/gi,
    "<$1$3",
  );
  return cleanedString;
};

const removeComments = (htmlString: string): string => {
  return htmlString.replace(/<!--[\s\S]*?-->/g, "");
};

const removeScriptTags = (htmlString: string): string => {
  return htmlString.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );
};

const removeStyleTagsAndContent = (htmlString: string): string => {
  return htmlString.replace(
    /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    "",
  );
};

const removeMetaTags = (htmlString: string): string => {
  return htmlString.replace(/<meta[^>]*>/gi, "");
};

const removeLinkTags = (htmlString: string): string => {
  return htmlString.replace(/<link[^>]*>/gi, "");
};

const removeSvgTags = (htmlString: string): string => {
  return htmlString.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "");
};

const condenseWhitespace = (htmlString: string): string => {
  let cleanedString = htmlString;
  cleanedString = cleanedString.replace(/\s+/g, " ");
  cleanedString = cleanedString.replace(/>\s+</g, "><");
  cleanedString = cleanedString.trim();
  return cleanedString;
};
