import Spinner from "@/components/header/spinner";
import { auth } from "@/firebase";
import { UseAuth } from "@/hooks/useAuth";
import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

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
  const [initialLoader, setInitialLoader] = useState<boolean>(true);
  const {
    signIn,
    signUp,
    logOut,
    user,
    error,
    isLoading,
    setUser,
    setIsLoading,
  } = UseAuth();
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
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //Ro'yxatdan o'tgan
          setUser(user);
        } else {
          // Ro'yxatdan o'tmagan
          setUser(null);
        }
        setIsLoading(false);
        setInitialLoader(false);
      }),
    []
  );

  return (
    <AuthContext.Provider value={value}>
      {!initialLoader ? children : <Spinner />}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
