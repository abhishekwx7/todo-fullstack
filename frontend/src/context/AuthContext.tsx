import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  signup as signupService,
  signin as signinService,
  getMe,
} from "../services/auth.service";

import type { User, SignUpInput, SignInInput } from "../types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  signup: (data: SignUpInput) => Promise<void>;
  signin: (data: SignInInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null;

  async function signup(data: SignUpInput) {
    const response = await signupService(data);

    localStorage.setItem("token", response.token);
    setUser(response.user);
  }

  async function signin(data: SignInInput) {
    const response = await signinService(data);

    localStorage.setItem("token", response.token);
    setUser(response.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    async function restoreUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getMe();

        setUser(response.user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    restoreUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
