// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { FontAwesome } from "@expo/vector-icons";
import { withTheme } from "@rneui/themed";

type StyledFontAwesomeProps = React.ComponentProps<typeof FontAwesome>;

export const StyledFontAwesome = withTheme(
  FontAwesome,
  "FontAwesome"
) as React.FC<StyledFontAwesomeProps>;
