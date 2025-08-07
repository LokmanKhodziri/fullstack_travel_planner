"use client";

import { useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  return (
    <main className='min-h-screen bg-gradient-to-b from-white to-gray-50'>
      <div className='container mx-auto px-6 py-12'>
        <header className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent'>
            Interactive World Globe
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Explore and discover destinations across the globe
          </p>
        </header>

        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Globe Container */}
          <div className='lg:col-span-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
            <div className='aspect-square relative'>
              <Globe
                ref={globeRef}
                globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
                backgroundColor='rgba(255,255,255,0)'
                showAtmosphere={true}
                atmosphereColor='#4299e1'
                atmosphereAltitude={0.15}
                width={800}
                height={800}
              />
            </div>
          </div>

          {/* Stats Panel */}
          <div className='lg:col-span-4 space-y-6'>
            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
              <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
                Statistics
              </h2>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Total Destinations</span>
                  <span className='text-blue-600 font-semibold'>0</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Countries Visited</span>
                  <span className='text-blue-600 font-semibold'>0</span>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
              <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
                Recent Places
              </h2>
              <div className='space-y-3'>
                <p className='text-gray-600'>
                  Interact with the globe to explore destinations
                </p>
                <ul className='space-y-2 text-gray-600'>
                  {/* Add your recent places list here */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
