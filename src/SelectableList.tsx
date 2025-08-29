// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { ReactNode, useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { StyledLoader } from "./StyledLoader.js";
import { StyledText } from "./StyledText.js";

export const SelectableList = <T, K extends string | number>({
  items = undefined as T[] | undefined,
  keyExtractor = (item: T) => (item as { id: K }).id as K,
  selection: [selection, setSelection] = useState<K[]>([]),
  Render = ({ item }: { item: T }): React.JSX.Element | null => (
    <StyledText>{keyExtractor(item)}</StyledText>
  ),
  toggleSelection = (id: K) =>
    setSelection((s) =>
      s.includes(id) ? s.filter((v) => v !== id) : s.concat(id),
    ),
  onPress = (key: K) => toggleSelection(key),
  onLongPress = (key: K) => toggleSelection(key),
  unselectStyle,
  selectStyle,
}: {
  items?: T[];
  keyExtractor?: (item: T) => K;
  selection?: [K[], React.Dispatch<React.SetStateAction<K[]>>];
  expanded?: [K | null, React.Dispatch<React.SetStateAction<K | null>>];
  Render?: (p: { item: T }) => ReactNode;
  toggleSelection?: (id: K) => unknown;
  onPress?: (key: K) => unknown;
  onLongPress?: (key: K) => unknown;
  unselectStyle?: StyleProp<ViewStyle>;
  selectStyle?: StyleProp<ViewStyle>;
}): React.JSX.Element | null =>
  items ? (
    <>
      {items.map(
        (
          item,
          i,
          a,
          key = keyExtractor(item),
          isSelected = selection.includes(key),
        ) => (
          <TouchableOpacity
            key={key}
            onPress={() => onPress(key)}
            onLongPress={() => onLongPress(key)}
            style={isSelected ? selectStyle : unselectStyle}
          >
            <Render item={item} />
          </TouchableOpacity>
        ),
      )}
    </>
  ) : (
    <StyledLoader />
  );
