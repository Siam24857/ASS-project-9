// components/Footer.jsx

import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f3eadc] text-gray-700 pt-14 pb-6 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* Logo & Description */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center sm:justify-start">
              <div className="bg-amber-500 p-2 rounded-lg text-white flex-shrink-0">
                <BookOpen size={22} />
              </div>
              <h2 className="text-2xl font-bold text-black">
                StudyNook
              </h2>
            </div>

            <p className="max-w-sm leading-7 text-gray-600 mx-auto sm:mx-0">
              Find and book quiet, private study rooms in your
              library. List your own room and earn.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="uppercase tracking-wider text-sm font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-black transition inline-block">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/rooms" className="hover:text-black transition inline-block">
                  Rooms
                </Link>
              </li>

              <li>
                <Link href="/my-listroom" className="hover:text-black transition inline-block">
                  List Your Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h3 className="uppercase tracking-wider text-sm font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                <HiOutlineMail className="text-lg flex-shrink-0" />
                <p className="break-all">hello@studynook.app</p>
              </div>

              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <HiOutlinePhone className="text-lg flex-shrink-0" />
                <p>+1 (800) 555-1234</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#e5dccd] flex items-center justify-center hover:bg-amber-500 hover:text-white transition cursor-pointer">
                <FaFacebookF />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#e5dccd] flex items-center justify-center hover:bg-amber-500 hover:text-white transition cursor-pointer">
                <FaXTwitter />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#e5dccd] flex items-center justify-center hover:bg-amber-500 hover:text-white transition cursor-pointer">
                <FaLinkedinIn />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#e5dccd] flex items-center justify-center hover:bg-amber-500 hover:text-white transition cursor-pointer">
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-300 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>© 2026 StudyNook. All rights reserved.</p>
          <p className="text-center">
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}