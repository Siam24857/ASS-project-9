"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Allrooms from "./Allrooms";
import { API_URL } from "../lib/config";

export default function StudyRoomSearch() {
  const [data, setData] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ NEW: price state
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });

  // Fetch Rooms - FIXED amenity URL
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let url;
        if (selectedAmenity) {
          // FIXED: Use correct endpoint for amenity filtering
          url = `${process.env.NEXT_PUBLIC_API_URL}/rooms/amenity/${selectedAmenity}`;
        } else {
          url = `${process.env.NEXT_PUBLIC_API_URL}/rooms`;
        }
        
        const res = await fetch(url);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, [selectedAmenity]);

  // Amenity filter - FIXED to work properly
  const handleFilter = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedAmenity(value);
    } else {
      setSelectedAmenity("");
    }
  };

  // Search
  const SearchBarHandle = (e) => {
    setSearchTerm(e.target.value);
  };

  // Price input change
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Clear all
  const clearFilters = () => {
    setSelectedAmenity("");
    setSearchTerm("");
    setPrice({ min: "", max: "" });
  };

  // ✅ FINAL FILTER LOGIC (search + price) - amenity is handled by API now
  const filteredData = data.filter((room) => {
    const matchName = room.roomName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const roomRate = Number(room.rate || 0);

    const matchMin = price.min ? roomRate >= Number(price.min) : true;
    const matchMax = price.max ? roomRate <= Number(price.max) : true;

    return matchName && matchMin && matchMax;
  });

  const amenities = [
    { label: "Whiteboard" },
    { label: "Projector" },
    { label: "Wi-Fi" },
    { label: "Power Outlets" },
    { label: "Quiet Zone" },
    { label: "Air Conditioning" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0f1c2e] px-10 py-12">

      {/* Heading */}
      <h1 className="text-5xl font-bold text-white">
        Available Study Rooms
      </h1>

      {/* Search */}
      <div className="relative max-w-3xl mt-8 mb-10">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={searchTerm}
          onChange={SearchBarHandle}
          placeholder="Search by room name..."
          className="w-full bg-[#111f33] border border-gray-700 rounded-xl py-4 pl-14 pr-4 text-white"
        />
      </div>

      <div className="flex gap-9">

        {/* LEFT FILTER */}
        <div className="w-[260px]">
          <div className="sticky top-6 rounded-2xl bg-[#0f1724] p-6 text-white border border-white/10">

            {/* Header */}
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={clearFilters} className="text-orange-400">
                Clear all
              </button>
            </div>

            {/* Amenities */}
            <div className="mb-7">
              <h3 className="mb-3">Amenities</h3>

              {amenities.map((item) => (
                <label key={item.label} className="flex gap-3 mb-3">
                  <input
                    type="checkbox"
                    value={item.label}
                    checked={selectedAmenity === item.label}
                    onChange={handleFilter}
                  />
                  {item.label}
                </label>
              ))}
            </div>

            {/* 🔥 PRICE FILTER (NEW) */}
            <div>
              <h3 className="mb-3 font-semibold">Hourly Rate ($)</h3>

              <div className="flex gap-2">
                <input
                  type="number"
                  name="min"
                  placeholder="Min"
                  value={price.min}
                  onChange={handlePriceChange}
                  className="w-full p-2 bg-[#111f33] rounded"
                />

                <span className="text-gray-400">to</span>

                <input
                  type="number"
                  name="max"
                  placeholder="Max"
                  value={price.max}
                  onChange={handlePriceChange}
                  className="w-full p-2 bg-[#111f33] rounded"
                />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT DATA */}
        <div className="grid grid-cols-3 gap-6 flex-1">
          {filteredData.map((da) => (
            <Allrooms key={da._id} da={da} />
          ))}

          {filteredData.length === 0 && (
            <div className="text-gray-400 col-span-full text-center">
              No rooms found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}