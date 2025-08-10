"use client";

import { useState, useRef, useEffect } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { TransformedLocation } from "../api/trips/route";

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("/api/trips");
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data: TransformedLocation[] = await response.json();

        setLocations(data);

        const countries = new Set<string>(
          data
            .map((location) => location.county)
            .filter((county): county is string => !!county)
        );

        setVisitedCountries(countries);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    // This effect should run after the globe is rendered (i.e., when isLoading is false)
    if (!isLoading && globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, [isLoading]);

  const renderVisitedCountries = () => {
    if (visitedCountries.size === 0) {
      return (
        <p className='text-gray-600'>You haven't visited any countries yet.</p>
      );
    }

    return (
      <ul className='space-y-2 text-gray-600 max-h-60 overflow-y-auto pr-2'>
        {Array.from(visitedCountries)
          .sort()
          .map((country) => (
            <li
              key={country}
              className='bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors'
            >
              {country}
            </li>
          ))}
      </ul>
    );
  };

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

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          {/* Globe Container */}
          <div className='lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border overflow-hidden'>
            {isLoading ? (
              <div className='flex items-center justify-center h-full min-h-[600px]'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
              </div>
            ) : (
              <Globe
                ref={globeRef}
                globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
                bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
                backgroundColor='rgba(255,255,255,0)'
                showAtmosphere={true}
                atmosphereColor='#4299e1'
                atmosphereAltitude={0.15}
                width={900}
                height={600}
              />
            )}
          </div>

          {/* Stats Panel */}
          <div className='lg:col-span-1 space-y-6'>
            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
              <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
                Statistics
              </h2>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Total Destinations</span>
                  <span className='text-blue-600 font-semibold'>
                    {locations.length}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>Countries Visited</span>
                  <span className='text-blue-600 font-semibold'>
                    {visitedCountries.size}
                  </span>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
              <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
                Visited Countries
              </h2>
              <div className='space-y-3'>{renderVisitedCountries()}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
