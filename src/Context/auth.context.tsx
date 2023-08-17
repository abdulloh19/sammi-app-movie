import { useAuth } from "@/hooks/useAuth";
import { User } from "firebase/auth";
import { ReactNode, createContext, useMemo } from "react";

interface AuthContextState {
  user: User | null;
  error: string;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  error: "",
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { signIn, signUp, logOut, user, error, isLoading } = useAuth();
  const value = useMemo(
    () => ({
      signIn,
      signUp,
      logOut,
      user,
      error,
      isLoading,
    }),
    [user, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
