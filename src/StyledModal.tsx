// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { OptionalState } from "@dwidge/hooks-react";
import React, { createContext, useContext, useState } from "react";
import { Modal, Pressable } from "react-native";

type StyledModalState = boolean;
const StyledModalContext = createContext<OptionalState<StyledModalState>>([]);

export const useStyledModal = () => useContext(StyledModalContext)[1];

export const StyledModal = ({
  state = useState<StyledModalState>(false),
  children: [button, content] = [
    (onOpen: () => unknown) => <></>,
    (onClose: () => unknown) => <></>,
  ] as const,
  onClose = () => state[1]?.(false),
  onPressOutside = () => onClose(),
}) => (
  <StyledModalContext.Provider value={state}>
    {button(() => {
      state[1]?.(true);
    })}
    <Modal
      animationType="slide"
      transparent={true}
      visible={state[0]}
      onRequestClose={onClose}
    >
      <Pressable onPress={onPressOutside} style={{ flex: 1 }}>
        {content(onClose)}
      </Pressable>
    </Modal>
  </StyledModalContext.Provider>
);
