// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Text } from "@rneui/themed";

export const RenderCheck = ({ id = 1 }: { id?: number }) => (
  console.log("RenderCheck1", id), (<Text>RenderCheck{id}</Text>)
);
