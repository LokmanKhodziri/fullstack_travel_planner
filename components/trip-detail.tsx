"use client";

import { Trip } from "@/app/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useState } from "react";
import Map from "./map";
import SortableItinerary from "./sortable-itinerary";

export type TripWithLocations = Trip & {
  locations: {
    id: string;
    tripId: string;
    locationTitle: string;
    latitude: number;
    longitude: number;
    order: number;
  }[];
};

interface TripDetailClientProps {
  trip: TripWithLocations;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      {trip.imageUrl && (
        <div className='w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative'>
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className='object-cover'
            fill
            priority
          />
        </div>
      )}
      <div className='bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div>
          <h1 className='text-3xl font-extrabold text-gray-800 mb-2'>
            {trip.title}
          </h1>
          <div className='flex items-center text-gray-600 mb-6'>
            <Calendar className='w-6 h-6 mr-2' />
            <span className='text-lg'>
              {new Date(trip.startDate).toLocaleDateString()} -{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div>
          <Link
            href={`/trips/${trip.id}/itinerary/new`}
            className='text-blue-600 hover:underline'
          >
            <Button>
              <Plus className='w-6 h-6 mr-2' />
              Add Location
            </Button>
          </Link>
        </div>
      </div>

      <div className='bg-white p-6 shadow rounded-lg'>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='mb-6'>
            <TabsTrigger
              value='overview'
              className='text-lg font-semibold w-full'
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value='itinerary'
              className='text-lg font-semibold w-full'
            >
              Itinerary
            </TabsTrigger>
            <TabsTrigger value='map' className='text-lg font-semibold w-full'>
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>
            <div>
              <h2 className='text-xl font-semibold mb-4'>Overview</h2>
              <div>
                <div className='flex items-start'>
                  <Calendar className='h-6 w-6 mr-3 text-gray-500' />
                  <div className='text-gray-700'>
                    <p className='font-medium text-gray-700'>Dates</p>
                    <p className='text-sm text-gray-500'>
                      {new Date(trip.startDate).toLocaleDateString()} -{" "}
                      {new Date(trip.endDate).toLocaleDateString()}
                      <br />
                      {`${
                        Math.round(
                          trip.endDate.getTime() - trip.startDate.getTime()
                        ) /
                        (1000 * 60 * 60 * 24)
                      } days`}
                    </p>
                  </div>
                </div>
                <div className='flex items-start mt-4'>
                  <MapPin className='h-6 w-6 mr-3 text-gray-500' />
                  <data value=''>
                    <p>Destinations</p>
                    <p>
                      {trip.locations.length} location
                      {trip.locations.length > 1 ? "s" : ""}
                    </p>
                  </data>
                </div>
              </div>
              <p className='text-gray-500 mt-4 leading-relaxed'>
                {trip.description}
              </p>
            </div>
          </TabsContent>
          <TabsContent value='itinerary'>
            <div className='space-y-6'>
              {trip.locations.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg'>
                  <h2 className='text-xl text-gray-500 mb-4'>
                    No locations added yet.
                  </h2>
                  <Link
                    href={`/trips/${trip.id}/itinerary/new`}
                    className='text-blue-600 hover:underline'
                  >
                    <Button>
                      <Plus className='w-5 h-5 mr-2' />
                      Add Your First Location
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-semibold'>Full Itinerary</h2>
                    <Link
                      href={`/trips/${trip.id}/itinerary/new`}
                      className='text-blue-600 hover:underline'
                    >
                      <Button size='sm'>
                        <Plus className='w-4 h-4 mr-2' />
                        Add Location
                      </Button>
                    </Link>
                  </div>

                  <div className='mt-4'>
                    <SortableItinerary
                      locations={trip.locations.map((loc) => ({
                        id: loc.id,
                        locationTitle: loc.locationTitle,
                        tripId: trip.id,
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        order: loc.order,
                        createAt: new Date(),
                        updateAt: null,
                      }))}
                    />
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          <TabsContent value='map'>
            <div className='h-72 rounded-lg overflow-hidden'>
              <h2 className='text-xl font-semibold mb-4'>Map</h2>
              <Map
                itineraries={trip.locations.map((loc, idx) => ({
                  ...loc,
                  order: idx,
                  createAt: new Date(),
                  updateAt: new Date(),
                }))}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className='text-center text-gray-500 text-sm mt-8'>
        <Link href={`/trips/`} className='text-blue-600 hover:underline'>
          <Button>Back to Trip Overview</Button>
        </Link>
      </div>
    </div>
  );
}
