# Development Guide

## Setup

```bash
git clone <repo>
cd fullstack_travel_planner
npm install
cp .env.example .env.local
npx prisma generate
npx prisma db push
npm run dev
```

## Structure

- `app/` - Next.js App Router
- `components/` - React components
- `lib/actions/` - Server actions
- `prisma/` - Database schema

## Workflow

1. Create feature branch
2. Make changes
3. Test locally
4. Commit and push
5. Create PR

## Key Tech

- Next.js 15 + TypeScript
- Prisma + PostgreSQL
- NextAuth.js
- Tailwind CSS
- Google Maps API

## Testing

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Debug

- `npx prisma studio` - Database
- React DevTools - Components
- Network tab - API calls
