# Travel Planner Documentation

## Quick Start

1. **Setup**

   ```bash
   git clone <repo>
   cd fullstack_travel_planner
   npm install
   cp .env.example .env.local
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

2. **Environment Variables**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/travel_planner"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_MAPS_API_KEY="your-api-key"
   ```

## Documentation

- **[API](./API.md)** - Server actions and database models
- **[Components](./COMPONENTS.md)** - React components and patterns
- **[Development](./DEVELOPMENT.md)** - Local development guide
- **[Deployment](./DEPLOYMENT.md)** - Deployment instructions

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Server Actions, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: NextAuth.js
- **Maps**: Google Maps API

## Structure

```
├── app/                    # Next.js App Router
├── components/            # React components
├── lib/actions/          # Server actions
├── prisma/               # Database schema
└── docs/                 # Documentation
```

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Run ESLint
npx prisma studio # Database GUI
```
