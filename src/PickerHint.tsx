// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { AsyncState } from "@dwidge/hooks-react";
import { JsonValue, StyledPicker } from "./StyledPicker.js";
import { StyledText } from "./StyledText.js";
import { StyledView } from "./StyledView.js";

export const PickerHint = <T extends JsonValue>({
  label,
  items,
  value: [value, setValue],
}: {
  label: string;
  items: { label: string; value: T; help?: string }[];
  value: AsyncState<T>;
}) => (
  <StyledView gap>
    <StyledText colorLabel>{label}</StyledText>
    <StyledPicker value={[value, setValue]} options={items} />
    <StyledText colorHint center>
      {items.find((v) => v.value === value)?.help}
    </StyledText>
  </StyledView>
);
