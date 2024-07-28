import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function AgentDetail({ listingDetail }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex flex-col md:flex-row gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6'>
      <div className='flex items-center gap-6'>
        <Image
          src={listingDetail?.profileImage || '/placeholder.svg'}
          alt='profileImage'
          width={60}
          height={60}
          className='rounded-full'
        />
        <div>
          <h2 className='text-lg font-bold'>{listingDetail?.fullName}</h2>
          <h2 className='text-gray-500'>{listingDetail?.createdBy}</h2>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-2 w-full md:w-auto'>
        <Button className={`w-full ${isMobile ? '' : 'md:w-auto'}`}>Send Message</Button>
      </div>
    </div>
  );
}

export default AgentDetail;
