"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function deleteLocation(locationId: string, tripId: string) {
  if (!locationId || !tripId) {
    console.error("Missing locationId or tripId");
    return { success: false, error: "Invalid parameters" };
  }

  try {
    console.log(
      `Attempting to delete location ${locationId} from trip ${tripId}`
    );

    // First check if the location exists and belongs to the trip
    const location = await prisma.location.findFirst({
      where: {
        id: locationId,
        tripId: tripId,
      },
    });

    if (!location) {
      console.log(`Location ${locationId} not found in trip ${tripId}`);
      return { success: false, error: "Location not found" };
    }

    console.log(`Found location: ${location.locationTitle}`);

    // Delete the location
    const deletedLocation = await prisma.location.delete({
      where: {
        id: locationId,
      },
    });

    console.log(
      `Successfully deleted location: ${deletedLocation.locationTitle}`
    );

    // Reorder remaining locations
    const remainingLocations = await prisma.location.findMany({
      where: { tripId },
      orderBy: { order: "asc" },
    });

    console.log(`Remaining locations: ${remainingLocations.length}`);

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
      console.log(`Updated order for ${remainingLocations.length} locations`);
    }

    revalidatePath(`/trips/${tripId}`);
    return { success: true };
  } catch (error) {
    console.error("Delete location error:", error);
    return {
      success: false,
      error: `Failed to delete location: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
