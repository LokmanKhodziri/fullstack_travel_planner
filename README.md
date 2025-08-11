# 🌍 Fullstack Travel Planner

A modern, full-stack travel planning application built with Next.js 15, TypeScript, and Prisma.

## ✨ Features

- **🔐 Authentication**: Secure user authentication with NextAuth.js
- **🗺️ Interactive Maps**: Google Maps integration for location visualization
- **🌐 3D Globe**: Interactive globe view using react-globe.gl
- **📝 Trip Management**: Create, edit, and organize travel plans
- **📍 Location Management**: Add and manage trip destinations
- **🔄 Drag & Drop**: Sortable itineraries with drag-and-drop functionality
- **📱 Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Maps API key

### Installation

1. **Clone and install dependencies**

   ```bash
   git clone <your-repo-url>
   cd fullstack_travel_planner
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure in `.env.local`:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/travel_planner"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
   ```

3. **Set up database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── trips/             # Trip pages
│   └── globe/             # 3D globe view
├── components/            # React components
│   ├── ui/               # UI components
│   ├── trip-detail.tsx   # Trip detail view
│   └── sortable-itinerary.tsx # Drag & drop
├── lib/                  # Utilities
│   ├── actions/          # Server actions
│   └── prisma.ts         # Database client
└── prisma/               # Database schema
```

## 🗄️ Database Schema

- **User**: Authentication and user management
- **Trip**: Travel plans with metadata
- **Location**: Destinations within trips
- **Account/Session**: NextAuth.js authentication

## 🔧 API Endpoints

### Server Actions

- `createTrip()` - Create new trip
- `addLocation()` - Add location to trip
- `deleteLocation()` - Remove location
- `updateLocationOrder()` - Reorder locations

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy automatically

## 🛠️ Development

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run ESLint
```

## 📝 License

MIT License

---

Built with ❤️ using Next.js, TypeScript, and Prisma
