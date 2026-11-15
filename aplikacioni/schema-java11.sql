-- Java 11: Njoftimet brenda aplikacionit

CREATE TABLE IF NOT EXISTS njoftimet (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  kerkesa_id BIGINT NOT NULL UNIQUE
    REFERENCES kerkesat_udhetimit(id) ON DELETE CASCADE,

  perdoruesi_id TEXT NOT NULL
    REFERENCES profilet(github_id) ON DELETE CASCADE,

  titulli TEXT NOT NULL,

  mesazhi TEXT NOT NULL,

  lexuar BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_njoftimet_perdoruesit
ON njoftimet(perdoruesi_id, lexuar, created_at DESC);

-- Kontrollo njoftimet e regjistruara
SELECT * FROM njoftimet
ORDER BY created_at DESC;