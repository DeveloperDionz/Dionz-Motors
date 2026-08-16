-- ============================================================
-- Dionz Motors — Supabase schema
-- Run in Supabase Dashboard > SQL Editor
-- ============================================================

-- ---------- PROFILES & ROLES ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer','staff','admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('staff','admin')
  );
$$;

create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''));
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- CARS ----------
create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  make text not null,
  model text not null,
  year int not null,
  price numeric not null,
  mileage int not null default 0,
  fuel_type text not null check (fuel_type in ('Petrol','Diesel','Hybrid','Electric')),
  transmission text not null default 'Automatic',
  body_type text,
  engine text,
  drive text,
  color text,
  location text default 'Nairobi',
  condition text default 'Foreign Used',
  description text,
  features text[] default '{}',
  images text[] default '{}',          -- storage public URLs
  status text not null default 'available' check (status in ('available','reserved','sold','draft')),
  featured boolean not null default false,
  views int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cars enable row level security;
create policy "cars: public read" on public.cars
  for select using (status <> 'draft' or public.is_admin());
create policy "cars: admin write" on public.cars
  for all using (public.is_admin()) with check (public.is_admin());

create index if not exists cars_filter_idx on public.cars (make, year, price, mileage, fuel_type);

create or replace function public.increment_car_views(car_id uuid)
returns void language sql security definer set search_path = public as $$
  update public.cars set views = views + 1 where id = car_id;
$$;

-- ---------- LEADS / INQUIRIES ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  car_id uuid references public.cars(id) on delete set null,
  name text not null,
  email text,
  phone text not null,
  message text,
  type text not null default 'inquiry' check (type in ('inquiry','quote','financing','trade_in','test_drive')),
  status text not null default 'new' check (status in ('new','contacted','qualified','closed_won','closed_lost')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
create policy "leads: anyone can create" on public.leads
  for insert with check (true);
create policy "leads: admin read/manage" on public.leads
  for select using (public.is_admin());
create policy "leads: admin update" on public.leads
  for update using (public.is_admin());

-- ---------- REVIEWS ----------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating int not null check (rating between 1 and 5),
  body text not null,
  car_bought text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
create policy "reviews: public read approved" on public.reviews
  for select using (approved or public.is_admin());
create policy "reviews: anyone can submit" on public.reviews
  for insert with check (approved = false);
create policy "reviews: admin manage" on public.reviews
  for update using (public.is_admin());
create policy "reviews: admin delete" on public.reviews
  for delete using (public.is_admin());

-- ---------- BLOG ----------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  cover_url text,
  tags text[] default '{}',
  published boolean not null default false,
  author text default 'Dionz Motors',
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
create policy "posts: public read published" on public.posts
  for select using (published or public.is_admin());
create policy "posts: admin write" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- STORAGE ----------
insert into storage.buckets (id, name, public) values ('car-images','car-images', true)
on conflict (id) do nothing;

create policy "car-images: public read" on storage.objects
  for select using (bucket_id = 'car-images');
create policy "car-images: admin upload" on storage.objects
  for insert with check (bucket_id = 'car-images' and public.is_admin());
create policy "car-images: admin delete" on storage.objects
  for delete using (bucket_id = 'car-images' and public.is_admin());

-- ---------- PROMOTE YOURSELF TO ADMIN ----------
-- After signing up in the app, run (replace with your email):
-- update public.profiles set role = 'admin'
-- where id = (select id from auth.users where email = 'you@example.com');
