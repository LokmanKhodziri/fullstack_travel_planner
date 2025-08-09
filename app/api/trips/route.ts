import { auth } from "@/auth";
import { getCountyFromCordinates } from "@/lib/actions/geocode";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface PrismaLocation {
  locationTitle: string;
  latitude: number;
  longitude: number;
  trip: {
    title: string;
  };
}

export interface TransformedLocation {
  name: string;
  latitude: number;
  longitude: number;
  county?: string;
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user?.id,
        },
      },
      select: {
        locationTitle: true,
        latitude: true,
        longitude: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transformedLocations: TransformedLocation[] = await Promise.all(
      locations.map(
        async (location: PrismaLocation): Promise<TransformedLocation> => {
          const geocodeResult = await getCountyFromCordinates(
            location.latitude,
            location.longitude
          );
          return {
            name: `${location.trip.title} - ${geocodeResult?.formattedAddress}`,
            latitude: location.latitude,
            longitude: location.longitude,
            county: geocodeResult?.county,
          };
        }
      )
    );

    return NextResponse.json(transformedLocations);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
