import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const Allrooms = ({da}) => {
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
              <div>
                            <div className="bg-[#111c2e] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10 h-full flex flex-col">
            
                  {/* Image */}
                  <div className="relative w-full h-48 sm:h-56 md:h-64">
                    <Image
                      src={image}
                      alt={roomName}
                      fill
                      className="object-cover"
                    />
            
                    <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-orange-500 text-white px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {bookings} Bookings
                    </div>
                  </div>
            
                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
            
                    {/* Title */}
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white line-clamp-1">
                      {roomName}
                    </h2>
            
                    {/* Floor & Capacity */}
                    <div className="flex items-center justify-between text-gray-400 mt-2 sm:mt-3 text-xs sm:text-sm">
                      <span>{floor}</span>
                      <span>{capacity}</span>
                    </div>
            
                    {/* Description */}
                    <p className="text-gray-300 mt-3 sm:mt-4 md:mt-5 leading-relaxed text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                      {description?.slice(0, 70)}...
                    </p>
            
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-5">
                      {amenities?.slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="bg-orange-950/40 text-orange-400 border border-orange-500/20 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                      {amenities?.length > 3 && (
                        <span className="bg-orange-950/40 text-orange-400 border border-orange-500/20 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                          +{amenities.length - 3}
                        </span>
                      )}
                    </div>
            
                    {/* Bottom */}
                    <div className="flex items-center justify-between mt-auto pt-4 sm:pt-5 md:pt-6 lg:pt-8">
            
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">
                          ${rate}/hr
                        </h3>
            
                        <p className="text-gray-400 text-xs sm:text-sm">
                          per hour
                        </p>
                      </div>
            
                      <Link href={`/roomdettails/${da._id}`}>
                        <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base">
                          View details
                        </button>
                      </Link>
            
                    </div>
                  </div>
                </div>
                    </div>
        </div>
    );
};

export default Allrooms;