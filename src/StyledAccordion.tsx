import React, { ReactNode, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyledLoader } from "./StyledLoader";
import { StyledText } from "./StyledText";
import { StyledView } from "./StyledView";

export const StyledAccordion = <T, K extends string | number>({
  items = undefined as T[] | undefined,
  keyExtractor = (item: T) => (item as { id: K }).id as K,
  expanded: [expanded, setExpanded] = useState<K | null>(null),
  Summary = ({ item }) => <StyledText>{keyExtractor(item)}</StyledText>,
  Detail = ({ item }) => <StyledText>{keyExtractor(item)}</StyledText>,
  toggleAccordion = (id: K) => setExpanded((prev) => (prev === id ? null : id)),
  onPress = (key: K) => toggleAccordion(key),
}: {
  items?: T[];
  keyExtractor?: (item: T) => K;
  expanded?: [K | null, React.Dispatch<React.SetStateAction<K | null>>];
  Summary?: (p: { item: T }) => ReactNode;
  Detail?: (p: { item: T }) => ReactNode;
  toggleAccordion?: (id: K) => unknown;
  onPress?: (key: K) => unknown;
}): JSX.Element | null =>
  items === undefined ? (
    <StyledLoader />
  ) : (
    <>
      {items.map(
        (
          item,
          i,
          a,
          key = keyExtractor(item),
          isExpanded = expanded === key,
        ) => (
          <StyledView key={key}>
            <TouchableOpacity onPress={() => onPress(key)}>
              <Summary item={item} />
            </TouchableOpacity>
            {isExpanded && <Detail item={item} />}
          </StyledView>
        ),
      )}
    </>
  );
