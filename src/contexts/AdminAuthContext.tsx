import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: { username: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  username: "agenticuniverse",
  password: "universeboss",
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("admin_auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed?.isAuthenticated &&
          parsed.username === ADMIN_CREDENTIALS.username
        ) {
          setIsAuthenticated(true);
          setUser({ username: parsed.username });
        }
      }
    } catch (err) {
      console.warn("Session storage parsing error:", err);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const valid =
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password;

    if (valid) {
      setIsAuthenticated(true);
      setUser({ username });

      try {
        sessionStorage.setItem(
          "admin_auth",
          JSON.stringify({
            isAuthenticated: true,
            username,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        console.warn("Session storage write failed:", err);
      }

      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      sessionStorage.removeItem("admin_auth");
    } catch (err) {
      console.warn("Session storage removal failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
