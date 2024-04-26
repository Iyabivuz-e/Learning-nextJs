"use client"

import { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";

const verifyEmailPage = () => {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    // Verifying the user
    const verifyUserEmail = async() => {
        try {
            await axios.post("api/users/verifyemail", {token});
            setVerified(true)

        } catch (error:any) {
            setError(true)
            console.log(error)
        }
    }

    // When the page  runs
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    // Checking if the token is there or not.
    useEffect(() => {
        if(token.length > 0) verifyUserEmail()
    }, [token])

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <h1 className="text-center text-4xl">Verify Email</h1>
      <h2 className="text-white bg-orange-500 p-3 text-xl mt-4">{`${token ? `${token}` : "No Token"}`}</h2>
      {verified && (
        <div>
          <h2 className="bg-green-500 text-white p-3 mt-4 mb-3">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
          <h2 className="bg-red-500 text-white">Error</h2>
          
      )}
    </div>
  );
}

export default verifyEmailPage;
