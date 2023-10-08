"use client";

import React, { useState, useEffect } from "react";
const { createContext } = require("react");

export const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
