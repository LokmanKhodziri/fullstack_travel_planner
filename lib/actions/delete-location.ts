"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function deleteLocation(locationId: string, tripId: string) {
  if (!locationId || !tripId) {
    console.error("Missing locationId or tripId");
    return { success: false, error: "Invalid parameters" };
  }

  // First check if the location exists and belongs to the trip
  const location = await prisma.location.findFirst({
    where: {
      id: locationId,
      tripId: tripId,
    },
  });

  if (!location) {
    return { success: false, error: "Location not found" };
  }

  // Delete the location
  const deletedLocation = await prisma.location.delete({
    where: {
      id: locationId,
    },
  });

  // Reorder remaining locations
  const remainingLocations = await prisma.location.findMany({
    where: { tripId },
    orderBy: { order: "asc" },
  });

  // Update order for remaining locations
  if (remainingLocations.length > 0) {
    await Promise.all(
      remainingLocations.map((loc, index) =>
        prisma.location.update({
          where: { id: loc.id },
          data: { order: index },
        })
      )
    );
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true };
}
