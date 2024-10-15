"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { IResponseApi, IUserData } from "../Types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
    localStorage.removeItem("NMBR");
    setIsAuthenticated(false);
    setUserData({} as IUserData);
    if (!notMountedPaths.includes(pathname)) {
      router.push("/");
    }
  };

  const rememberPassword = async (data: string) => {
    const rememberToken = Cookies.get("TURS");
    if (rememberToken) {
      const response = await fetch(`/backend/userAuthProcess/${data}/rememberPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rememberToken: rememberToken }),
      });
      const dataReponse = await response.json();
      if (dataReponse.status === 200) {
        Cookies.set("TUVR", dataReponse.data[0].cookies, { expires: 65 / 1440 });
        checkAuth();
      }
    } else {
      authDisable();
      Cookies.remove("TUVR");
    }
  };

  const checkAuth = async () => {
    const userToken = Cookies.get("TUVR");
    if (userToken) {
      const catchData = async () => {
        if (Object.keys(userData).length === 0) {
          const response = await fetch(`/backend/userAuthProcess/${userToken}`, { method: "GET" });
          const dataReponse = await response.json();
          if (dataReponse.status === 200) {
            setIsAuthenticated(true);
            setUserData(dataReponse.data[0]);
            localStorage.setItem("NMBR", dataReponse.data[0].id);
          } else {
            rememberPassword(localStorage.getItem("NMBR") as string);
          }
        } else {
          document.title = `${userData.displayName} - Notepad`;
        }
      };

      catchData();
    } else {
      rememberPassword(localStorage.getItem("NMBR") as string);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname, setIsAuthenticated, setUserData]);

  const authEnable = (dataResponse: IResponseApi) => {
    setIsAuthenticated(true);
    if (dataResponse.data[0].rememberToken) Cookies.set("TURS", dataResponse.data[0].rememberToken, { expires: 1 });
    Cookies.set("TUVR", dataResponse.data[0].cookies, { expires: 65 / 1440 });
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
    const dataResponse = (await response.json()) as IResponseApi;
    if (dataResponse.status === 200 || dataResponse.status === 201) {
      return authEnable(dataResponse);
    } else {
      let errorData;
      dataResponse.data.length >= 1 ? (errorData = dataResponse.data.join(",")) : (errorData = dataResponse.data[0]);
      return errorData;
    }
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetchUserData("/backend/login", formData, form.method);
    const dataResponse = (await response.json()) as IResponseApi;
    if (dataResponse.status === 200 || dataResponse.status === 201) return authEnable(dataResponse);
    else return dataResponse.message === "Email not found" ? "Email" : "Password";
  };

  const logout = async () => {
    const response = await fetch("/backend/logout", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userData.email }),
    });
    const dataReponse = await response.json();
    if (dataReponse.status === 200) {
      if (Cookies.get("TURS")) Cookies.remove("TURS");
      Cookies.remove("TUVR");
      setIsAuthenticated(false);
      window.location.reload();
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, userData, register, login, checkAuth, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
