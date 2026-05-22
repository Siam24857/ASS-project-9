"use client";

import { ArrowRight, BookOpen } from "lucide-react";

 

 

const Banner = () => {
  return (
    <section className="w-full min-h-screen bg-[#1F3A5F] flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full mb-10">
          <BookOpen className="w-5 h-5 text-white" />
          <span className="text-white text-lg">
            Library Study Room Booking Platform
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
          Find Your Perfect{" "}
          <span className="text-[#F4A63A]">Study Room</span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto mt-8 leading-relaxed">
          Browse and book quiet, private study rooms in your library.
          List your own room and earn.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
          
          <button className="bg-[#F4A63A] hover:bg-[#e2952d] transition-all duration-300 text-white font-semibold px-10 py-4 rounded-xl flex items-center gap-3 text-lg shadow-lg">
            Explore Rooms
            <ArrowRight className="w-5 h-5" />
          </button>

          <button className="border border-white/40 hover:bg-white/10 transition-all duration-300 text-white font-semibold px-10 py-4 rounded-xl text-lg">
            List Your Room
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-16 mt-24">
          
          <div>
            <h2 className="text-white text-5xl font-bold">200+</h2>
            <p className="text-gray-300 text-2xl mt-2">Study Rooms</p>
          </div>

          <div>
            <h2 className="text-white text-5xl font-bold">5,000+</h2>
            <p className="text-gray-300 text-2xl mt-2">Happy Students</p>
          </div>

          <div>
            <h2 className="text-white text-5xl font-bold">50+</h2>
            <p className="text-gray-300 text-2xl mt-2">Libraries</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner; 