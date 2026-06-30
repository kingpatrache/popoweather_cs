create extension if not exists pgcrypto;

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  login_id text unique not null,
  display_name text not null,
  role text not null check (role in ('admin', 'staff')),
  password_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists cs_records (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references app_users(id),
  customer_name text,
  category text not null,
  product_name text,
  raw_note text not null,
  generated_answer text not null,
  final_answer text not null,
  model_name text,
  status text not null default '생성 완료',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace view cs_records_view as
select
  r.*,
  u.display_name,
  u.login_id
from cs_records r
left join app_users u on r.created_by = u.id;

insert into app_users (login_id, display_name, role, password_hash, is_active)
values
('0000', '관리자', 'admin', crypt('1234', gen_salt('bf')), true),
('0001', '직원 0001', 'staff', crypt('1234', gen_salt('bf')), true)
on conflict (login_id) do nothing;
