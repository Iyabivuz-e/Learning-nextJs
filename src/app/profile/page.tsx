"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useState, useEffect} from "react";

const ProfilePage = () => {
  const router = useRouter();

  const [data, setData] = useState("Nothing")
  // Handling the logout route
  const handleLogout = async () => {
    try {
      await axios.get("api/users/logout");
      console.log("User has logged out");
      router.push("/login");
    } catch (error:any) {
      console.log(error.message)
    }
  };

  //Getting the user's details
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me")
    console.log(res.data.data._id)
    setData(res.data.data._id)
  }  
  // Use efferct to show the data when the page loads.
  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="flex flex-col p-3 justify-center align-center">
      <h1>Profile</h1>
      <h2 className="p-2 bg-orange-600">
        {data === "Nothing" ? (
          "No data is found"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <br />
      <h1>Profile Page Goes Here</h1>
      <button onClick={handleLogout} className="bg-blue-500 text-white p-2 ">
        Logout
      </button>
      {/* <button onClick={getUserDetails} className="bg-green-700 text-white p-2 ">
        Get user data
      </button> */}
    </div>
  );
};

export default ProfilePage;
