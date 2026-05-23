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

  // Convert "$11/hr" => 11
  const hourlyRate = Number(room?.rate?.replace(/[^0-9]/g, ""));

  // End Time Options
  const endTimeOptions = useMemo(() => {
    if (!startTime) return [];
    const startIndex = TIME_SLOTS.indexOf(startTime);
    return TIME_SLOTS.filter((_, index) => index > startIndex);
  }, [startTime]);

  // Total Cost
  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;

    const startHour = Number(startTime.split(":")[0]);
    const endHour = Number(endTime.split(":")[0]);

    return (endHour - startHour) * hourlyRate;
  }, [startTime, endTime, hourlyRate]);

  const today = new Date().toISOString().split("T")[0];

  const isBookingValid = date && startTime && endTime;

  // Convert to real DateTime
  const getDateTime = (time) => {
    return new Date(`${date}T${time}:00`);
  };

  // Handle Booking
  const handleBooking = async () => {
    if (!isBookingValid) return;

    const startDateTime = getDateTime(startTime);
    const endDateTime = getDateTime(endTime);

   const bookingData = {
  id: room?._id,

  roomName: room?.roomName || room?.name,
  roomRate: room?.rate,

  // Booking date selected by user
  date,

  // Current date/time when booking created
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
       const {data, error} = await authClient.token()
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

        // Reset form
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
      {/* Open Modal Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Book Now
      </button>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1627] p-6 shadow-2xl">

            {/* Close */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-white">
              Book {room?.roomName || room?.name}
            </h2>

            <p className="mt-2 mb-6 text-sm text-gray-400">
              Select a date and time slot to reserve this room.
            </p>

            {/* Date */}
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mb-5 rounded-xl border border-orange-400 bg-[#101D31] px-4 py-3 text-white"
            />

            {/* Start Time */}
            <select
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setEndTime("");
              }}
              className="w-full mb-5 rounded-xl border border-white/10 bg-[#101D31] px-4 py-3 text-white"
            >
              <option value="">Select start time</option>
              {TIME_SLOTS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            {/* End Time */}
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={!startTime}
              className="w-full mb-5 rounded-xl border border-white/10 bg-[#101D31] px-4 py-3 text-white disabled:opacity-50"
            >
              <option value="">Select end time</option>
              {endTimeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            {/* Total Cost */}
            <div className="mb-5 rounded-xl border border-orange-400/20 bg-orange-500/10 p-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Cost</span>
                <span className="text-2xl font-bold text-orange-400">
                  ${totalCost}
                </span>
              </div>
            </div>

            {/* Note */}
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Special notes..."
              className="w-full mb-6 rounded-xl border border-white/10 bg-[#101D31] px-4 py-3 text-white"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border px-5 py-3 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleBooking}
                className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}