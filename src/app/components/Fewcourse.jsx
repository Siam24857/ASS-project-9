import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Fewcourse = ({da}) => {

      const {
    roomName,
    bookings,
    floor,
    capacity,
    description,
    amenities,
    rate,
    image
  } = da
    return (
        <div>
               <div className="bg-[#111c2e] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10">

      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={image}
          alt={roomName}
          fill
          className="object-cover"
        />

        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-orange-500 text-white px-2 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
          {bookings} Bookings
        </div>
      </div>

   
      <div className="p-4 sm:p-5 md:p-6">
 
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          {roomName}
        </h2>
 
        <div className="flex items-center justify-between text-gray-400 mt-2 sm:mt-3 text-xs sm:text-sm">
          <span>{floor}</span>
          <span>{capacity}</span>
        </div>
 
        <p className="text-gray-300 mt-3 sm:mt-5 leading-relaxed text-sm sm:text-base">
          {description ? `${description.slice(0, 70)}...` : "No description"}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-5">
          {(amenities || []).map((item, index) => (
            <span
              key={index}
              className="bg-orange-950/40 text-orange-400 border border-orange-500/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold"
            >
              {item}
            </span>
          ))}
        </div>

      
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mt-6 sm:mt-8">

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-400">
              ${rate}/hr
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm">
              per hour
            </p>
          </div>

          <Link href={`/roomdettails/${da._id}`}>
            <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base w-full sm:w-auto">
              View details
            </button>
          </Link>  

        </div>
      </div>
    </div>
        </div>
    );
};

export default Fewcourse;