import { Location } from "@/app/generated/prisma";

interface SortableItineraryProps {
  locations: Location[];
}

export default function SortableItinerary({
  locations,
}: SortableItineraryProps) {
  return (
    <div className='space-y-4'>
      {locations.map((location) => (
        <div key={location.id} className='p-4 bg-white rounded-lg shadow'>
          <h3 className='text-xl font-semibold'>{location.locationTitle}</h3>
          <p>
            {new Date(location.createAt).toLocaleDateString()} -{" "}
            {location.updateAt
              ? new Date(location.updateAt).toLocaleDateString()
              : "Present"}
          </p>
        </div>
      ))}
    </div>
  );
}
