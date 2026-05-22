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
        <div className='bg-[#071320] '>
        <div className='  p-12 space-y-3'>
            <p className='text-2xl font-bold'>Available Now</p>
            <h3 className='text-4xl font-bold'>Latest Study Rooms</h3>
         <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"  >
            {
                data.map(da => <Fewcourse key={da._id} da={da}></Fewcourse>)
            }
            </div>
        </div>
        </div>
    );
};

export default Somecouerse;