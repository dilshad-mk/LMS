"use client";

import { createContext, useContext } from "react";

export const UserContext = createContext<any>(null);

export const useUser = () => useContext(UserContext);

export function UserProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any;
}) {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}