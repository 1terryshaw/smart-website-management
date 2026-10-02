-- SMW Leads table for contact form submissions
-- Run against: https://msqiynbhoeruqctaesqk.supabase.co

CREATE TABLE IF NOT EXISTS smw_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT,
  monthly_revenue TEXT,
  message TEXT,
  source TEXT DEFAULT 'smw_website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE smw_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON smw_leads;
CREATE POLICY "service_role_all" ON smw_leads FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ── swm-preview-intake-form-v1 (2026-10-02): Free 7-Day Website Preview intake fields ──
alter table public.smw_leads add column if not exists business_phone text;
alter table public.smw_leads add column if not exists service_area text;
alter table public.smw_leads add column if not exists gbp_url text;
alter table public.smw_leads add column if not exists website_url text;
alter table public.smw_leads add column if not exists business_description text;
alter table public.smw_leads add column if not exists services_offered text;
alter table public.smw_leads add column if not exists assets_link text;
alter table public.smw_leads add column if not exists special_instructions text;
alter table public.smw_leads add column if not exists form_version text;
alter table public.smw_leads add column if not exists is_test boolean;
alter table public.smw_leads add column if not exists review_status text;
alter table public.smw_leads alter column review_status set default 'needs_review';
do $$ begin
  if not exists (select 1 from pg_constraint where conname='smw_leads_review_status_check') then
    alter table public.smw_leads add constraint smw_leads_review_status_check
      check (review_status is null or review_status in ('needs_review','accepted','rejected','rejected_test'));
  end if;
end $$;

-- ── swm-preview-intake-form-v1b (2026-10-02): per-IP rate limit (hashed IP, never raw) + grant hygiene ──
alter table public.smw_leads add column if not exists ip_hash text;
create index if not exists smw_leads_ip_hash_created_at_idx on public.smw_leads (ip_hash, created_at);
revoke select on public.smw_leads from anon, authenticated;
