-- Java 10: Kërkesat për udhëtime dhe sinkronizimi në kohë reale

CREATE TABLE IF NOT EXISTS kerkesat_udhetimit (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  udhetim_id TEXT NOT NULL
    REFERENCES udhetimet(id) ON DELETE CASCADE,

  udhetar_id TEXT NOT NULL
    REFERENCES profilet(github_id) ON DELETE CASCADE,

  statusi TEXT NOT NULL DEFAULT 'pending'
    CHECK (statusi IN ('pending', 'accepted', 'rejected')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (udhetim_id, udhetar_id)
);

CREATE INDEX IF NOT EXISTS idx_kerkesat_udhetimit
ON kerkesat_udhetimit(udhetim_id, statusi);

CREATE INDEX IF NOT EXISTS idx_kerkesat_udhetarit
ON kerkesat_udhetimit(udhetar_id);

-- Kontrollo kërkesat e regjistruara
SELECT * FROM kerkesat_udhetimit
ORDER BY created_at DESC;