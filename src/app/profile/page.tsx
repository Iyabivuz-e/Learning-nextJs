"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

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

  return (
    <div className="flex flex-col p-3 justify-center align-center">
      <h1>Profile</h1>
      <br />
      <h1>Profile Page Goes Here</h1>
      <button onClick={handleLogout} className="bg-blue-500 text-white p-2 ">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
