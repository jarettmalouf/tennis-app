import { Theme } from "./models";
import { User } from "./models";

// Auth Context Types
export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  signOut: () => void;
}

// User Context Types
export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Theme Context Types
export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}
