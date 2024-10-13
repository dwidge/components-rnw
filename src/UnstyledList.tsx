// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { ReactNode, useState } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { StyledLoader } from "./StyledLoader.js";
import { StyledText } from "./StyledText.js";

export const UnstyledList = <T, K extends string | number>({
  items = undefined as T[] | undefined,
  keyExtractor = (item: T) => (item as { id: K }).id as K,
  selection: [selection, setSelection] = useState<K[]>([]),
  expanded: [expanded, setExpanded] = useState<K | null>(null),
  render = (
    item: T,
    isExpanded: boolean,
    isSelected: boolean,
    onExpand: () => unknown
  ): JSX.Element | null => <StyledText>{keyExtractor(item)}</StyledText>,
  toggleSelection = (id: K) =>
    setSelection((s) =>
      s.includes(id) ? s.filter((v) => v !== id) : s.concat(id)
    ),
  toggleAccordion = (id: K) => setExpanded((prev) => (prev === id ? null : id)),
  onPress = (key: K) =>
    selection.length ? toggleSelection(key) : toggleAccordion(key),
  onLongPress = (key: K) => toggleSelection(key),
  style,
  selectStyle,
}: {
  items?: T[];
  keyExtractor?: (item: T) => K;
  selection?: [K[], React.Dispatch<React.SetStateAction<K[]>>];
  expanded?: [K | null, React.Dispatch<React.SetStateAction<K | null>>];
  render?: (
    item: T,
    isExpanded: boolean,
    isSelected: boolean,
    onExpand: () => unknown
  ) => ReactNode;
  toggleSelection?: (id: K) => unknown;
  toggleAccordion?: (id: K) => unknown;
  onPress?: (key: K) => unknown;
  onLongPress?: (key: K) => unknown;
  style?: StyleProp<ViewStyle>;
  selectStyle?: StyleProp<ViewStyle>;
}): JSX.Element | null =>
  items ? (
    <>
      {items.map(
        (
          item,
          i,
          a,
          key = keyExtractor(item),
          isExpanded = expanded === key,
          isSelected = selection.includes(key)
        ) => (
          <TouchableOpacity
            key={key}
            onPress={() => onPress(key)}
            onLongPress={() => onLongPress(key)}
            style={isSelected ? selectStyle : style}
          >
            {render(item, isExpanded, isSelected, () => toggleAccordion(key))}
          </TouchableOpacity>
        )
      )}
    </>
  ) : (
    <StyledLoader />
  );
