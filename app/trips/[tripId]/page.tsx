import { auth } from "@/auth";
import TripDetailClient from "@/components/trip-detail";
import { prisma } from "@/lib/prisma";

export default async function TripsDetail({params}: {params: Promise<{tripId: string}>}) {
  const {tripId} = await params;
  const session = await auth();

    if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please Sign In.
      </div>
    );
  }

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
      userId: session?.user?.id,
    },
  });

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Trip Not Found.
      </div>
    );
  }

  return <TripDetailClient trip={trip} />;
}
