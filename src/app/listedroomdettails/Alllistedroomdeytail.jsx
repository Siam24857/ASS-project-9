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

const Alllistedroomdeytail = () => {
    
  const params = useParams();
  const roomid = params?.roomid;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomid) return;

    const fetchRoom = async () => {
      try {
        const { data, error } = await authClient.token();
        const token = data?.token;
        
        if (!token || error) {
          console.log("No token found");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/listedroomdetails/${roomid}`, 
          {
            headers: {
              authorization: `Bearer ${token}`, 
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const datas = await res.json();
        setRoom(datas);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();

  }, [roomid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071426] text-white p-4 sm:p-6 flex items-center justify-center">
        <div className="text-gray-300 text-sm sm:text-base">Loading room details...</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#071426] text-white p-4 sm:p-6">
        <Link href="/my-listroom">
          <button className="flex items-center gap-2 text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            My Listings
          </button>
        </Link>
        <div className="text-center text-red-500">Room not found</div>
      </div>
    );
  }
   
  return (
    <div>
      <div className="min-h-screen bg-[#071426] text-white p-4 sm:p-6 md:p-8">

        {/* Back */}
        <Link href="/my-listroom">
          <button className="flex items-center gap-2 text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            My Listings
          </button>
        </Link>

        {/* Layout - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2">

            {/* Image */}
            <div className="relative h-[280px] sm:h-[360px] md:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src={
                  room?.image ||
                  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop"
                }
                alt={room?.roomName}
                fill
                className="object-cover"
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-6 sm:mt-8">
              {room?.roomName}
            </h1>

            {/* Info */}
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-5 text-gray-300 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                {room?.bookings || 0} bookings
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                {room?.floor} Floor
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} className="sm:w-[18px] sm:h-[18px]" />
                Up to {room?.capacity} people
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-[#1c2c44] my-6 sm:my-8"></div>

            {/* About */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              About this room
            </h2>

            <p className="text-gray-300 leading-7 sm:leading-8 text-sm sm:text-base">
              {room?.description}
            </p>

            {/* Amenities */}
            <div className="mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {room?.amenities?.map((item, i) => (
                  <span
                    key={i}
                    className="bg-[#0d1b2f] border border-[#1c2c44] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card - Booking Section */}
          <div className="mt-6 lg:mt-0">
            <div className="bg-[#0d1b2f] border border-[#1c2c44] rounded-xl sm:rounded-2xl p-4 sm:p-6 sticky top-6">
              
              {/* Price */}
              <div className="flex items-end gap-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  ${room?.rate}/hr
                </h2>
                <span className="text-gray-400 mb-1 text-sm sm:text-base">
                  /hour
                </span>
              </div>

              {/* Details */}
              <div className="space-y-4 sm:space-y-5 mt-6 sm:mt-8">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Floor
                  </div>
                  <span>{room?.floor} Floor</span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Capacity
                  </div>
                  <span>Up to {room?.capacity}</span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Rate
                  </div>
                  <span>{room?.rate}</span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Bookings
                  </div>
                  <span>{room?.bookings || 0}</span>
                </div>
              </div>

              {/* Button */}
              <div className="w-full mt-6 sm:mt-8 bg-[#e6983c] hover:bg-[#d98928] py-3 sm:py-4 rounded-xl font-semibold transition text-center">
                <BookingModal room={room} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alllistedroomdeytail;