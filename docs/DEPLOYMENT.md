# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

## Environment Variables

Create `.env.production`:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

## Database Setup

### Option 1: Vercel Postgres

- Create in Vercel dashboard
- Automatically adds DATABASE_URL

### Option 2: External Database

- **Supabase**: Free tier, easy setup
- **PlanetScale**: MySQL-compatible
- **Railway**: Simple PostgreSQL hosting

### Run Migrations

```bash
npx prisma generate
npx prisma db push
```

## Alternative Platforms

### Railway

1. Connect GitHub repository
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy automatically

### Netlify

1. Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. Deploy via Netlify dashboard

## Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Authentication works
- [ ] Database operations function
- [ ] Maps and APIs work
- [ ] SSL certificate is valid
- [ ] Performance is acceptable

## Troubleshooting

### Common Issues

1. **Build Failures**: Clear cache with `rm -rf .next`
2. **Database Connection**: Verify DATABASE_URL format
3. **Environment Variables**: Check all variables are set
4. **Authentication**: Verify NEXTAUTH_SECRET and NEXTAUTH_URL

### Debug Commands

```bash
npm run build
npm run start
npx prisma db pull
```
