# API Documentation

## Overview

The Travel Planner API is built using Next.js Server Actions and NextAuth.js for authentication. All API endpoints are server-side functions that handle database operations and authentication.

## Authentication

All API endpoints require authentication. The application uses NextAuth.js with the following providers:

- Email/Password (default)
- OAuth providers (configurable)

### Session Management

Sessions are stored in the database using Prisma adapter. Session data includes:

- User ID
- Email
- Authentication provider
- Session expiry

## Server Actions

### Trip Management

#### `createTrip(formData: FormData)`

Creates a new trip for the authenticated user.

**Parameters:**

- `formData` - FormData containing trip details

**Form Fields:**

- `title` (string, required) - Trip title
- `description` (string, required) - Trip description
- `imageUrl` (string, optional) - Trip cover image URL
- `startDate` (string, required) - Trip start date (ISO format)
- `endDate` (string, required) - Trip end date (ISO format)

**Returns:**

- Redirects to `/trips` on success
- Throws error on failure

**Example:**

```typescript
const formData = new FormData();
formData.append("title", "Paris Adventure");
formData.append("description", "Exploring the City of Light");
formData.append("startDate", "2024-06-01");
formData.append("endDate", "2024-06-07");

await createTrip(formData);
```

### Location Management

#### `addLocation(formData: FormData, tripId: string)`

Adds a new location to an existing trip.

**Parameters:**

- `formData` - FormData containing location details
- `tripId` (string) - ID of the trip to add location to

**Form Fields:**

- `address` (string, required) - Location address (will be geocoded)

**Returns:**

- Redirects to trip detail page on success
- Throws error on failure

**Example:**

```typescript
const formData = new FormData();
formData.append("address", "Eiffel Tower, Paris, France");

await addLocation(formData, "trip-id-123");
```

#### `deleteLocation(locationId: string, tripId: string)`

Deletes a location from a trip and reorders remaining locations.

**Parameters:**

- `locationId` (string) - ID of the location to delete
- `tripId` (string) - ID of the trip containing the location

**Returns:**

```typescript
{
  success: boolean;
  error?: string;
}
```

**Example:**

```typescript
const result = await deleteLocation("location-id-123", "trip-id-123");
if (result.success) {
  console.log("Location deleted successfully");
} else {
  console.error("Failed to delete location:", result.error);
}
```

#### `updateLocationOrder(tripId: string, locationIds: string[])`

Updates the order of locations within a trip.

**Parameters:**

- `tripId` (string) - ID of the trip
- `locationIds` (string[]) - Array of location IDs in the desired order

**Returns:**

```typescript
{
  success: boolean;
  error?: string;
}
```

**Example:**

```typescript
const locationIds = ["loc-1", "loc-3", "loc-2"]; // New order
const result = await updateLocationOrder("trip-id-123", locationIds);
```

## Database Models

### User

```typescript
{
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Trip

```typescript
{
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  createAt: Date;
  updateAt?: Date;
}
```

### Location

```typescript
{
  id: string;
  locationTitle: string;
  latitude: number;
  longitude: number;
  tripId: string;
  order: number;
  createAt: Date;
  updateAt?: Date;
}
```

## Error Handling

All server actions follow a consistent error handling pattern:

1. **Validation Errors**: Check required fields and data types
2. **Authentication Errors**: Verify user is logged in and authorized
3. **Database Errors**: Handle Prisma errors gracefully
4. **External API Errors**: Handle geocoding and other external service errors

### Error Response Format

```typescript
{
  success: false;
  error: string; // Human-readable error message
}
```

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production deployments.

## Security Considerations

1. **Authentication**: All endpoints require valid session
2. **Authorization**: Users can only access their own trips and locations
3. **Input Validation**: All inputs are validated server-side
4. **SQL Injection**: Protected by Prisma ORM
5. **XSS**: Protected by Next.js built-in security features

## Environment Variables

Required environment variables for API functionality:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_MAPS_API_KEY="your-api-key"
```

## Testing

API endpoints can be tested using:

- Next.js built-in testing utilities
- Jest for unit tests
- Playwright for integration tests
- Postman for manual testing

## Monitoring

Consider implementing:

- Request logging
- Error tracking (Sentry)
- Performance monitoring
- Database query monitoring
