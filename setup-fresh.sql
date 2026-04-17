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
