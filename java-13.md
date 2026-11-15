
# RideShare — Java 13

## Çfarë ndërtova

Këtë javë u fokusova në performancën dhe testimin e aplikacionit RideShare në pajisjet mobile.

Në faqen kryesore optimizova leximin e të dhënave nga databaza Neon duke përdorur `Promise.all()`. Kjo mundëson që lista e udhëtimeve dhe lista e udhëtimeve të preferuara të lexohen paralelisht, në vend që njëra të presë përfundimin e tjetrës.

Gjithashtu testova aplikacionin në ekran të vogël dhe në telefon fizik, duke kontrolluar përdorimin e butonave, fushave dhe navigimin me tastierë.

## Provat që bëra

### Prova 1: Butonat dhe fushat përdoren në telefon pa zmadhim.

**Hapat:**
1. Hapa aplikacionin RideShare në telefon.
2. Kontrollova paraqitjen e listës së udhëtimeve.
3. Provova butonat dhe fushat e aplikacionit.
4. Kontrollova nëse duhej të zmadhoja ekranin për t'i përdorur.

**Rezultati i pritur:** Butonat dhe fushat të jenë të dukshme dhe të përdorshme pa pasur nevojë për zmadhim.

**Rezultati real:** Testimi kaloi me sukses. Tekstet dhe elementet shfaqeshin mirë, butonat funksiononin dhe fushat mund të përdoreshin normalisht në telefon.

### Prova 2: Fokusi i tastierës është i dukshëm.

**Hapat:**
1. Hapa aplikacionin në Chrome.
2. Aktivizova pamjen mobile.
3. Përdora tastin `Tab` për të kaluar ndërmjet lidhjeve dhe butonave.
4. Kontrollova nëse shfaqej treguesi vizual i fokusit.

**Rezultati i pritur:** Kur përdoret tasti `Tab`, elementi aktiv të dallohet vizualisht.

**Rezultati real:** Testimi kaloi me sukses. Navigimi me `Tab` funksionoi dhe fokusi ishte i dukshëm.

### Prova 3: Raporti krahason matjen para dhe pas ndryshimit.

**Hapat:**
1. Matja fillestare u krye me Lighthouse në Chrome, në modalitetin Mobile dhe Production.
2. Optimizova leximin e të dhënave në faqen kryesore me `Promise.all()`.
3. Ndërtova përsëri aplikacionin me `npm run build`.
4. E testova përsëri me Lighthouse duke përdorur të njëjtat kushte.

**Rezultatet para dhe pas:**

| Metrika | Para | Pas |
|---|---:|---:|
| Performance | 99 | 99 |
| First Contentful Paint (FCP) | 0.8 s | 0.8 s |
| Largest Contentful Paint (LCP) | 1.8 s | 1.8 s |
| Total Blocking Time (TBT) | 70 ms | 70 ms |
| Cumulative Layout Shift (CLS) | 0 | 0 |
| Speed Index | 1.4 s | 1.3 s |

**Rezultati real:** Performance mbeti 99/100. Speed Index u përmirësua nga 1.4 sekonda në 1.3 sekonda, ndërsa metrikat e tjera mbetën të njëjta.

Lighthouse shfaqi paralajmërimin se faqja u ngarkua ngadalë gjatë matjes, prandaj rezultatet mund të jenë jo të plota.

## Ku gjendet puna

Skedarët kryesorë:

- `aplikacioni/src/app/page.tsx` – faqja kryesore me optimizimin e leximit paralel.
- `aplikacioni/src/lib/udhetimet.ts` – funksionet për leximin e udhëtimeve.
- `aplikacioni/src/lib/preferuarat.ts` – funksioni për leximin e udhëtimeve të preferuara.
- `aplikacioni/src/app/globals.css` – stilet e aplikacionit.
- `java-13.md` – raporti i kësaj jave.

**GitHub:** https://github.com/blendakrasniqi6/rideshare-mobile

## Çfarë mbetet për përmirësim

Një kufizim që u vërejt gjatë matjes me Lighthouse është vonesa e kërkesës fillestare të serverit (Document Request Latency).

Në matjen e dytë Lighthouse vazhdoi të shfaqte paralajmërimin për ngarkim të ngadalshëm. Në të ardhmen mund të analizohet më hollësisht koha e përgjigjes së serverit dhe lidhja me databazën Neon për të përmirësuar performancën.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të analizuar kodin ekzistues, për të identifikuar mundësi optimizimi dhe për të propozuar përdorimin e `Promise.all()` për leximin paralel të të dhënave.

Gjithashtu mora ndihmë për interpretimin e rezultateve të Lighthouse dhe organizimin e testimeve.

Vetë verifikova ndryshimet duke ekzekutuar `npm run build`, duke testuar aplikacionin në Chrome në pamjen mobile dhe në telefon fizik, si dhe duke kryer matjet para dhe pas me Lighthouse.
