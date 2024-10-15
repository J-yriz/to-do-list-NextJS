import SideBar from "../../SideBar";
import Navbar from "@/components/Navbar";
import { SettingsAccessProvider } from "@/utility/context/validPage";

const Home = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

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
            <div className="mt-3 flex space-x-5">
              <form id="changePassword" className="flex flex-col space-y-2 w-full bg-gray-700/50 p-2 rounded">
                <label htmlFor="currentPassowrd" className="flex flex-col w-full">
                  <span className="text-color3 font-semibold mb-1">Current Password</span>
                  <input type="password" name="currentPassword" id="currentPassword" className="focus:outline-none p-2 rounded-md bg-color2" />
                </label>
                <label htmlFor="currentPassowrd" className="flex flex-col w-full">
                  <span className="text-color3 font-semibold mb-1">New Password</span>
                  <input type="password" name="currentPassword" id="currentPassword" className="focus:outline-none p-2 rounded-md bg-color2" />
                </label>
                <label htmlFor="currentPassowrd" className="flex flex-col w-full">
                  <span className="text-color3 font-semibold mb-1">Repeat New Password</span>
                  <input type="password" name="currentPassword" id="currentPassword" className="focus:outline-none p-2 rounded-md bg-color2" />
                </label>
              </form>
              <form id="changePassword" className="flex w-full">
                <label htmlFor="currentPassowrd" className="flex flex-col w-full">
                  <span>Current Password</span>
                  <input type="password" name="currentPassword" id="currentPassword" />
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SettingsAccessProvider>
  );
};

export default Home;
