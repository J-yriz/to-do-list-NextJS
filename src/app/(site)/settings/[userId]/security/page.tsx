import SideBar from "../../SideBar";
import Navbar from "@/components/Navbar";
import { SettingsAccessProvider } from "@/utility/context/validPage";

const Home = ({ params }: { params: { userId: string } }) => {
  return (
    <SettingsAccessProvider userId={params.userId}>
      <Navbar />
      <div className="py-5 mx-28 flex space-x-12">
        <div className="flex flex-col w-64">
          <SideBar userId={`${params.userId}`} />
        </div>
        <div className="w-full">
            <p className="text-3xl">Security</p>
            <div className="border-t mt-1 border-white/50"></div>
        </div>
      </div>
    </SettingsAccessProvider>
  );
};

export default Home;
