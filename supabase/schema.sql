create extension if not exists pgcrypto;

create table if not exists public.configurator_plans (
  id uuid primary key default gen_random_uuid(),
  session_code text not null,
  name text not null,
  selections jsonb not null,
  total integer not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_configurator_plans_session
  on public.configurator_plans (session_code, created_at desc);

alter table public.configurator_plans enable row level security;

create policy "anon can read plans by session"
  on public.configurator_plans
  for select
  to anon
  using (true);

create policy "anon can insert plans"
  on public.configurator_plans
  for insert
  to anon
  with check (true);
