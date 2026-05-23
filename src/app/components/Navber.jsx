"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Menu, X } from "lucide-react";
import { useSession, authClient } from "../lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
      setIsMenuOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full border-b border-[#1b2a3a] bg-[#08111f] text-white relative">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3" onClick={() => setIsMenuOpen(false)}>
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#f5ead7]">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">StudyNook</h1>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">

          <li>
            <Link
              href="/"
              className={pathname === "/" ? "text-yellow-400" : "text-gray-300 hover:text-white transition"}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/rooms"
              className={pathname === "/rooms" ? "text-yellow-400" : "text-gray-300 hover:text-white transition"}
            >
              Rooms
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link href="/add-room" className="text-gray-300 hover:text-white transition">
                  Add Room
                </Link>
              </li>

              <li>
                <Link href="/my-listroom" className="text-gray-300 hover:text-white transition">
                  My Listings
                </Link>
              </li>

              <li>
                <Link href="/my-bookings" className="text-gray-300 hover:text-white transition">
                  My Bookings
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 sm:gap-4">

          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">

              <Image
                src={user.image || "https://i.pravatar.cc/100"}
                alt="profile"
                width={36}
                height={36}
                className="rounded-full border-2 border-yellow-400 w-9 h-9 sm:w-11 sm:h-11"
              />

              <span className="hidden sm:block font-semibold text-sm sm:text-base">
                {user.name?.split(" ")[0] || user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500 px-2 sm:px-3 py-1 text-red-400 text-xs sm:text-sm hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-yellow-400 px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-yellow-400 text-sm sm:text-base hover:bg-yellow-400 hover:text-black transition"
            >
              Login
            </Link>
          )}

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-[#08111f] border-b border-[#1b2a3a] z-50 shadow-lg">
          <ul className="flex flex-col py-4 px-6 gap-4">
            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 ${pathname === "/" ? "text-yellow-400" : "text-gray-300"}`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/rooms"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 ${pathname === "/rooms" ? "text-yellow-400" : "text-gray-300"}`}
              >
                Rooms
              </Link>
            </li>

            {user && (
              <>
                <li>
                  <Link
                    href="/add-room"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-gray-300"
                  >
                    Add Room
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-listroom"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-gray-300"
                  >
                    My Listings
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-bookings"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-gray-300"
                  >
                    My Bookings
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}