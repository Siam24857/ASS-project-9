import React from 'react';
import Fewcourse from './Fewcourse';
import { API_URL } from '@/app/lib/config';

export const dynamic = 'force-dynamic';

const Somecouerse = async () => {
    let data = [];
    try {
      const res = await fetch(`${API_URL}/home`, { cache: 'no-store' });
      if (res.ok) {
        data = await res.json();
      }
    } catch (err) {
      console.error('Failed to load home rooms:', err);
    }

    return (
        <div className='bg-[#071320]'>
          <div className='p-4 sm:p-6 md:p-8 lg:p-12 space-y-3 sm:space-y-4'>
            
            <p className='text-xl sm:text-2xl font-bold px-2 sm:px-0'>
              Available Now
            </p>
            
            <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold px-2 sm:px-0'>
              Latest Study Rooms
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6">
              {
                data.map(da => <Fewcourse key={da._id} da={da}></Fewcourse>)
              }
            </div>
            
          </div>
        </div>
    );
};

export default Somecouerse;