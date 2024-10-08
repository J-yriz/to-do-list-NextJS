"use client";

import React from "react";
import Cookies from "js-cookie";
import { IUserData } from "@/utility/Types";

import Navbar from "@/components/Navbar";

const Home = () => {
  const [userData, setUserData] = React.useState<IUserData>({} as IUserData);

  React.useEffect(() => {
    const userToken = Cookies.get("TUVR");
    if (userToken) {
      const catchData = async () => {
        const response = await fetch(`/backend/userAuthProcess/${userToken}`, { method: "GET" });
        const dataReponse = await response.json();
        if (!dataReponse.error) {
          setUserData(dataReponse.data[0]);
        } else {
          setUserData({} as IUserData);
          Cookies.remove("TUVR");
        }
      };

      catchData();
    } else {
      setUserData({} as IUserData);
    }
  }, [setUserData]);

  return <Navbar userData={userData} />;
};

export default Home;
