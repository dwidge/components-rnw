// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { useState, useEffect } from "react";
import { useColorScheme as useColorSchemeRN, Appearance } from "react-native";

export const useColorScheme = () => {
  const colorScheme = useColorSchemeRN();
  const [currentScheme, setCurrentScheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setCurrentScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  return currentScheme;
};
