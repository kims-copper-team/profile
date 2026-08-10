-- Supabase SQL Editor에서 실행하세요

-- 이력서/경력기술서 데이터 (key-value 형태로 JSON 저장)
create table if not exists site_data (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- 방문자 로그 (ip는 클라이언트 사이드에서 수집 불가하여 제거)
create table if not exists visitor_logs (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(),
  page text not null,
  ua text not null default '',
  ref text not null default ''
);

create index if not exists visitor_logs_ts_idx on visitor_logs (ts desc);

-- RLS 활성화
alter table site_data enable row level security;
alter table visitor_logs enable row level security;

-- site_data: 누구나 읽기 가능, 로그인한 사용자만 쓰기 가능
create policy "site_data_public_read" on site_data
  for select using (true);

create policy "site_data_auth_write" on site_data
  for all using (auth.role() = 'authenticated');

-- visitor_logs: 누구나 기록 가능, 로그인한 사용자만 조회 가능
create policy "visitor_logs_anon_insert" on visitor_logs
  for insert with check (true);

create policy "visitor_logs_auth_select" on visitor_logs
  for select using (auth.role() = 'authenticated');
