import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "../lib/auth";
import Alllistindrooms from "./Alllistindrooms";

export const dynamic = "force-dynamic";

export default async function MyListingsCard() {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

 const verifiedtoken = process.env.JWTTOKJEN 
 

  let data = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listed-room`, {
      cache: "no-store",
      headers: {
        authorization: verifiedtoken,
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

        <button className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-lg font-medium">
          + Add New Room
        </button>

      </div>

      <div className="grid grid-cols-4 gap-7">

        {data?.map((da) => (
          <Alllistindrooms
            key={da._id}
            da={da}
            token={verifiedtoken}
          />
        ))}

      </div>

    </div>
  );
}