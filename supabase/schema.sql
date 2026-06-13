-- ============================================================
-- EMPLEOON — Schema de base de datos
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- Tabla principal de vacantes
CREATE TABLE IF NOT EXISTS jobs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  company         TEXT NOT NULL,
  company_logo    TEXT,
  company_url     TEXT,

  -- Clasificación
  category        TEXT NOT NULL CHECK (category IN (
    'programacion','data-analytics','diseno-ux','mobile',
    'devops-cloud-qa','producto-pm','marketing-digital','ventas',
    'customer-support','operaciones-admin','finanzas-contabilidad','legal-compliance'
  )),
  seniority       TEXT NOT NULL CHECK (seniority IN ('junior','semi-senior','senior','lead','staff')),
  contract_type   TEXT NOT NULL CHECK (contract_type IN ('full-time','part-time','freelance','contrato')),
  language        TEXT NOT NULL CHECK (language IN ('espanol','ingles','bilingue')),

  -- Salario (opcional)
  salary_min      INTEGER,
  salary_max      INTEGER,
  salary_currency TEXT DEFAULT 'USD',

  -- Ubicación
  location        TEXT NOT NULL DEFAULT 'Remoto',
  is_remote       BOOLEAN NOT NULL DEFAULT true,

  -- Contenido
  description     TEXT NOT NULL,
  requirements    TEXT[] NOT NULL DEFAULT '{}',
  benefits        TEXT[],
  tags            TEXT[] NOT NULL DEFAULT '{}',
  apply_url       TEXT NOT NULL,

  -- Estado
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  is_active       BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  published_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS jobs_category_idx ON jobs(category);
CREATE INDEX IF NOT EXISTS jobs_is_active_idx ON jobs(is_active);
CREATE INDEX IF NOT EXISTS jobs_published_at_idx ON jobs(published_at DESC);
CREATE INDEX IF NOT EXISTS jobs_is_featured_idx ON jobs(is_featured);
CREATE INDEX IF NOT EXISTS jobs_seniority_idx ON jobs(seniority);

-- Full-text search en español
CREATE INDEX IF NOT EXISTS jobs_fts_idx ON jobs
  USING GIN(to_tsvector('spanish', title || ' ' || company || ' ' || description));

-- Tabla de suscriptores a newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL UNIQUE,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla de vacantes patrocinadas (monetización futura)
CREATE TABLE IF NOT EXISTS sponsored_slots (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id     UUID REFERENCES jobs(id) ON DELETE CASCADE,
  position   TEXT NOT NULL DEFAULT 'banner', -- banner | top_listing | email
  starts_at  TIMESTAMPTZ NOT NULL,
  ends_at    TIMESTAMPTZ NOT NULL,
  amount_usd NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Banco de candidatos (CVs cargados para futura base de datos de talento)
CREATE TABLE IF NOT EXISTS candidates (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  category      TEXT NOT NULL CHECK (category IN (
    'programacion','data-analytics','diseno-ux','mobile',
    'devops-cloud-qa','producto-pm','marketing-digital','ventas',
    'customer-support','operaciones-admin','finanzas-contabilidad','legal-compliance'
  )),
  seniority     TEXT NOT NULL CHECK (seniority IN ('junior','semi-senior','senior','lead','staff')),
  linkedin_url  TEXT,
  portfolio_url TEXT,
  cv_url        TEXT NOT NULL,
  message       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS candidates_category_idx ON candidates(category);
CREATE INDEX IF NOT EXISTS candidates_created_at_idx ON candidates(created_at DESC);

-- Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Política: cualquiera puede leer vacantes activas
CREATE POLICY "jobs_public_read" ON jobs
  FOR SELECT USING (is_active = true);

-- Política: solo service_role puede insertar/actualizar
CREATE POLICY "jobs_admin_write" ON jobs
  FOR ALL USING (auth.role() = 'service_role');

-- Política: cualquiera puede suscribirse al newsletter
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Política: cualquiera puede postular su CV (insert), solo admin puede leer
CREATE POLICY "candidates_public_insert" ON candidates
  FOR INSERT WITH CHECK (true);

CREATE POLICY "candidates_admin_read" ON candidates
  FOR SELECT USING (auth.role() = 'service_role');

-- ============================================================
-- Storage bucket para CVs
-- ============================================================
-- Crear el bucket "cvs" como privado (no público) desde:
-- Supabase Dashboard > Storage > New bucket > "cvs" > Public: OFF
--
-- Políticas de storage (ejecutar después de crear el bucket):
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', false)
ON CONFLICT (id) DO NOTHING;

-- Cualquiera puede subir su CV (insert), nadie puede leer salvo admin
CREATE POLICY "cvs_public_upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "cvs_admin_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'cvs' AND auth.role() = 'service_role');

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Datos de ejemplo (opcional, borrar en producción)
-- ============================================================
INSERT INTO jobs (slug, title, company, category, seniority, contract_type, language,
                  salary_min, salary_max, location, is_remote, description, requirements,
                  benefits, tags, apply_url, is_featured)
VALUES (
  'senior-backend-engineer-stripe-2024',
  'Senior Backend Engineer',
  'Stripe',
  'programacion',
  'senior',
  'full-time',
  'ingles',
  5000, 9000,
  'Remoto LATAM',
  true,
  'Stripe está buscando un Senior Backend Engineer para unirse a nuestro equipo de pagos. Trabajarás en la infraestructura que procesa millones de transacciones por día.',
  ARRAY['5+ años de experiencia en backend', 'Dominio de Ruby o Go', 'Experiencia con sistemas distribuidos', 'Inglés avanzado (B2+)'],
  ARRAY['Stock options', 'Health insurance', 'Home office', 'Learning budget USD 2.000/año'],
  ARRAY['Ruby', 'Go', 'Distributed Systems', 'Payments'],
  'https://stripe.com/jobs',
  true
);
