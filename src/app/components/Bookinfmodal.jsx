"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { API_URL } from "../lib/config";
import { authClient } from "../lib/auth-client";

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 8;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export default function RoomBookingModal({ room }) {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");

  const hourlyRate = Number(room?.rate?.replace(/[^0-9]/g, ""));

  const endTimeOptions = useMemo(() => {
    if (!startTime) return [];
    const startIndex = TIME_SLOTS.indexOf(startTime);
    return TIME_SLOTS.filter((_, index) => index > startIndex);
  }, [startTime]);

  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const startHour = Number(startTime.split(":")[0]);
    const endHour = Number(endTime.split(":")[0]);
    return (endHour - startHour) * hourlyRate;
  }, [startTime, endTime, hourlyRate]);

  const today = new Date().toISOString().split("T")[0];
  const isBookingValid = date && startTime && endTime;

  const getDateTime = (time) => {
    return new Date(`${date}T${time}:00`);
  };

  const handleBooking = async () => {
    if (!isBookingValid) return;

    const startDateTime = getDateTime(startTime);
    const endDateTime = getDateTime(endTime);

    const bookingData = {
      id: room?._id,
      roomName: room?.roomName || room?.name,
      roomRate: room?.rate,
      date,
      createdAt: new Date(),
      startDateTime,
      endDateTime,
      startTime,
      endTime,
      totalCost,
      specialNote: note,
      image: room.image,
      floor: room.floor,
      capacity: room.capacity,
      amenities: room.amenities,
      rate: room.rate
    };

    try {
      const { data, error } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const datas = await res.json();
      console.log("Booking Data:", bookingData);

      if (datas) {
        toast.success("Booking Successfully", {
          position: "top-center",
        });
        setDate("");
        setStartTime("");
        setEndTime("");
        setNote("");
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Booking Failed", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {/* Open Modal Button - Responsive */}
      <button
        onClick={() => setOpenModal(true)}
        className="rounded-xl bg-orange-500 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 font-semibold text-white transition hover:bg-orange-600 text-sm sm:text-base w-full sm:w-auto"
      >
        Book Now
      </button>

      {/* Modal - Fully Responsive */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-md mx-2 sm:mx-0 rounded-2xl border border-white/10 bg-[#0B1627] shadow-2xl animate-in fade-in zoom-in duration-200"
               style={{
                 maxHeight: '90vh',
                 overflowY: 'auto'
               }}
          >
            {/* Scrollable Content */}
            <div className="p-4 sm:p-5 md:p-6">
              {/* Close Button - Responsive positioning */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Header - Responsive Typography */}
              <div className="pr-6 sm:pr-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-words">
                  Book {room?.roomName || room?.name}
                </h2>
                <p className="mt-1 sm:mt-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400">
                  Select a date and time slot to reserve this room.
                </p>
              </div>

              {/* Form Fields - Responsive spacing */}
              <div className="space-y-4 sm:space-y-5">
                {/* Date Input */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                    Select Date *
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-orange-400 bg-[#101D31] px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                    Start Time *
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                      setEndTime("");
                    }}
                    className="w-full rounded-xl border border-white/10 bg-[#101D31] px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  >
                    <option value="">Select start time</option>
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                    End Time *
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    disabled={!startTime}
                    className="w-full rounded-xl border border-white/10 bg-[#101D31] px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  >
                    <option value="">Select end time</option>
                    {endTimeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total Cost - Responsive Card */}
                <div className="rounded-xl border border-orange-400/20 bg-orange-500/10 p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm sm:text-base">Total Cost</span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">
                      ${totalCost}
                    </span>
                  </div>
                </div>

                {/* Special Notes */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                    Special Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Special notes..."
                    className="w-full rounded-xl border border-white/10 bg-[#101D31] px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base resize-y focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                {/* Action Buttons - Responsive Layout */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2 sm:pt-3">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="rounded-xl border border-white/20 hover:bg-white/10 px-4 sm:px-5 py-2.5 sm:py-3 text-white text-sm sm:text-base transition-all w-full sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleBooking}
                    disabled={!isBookingValid}
                    className="rounded-xl bg-orange-500 hover:bg-orange-600 px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}