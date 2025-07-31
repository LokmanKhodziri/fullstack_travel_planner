"use client";

export default function NewLocationClient({ tripId }: { tripId: string }) {
  return (
    <div className='min-h[calc(100vh-8rem)] flex items-center justify-center bg-gray-50'>
      <div className='bg-white mx-auto rounded-lg shadow-md w-full max-w-md'>
        <div className='bg-white p-8 shadow-lg rounded-lg'>
          <h1 className='text-2xl font-bold text-centermb-6'>
            Add New Location to Trip
          </h1>
          <form action='' className='space-y-6'></form>
          <div>
            <label htmlFor=''>Address</label>
          </div>
        </div>
      </div>
    </div>
  );
}
