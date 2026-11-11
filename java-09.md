# RideShare – Java 9

## Çfarë ndërtova?

Gjatë kësaj jave implementova funksionalitetin për ruajtjen e udhëtimeve te të preferuarat në aplikacionin RideShare.

Shtova butonin **“Ruaj te të preferuarat”** në secilën kartë të udhëtimit. Kur përdoruesi klikon butonin, ndërfaqja përditësohet menjëherë dhe shfaq mesazhin **“Duke u ruajtur...”**. Pas ruajtjes së suksesshme, butoni shfaq gjendjen **“✓ E preferuar”**.

Gjithashtu implementova përditësimin optimist të ndërfaqes, trajtimin e gabimeve dhe mundësinë për të provuar përsëri në rast të dështimit të ruajtjes.

Në databazën Neon krijova tabelën `udhetimet_preferuara`, e cila ruan lidhjen ndërmjet përdoruesit dhe udhëtimit të preferuar.

## Provat që bëra

### Prova 1: Ruajtja e suksesshme mbetet pas rifreskimit.

E testova ruajtjen e një udhëtimi te të preferuarat. Pas klikimit, butoni ndryshoi gjendjen dhe shfaqi **“✓ E preferuar”**. Pas rifreskimit të faqes, udhëtimi vazhdoi të shfaqej si i preferuar.

**Rezultati: Prova përfundoi me sukses.**

### Prova 2: Gabimi i serverit nuk lë një sukses të rremë në ekran.

Implementova dhe kontrollova trajtimin e gabimeve gjatë ruajtjes. Në rast të dështimit të kërkesës, aplikacioni e kthen butonin në gjendjen e mëparshme dhe shfaq mesazhin **“Ruajtja dështoi. U kthye gjendja e mëparshme.”**.

Gjithashtu përdoruesi ka mundësi të klikojë **“Provo përsëri”** për ta përsëritur ruajtjen.

**Rezultati: Prova përfundoi me sukses.**

### Prova 3: Klikimet e përsëritura nuk krijojnë kopje.

E implementova parandalimin e ruajtjeve të dyfishta. Butoni çaktivizohet gjatë procesit të ruajtjes dhe pasi udhëtimi ruhet me sukses.

Në databazë përdora kufizimin unik `unique_udhetim_perdorues` dhe komandën `ON CONFLICT DO NOTHING`, në mënyrë që i njëjti përdorues të mos krijojë disa kopje të të njëjtit udhëtim.

**Rezultati: Prova përfundoi me sukses.**

## Skedarët e krijuar dhe ndryshuar

- `aplikacioni/schema-java09.sql`
- `aplikacioni/src/lib/preferuarat.ts`
- `aplikacioni/src/app/api/preferuara/route.ts`
- `aplikacioni/src/components/ButoniPreferuar.tsx`
- `aplikacioni/src/components/KartaUdhetimi.tsx`
- `aplikacioni/src/app/page.tsx`

## Kontrollimi i projektit

Ekzekutova komandën `npm run build` në folderin `aplikacioni`. Build-i përfundoi me sukses, pa gabime gjatë kompajlimit dhe kontrollimit të tipeve. Gjithashtu u njohën rrugët e reja të aplikacionit, përfshirë `/api/preferuara`.

## Çfarë mbetet për përmirësim?

Në të ardhmen mund të shtohet mundësia për largimin e një udhëtimi nga lista e të preferuarave, si dhe një faqe e veçantë ku përdoruesi mund t'i shohë të gjitha udhëtimet e ruajtura.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Gjatë zhvillimit përdora ndihmën e AI për të kuptuar dhe implementuar funksionalitetin e ruajtjes së udhëtimeve të preferuara, krijimin e API-së, lidhjen me databazën, përditësimin optimist të ndërfaqes dhe trajtimin e gabimeve.

Kodet e përgatitura i vendosa në projektin tim dhe kontrollova funksionimin e aplikacionit dhe përfundimin me sukses të komandës `npm run build`.