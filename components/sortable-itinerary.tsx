import { Location } from "@/app/generated/prisma";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { deleteLocation } from "@/lib/actions/delete-location";
import { updateLocationOrder } from "@/lib/actions/update-location-order";
import { Button } from "./ui/button";

// Create a SortableItem component
function SortableItem({
  location,
  onDelete,
}: {
  location: Location;
  onDelete: (id: string) => Promise<void>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: location.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = async () => {
    try {
      const result = await deleteLocation(location.id, location.tripId);
      if (result.success) {
        await onDelete(location.id);
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      // You might want to show a toast notification here
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{location.locationTitle}</h3>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        className="ml-4">
        Delete
      </Button>
    </div>
  );
}

// Update main component with drag and drop functionality
export default function SortableItinerary({
  locations,
}: {
  locations: Location[];
}) {
  const [items, setItems] = useState(locations);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDelete = async (deletedId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== deletedId));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update the database with the new order
        const locationIds = newItems.map((item) => item.id);
        updateLocationOrder(items[0]?.tripId || "", locationIds)
          .then((result) => {
            if (!result.success) {
              console.error("Failed to update location order:", result.error);
              // Optionally revert the local state if the server update failed
            }
          })
          .catch((error) => {
            console.error("Error updating location order:", error);
          });

        return newItems;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {items.map((location) => (
            <SortableItem
              key={location.id}
              location={location}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
