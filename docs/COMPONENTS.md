# Component Documentation

## Core Components

### TripDetail (`components/trip-detail.tsx`)

Main trip view with tabs for overview, itinerary, and map.

**Props:**

```typescript
interface TripDetailClientProps {
  trip: TripWithLocations;
}
```

### SortableItinerary (`components/sortable-itinerary.tsx`)

Drag-and-drop location management using `@dnd-kit`.

**Props:**

```typescript
{
  locations: Location[];
}
```

**Features:**

- Drag and drop reordering
- Delete functionality
- Optimistic UI updates

### Map (`components/map.tsx`)

Google Maps integration for location visualization.

**Props:**

```typescript
{
  itineraries: Array<{
    id: string;
    locationTitle: string;
    latitude: number;
    longitude: number;
    order: number;
  }>;
}
```

### NewLocation (`components/new-location.tsx`)

Form for adding new locations with geocoding.

**Props:**

```typescript
{
  tripId: string;
}
```

## UI Components

### Button (`components/ui/button.tsx`)

Reusable button with variants: default, destructive, outline, ghost, link.

### Tabs (`components/ui/tabs.tsx`)

Tabbed interface using Radix UI primitives.

## Component Patterns

### Server Actions Integration

```tsx
const handleDelete = async () => {
  const result = await deleteLocation(location.id, location.tripId);
  if (result.success) {
    await onDelete(location.id);
  }
};
```

### Optimistic Updates

```tsx
const handleDragEnd = (event: DragEndEvent) => {
  setItems(newItems); // Immediate UI update
  updateLocationOrder(tripId, locationIds); // Server update
};
```

### Error Handling

```tsx
try {
  const result = await serverAction();
  if (!result.success) {
    console.error(result.error);
  }
} catch (error) {
  console.error("Unexpected error:", error);
}
```

## TypeScript Types

```typescript
export type TripWithLocations = Trip & {
  locations: {
    id: string;
    tripId: string;
    locationTitle: string;
    latitude: number;
    longitude: number;
    order: number;
  }[];
};
```

## Best Practices

1. Define TypeScript interfaces for all props
2. Use React.memo for expensive components
3. Implement proper error boundaries
4. Include accessibility attributes
5. Write unit tests for complex logic
