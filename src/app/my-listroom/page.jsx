import { headers } from "next/headers";
import { redirect } from "next/navigation";
 
import Alllistindrooms from "./Alllistindrooms";
import { auth } from "../lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "StudyNook || Listed Rooms",
    description: "Study rooms for students",
}

export default async function MyListingsCard() {
   
   // Get token with proper error handling
   let token;
   try {
     const tokenResult = await auth.api.getToken({
       headers: await headers()
     });
     
     if (!tokenResult || !tokenResult.token) {
       // Redirect to login if no token
       redirect('/login');
     }
     token = tokenResult;
   } catch (err) {
     console.error("Auth error:", err);
     redirect('/login');
   }

  let data = [];
  let fetchError = false;
  
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
      fetchError = true;
      
      // Handle specific status codes
      if (res.status === 401) {
        redirect('/login');
      }
    }
  } catch (err) {
    console.error("Error fetching listed rooms:", err);
    fetchError = true;
  }

  // Show error state if fetch failed
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071426]">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load your listings</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
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
            Manage the study rooms you've listed
          </p>
        </div>

        <Link href="/add-room">
          <button className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg font-medium">
            + Add New Room
          </button>
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">You haven't listed any rooms yet.</p>
          <Link href="/add-room">
            <button className="mt-4 bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg font-medium">
              List Your First Room
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {data.map((da) => (
            <Alllistindrooms
              key={da._id}
              da={da}
              token={token.token}
            />
          ))}
        </div>
      )}
    </div>
  );
}