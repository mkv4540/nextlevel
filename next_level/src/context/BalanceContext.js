"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { userInitialBalance } from "../utils/rewardQuizData";

const BalanceContext = createContext();

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(userInitialBalance);
  let isUpdating = false; // Guard to prevent duplicate updates

  const updateBalance = useCallback((amount, type = "regular") => {
    if (isUpdating) {
      console.warn("Duplicate balance update prevented.");
      return;
    }

    isUpdating = true;

    setBalance((prevBalance) => {
      return prevBalance + amount;
    });

    // Reset guard after a short delay to allow future updates
    setTimeout(() => {
      isUpdating = false;
    }, 50); // Adjust delay as needed
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}


export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
}
