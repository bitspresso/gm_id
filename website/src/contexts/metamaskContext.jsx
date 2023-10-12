"use client";

import React, { useState, useEffect } from "react";
const { createContext } = require("react");

export const metamaskContext = createContext();

export function MetamaskProvider({ children }) {
  const [metamaskAccounts, setMetamaskAccounts] = useState([]);
  const [hasMetamask, setHasMetamask] = useState(false);
  function connectWallet(callback) {
    if (hasMetamask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setMetamaskAccounts(result);
          if (callback && typeof callback === "function") {
            callback(result);
          }
        });
    }
  }
  useEffect(() => {
    const ethereum = window.ethereum;
    if (ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setMetamaskAccounts(accounts);
      });
    }
    setHasMetamask(ethereum ? true : false);
  }, []);
  return (
    <metamaskContext.Provider
      value={{
        metamaskAccounts,
        setMetamaskAccounts,
        hasMetamask,
        connectWallet,
      }}
    >
      {children}
    </metamaskContext.Provider>
  );
}
