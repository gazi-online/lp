create table if not exists public.customer_profiles (
  id bigserial primary key,
  full_name text not null,
  mobile_number text not null unique,
  whatsapp_number text not null,
  address text not null,
  alternate_phone_number text,
  google_uid text,
  email text,
  updated_at timestamptz not null default now()
);

create table if not exists public.pvc_orders (
  id bigserial primary key,
  customer_id bigint not null references public.customer_profiles(id) on delete cascade,
  card_type text not null,
  delivery_mode text not null check (delivery_mode in ('manual', 'google')),
  order_status text not null default 'submitted',
  payment_status text not null default 'pending',
  photo_uploaded boolean not null default false,
  document_uploaded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
