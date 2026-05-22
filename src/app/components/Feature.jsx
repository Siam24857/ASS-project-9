import React from 'react';

import {
  Search,
  ShieldCheck,
  Clock,
  Star,
  Users,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy Discovery",
    desc: "Search and filter study rooms by name, amenities, floor, or hourly rate in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "No Double Bookings",
    desc: "Our smart conflict detection ensures your reserved time slot is always protected.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Book rooms for any duration with hourly slots from 8 AM to 9 PM, 7 days a week.",
  },
  {
    icon: Star,
    title: "Verified Rooms",
    desc: "All rooms are listed by real users with accurate descriptions, photos, and amenities.",
  },
  {
    icon: Users,
    title: "For Groups Too",
    desc: "Find rooms accommodating 1 to 10+ people for solo study or group collaborations.",
  },
  {
    icon: CheckCircle,
    title: "Instant Confirmation",
    desc: "Get immediate booking confirmation with a clear summary of your reservation details.",
  },
];
const Feature = () => {
    return (
        <div>
            <section className="bg-[#0f172a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-orange-400 uppercase text-sm tracking-widest">
          Why StudyNook
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          Everything You Need to Study Better
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          StudyNook connects students with the perfect study spaces, making booking simple, fast, and conflict-free.
        </p>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-[#111c2e] border border-white/10 rounded-xl p-6 text-left transition"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
        </div>
    );
};

export default Feature;