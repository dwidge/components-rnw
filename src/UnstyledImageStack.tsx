// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Text } from "react-native";
import { StyledView, StyledViewProps } from "./StyledView.js";
import { Avatar } from "@rneui/themed";
import { StyledFontAwesome } from "./StyledFontAwesome.js";

export const UnstyledImageStack = ({
  images,
  style,
  size,
  ...props
}: StyledViewProps & {
  size?: number;
  images: readonly { uri?: string }[];
}): JSX.Element | null => (
  <StyledView
    row
    style={[
      { minWidth: 80, maxWidth: 80, justifyContent: "space-between", gap: 5 },
      style,
    ]}
    {...props}
  >
    {images
      .slice(0, 3)
      ?.map((img, i) =>
        img.uri ? (
          <Avatar
            key={i}
            source={img}
            containerStyle={{ marginRight: -200 }}
            size={size}
          />
        ) : (
          <StyledFontAwesome key={i} name="image" size={30} />
        )
      )}
    <Text style={{ width: 20 }}>
      {images.length > 3 ? "+" + (images.length - 3) : ""}
    </Text>
  </StyledView>
);
