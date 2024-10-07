"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [error, setError] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/backend/login", {
      method: form.method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const data = await response.json();
    if (data.error) {
      if (data.error === "Email not found") setError(["Email"]);
      else setError(["Password"]);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form method="POST" className="flex flex-col bg-color2 p-6 rounded shadow-lg" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email" className="mb-4 text-sm font-semibold flex flex-col gap-y-2">
          <p className={`${error.find((data) => data.toLowerCase() === "email") ? "text-red-300" : ""}`}>
            Email {error.find((data) => data.toLowerCase() === "email") ? "- Email not Found" : ""}
          </p>
          <input type="email" id="email" name="email" className="p-2 border border-gray-300 rounded focus:outline-none text-color1 w-80" required />
        </label>
        <label htmlFor="password" className="mb-1 text-sm font-semibold flex flex-col gap-y-2">
          <p className={`${error.find((data) => data.toLowerCase() === "password") ? "text-red-300" : ""}`}>
            Password {error.find((data) => data.toLowerCase() === "password") ? "- Password is incorrect" : ""}
          </p>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 border border-gray-300 rounded focus:outline-none text-color1 w-80"
            required
          />
        </label>
        <label htmlFor="rememberCheck">
          <input type="checkbox" name="rememberCheck" /> Remember me
        </label>
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
        <div className="text-xs mt-1 flex space-x-1">
          <p>Need a create account? </p>
          <Link href={`/register`} className="hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
