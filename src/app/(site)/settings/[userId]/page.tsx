"use client";

import SideBar from "../SideBar";
import { Icon } from "@iconify/react";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "@/utility/context/authContext";
import { SettingsAccessProvider } from "@/utility/context/validPage";

const Home = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const { userData, checkAuth } = useAuth();
  const [error, setError] = useState<string[]>([""]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (form.id === "confirm") {
      const generalForm = document.getElementById("general") as HTMLFormElement;
      if (generalForm) {
        const generalFormData = new FormData(generalForm);
        generalFormData.forEach((value, key) => formData.append(key, value as string));
      }
    }

    const response = await fetch(`/backend/settings/${userId}`, {
      method: form.method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const dataResponse = await response.json();
    if (dataResponse.status === 200 || dataResponse.status === 201) {
      window.location.reload();
    } else {
      setError([dataResponse.data[0].toLowerCase()]);
    }
  };

  return (
    <SettingsAccessProvider userId={userId}>
      <Navbar />
      <div className="py-5 mx-10 md:mx-28 flex flex-col sm:flex-row space-x-0 sm:space-x-12">
        <div className="flex flex-col w-full sm:w-64">
          <SideBar userId={`${userId}`} />
        </div>
        <div className="w-full mt-3 sm:mt-0">
          <p className="text-3xl">General</p>
          <div className="border-t mt-1 mb-5 border-white/50">
            <form id="general" method="POST" className="flex mt-3 flex-wrap lg:flex-nowrap space-y-2 lg:space-y-0 lg:space-x-5">
              <label htmlFor="displayName" className="flex flex-col w-full">
                <p className="text-color3 font-semibold mb-1">Display Name</p>
                <div className="flex flex-col space-y-2 bg-gray-700/50 p-2 rounded">
                  <span className="text-color3 font-semibold">Current Name</span>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    className="focus:outline-none p-2 rounded-md bg-color2 w-full"
                    defaultValue={`${userData.displayName}`}
                  />
                </div>
              </label>
              <label htmlFor="email" className="flex flex-col w-full">
                <p className="text-color3 font-semibold mb-1">Email</p>
                <div className="flex flex-col space-y-2 bg-gray-700/50 p-2 rounded">
                  <span className="text-color3 font-semibold mb-1">Current Email</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="focus:outline-none p-2 rounded-md bg-color2"
                    defaultValue={`${userData.email}`}
                  />
                </div>
              </label>
            </form>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const emailInput = document.getElementById("email") as HTMLInputElement;
                  if (emailInput && emailInput.checkValidity()) {
                    setShowModal(!showModal);
                    checkAuth();
                  } else {
                    emailInput.reportValidity();
                  }
                }}
                className="bg-green-700 p-2 rounded-md text-sm font-semibold mt-5"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 w-50 h-50 flex items-center justify-center z-50">
          <div className="bg-color1 p-2 rounded-md">
            <p className="font-semibold">Change User Data</p>
            <div className="border-t">
              <p className="my-1">To confirm the changes, please enter your password.</p>
              <form id="confirm" method="POST" onSubmit={handleSubmit} className="flex mt-2 flex-col space-y-2">
                <label htmlFor="password" className="flex flex-col w-full relative">
                  {error.includes("password") && <p className="text-red-300">Password is incorrect</p>}
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    id="password"
                    name="password"
                    className="focus:outline-none p-2 rounded-md bg-color2/50 w-full"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    <i className="absolute top-2 right-3 cursor-pointer">
                      <Icon icon={showPassword ? "mdi:eye" : "humbleicons:eye-close"} style={{ fontSize: "1.5rem" }} />
                    </i>
                  </button>
                </label>
                <div className="flex space-x-2">
                  <button
                    form="cancel"
                    type="reset"
                    onClick={() => {
                      setShowModal(!showModal);
                      setError([""]);
                    }}
                    className="bg-red-600 w-full p-2 rounded-md text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button form="confirm" type="submit" className="bg-green-600 w-full p-2 rounded-md text-sm font-semibold">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </SettingsAccessProvider>
  );
};

export default Home;
