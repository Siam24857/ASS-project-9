import React from 'react';
import {
  Search,
  ShieldCheck,
  Clock,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy Discovery",
    desc: "Search and filter study rooms by name, amenities, floor, or hourly rate in seconds.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: ShieldCheck,
    title: "No Double Bookings",
    desc: "Our smart conflict detection ensures your reserved time slot is always protected.",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Book rooms for any duration with hourly slots from 8 AM to 9 PM, 7 days a week.",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: Star,
    title: "Verified Rooms",
    desc: "All rooms are listed by real users with accurate descriptions, photos, and amenities.",
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    icon: Users,
    title: "For Groups Too",
    desc: "Find rooms accommodating 1 to 10+ people for solo study or group collaborations.",
    color: "from-pink-500/20 to-pink-500/5",
  },
  {
    icon: CheckCircle,
    title: "Instant Confirmation",
    desc: "Get immediate booking confirmation with a clear summary of your reservation details.",
    color: "from-indigo-500/20 to-indigo-500/5",
  },
];

const Feature = () => {
  return (
    <section className="bg-gradient-to-b from-[#0f172a] to-[#0a0f1c] text-white py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-orange-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Why Choose Us
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 
                       bg-gradient-to-r from-white via-orange-100 to-orange-400 
                       bg-clip-text text-transparent">
            Everything You Need to Study Better
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            StudyNook connects students with the perfect study spaces, making booking simple, 
            fast, and conflict-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-5 sm:gap-6 md:gap-7 
                      grid-cols-1 
                      sm:grid-cols-2 
                      lg:grid-cols-3">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group relative bg-[#111c2e]/50 backdrop-blur-sm 
                         border border-white/10 rounded-2xl 
                         p-5 sm:p-6 md:p-7 lg:p-8 
                         transition-all duration-300 
                         hover:border-orange-500/40 hover:bg-[#162238]
                         hover:shadow-xl hover:shadow-orange-500/5
                         hover:-translate-y-1"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 
                                flex items-center justify-center rounded-xl 
                                bg-gradient-to-br from-orange-500/20 to-orange-500/5
                                group-hover:from-orange-500/30 group-hover:to-orange-500/10
                                transition-all duration-300 mb-4 sm:mb-5">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 
                                   text-orange-400 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 
                               group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm sm:text-base 
                             leading-relaxed group-hover:text-gray-300">
                    {item.desc}
                  </p>

                  {/* Learn More Link - Optional */}
                  <div className="mt-4 sm:mt-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="inline-flex items-center gap-1 text-orange-400 text-sm font-medium">
                      Learn More 
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section - Optional enhancement */}
        <div className="mt-16 sm:mt-20 md:mt-24 pt-8 sm:pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400">1000+</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Active Users</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400">50+</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Study Rooms</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400">98%</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400">24/7</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;