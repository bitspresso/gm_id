"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { metamaskContext } from "../../contexts/metamaskContext";

export default function Layout({ children }) {
  const { metamaskAccounts, connectWallet } = useContext(metamaskContext);
  const router = useRouter();
  if (metamaskAccounts.length === 0) {
    connectWallet((result) => {
      if (result.length === 0) {
        return router.push("/");
      } else {
        return children;
      }
    });
  } else {
    return children;
  }
}
