"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Disabling the button when the inputs are empty
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);

  // Login functionalities
  const onLogin = async (e: { preventDefault: () => void }) => {
    setLoading(true)
    e.preventDefault();
    const response = await axios.post("api/users/login", user);
    console.log("User logged in sucessfully", response);
    router.push("/profile");
  };

  return (
    <div className="flex flex-col p-3 justify-center items-center mt-8">
      <h1 className="text-white text-4xl text-center">
        {loading ? "Processing...." : "Login"}
      </h1>

      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="email">Email</label>
        <input
          className="py-1 px-2 text-neutral-900"
          id="email"
          type="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="password">Password</label>
        <input
          className="py-1 px-2 text-neutral-900"
          id="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        onClick={onLogin}
        className={`${
          disabled
            ? "mt-4 p-2 bg-green-500 text-neutral-200 cursor-pointer"
            : "mt-4 p-2 bg-slate-300 text-neutral-950 cursor-pointer"
        }`}
      >
        Login
      </button>
      <Link href="/signup" className="text-center mt-2">
        Go to signup page
      </Link>
    </div>
  );
};

export default LoginPage;
