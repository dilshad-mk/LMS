"use client";

import { createContext, useContext } from "react";

export const StudentContext = createContext<any>(null);

export const useUser = () => useContext(StudentContext);

export function UserProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any;
}) {
  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}