"use client";

import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BookingModal from "@/app/components/Bookinfmodal";
 
import { authClient } from "@/app/lib/auth-client";

const Allroomdettails = () => {
    
  const params = useParams();
  const id = params.id;
 
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const {data, error: tokenError} = await authClient.token();

        if (tokenError) {
          throw new Error("Authentication failed");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/roomdetails/${id}`,
          {
            headers: {
              authorization: `Bearer ${data.token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch room details");
        }

        const datas = await res.json();
        setRoom(datas);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#071426] text-white p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#e6983c] mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base">Loading room details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#071426] text-white p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-red-400 text-sm sm:text-base">Error: {error}</p>
          <Link href="/rooms">
            <button className="mt-4 bg-[#e6983c] px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
              Go Back to Rooms
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // No room found
  if (!room) {
    return (
      <div className="min-h-screen bg-[#071426] text-white p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 text-sm sm:text-base">Room not found</p>
          <Link href="/rooms">
            <button className="mt-4 bg-[#e6983c] px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
              Go Back to Rooms
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-[#071426] text-white p-3 sm:p-4 md:p-5 lg:p-6">
        {/* Back */}
        <Link href="/rooms">
          <button className="flex items-center gap-2 text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            All Rooms
          </button>
        </Link>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="relative h-[280px] sm:h-[360px] md:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src={
                  room.image ||
                  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop"
                }
                alt={room.roomName}
                fill
                className="object-cover"
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-5 sm:mt-6 md:mt-7 lg:mt-8">
              {room.roomName}
            </h1>

            {/* Info */}
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4 md:mt-5 text-gray-300 text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
                {room.bookings || 0} bookings
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
                {room.floor} Floor
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Users size={14} className="sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px]" />
                Up to {room.capacity} people
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-[#1c2c44] my-5 sm:my-6 md:my-7 lg:my-8"></div>

            {/* About */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              About this room
            </h2>

            <p className="text-gray-300 leading-7 sm:leading-8 text-sm sm:text-base">
              {room.description}
            </p>

            {/* Amenities */}
            <div className="mt-6 sm:mt-7 md:mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {room.amenities?.map((item, i) => (
                  <span
                    key={i}
                    className="bg-[#0d1b2f] border border-[#1c2c44] px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card - Booking Section */}
          <div className="mt-6 lg:mt-0">
            <div className="bg-[#0d1b2f] border border-[#1c2c44] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 sticky top-6">
              
              {/* Price */}
              <div className="flex items-end gap-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  ${room.rate}/hr
                </h2>
                <span className="text-gray-400 mb-1 text-sm sm:text-base">
                  /hour
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 mt-5 sm:mt-6 md:mt-8">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Floor
                  </div>
                  <span>{room.floor} Floor</span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Capacity
                  </div>
                  <span>Up to {room.capacity}</span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Rate
                  </div>
                  <span>{room.rate}</span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Bookings
                  </div>
                  <span>{room.bookings || 0}</span>
                </div>
              </div>

              {/* Button */}
              <div className="w-full mt-5 sm:mt-6 md:mt-8">
                <BookingModal room={room} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allroomdettails;