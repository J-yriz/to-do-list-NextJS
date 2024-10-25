"use client";

import Cookies from "js-cookie";
import { useState } from "react";
import { Icon } from "@iconify/react";
import SideBar from "../../SideBar";
import Navbar from "@/components/Navbar";
import { SettingsAccessProvider } from "@/utility/context/validPage";

const Home = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const [error, setError] = useState<string[]>([""]);

  // Change Password
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

  // Delete Account
  const [showPasswordConfirmDelete, setShowPasswordConfirmDelete] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch(`/backend/settings/${userId}/security`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const dataResponse = await response.json();
    if (dataResponse.status === 200) window.location.reload();
    else setError([dataResponse.data[0].toLowerCase()]);
  };

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch(`/backend/settings/${userId}/security`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const dataResponse = await response.json();
    if (dataResponse.status === 200) {
      Cookies.remove("TURS");
      Cookies.remove("TUVR");
      window.location.reload();
    } else setError([dataResponse.data[0].toLowerCase()]);
  };

  return (
    <SettingsAccessProvider userId={userId}>
      <Navbar />
      <div className="py-5 mx-10 md:mx-28 flex flex-col sm:flex-row space-x-0 sm:space-x-12">
        <div className="flex flex-col w-full sm:w-64">
          <SideBar userId={`${userId}`} />
        </div>
        <div className="w-full mt-3 sm:mt-0">
          <p className="text-3xl">Security</p>
          <div className="border-t mt-1 border-white/50">
            <div className="flex mt-3 flex-wrap lg:flex-nowrap space-y-2 lg:space-y-0 lg:space-x-5">
              <div id="changePasswordForm" className="w-full">
                <p className="text-color3 font-semibold mb-1">Change Password</p>
                <form id="changePassword" onSubmit={handleSubmit} className="flex flex-col space-y-2 bg-gray-700/50 p-2 rounded">
                  <label htmlFor="currentPassword" className="flex flex-col relative">
                    <span className={`${error.some((text) => text === "password") ? "text-red-300" : "text-color3"} font-semibold mb-1`}>
                      Current Password {error.find((data) => data === "password") ? "- Password is incorrect" : ""}
                    </span>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      id="currentPassword"
                      className="focus:outline-none p-2 rounded-md bg-color2"
                    />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                      <i className="absolute top-9 right-3 cursor-pointer">
                        <Icon icon={showCurrentPassword ? "mdi:eye" : "humbleicons:eye-close"} style={{ fontSize: "1.5rem" }} />
                      </i>
                    </button>
                  </label>
                  <label htmlFor="newPassword" className="flex flex-col w-full relative">
                    <span className="text-color3 font-semibold mb-1">New Password</span>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      className="focus:outline-none p-2 rounded-md bg-color2"
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                      <i className="absolute top-9 right-3 cursor-pointer">
                        <Icon icon={showNewPassword ? "mdi:eye" : "humbleicons:eye-close"} style={{ fontSize: "1.5rem" }} />
                      </i>
                    </button>
                  </label>
                  <label htmlFor="confirmNewPassword" className="flex flex-col w-full relative">
                    <span className={`${error.some((text) => text === "password confirm") ? "text-red-300" : "text-color3"} font-semibold mb-1`}>
                      Confirm New Password {error.find((data) => data === "password confirm") ? "- Password Confirm is incorrect" : ""}
                    </span>
                    <input
                      type={showConfirmNewPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      className="focus:outline-none p-2 rounded-md bg-color2"
                    />
                    <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                      <i className="absolute top-9 right-3 cursor-pointer">
                        <Icon icon={showConfirmNewPassword ? "mdi:eye" : "humbleicons:eye-close"} style={{ fontSize: "1.5rem" }} />
                      </i>
                    </button>
                  </label>
                  <button form="changePassword" type="submit" className="bg-green-700 p-2 rounded-md font-semibold place-self-end">
                    Change Password
                  </button>
                </form>
              </div>
              <div id="deleteAccountForm" className="w-full">
                <p className="text-color3 font-semibold mb-1">Delete Account</p>
                <form id="deleteAccount" onSubmit={handleDeleteAccount} className="flex flex-col space-y-2 bg-gray-700/50 p-2 rounded">
                  <label htmlFor="passwordConfirmDelete" className="flex flex-col relative">
                    <span
                      className={`${error.some((text) => text === "password confirm delete") ? "text-red-300" : "text-color3"} font-semibold mb-1`}
                    >
                      Password Confirm Delete {error.find((data) => data === "password confirm delete") ? "- incorrect" : ""}
                    </span>
                    <input
                      type={`${showPasswordConfirmDelete ? "text" : "password"}`}
                      name="passwordConfirmDelete"
                      id="passwordConfirmDelete"
                      className="focus:outline-none p-2 rounded-md bg-color2"
                    />
                    <button type="button" onClick={() => setShowPasswordConfirmDelete(!showPasswordConfirmDelete)}>
                      <i className="absolute top-9 right-3 cursor-pointer">
                        <Icon icon={showPasswordConfirmDelete ? "mdi:eye" : "humbleicons:eye-close"} style={{ fontSize: "1.5rem" }} />
                      </i>
                    </button>
                  </label>
                  <button type="submit" className="place-self-end bg-red-600 p-2 rounded font-semibold">
                    Delete Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingsAccessProvider>
  );
};

export default Home;
