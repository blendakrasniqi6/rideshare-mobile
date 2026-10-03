# Java 03 – Kartat dhe faqet

Ushtrimi i Javës 3 për RideShare. Raporti qëndron pranë README, jashtë `aplikacioni/`.

## Prova 1: Lista me 3 karta në telefon


Lista u shfaq në pamje mobile me tri karta dhe nuk pati lëvizje horizontale gjatë përdorimit normal.

## Prova 2: Detajet, zero vende, ID 99

Klikimi te karta **2** → URL `/udhetimi/2` dhe **vendtakimi** i lexueshëm; karta **3** → «Nuk ka vende të lira» i çaktivizuar; `/udhetimi/99` → faqja **«Udhëtimi nuk u gjet»** me lidhje te lista.

**Shënim për mua:** Provo të tre rastet dhe shkruaj një fjali çfarë pate (ose çfarë nuk punoi).

## Prova 3: Simulim dhe kthimi mbrapa

Karta 2 hapi /udhetimi/2 dhe shfaqi vendtakimin, karta 3 tregoi "Nuk ka vende të lira" me buton të çaktivizuar, ndërsa /udhetimi/99 shfaqi "Udhëtimi nuk u gjet".

## Nisja e projektit

```bash
cd aplikacioni
npm run dev
```

Hap `http://localhost:3000`.
