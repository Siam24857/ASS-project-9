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
      <div className="min-h-screen flex items-center justify-center bg-[#071426] p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-sm sm:text-base">Failed to load your listings</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 hover:bg-orange-600 transition px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-5 md:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              My Listings
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
              Manage the study rooms you ve listed
            </p>
          </div>

          <Link href="/add-room">
            <button className="bg-orange-500 hover:bg-orange-600 transition px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto">
              + Add New Room
            </button>
          </Link>
        </div>

        {/* Empty State */}
        {data.length === 0 ? (
          <div className="text-center py-8 sm:py-10 md:py-12">
            <p className="text-gray-400 text-sm sm:text-base">You havent listed any rooms yet.</p>
            <Link href="/add-room">
              <button className="mt-3 sm:mt-4 bg-orange-500 hover:bg-orange-600 transition px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base">
                List Your First Room
              </button>
            </Link>
          </div>
        ) : (
          /* Grid Layout - Responsive Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
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
    </div>
  );
}