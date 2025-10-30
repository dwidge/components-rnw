import { Pressable } from "react-native";
import { StyledText } from "./StyledText";
import { StyledView } from "./StyledView";

export interface SingleChoiceToggleGroupProps<
  T extends string | number | boolean,
> {
  options?: { value: T | null; label: string }[];
  value?: T | null;
  onChange?: (newValue: T | null) => void;
}

export const SingleChoiceToggleGroup = <T extends string | number | boolean>({
  options,
  value,
  onChange,
}: SingleChoiceToggleGroupProps<T>) => (
  <>
    {options?.map((option) => (
      <Pressable
        key={"" + option.value}
        onPress={
          onChange
            ? () => onChange(value === option.value ? null : option.value)
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
