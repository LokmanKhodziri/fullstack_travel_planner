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

// Create a SortableItem component
function SortableItem({ location }: { location: Location }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: location.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='p-4 bg-white rounded-lg shadow cursor-move'
    >
      <h3 className='text-xl font-semibold'>{location.locationTitle}</h3>
      <p>
        {new Date(location.createAt).toLocaleDateString()} -{" "}
        {location.updateAt
          ? new Date(location.updateAt).toLocaleDateString()
          : "Present"}
      </p>
    </div>
  );
}

// Update main component with drag and drop functionality
interface SortableItineraryProps {
  locations: Location[];
}

export default function SortableItinerary({
  locations,
}: SortableItineraryProps) {
  const [items, setItems] = useState(locations);
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className='space-y-4'>
          {items.map((location) => (
            <SortableItem key={location.id} location={location} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
