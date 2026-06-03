import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import authService from "../services/authService";
import { ROLES, STORAGE_KEYS } from "../utils/constants";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistSession = useCallback((authData) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, authData.token);
    setUser(authData.user);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setUser(null);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const authData = await authService.login(credentials);
      persistSession(authData);
      return authData.user;
    },
    [persistSession],
  );

  const register = useCallback(
    async (payload) => {
      const authData = await authService.register(payload);
      persistSession(authData);
      return authData.user;
    },
    [persistSession],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const refreshUser = useCallback(async () => {
    const profile = await authService.getMe();
    setUser(profile);
    return profile;
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await authService.getMe();
        setUser(profile);
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === ROLES.ADMIN,
      isPartner: user?.role === ROLES.PARTNER,
      login,
      register,
      logout,
      refreshUser,
      setUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
