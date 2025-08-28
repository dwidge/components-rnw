import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

export type FeatherGlyph = keyof typeof Feather.glyphMap;
export type FontAwesomeGlyph = keyof typeof FontAwesome.glyphMap;
export type IoniconsGlyph = keyof typeof Ionicons.glyphMap;

export type IconGlyph = FeatherGlyph | FontAwesomeGlyph | IoniconsGlyph;

const iconComponents = [FontAwesome, Ionicons, Feather];

export const getIconComponent = (iconName: string) => {
  for (const i of iconComponents) {
    if (iconName in i.glyphMap) {
      return i;
    }
  }
  return iconComponents[0];
};
