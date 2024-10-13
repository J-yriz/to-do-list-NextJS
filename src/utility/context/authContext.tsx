"use client";

import Cookies from "js-cookie";
import { IUserData } from "../Types";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface IResponse {
  error: string;
  data: string[];
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userData: IUserData;
  register: (e: React.FormEvent<HTMLFormElement>) => Promise<string>;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<string>;
  checkAuth: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userData: {} as IUserData,
  register: () => Promise.resolve(""),
  login: () => Promise.resolve(""),
  checkAuth: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<IUserData>({} as IUserData);

  const notMountedPaths = ["/", "/register", "/login"];

  const authDisable = () => {
    setIsAuthenticated(false);
    setUserData({} as IUserData);
    if (!notMountedPaths.includes(pathname)) {
      router.push("/");
    }
  };

  const checkAuth = async () => {
    const userToken = Cookies.get("TUVR");
    if (userToken) {
      const catchData = async () => {
        const response = await fetch(`/backend/userAuthProcess/${userToken}`, { method: "GET" });
        const dataReponse = await response.json();
        if (!dataReponse.error) {
          setIsAuthenticated(true);
          setUserData(dataReponse.data[0]);
          localStorage.setItem("NMBR", dataReponse.data[0].id);
        } else {
          authDisable();
          Cookies.remove("TUVR");
          localStorage.removeItem("NMBR");
        }
      };

      catchData();
    } else {
      authDisable();
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname, setIsAuthenticated, setUserData]);

  const authEnable = (dataResponse: IResponse) => {
    setIsAuthenticated(true);
    Cookies.set("TUVR", dataResponse.data[0], { expires: 70 / 1440 });
    return "/";
  };

  const fetchUserData = async (url: string, formData: FormData, post: string) => {
    const reponse = await fetch(url, {
      method: post.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    return reponse;
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetchUserData("/backend/register", formData, form.method);
    const dataResponse = (await response.json()) as IResponse;
    if (!dataResponse.error) {
      return authEnable(dataResponse);
    } else {
      const errorData = dataResponse.data[0];
      return errorData;
    }
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetchUserData("/backend/login", formData, form.method);
    const dataResponse = (await response.json()) as IResponse;
    if (!dataResponse.error) return authEnable(dataResponse);
    else return dataResponse.error === "Email not found" ? "Email" : "Password";
  };

  const logout = () => {
    Cookies.remove("TUVR");
    setIsAuthenticated(false);
    window.location.reload();
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, register, login, checkAuth, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
