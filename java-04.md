# RideShare — Java 4 · Neon dhe PostgreSQL

Ruaje këtë skedar si java-04.md pranë README, jashtë aplikacioni/.
Plotëso të gjitha përgjigjet; hiqi shenjat [PLOTËSO].
Mos vendos DATABASE_URL, pamje të kredencialeve ose të dhëna reale.


## Çfarë ndërtova

Lista dhe faqet e detajeve tani i lexojnë udhëtimet nga databaza PostgreSQL në Neon. Krijova lidhjen private me Neon në `lib/db.ts` dhe funksionet `lexoUdhetimet` dhe `gjejUdhetimin` në `lib/udhetimet.ts`. Faqja kryesore dhe faqet e detajeve përdorin këto funksione për t'i marrë të dhënat nga databaza.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

Ndryshova orën e udhëtimit me ID 2 nga 08:15 në 08:25 në Neon SQL Editor. Pas rifreskimit, kontrollova nëse ora e re shfaqej në listën e udhëtimeve dhe në faqen e detajeve. Pastaj e riktheva orën në 08:15 dhe rifreskova të dyja faqet për të verifikuar gjendjen fillestare.

### Prova 2: Lista bosh dhe rikthimi

Shtova përkohësisht `WHERE false` vetëm te pyetja SQL e funksionit `lexoUdhetimet`. Kontrollova mesazhin që shfaqej kur lista ishte bosh. Pastaj e hoqa `WHERE false`, e ruajta skedarin dhe rifreskova faqen për të kontrolluar nëse u kthyen tri kartat e udhëtimeve.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Ndryshova përkohësisht emrin e variablës `DATABASE_URL` në `.env.local`, ndalova dhe rinisa serverin dhe kontrollova mesazhin e gabimit. Pastaj e riktheva emrin `DATABASE_URL`, rinisa serverin dhe kontrollova nëse aplikacioni u lidh përsëri me databazën. Kontrollova gjithashtu që `.env.local` të mos përfshihej në skedarët për commit në GitHub Desktop.

## Ku gjendet puna

Skedari `schema.sql` gjendet në folderin `aplikacioni/`. Skedarët kryesorë të ndryshuar janë `lib/db.ts`, `lib/udhetimet.ts`, faqja kryesore `app/page.tsx`, faqja e detajeve `app/udhetimi/[id]/page.tsx`, faqja e kërkesës `app/udhetimi/[id]/kerkesa/page.tsx` dhe komponenti `components/KartaUdhetimi.tsx`. U përditësuan gjithashtu `package.json`, `package-lock.json` dhe `.gitignore`.

Repository: [(https://github.com/blendakrasniqi6/rideshare-mobile)]

## Çfarë mbetet për përmirësim

Kërkesa për udhëtim me statusin “Në pritje” mbetet simulim. Aplikacioni nuk ka ende rezervim real, autentikim të përdoruesve ose sistem për menaxhimin e rezervimeve. Hapi i ardhshëm është shtimi i funksionalitetit të rezervimit dhe ruajtja e kërkesave në databazë.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për ndihmë në konfigurimin e lidhjes me Neon.
Verifikova vetë konfigurimin, ekzekutimin e aplikacionit dhe rezultatet e provave në databazë.