import { createContext, useState } from "react";
import { Empty, Result } from "../../lib/config/type";
import AuthRepository from "../../lib/repository/auth-repository";

export interface AuthContextType {
  auth: Result<string | Empty>;
  load: () => void;
  login: (param: Record<string, any>) => Promise<void>;
  logout: () => void;
}

const authRepository = new AuthRepository();
export const AuthContext = createContext<AuthContextType | Empty>(null);

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<Result<string | Empty>>({ data: null });

  function load() {
    const result = authRepository.load();
    setAuth(result);
  }

  async function login(param: Record<string, any>): Promise<void> {
    const result = await authRepository.login(param);
    setAuth(result);
  }

  function logout(): void {
    localStorage.removeItem("token");
    setAuth({ data: null });
  }

  return (
    <AuthContext.Provider value={{ auth, load, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}