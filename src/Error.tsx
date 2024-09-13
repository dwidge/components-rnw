// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React from "react";
import { Text } from "@rneui/themed";

export const Error = ({ error }: { error?: Error }) =>
  error && (
    <Text style={{ color: "red", fontSize: 16 }}>
      {error.message.split(":").at(-1)?.trim()}
    </Text>
  );
