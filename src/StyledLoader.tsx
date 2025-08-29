// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { ActivityIndicator } from "react-native";
import { CenterView } from "./CenterView.js";

export const StyledLoader = (): React.JSX.Element | null => (
  <CenterView>
    <ActivityIndicator size="large" color={"green"} />
  </CenterView>
);
