import React, { createContext, useCallback, useContext, useState } from "react";

import { AuthContextType } from "../types/context";
import { useUser } from "./UserContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useUser();

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
