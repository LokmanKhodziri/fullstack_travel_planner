## Problem Solving & Troubleshooting

### Prisma Client Runtime Error

**Error:**

```
Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
```

**Solution:**

1. Run:
   ```bash
   npx prisma generate
   ```
2. Import PrismaClient from the correct path:
   ```ts
   import { PrismaClient } from "@/app/generated/prisma/client";
   ```

---

### Next.js <Image> Component: Missing 'alt' Prop

**Error:**

```
Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images.
```

**Solution:**
Add an `alt` prop to your `<Image>` component:

```tsx
<Image src="/logo.png" alt="Logo" />
```

---

### Next.js <Link> Component: Missing 'href' Prop

**Error:**

```
Property 'href' is missing in type '{ children: Element; }' but required in type 'InternalLinkProps'.
```

**Solution:**
Add an `href` prop to your `<Link>` component:

```tsx
<Link href="/">...</Link>
```

---

### Incorrect DATABASE_URL Format in .env

**Problem:**
The `DATABASE_URL` in `.env` was incorrectly set as:

```
DATABASE_URL=psql 'postgresql://...'
```

**Solution:**
It should be:

```
DATABASE_URL=postgresql://...
```

Remove `psql '` from the start and the closing `'` at the end. Only the URL string should be present.

If you follow these steps, the above errors should be resolved. For further issues, check your environment variables, import paths, and component props for correctness.
