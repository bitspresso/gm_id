"use client";

import { UserProvider } from "../../contexts/userContext";
import { MetamaskProvider } from "../../contexts/metamaskContext";

export default function ChildrenWrapper({ children }) {
  return (
    <MetamaskProvider>
      <UserProvider>{children}</UserProvider>
    </MetamaskProvider>
  );
}
