// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { Avatar } from "@rneui/themed";
import { StyledFontAwesome } from "./StyledFontAwesome.js";
import { StyledView, StyledViewProps } from "./StyledView.js";

export const ImageThumbs = ({
  images,
  size,
  ...props
}: StyledViewProps & {
  size?: number;
  images: readonly { uri?: string }[];
}): React.JSX.Element | null => (
  <StyledView row sgap wrap {...props}>
    {images
      .slice(0, 3)
      ?.map((img, i) =>
        img.uri ? (
          <Avatar key={i} source={img} size={size} />
        ) : (
          <StyledFontAwesome key={i} name="image" size={30} />
        ),
      )}
  </StyledView>
);
