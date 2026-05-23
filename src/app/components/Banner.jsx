"use client";

import { ArrowRight, BookOpen } from "lucide-react";

const Banner = () => {
  return (
    <section className="w-full min-h-screen bg-[#1F3A5F] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto text-center w-full">
        
        {/* Top Badge - Responsive */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/10 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 md:mb-10">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="text-white text-xs sm:text-base md:text-lg font-medium">
            Library Study Room Booking Platform
          </span>
        </div>

        {/* Heading - Fluid Typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
          Find Your Perfect{" "}
          <span className="text-[#F4A63A] block sm:inline">Study Room</span>
        </h1>

        {/* Description - Responsive */}
        <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-8 leading-relaxed px-2">
          Browse and book quiet, private study rooms in your library.
          List your own room and earn.
        </p>

        {/* Buttons - Stack on mobile, row on larger screens */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 mt-8 sm:mt-10 md:mt-12 px-4">
          
          <button className="w-full sm:w-auto bg-[#F4A63A] hover:bg-[#e2952d] transition-all duration-300 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg shadow-lg active:scale-95 transform transition">
            Explore Rooms
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button className="w-full sm:w-auto border border-white/40 hover:bg-white/10 transition-all duration-300 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl text-base sm:text-lg active:scale-95 transform transition">
            List Your Room
          </button>
        </div>

        {/* Stats - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4">
          
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">200+</h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mt-1 sm:mt-2">Study Rooms</p>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">5,000+</h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mt-1 sm:mt-2">Happy Students</p>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">50+</h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mt-1 sm:mt-2">Libraries</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;