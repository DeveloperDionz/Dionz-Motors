# Dionz Motors — Digital Showroom

A sleek, mobile-first car dealership website for the Kenyan market.
**Frontend:** React + Vite, styled 100% with Tailwind CSS.
**Backend:** Supabase (PostgreSQL + Row Level Security, Auth with roles, Storage for car imagery).

## Features

**Public site**
- Hero landing page with dual CTAs (Browse Cars / Get a Quote) and animated stats
- Search & filter: make, model keyword, year, max price, max mileage, fuel type + sorting
- Inventory cards with thumbnails, KES prices and quick specs
- Car detail pages: multi-image gallery, spec grid, features, financing calculator, inquiry form, WhatsApp deep links
- Financing page with reducing-balance loan calculator and FAQ
- Customer reviews, trust badges, SEO blog with article pages
- Sticky glassmorphism navbar, floating WhatsApp chat widget
- Light/dark mode toggle (persisted), scroll-reveal animations, fully responsive

**Admin (`/admin`)**
- Supabase Auth sign-in with role gate (only `staff`/`admin` profiles get in)
- Dashboard analytics: stock value, lead pipeline, most-viewed listings
- Inventory CRUD with image upload to the `car-images` storage bucket
- Lead tracking with status pipeline (new → contacted → qualified → won/lost)
- Content management: publish/unpublish blog posts, approve/reject reviews

## Running locally

```bash
npm install
npm run dev
```

Without Supabase keys the site runs in **demo mode** with realistic seed data.
Demo admin login: `admin@dionzmotors.co.ke` / `demo1234`

## Connecting Supabase (go live)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Copy `.env.example` to `.env` and fill in your Project URL + anon key
   (Dashboard → Settings → API).
4. Sign up a user via Supabase Auth (Dashboard → Authentication → Add user),
   then promote it:
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'you@example.com');
   ```
5. Restart the dev server. All forms, inventory edits, image uploads and the
   admin dashboard now read/write live Postgres data under RLS policies.

## Security model

- Anonymous visitors: read published cars/posts/approved reviews; can insert leads & (unapproved) reviews.
- `staff`/`admin` roles (checked via the `public.is_admin()` SQL function): full CRUD on cars, leads, posts, reviews, and storage uploads.
- All enforcement happens in Postgres RLS — the anon key is safe to ship to browsers.
# Dionz-Motors
