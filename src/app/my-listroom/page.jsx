import { headers } from "next/headers";
import { redirect } from "next/navigation";
 
import Alllistindrooms from "./Alllistindrooms";
import { auth } from "../lib/auth";
import { RiTokenSwapFill } from "react-icons/ri";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "StudyNook || Listed Rooms",
    description: "Study rooms for students",
    
  }

export default async function MyListingsCard() {
   
   const token = await auth.api.getToken({
    headers: await headers()
   })
    

 
  


  let data = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listed-room`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token.token}`,
      }
    });
    if (res.ok) {
      data = await res.json();
    } else {
      console.error("Failed to fetch listed rooms:", res.status);
    }
  } catch (err) {
    console.error("Error fetching listed rooms:", err);
  }

    if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071426] text-red-500">
        ListedRoom not found
      </div>
    );
  }
 

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-2xl font-bold">
            My Listings
          </h1>

          <p className="text-sm text-gray-400">
            Manage the study rooms you’ve listed
          </p>
        </div>

        <Link href="/add-room">
          <button className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg font-medium">
            + Add New Room
          </button>
        </Link>

      </div>

      <div className="grid grid-cols-4 gap-7">

        {data?.map((da) => (
          <Alllistindrooms
            key={da._id}
            da={da}
            token={token.token}
          />
        ))}

      </div>

    </div>
  );
}