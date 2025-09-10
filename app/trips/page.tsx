import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
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
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href={"/trips/new"}>
          <Button>New Trips</Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Welcome back, {session.user?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {trips.length === 0
              ? "No trips found. Start by creating a new trip!"
              : `You have ${trips.length} trip${
                  trips.length > 1 ? "s" : ""
                } planned. 
          ${
            upcomingTrips.length > 0
              ? `${upcomingTrips.length} of which are upcoming.`
              : ""
          }`}
          </p>
        </CardContent>
      </Card>
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Recent Trips</h2>
        {trips.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center text-center py-8">
              <h3 className="text-xl font-medium mb-2">
                No recent trips found.
              </h3>
              <p className="text-center mb-5 max-w-md">
                Start planning your adventure by creating a new trip!
              </p>
              <Link href={"/trips/new"}>
                <Button>Create Trips</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTrips.slice(0, 3).map((trip, key) => (
              <Link href={`/trips/${trip.id}`} key={key}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2">{trip.description}</p>
                    <p>
                      Start Date:{" "}
                      {new Date(trip.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      End Date: {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                    <Button variant="outline" className="mt-2">
                        View Trip
                      </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
