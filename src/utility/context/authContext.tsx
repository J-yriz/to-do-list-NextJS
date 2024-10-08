"use client";

import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  register: (e: React.FormEvent<HTMLFormElement>) => Promise<string>;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  register: () => Promise.resolve(""),
  login: () => Promise.resolve(""),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = Cookies.get("TUVR");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/backend/register", {
      method: form.method.toUpperCase(),
      headers: {
        "Cotent-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const dataResponse = await response.json();
    if (!dataResponse.error) {
      setIsAuthenticated(true);
      Cookies.set("TUVR", dataResponse.data[0], { expires: 70 / 1440 });
      return "/";
    } else {
      const errorData = dataResponse.data[0];
      return errorData;
    }
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/backend/login", {
      method: form.method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const dataResponse = await response.json();
    if (!dataResponse.error) {
      setIsAuthenticated(true);
      Cookies.set("TUVR", dataResponse.data[0], { expires: 70 / 1440 });
      return "/";
    } else {
      return dataResponse.error === "Email not found" ? "Email" : "Password";
    }
  };

  const logout = () => {
    location.reload();
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
