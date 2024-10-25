import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full px-40 pt-4 min-h-screen bg-gray-900">
        <div className="grid xl:grid-cols-5 gap-2 ">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </>
  );
};

export default Home;
