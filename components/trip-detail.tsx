"use client";

import { Trip } from "@/app/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface TripDetailClientProps {
    trip: Trip;
  }

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
        {trip.imageUrl && (
            <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
                <Image src={trip.imageUrl} alt={trip.title} className="object-cover" fill priority/>
            </div>
        )}
        <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{trip.title}</h1>
                <div className="flex items-center text-gray-600 mb-6">
                    <Calendar className="w-6 h-6 mr-2" />
                    <span className="text-lg">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <div>
                <Link href={`trips/${trip.id}/itinerary/new`} className="text-blue-600 hover:underline">
                    <Button><Plus className="w-6 h-6 mr-2"/>Add Location</Button>
                </Link>
            </div>
        </div>
    </div>
  );
}