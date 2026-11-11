-- Java 9: Tabela e udhetimeve te preferuara

CREATE TABLE IF NOT EXISTS udhetimet_preferuara (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  github_id TEXT NOT NULL
    REFERENCES profilet(github_id) ON DELETE CASCADE,

  udhetim_id TEXT NOT NULL
    REFERENCES udhetimet(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_udhetim_perdorues
    UNIQUE (github_id, udhetim_id)
);

-- Indeks per lexim me te shpejte
CREATE INDEX IF NOT EXISTS idx_preferuara_github
ON udhetimet_preferuara(github_id);

-- Kontrollo tabelen
SELECT * FROM udhetimet_preferuara;