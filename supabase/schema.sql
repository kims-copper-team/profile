-- Supabase SQL Editor에서 실행하세요

-- 이력서/경력기술서 데이터 (key-value 형태로 JSON 저장)
create table if not exists site_data (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- 방문자 로그
create table if not exists visitor_logs (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(),
  ip text not null,
  page text not null,
  ua text not null default '',
  ref text not null default ''
);

create index if not exists visitor_logs_ts_idx on visitor_logs (ts desc);
create index if not exists visitor_logs_ip_idx on visitor_logs (ip);

-- RLS 비활성화 (서비스 롤 키로만 접근)
alter table site_data disable row level security;
alter table visitor_logs disable row level security;
