import { AsyncState, OptionalState } from "@dwidge/hooks-react";
import { StyledButton } from "./StyledButton.js";
import { StyledText } from "./StyledText.js";
import { StyledView } from "./StyledView.js";

export const SwitchButton = <OptionType extends string | number | boolean>({
  value: [selectedValue, onValueChange],
  options,
  label,
}: {
  value: AsyncState<OptionType> | OptionalState<OptionType>;
  options: OptionType[];
  label?: string;
}) => (
  <StyledView row sgap>
    {label ? <StyledText>{label}</StyledText> : null}
    {options.map((option) => (
      <StyledButton
        key={String(option)}
        onPress={() => onValueChange?.(() => option)}
        color={selectedValue === option ? "primary" : "grey3"} // Highlight active button
        style={{ flex: 1 }} // Ensure buttons take equal width
      >
        {String(option)}
      </StyledButton>
    ))}
  </StyledView>
);
