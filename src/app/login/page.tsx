"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";


const LoginPage = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {};

  return (
    <div className="flex flex-col p-3 justify-center align-center">
      <h1 className="text-white text-4xl text-center">Login</h1>

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
        className="mt-4 p-2 bg-slate-300 text-neutral-950"
      >
        Log In
      </button>
      <Link href="/signup" className="text-center mt-2">
        Go to signup page
      </Link>
    </div>
  );
};

export default LoginPage;
