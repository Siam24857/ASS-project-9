"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Allrooms from "./Allrooms";
import { API_URL } from "../lib/config";

const Allromshaldelpage = () => {
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
        <div>
            <div className="w-full min-h-screen bg-[#0f1c2e] px-3 sm:px-4 md:px-6 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        Available Study Rooms
      </h1>

      {/* Search */}
      <div className="relative max-w-full sm:max-w-2xl md:max-w-3xl mt-5 sm:mt-6 md:mt-7 lg:mt-8 mb-6 sm:mb-7 md:mb-8 lg:mb-10">
        <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
        <input
          value={searchTerm}
          onChange={SearchBarHandle}
          placeholder="Search by room name..."
          className="w-full bg-[#111f33] border border-gray-700 rounded-xl py-3 sm:py-4 pl-10 sm:pl-14 pr-4 text-white text-sm sm:text-base"
        />
      </div>

      {/* Main Content - Flex Column on Mobile, Row on Desktop */}
      <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 md:gap-7 lg:gap-9">

        {/* LEFT FILTER - Mobile: Full width, Desktop: Fixed width */}
        <div className="w-full lg:w-[260px]">
          <div className="sticky top-6 rounded-xl sm:rounded-2xl bg-[#0f1724] p-4 sm:p-5 md:p-6 text-white border border-white/10">

            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">Filters</h2>
              <button onClick={clearFilters} className="text-orange-400 text-sm sm:text-base">
                Clear all
              </button>
            </div>

            {/* Amenities */}
            <div className="mb-5 sm:mb-6 md:mb-7">
              <h3 className="mb-2 sm:mb-3 text-sm sm:text-base font-medium">Amenities</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
                {amenities.map((item) => (
                  <label key={item.label} className="flex gap-2 sm:gap-3 items-center text-sm sm:text-base">
                    <input
                      type="checkbox"
                      value={item.label}
                      checked={selectedAmenity === item.label}
                      onChange={handleFilter}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* 🔥 PRICE FILTER */}
            <div>
              <h3 className="mb-2 sm:mb-3 font-semibold text-sm sm:text-base">Hourly Rate ($)</h3>

              <div className="flex gap-2">
                <input
                  type="number"
                  name="min"
                  placeholder="Min"
                  value={price.min}
                  onChange={handlePriceChange}
                  className="w-full p-2 sm:p-2.5 bg-[#111f33] rounded text-sm sm:text-base"
                />

                <span className="text-gray-400 text-sm sm:text-base">to</span>

                <input
                  type="number"
                  name="max"
                  placeholder="Max"
                  value={price.max}
                  onChange={handlePriceChange}
                  className="w-full p-2 sm:p-2.5 bg-[#111f33] rounded text-sm sm:text-base"
                />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT DATA - Responsive Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {filteredData.map((da) => (
              <Allrooms key={da._id} da={da} />
            ))}

            {filteredData.length === 0 && (
              <div className="text-gray-400 col-span-full text-center py-8 sm:py-10 md:py-12 text-sm sm:text-base">
                No rooms found
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
        </div>
    );
};

export default Allromshaldelpage;