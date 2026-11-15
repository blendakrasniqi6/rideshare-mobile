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

**Hapat:** Testimi në Vercel dhe në telefon ende nuk është përfunduar.

**Rezultati i pritur:** Demoja publike hapet dhe përdoruesi mund të shohë udhëtimet dhe të dërgojë kërkesë për udhëtim.

**Rezultati:** Në pritje të testimit.

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
- Demoja publike: Në pritje të verifikimit.

## Çfarë mbetet për përmirësim

Mbetet testimi i demosë publike në telefon dhe verifikimi i rrjedhës kryesore me një përdorues real. Gjithashtu duhet të kryhet testimi me një koleg për të kontrolluar funksionimin nga këndvështrimi i një përdoruesi tjetër.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për ndihmë në krijimin e testeve automatike, konfigurimin e Vitest dhe dokumentimin e projektit. Vetë ekzekutova testet dhe ndërtimin production për të verifikuar rezultatet.