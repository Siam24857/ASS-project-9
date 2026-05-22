"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { useSession, authClient } from "../lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut(); // ✅ real Better Auth logout
      router.push("/login");      // redirect to login
      router.refresh();           // refresh session state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full border-b border-[#1b2a3a] bg-[#08111f] text-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5ead7]">
            <BookOpen className="h-5 w-5 text-black" />
          </div>
          <h1 className="text-2xl font-bold">StudyNook</h1>
        </Link>

        {/* MENU */}
        <ul className="hidden items-center gap-10 md:flex">

          <li>
            <Link
              href="/"
              className={pathname === "/" ? "text-yellow-400" : "text-gray-300"}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/rooms"
              className={pathname === "/rooms" ? "text-yellow-400" : "text-gray-300"}
            >
              Rooms
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link href="/add-room" className="text-gray-300">
                  Add Room
                </Link>
              </li>

              <li>
                <Link href="/my-listroom" className="text-gray-300">
                  My Listings
                </Link>
              </li>

              <li>
                <Link href="/my-bookings" className="text-gray-300">
                  My Bookings
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {user ? (
            <div className="flex items-center gap-3">

              <Image
                src={user.image || "https://i.pravatar.cc/100"}
                alt="profile"
                width={44}
                height={44}
                className="rounded-full border-2 border-yellow-400"
              />

              <span className="hidden md:block font-semibold">
                {user.name}
              </span>

              {/* ✅ REAL LOGOUT */}
              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500 px-3 py-1 text-red-400 text-sm hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-yellow-400 px-4 py-2 font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}