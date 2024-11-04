// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { createContext, useContext, useState } from "react";
import { Platform, ScrollView as RNScrollView } from "react-native";
import { StyledView, StyledViewProps } from "./StyledView.js";

const ScrollContext = createContext<undefined | ((v: boolean) => void)>(
  undefined,
);

export const NestedScrollView = ({ children, ...props }: StyledViewProps) => {
  const setParentScrollEnabled = useContext(ScrollContext);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [childScrollViewContentOffsetY, setChildScrollViewContentOffsetY] =
    useState(0);

  const handleChildScrollViewDirection = (e: any) => {
    if (!setParentScrollEnabled) return;

    if (
      e.nativeEvent.layoutMeasurement.height + e.nativeEvent.contentOffset.y >=
      e.nativeEvent.contentSize.height
    ) {
      if (Platform.OS === "android") {
        setParentScrollEnabled(true);
      } else if (Platform.OS === "ios") {
        setParentScrollEnabled(true);
      }
    } else if (
      childScrollViewContentOffsetY >= e.nativeEvent.contentOffset.y &&
      e.nativeEvent.contentOffset.y < 10
    ) {
      if (Platform.OS === "android") {
        setParentScrollEnabled(false);
      } else if (Platform.OS === "ios") {
        setParentScrollEnabled(false);
      }
    }
  };

  return (
    <RNScrollView
      scrollEnabled={scrollEnabled}
      nestedScrollEnabled
      // keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <StyledView {...props} style={[{ flex: 1 }, props.style]}>
        {/* <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          // onPressIn={() => (
          //   console.log("aaaa1"),
          //   setScrollEnabled(true),
          //   setParentScrollEnabled?.(false)
          // )}
        > */}
        <ScrollContext.Provider value={setScrollEnabled}>
          {children}
        </ScrollContext.Provider>
        {/* </TouchableOpacity> */}
      </StyledView>
    </RNScrollView>
  );
};
