
# RideShare — Java 14

## Çfarë ndërtova

Shtova teste automatike për API-në e kërkesave për udhëtime duke përdorur Vitest. Testet kontrollojnë rastet kryesore: pranimin e kërkesës kur ka vende të lira, refuzimin kur nuk ka vende dhe refuzimin e përdoruesve pa rolin e duhur. Gjithashtu përditësova README me udhëzimet për nisjen lokale, testimin dhe konfigurimin e variablave private.

## Provat që bëra

### Prova 1: Testet dhe ndërtimi përfundojnë me sukses.

**Hapat:**
1. Ekzekutova `npm test` në folderin `aplikacioni`.
2. Ekzekutova `npm run build` në të njëjtin folder.

**Rezultati i pritur:** Të gjitha testet kalojnë dhe projekti ndërtohet pa gabime.

**Rezultati:** Kaluan të 3 testet automatike. Ndërtimi production përfundoi me sukses.

### Prova 2: Demoja publike hapet dhe rrjedha kryesore funksionon.

**Hapat:**
1. Hapa aplikacionin publik në Vercel.
2. Kontrollova hapjen e aplikacionit në kompjuter dhe telefon.
3. U kyça me GitHub.
4. Testova dërgimin e një kërkese për udhëtim.
5. Testova refuzimin e një kërkese nga shoferi.
6. Krijova një kërkesë testuese nga profili `DEMO-SHOFER-2`.
7. E pranova kërkesën #5 si shofer dhe kontrollova rezultatin në databazë.

**Rezultati i pritur:** Demoja publike hapet dhe rrjedha kryesore e kërkesave funksionon.

**Rezultati:** Demoja u hap me sukses në kompjuter dhe telefon. Hyrja me GitHub dhe dërgimi i kërkesës funksionuan. U testuan refuzimi dhe pranimi i kërkesës. Pas pranimit të kërkesës #5, statusi ndryshoi në `accepted` dhe numri i vendeve u zvogëlua nga 1 në 0.

**Demoja publike:** https://rideshare-mobile-git-main-blendakrasniqi6.vercel.app/

### Prova 3: README shpjegon nisjen lokale pa publikuar sekrete.

**Hapat:**
1. Përditësova README me udhëzimet për instalimin dhe nisjen e projektit.
2. Dokumentova variablat e nevojshme për konfigurimin lokal.
3. Kontrollova që `.env.local` përjashtohet nga Git.

**Rezultati i pritur:** README shpjegon nisjen lokale dhe kredencialet private nuk publikohen.

**Rezultati:** README u përditësua dhe `.env.local` është i përjashtuar nga Git.

## Ku gjendet puna

- Testet: `aplikacioni/src/app/api/kerkesat/route.test.ts`
- Konfigurimi i Vitest: `aplikacioni/vitest.config.ts`
- Konfigurimi i testeve: `aplikacioni/package.json`
- Udhëzimet: `README.md`
- Aplikacioni: folderi `aplikacioni/`
- Demoja publike: https://rideshare-mobile-git-main-blendakrasniqi6.vercel.app/

## Çfarë mbetet për përmirësim

Mbetet testimi me një koleg për të kontrolluar funksionimin nga këndvështrimi i një përdoruesi tjetër. Gjithashtu, duhet të përfundohet dorëzimi përmes GitHub Issue sipas udhëzimeve të detyrës.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për ndihmë në krijimin e testeve automatike, konfigurimin e Vitest dhe dokumentimin e projektit. Vetë ekzekutova testet dhe ndërtimin production për të verifikuar rezultatet.
