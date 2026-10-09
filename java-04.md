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
 Ndryshova orën e ID 2 nga 08:15 në 08:25 në SQL Editor.
Shkruaj çfarë tregoi lista dhe çfarë treguan detajet pas rifreskimit.
Ktheje orën në 08:15 dhe provo përsëri.

Në Neon SQL Editor ndryshova orën e udhëtimit me ID 2 nga 08:15 në 08:25. Pas rifreskimit kontrollova nëse lista dhe faqja e detajeve shfaqnin orën e re nga databaza. Në fund, e ktheva orën në 08:15 për ta ruajtur gjendjen fillestare.

### Prova 2: Lista bosh dhe rikthimi
 Shtova WHERE false vetëm te pyetja e lexoUdhetimet.
Shkruaj mesazhin që u shfaq. Hoqe WHERE false dhe u kthyen tri kartat?
Në funksionin `lexoUdhetimet` shtova përkohësisht kushtin `WHERE false` për të simuluar një listë pa udhëtime. Kontrollova nëse aplikacioni shfaqte gjendjen për listë bosh. Pastaj e hoqa kushtin, e rifreskova aplikacionin dhe kontrollova nëse kartat e udhëtimeve u shfaqën përsëri.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
 Ndryshova përkohësisht emrin DATABASE_URL në .env.local,
rinisa serverin dhe shënova mesazhin. Riktheva emrin dhe rinisa serverin.
Shkruaj a punoi sërish; a mungon .env.local në listën e GitHub Desktop?
Në skedarin `.env.local` ndryshova përkohësisht emrin e variablës `DATABASE_URL` për të kontrolluar sjelljen e aplikacionit kur mungon konfigurimi i lidhjes. Pas rinisjes së serverit kontrollova rezultatin dhe më pas e riktheva emrin e saktë të variablës. E rinisa serverin përsëri dhe kontrollova nëse aplikacioni lidhej me databazën. Gjithashtu kontrollova që `.env.local` të mos përfshihej në ndryshimet që do të dërgoheshin në GitHub.

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
