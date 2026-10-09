# RideShare — Java 4 · Neon dhe PostgreSQL

Ruaje këtë skedar si java-04.md pranë README, jashtë aplikacioni/.
Plotëso të gjitha përgjigjet; hiqi shenjat [PLOTËSO].
Mos vendos DATABASE_URL, pamje të kredencialeve ose të dhëna reale.

## Çfarë ndërtova
 Shpjego si lista dhe detajet i lexojnë udhëtimet nga Neon.
Lista dhe faqet e detajeve tani i lexojnë udhëtimet nga databaza PostgreSQL në Neon. Krijova lidhjen private me Neon në src/lib/db.ts dhe funksionet lexoUdhetimet dhe gjejUdhetimin në src/lib/udhetimet.ts. Faqja kryesore dhe faqet e detajeve përdorin këto funksione për t'i marrë të dhënat nga databaza.

Lista dhe faqet e detajeve tani i lexojnë udhëtimet nga databaza PostgreSQL në Neon. Krijova lidhjen private me Neon në `lib/db.ts` dhe funksionet `lexoUdhetimet` dhe `gjejUdhetimin` në `lib/udhetimet.ts`. Faqja kryesore dhe faqet e detajeve përdorin këto funksione për t'i marrë të dhënat nga databaza, në vend që t'i lexojnë vetëm nga të dhëna statike.
## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
E ndryshova orën e udhëtimit me ID 2 nga 08:15 në 08:25 në Neon SQL Editor dhe pas rifreskimit kontrollova që ora e re shfaqej në listë dhe në detaje, pastaj e ktheva në 08:15.


### Prova 2: Lista bosh dhe rikthimi
Shtova përkohësisht WHERE false te funksioni lexoUdhetimet dhe kontrollova listën bosh, pastaj e hoqa kushtin dhe verifikova që udhëtimet shfaqeshin përsëri.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
Ndryshova përkohësisht emrin e DATABASE_URL në .env.local, rinisa serverin dhe kontrollova gabimin, pastaj e riktheva emrin e saktë dhe verifikova lidhjen me databazën.

## Ku gjendet puna
 Shëno schema.sql, skedarët që ndryshove dhe linkun e repository-t.
Nëse punon në Vercel, shto linkun e aplikacionit (opsional këtë javë).
Skema e databazës gjendet te `aplikacioni/schema.sql`. Lidhja me Neon dhe funksionet për leximin e udhëtimeve gjenden te `aplikacioni/lib/db.ts` dhe `aplikacioni/lib/udhetimet.ts`. Faqja kryesore gjendet te `aplikacioni/app/page.tsx`, ndërsa faqet e detajeve dhe kërkesës gjenden te `aplikacioni/app/udhetimi/[id]/page.tsx` dhe `aplikacioni/app/udhetimi/[id]/kerkesa/page.tsx`.
Repository: https://github.com/blendakrasniqi6/rideshare-mobile

## Çfarë mbetet për përmirësim
 Një kufizim ose gabim dhe hapi yt i ardhshëm.
Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real.
Kërkesa për udhëtim me statusin “Në pritje” mbetet simulim dhe nuk krijon ende një rezervim real në databazë. Hapi i ardhshëm është krijimi i funksionalitetit për ruajtjen e kërkesave dhe menaxhimin e vendeve të lira në mënyrë të sigurt.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
 Çfarë ndihme more dhe çfarë verifikove vetë, ose: Nuk përdora AI.

 Përdora inteligjencën artificiale për të kuptuar integrimin e Next.js me Neon, kurse verifikova vete konfigurimin e lidhjes, kodin dhe sjelljen e aplikacionit gjatë testimit.
