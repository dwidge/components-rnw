import { Pressable } from "react-native";
import { StyledText } from "./StyledText";
import { StyledView } from "./StyledView";

export interface SingleChoiceToggleGroupProps<
  T extends string | number | boolean,
> {
  options?: { value: T | null; label: string }[];
  value?: T | null;
  onChange?: (newValue: T | null) => void;
  label?: string;
  nullable?: boolean;
}

export const SingleChoiceToggleGroup = <T extends string | number | boolean>({
  options,
  value,
  onChange,
  label,
  nullable = false,
}: SingleChoiceToggleGroupProps<T>) => (
  <>
    {label ? <StyledText>{label}</StyledText> : null}
    {options?.map((option) => (
      <Pressable
        key={"" + option.value}
        onPress={
          onChange
            ? () => {
                if (value === option.value) {
                  if (nullable) {
                    onChange(null);
                  }
                } else {
                  onChange(option.value);
                }
              }
            : undefined
        }
      >
        <StyledView
          outline
          spad
          style={{
            backgroundColor: value === option.value ? "grey" : "transparent",
          }}
        >
          <StyledText
            numberOfLines={1}
            style={{ color: value === option.value ? "white" : "grey" }}
          >
            {option.label}
          </StyledText>
        </StyledView>
      </Pressable>
    ))}
  </>
);
