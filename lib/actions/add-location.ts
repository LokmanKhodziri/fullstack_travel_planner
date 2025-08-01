"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is not configured");
    throw new Error("Geocoding service is not configured");
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "REQUEST_DENIED") {
      console.error("API Key Error:", data.error_message);
      throw new Error("Invalid API key configuration");
    }

    const location = data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw new Error(
      "Failed to geocode address. Please check API key configuration."
    );
  }
}

export async function addLocation(formData: FormData, tripId: string) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Not authenticated!");
    }

    const address = formData.get("address")?.toString();

    if (!address) {
      throw new Error("Address is required!");
    }

    const { latitude, longitude } = await geocodeAddress(address);

    const count = await prisma.location.count({
      where: { tripId },
    });

    await prisma.location.create({
      data: {
        locationTitle: address,
        tripId,
        latitude,
        longitude,
        order: count,
      },
    });

    revalidatePath(`/trips/${tripId}`);
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }

  redirect(`/trips/${tripId}`);
}
