"use client";

import { useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  return (
    <div className='flex flex-col items-center min-h-screen justify-center bg-gradient-to-b from-white to-gray-50 p-6'>
      <div className='mx-auto max-w-4xl p-8'>
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className='text-4xl font-bold mb-12'>Globe Page</h1>
          <div className='grid-cols-1 lg:grid-cols-3 gap-8 items-start justify-center'>
            <div className='lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='p-6'>
                <h2 className='text-2xl font-bold mb-4'>Explore the Globe</h2>
                <p className='text-lg text-gray-700'>
                  Discover new places and plan your next adventure.
                </p>
                <div className='h-[600px] w-full relative'>
                  <Globe
                    ref={globeRef}
                    globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                    bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
                    backgroundColor='rgba(0, 0, 0, 0)'
                    pointColor={() => "#ff5733"}
                    pointLabel='name'
                    pointRadius={0.5}
                    pointAltitude={0.1}
                    pointsMerge={true}
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
