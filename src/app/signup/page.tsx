"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {

  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading ] = useState(false)
  //If there is nothing in the text inputs, then the button should be disabled
  const [disabled, setDisabled] = useState <boolean | null >(null)
  useEffect(() => {
    if (
      user.email?.length > 0 &&
      user.password?.length > 0 &&
      user.username?.length > 0

    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);
  
    // Handling the signup functionalities
    const onSignUp = async () => {
      try {
        
        setLoading(true)
        const response = await axios.post('api/users/signup', user)
        console.log("Signup success!", response.data)
        router.push("/login")

      } catch (error:any) {
        console.log("Signup failed", error.message)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    };

  return (
    <div className="flex flex-col p-3 justify-center align-center">
      <h1 className="text-white text-4xl text-center">
        {loading ? "Processing..." : "Signup"}
      </h1>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="username">Username</label>
        <input
          className="py-1 px-2 text-neutral-900"
          id="username"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
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
        onClick={onSignUp}
        className="mt-4 p-2 bg-slate-300 text-neutral-950"
      >
        {disabled ? "No SignUp" : "SignUp"}
      </button>
      <Link href="/login" className="text-center mt-2">
        Back to login page
      </Link>
    </div>
  );
};

export default SignupPage;
