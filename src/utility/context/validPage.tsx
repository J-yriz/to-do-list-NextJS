"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SettingsAccessContextProps {
  isValid: boolean;
}

const SettingsAccessContext = createContext<SettingsAccessContextProps | null>(null);

export const SettingsAccessProvider = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    const dataId = localStorage.getItem("NMBR");
    if (userId !== dataId) {
      setIsValid(false);
    }
  }, [userId]);

  return (
    <SettingsAccessContext.Provider value={{ isValid }}>
      {isValid ? (
        children
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-3xl font-bold">403 Forbidden</p>
          <p>You can't access this page ID : {userId}</p>
        </div>
      )}
    </SettingsAccessContext.Provider>
  );
};

export const useSettingsAccess = () => useContext(SettingsAccessContext);
