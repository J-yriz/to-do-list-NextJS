"use client";

import SideBar from "../../SideBar";
import Navbar from "@/components/Navbar";
import { SettingsAccessProvider } from "@/utility/context/validPage";

const Home = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    console.log(Object.fromEntries(formData));
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
              <form id="changePassword" onSubmit={handleSubmit} className="flex flex-col space-y-2 w-full bg-gray-700/50 p-2 rounded">
                <label htmlFor="currentPassowrd" className="flex flex-col w-full">
                  <span className="text-color3 font-semibold mb-1">Current Password</span>
                  <input type="password" name="currentPassword" id="currentPassword" className="focus:outline-none p-2 rounded-md bg-color2" />
                </label>
                <label htmlFor="changePassword" className="flex flex-col w-full">
                  <span className="text-color3 font-semibold mb-1">New Password</span>
                  <input type="password" name="newPassword" id="newPassword" className="focus:outline-none p-2 rounded-md bg-color2" />
                </label>
                <label htmlFor="changePassword" className="flex flex-col w-full">
                  <span className="text-color3 font-semibold mb-1">Repeat New Password</span>
                  <input type="password" name="repeatNewPassword" id="repeatNewPassword" className="focus:outline-none p-2 rounded-md bg-color2" />
                </label>
                <button form="changePassword" type="submit" className="bg-green-700 p-2 rounded-md font-semibold place-self-end">
                  Change Password
                </button>
              </form>
              {/* <form id="idk" className="flex w-full">
                <label htmlFor="idk" className="flex flex-col w-full">
                  <span>Current Password</span>
                  <input type="password" name="ea" id="ea" />
                </label>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </SettingsAccessProvider>
  );
};

export default Home;
