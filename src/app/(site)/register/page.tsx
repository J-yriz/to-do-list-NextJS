"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utility/context/authContext";

const Home = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const returnData = await register(e);
    if (returnData === "/") {
      router.push("/");
    } else {
      if (returnData !== undefined) {
        setError(returnData.split(","));
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        method="POST"
        className="flex flex-col bg-color2 p-6 rounded shadow-lg"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="displayName" className="mb-4 text-sm font-semibold flex flex-col gap-y-2">
          Display Name
          <input
            type="text"
            id="displayName"
            name="displayName"
            className="p-2 border border-gray-300 rounded focus:outline-none text-color1 w-80"
            required
          />
        </label>
        <label htmlFor="username" className="mb-4 text-sm font-semibold flex flex-col gap-y-2">
          <p className={`${error.find((data) => data.toLowerCase() === "username") ? "text-red-300" : ""}`}>
            Username {error.find((data) => data.toLowerCase() === "username") ? "- Username already in use" : ""}
          </p>
          <input
            type="text"
            id="username"
            name="username"
            className="p-2 border border-gray-300 rounded focus:outline-none text-color1 w-80"
            required
          />
        </label>
        <label htmlFor="email" className="mb-4 text-sm font-semibold flex flex-col gap-y-2">
          <p className={`${error.find((data) => data.toLowerCase() === "email") ? "text-red-300" : ""}`}>
            Email {error.find((data) => data.toLowerCase() === "email") ? "- Email already in use" : ""}
          </p>
          <input type="email" id="email" name="email" className="p-2 border border-gray-300 rounded focus:outline-none text-color1 w-80" required />
        </label>
        <label htmlFor="password" className="mb-4 text-sm font-semibold flex flex-col gap-y-2">
          Password
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 border border-gray-300 rounded focus:outline-none text-color1 w-80"
            required
            minLength={8}
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Register
        </button>
        <div className="text-xs mt-1 flex space-x-1">
          <p>Already have an account? </p>
          <Link href={`/login`} className="hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
