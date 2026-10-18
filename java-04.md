# RideShare — Java 4 · Neon dhe PostgreSQL



## Çfarë ndërtova
 Shpjego si lista dhe detajet i lexojnë udhëtimet nga Neon.
  E lidha aplikacionin me databazën Neon. Lista përdor lexoUdhetimet() për t’i lexuar udhëtimet, ndërsa faqja e detajeve përdor gjejUdhetimin(id) për ta gjetur udhëtimin sipas ID-së.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
 Ndryshova orën e ID 2 nga 08:15 në 08:25 në SQL Editor.
Shkruaj çfarë tregoi lista dhe çfarë treguan detajet pas rifreskimit.
Ktheje orën në 08:15 dhe provo përsëri.
 Pas ndryshimit, lista dhe detajet duhet të tregojnë 08:25.
  Pastaj e ktheva në 08:15 dhe e rifreskova aplikacionin për ta verifikuar.

### Prova 2: Lista bosh dhe rikthimi
 Shtova WHERE false vetëm te pyetja e lexoUdhetimet.
Shkruaj mesazhin që u shfaq. Hoqe WHERE false dhe u kthyen tri kartat?
Me WHERE false, lista duhet të jetë bosh.
 Pasi e hoqa dhe e rifreskova aplikacionin, duhet të kthehen tri kartat.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
 Ndryshova përkohësisht emrin DATABASE_URL në .env.local,
rinisa serverin dhe shënova mesazhin. Riktheva emrin dhe rinisa serverin.
Shkruaj a punoi sërish; a mungon .env.local në listën e GitHub Desktop?
Kur variabla mungon, aplikacioni duhet të shfaqë mesazhin se udhëtimet nuk mundën të ngarkohen. Pas rikthimit të DATABASE_URL dhe rinisjes, lidhja duhet të funksionojë përsëri. .env.local duhet të jetë i përjashtuar nga Git.

## Ku gjendet puna
 Shëno schema.sql, skedarët që ndryshove dhe linkun e repository-t.
Nëse punon në Vercel, shto linkun e aplikacionit (opsional këtë javë).
aplikacioni/schema.sql, aplikacioni/src/lib/db.ts, aplikacioni/src/lib/udhetimet.ts, aplikacioni/src/app/page.tsx, aplikacioni/src/app/udhetimi/[id]/page.tsx dhe aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx.

Repository: https://github.com/blendakrasniqi6/rideshare-mobile

## Çfarë mbetet për përmirësim
 Një kufizim ose gabim dhe hapi yt i ardhshëm.
Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real.
Rezervimet nuk ruhen në databazë. Hapi i ardhshëm është krijimi i rezervimeve reale dhe përditësimi i vendeve të lira.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
 Nuk përdora AI.
