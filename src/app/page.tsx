"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {

  const router = useRouter()
    const handleLogout = async () => {
      try {
        await axios.get("api/users/logout");
        console.log("User has logged out");
        router.push("/login");
      } catch (error: any) {
        console.log(error.message);
      }
    };

  return (
    <main className="flex gap-3 flex-col items-center justify-between p-64">
      <h1 className="text-4xl">Contribution to Hitesh's NextJs Tutorial</h1>
      <h1 className="text-4xl">Authentication course</h1>
      <h2>
        by <span className="text-xl">Dieudonne Iyabivuze</span>
      </h2>
      <div className="flex gap-4 mt-5 ">
        <button
          onClick={handleLogout}
          className="bg-transparent border border-white px-3 py-2"
        >
          Logout
        </button>
        <Link
          className="bg-transparent border border-white px-3 py-2"
          href="/profile"
        >
          Profile
        </Link>
      </div>
    </main>
  );
}
