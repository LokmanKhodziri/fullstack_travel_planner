"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function updateLocationOrder(
  tripId: string,
  locationIds: string[]
) {
  try {
    // Update the order for each location
    await Promise.all(
      locationIds.map((locationId, index) =>
        prisma.location.update({
          where: {
            id: locationId,
            tripId: tripId, // Ensure the location belongs to the trip
          },
          data: {
            order: index,
          },
        })
      )
    );

    revalidatePath(`/trips/${tripId}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Failed to update location order: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
