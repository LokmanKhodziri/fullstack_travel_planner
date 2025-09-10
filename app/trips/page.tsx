import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { CalendarIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TripsPage() {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const sortedTrips = [...trips].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter((trip) => {
    return new Date(trip.startDate) >= today;
  });

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please Sign In.
      </div>
    );
  }

  return (
    <div className="space-y-8 container mx-auto px-4 py-10">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <Link href={"/trips/new"}>
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            New Trip
          </Button>
        </Link>
      </header>

      <section>
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome back, {session.user?.name}!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {trips.length === 0
                ? "You have no trips planned. Get started by creating a new one."
                : `You have ${trips.length} trip${
                    trips.length > 1 ? "s" : ""
                  } in total. 
              ${
                upcomingTrips.length > 0
                  ? `You have ${upcomingTrips.length} upcoming trip${
                      upcomingTrips.length > 1 ? "s" : ""
                    }.`
                  : ""
              }`}
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Recent Trips</h2>
        {trips.length === 0 ? (
          <Card className="flex flex-col items-center justify-center text-center py-12">
            <CardContent>
              <h3 className="text-xl font-medium mb-2">No trips yet!</h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                It looks like you haven't planned any trips. Click the button
                below to create your first one.
              </p>
              <Link href={"/trips/new"}>
                <Button>Create a New Trip</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTrips.slice(0, 3).map((trip) => (
              <Link href={`/trips/${trip.id}`} key={trip.id}>
                <Card className="h-full flex flex-col hover:border-blue-500 transition-colors duration-200">
                  <div className="relative h-40 w-full">
                    {trip.imageUrl ? (
                      <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    ) : (
                      <div className="h-full bg-gray-200 flex items-center justify-center rounded-t-lg">
                        <p className="text-gray-500">Image Placeholder</p>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-1">
                      {trip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-gray-600 line-clamp-2 flex-grow">
                      {trip.description}
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {new Date(trip.startDate).toLocaleDateString()} -{" "}
                          {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
