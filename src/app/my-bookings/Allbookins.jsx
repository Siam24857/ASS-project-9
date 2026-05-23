"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "../lib/config";
import { authClient } from "../lib/auth-client";


const Allbookins = () => {
    const [cancelledBookingId, setCancelledBookingId] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const {data, error} = await authClient.token();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
          {
            cache: "no-store",
            headers: {
              authorization: `Bearer ${data.token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch bookings:", res.status);
          setBookings([]);
          return;
        }

        const datas = await res.json();

        if (Array.isArray(datas)) {
          setBookings(datas);
        } else {
          console.error("API did not return an array:", datas);
          setBookings([]);
        }
      } catch (error) {
        console.log(error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

   
  const handleCancel = async(id) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const {data, error} = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings-deleting/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Failed to cancel booking:", res.status);
        return;
      }

      const datas = await res.json();
      if(datas){
        setCancelledBookingId(id);
        setTimeout(() => {
          setBookings(prevBookings => prevBookings.filter(booking => booking._id !== id));
          setCancelledBookingId(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : null;
    if (!date || isNaN(date)) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  
  return (
    <div>
      <div className="min-h-screen bg-[#07111F] text-white p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              My Bookings
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2">
              View and manage your study room reservations
            </p>
          </div>

          {/* BOOKINGS */}
          {bookings.length === 0 ? (
            <div className="text-center text-gray-400 py-12 sm:py-20 text-sm sm:text-base">
              No bookings found
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-[#0D1B2A] border border-[#1E3550] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0"
                >
                  {/* LEFT SECTION */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    
                    {/* IMAGE */}
                    <div className="relative w-full sm:w-[120px] h-[200px] sm:h-[85px] rounded-xl overflow-hidden bg-gray-800 sm:self-start">
                      {booking.image && (
                        <Image
                          src={booking.image}
                          alt={booking.roomName || "Room"}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-bold">
                        {booking.roomName}
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base">
                        {booking.floor}
                      </p>

                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-300">
                        <span>📅 {formatDate(booking.date)}</span>
                        <span>🕒 {booking.startTime} – {booking.endTime}</span>
                        <span>💲 ${booking.totalCost}.00 total</span>
                      </div>

                      <p className="italic text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3">
                        Note: {booking.specialNote || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-3 md:gap-4 mt-2 md:mt-0">
                    {cancelledBookingId === booking._id ? (
                      <span className="px-3 sm:px-4 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/20 text-xs sm:text-sm">
                        ✕ Cancelled
                      </span>
                    ) : (
                      <>
                        <span className="px-3 sm:px-4 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 text-xs sm:text-sm">
                          ● Confirmed
                        </span>

                        <button
                          onClick={() => handleCancel(booking._id)}
                          disabled={isLoading}
                          className="border border-red-500/30 text-red-400 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl hover:bg-red-500/10 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                          ✕ Cancel
                        </button>
                      </>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Allbookins;