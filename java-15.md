
# RideShare — Java 15

## Çfarë ndërtova

Këtë javë përgatita aplikacionin RideShare për demonstrim dhe mbrojtje individuale. Kontrollova rrjedhën e përdorimit nga kyçja deri te dërgimi dhe menaxhimi i kërkesave për udhëtime.

Gjatë testimit zbulova një problem: një përdorues mund të dërgonte kërkesë për udhëtimin e vet. E përmirësova API-në që të kontrollojë identitetin e shoferit dhe ta refuzojë këtë kërkesë.

Shtova edhe një test automatik për këtë rast.

## Provat që bëra

### Prova 1: Demoja ka një fillim, veprim dhe rezultat të qartë.

**Hapat:**
1. Hapa aplikacionin RideShare.
2. U kyça përmes GitHub.
3. Hapa listën e udhëtimeve.
4. Zgjodha një udhëtim dhe kontrollova detajet.
5. Dërgova një kërkesë si udhëtar.
6. Kontrollova kërkesën në panelin e shoferit.

**Rezultati i pritur:** Udhëtari mund të dërgojë kërkesë dhe shoferi mund ta menaxhojë atë.

**Çfarë ndodhi:** Kërkesa u dërgua dhe u shfaq në panelin e shoferit. Gjithashtu kontrollova rastin e udhëtimit pa vende të lira.

### Prova 2: Mund të shpjegoj kontributin tim pa lexuar kodin e AI-së.

**Hapat:**
1. Shpjegova dallimin mes rolit të shoferit dhe udhëtarit.
2. Shpjegova mënyrën e dërgimit dhe menaxhimit të kërkesave.
3. Shpjegova kontrollet që bëhen në server.
4. Shpjegova pse përdoren testet automatike.

**Rezultati i pritur:** Të mund ta shpjegoj funksionimin dhe vendimet teknike të aplikacionit me fjalët e mia.

**Çfarë ndodhi:** Identifikova funksionalitetet kryesore dhe shpjegova kontrollin e roleve, vendeve të lira dhe ndalimin e kërkesës për udhëtimin e vet.

### Prova 3: Raporti përmban linkun e demos dhe kufizimet e njohura.

**Hapat:**
1. Përgatita raportin `java-15.md`.
2. Shtova linkun e demonstrimit dhe GitHub.
3. Përshkrova funksionalitetet, testet dhe kufizimet e njohura.

**Rezultati i pritur:** Raporti të përmbajë informacionin kryesor për projektin dhe demonstrimin.

**Çfarë ndodhi:** Raporti u përgatit me linkun e aplikacionit dhe repository-t. Testet automatike dhe build-i përfunduan me sukses.

## Ku gjendet puna

**Skedarët kryesorë:**
- `aplikacioni/src/app/api/kerkesat/route.ts`
- `aplikacioni/src/app/api/kerkesat/route.test.ts`
- `java-15.md`

**Demo:**
https://rideshare-mobile-git-main-blendakrasniqi6.vercel.app/

**GitHub:**
https://github.com/blendakrasniqi6/rideshare-mobile

**Commit:** `47df7ea`

## Çfarë mbetet për përmirësim

Duhet të kryej testim me një koleg që përdor një llogari të veçantë, për të verifikuar rrjedhën e plotë mes shoferit dhe udhëtarit.

Gjithashtu, aplikacioni mund të përmirësohet me më shumë testime me përdorues realë dhe me përmirësime të ndërfaqes mobile.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për ndihmë gjatë analizimit të kodit, identifikimit të gabimeve, përmirësimit të API-së dhe krijimit të testeve automatike.

Ndryshimet i verifikova vetë duke kontrolluar kodin, duke ekzekutuar testet me `npm test` dhe duke ndërtuar projektin me `npm run build`.

Rezultati ishte 4/4 teste të kaluara dhe build i suksesshëm.
