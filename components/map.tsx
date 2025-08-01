"use client";

import { Location } from "@/app/generated/prisma";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { it } from "node:test";

interface MapProps {
  itineraries: Location[];
}

export default function Map({ itineraries }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  const center = {
    lat: itineraries.length > 0 ? itineraries[0].latitude : 0,
    lng: itineraries.length > 0 ? itineraries[0].longitude : 0,
  };
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={8}
      center={center}
    >
      {itineraries.map((location) => (
        <Marker
          key={location.id}
          position={{
            lat: location.latitude,
            lng: location.longitude,
          }}
        />
      ))}
    </GoogleMap>
  );
}
