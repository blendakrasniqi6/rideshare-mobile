
# RideShare — Java 11

## Çfarë ndërtova

Gjatë kësaj jave implementova sistemin e njoftimeve brenda aplikacionit RideShare.

Kur shoferi pranon ose refuzon një kërkesë për udhëtim, sistemi krijon automatikisht një njoftim për udhëtarin. Njoftimi përmban përgjigjen e shoferit dhe numrin e udhëtimit përkatës.

Shtova gjithashtu mundësinë që udhëtari t'i shohë njoftimet, të kontrollojë cilat janë të lexuara dhe të palexuara dhe t'i hapë detajet e udhëtimit përkatës. Kur hapet udhëtimi nga njoftimi, njoftimi shënohet automatikisht si i lexuar.

Njoftimet ruhen në databazën Neon dhe secili njoftim lidhet me kërkesën përkatëse.

## Provat që bëra

### Prova 1: Njoftimi tregon përgjigjen e saktë.

**Hapat:**
1. U kyça si udhëtar dhe dërgova një kërkesë për udhëtimin 2.
2. Ndryshova përkohësisht rolin në shofer.
3. Shoferi e pranoi kërkesën.
4. Kontrollova njoftimin në databazë dhe në panelin e udhëtarit.
5. Krijova një kërkesë tjetër për udhëtimin 3 dhe shoferi e refuzoi.

**Rezultati i pritur:** Udhëtari duhet të marrë njoftim me përgjigjen e saktë të shoferit.

**Rezultati:** Testi kaloi. Për kërkesën 2 u krijua njoftimi "Kërkesa u pranua", ndërsa për kërkesën 3 u krijua njoftimi "Kërkesa u refuzua".

### Prova 2: Klikimi hap kërkesën përkatëse.

**Hapat:**
1. Hapa njoftimin për kërkesën 2.
2. Kontrollova nëse u hap udhëtimi 2.
3. U ktheva te paneli dhe kontrollova statusin e njoftimit.
4. Përsërita të njëjtin test me njoftimin e kërkesës 3.

**Rezultati i pritur:** Çdo njoftim duhet të hapë udhëtimin e vet dhe të shënohet si i lexuar.

**Rezultati:** Testi kaloi. Njoftimi i parë hapi udhëtimin 2, ndërsa i dyti hapi udhëtimin 3. Të dy njoftimet u shënuan si të lexuara dhe numri i njoftimeve të palexuara ndryshoi nga 1 në 0.

### Prova 3: Aplikacioni funksionon edhe kur push nuk mbështetet.

**Hapat:**
1. Testova njoftimet brenda aplikacionit pa përdorur Push Notifications.
2. Kontrollova nëse njoftimet shfaqeshin në panelin e udhëtarit.
3. Kontrollova nëse aplikacioni kërkonte leje nga shfletuesi për njoftime Push.

**Rezultati i pritur:** Aplikacioni duhet të vazhdojë të funksionojë edhe pa mbështetje për Push Notifications.

**Rezultati:** Testi kaloi për sistemin e njoftimeve brenda aplikacionit. Njoftimet shfaqen dhe funksionojnë pa kërkuar leje për Push Notifications. Push Notifications nuk janë implementuar në këtë javë.

## Ku gjendet puna

Skedarët kryesorë të implementuar ose të ndryshuar:

- `aplikacioni/schema-java11.sql`
- `aplikacioni/src/app/api/njoftimet/route.ts`
- `aplikacioni/src/app/api/njoftimet/[id]/route.ts`
- `aplikacioni/src/app/api/kerkesat/[id]/route.ts`
- `aplikacioni/src/components/Njoftimet.tsx`
- `aplikacioni/src/components/LexoNjoftimin.tsx`
- `aplikacioni/src/app/panel/page.tsx`
- `aplikacioni/src/app/udhetimi/[id]/page.tsx`

Kodi ndodhet në repository:
https://github.com/blendakrasniqi6/rideshare-mobile

Demonstrimi është realizuar lokalisht në `http://localhost:3000`. Nuk ka ende link publik të demonstrimit.

Gjithashtu, ekzekutova `npm run build` dhe ndërtimi përfundoi me sukses, pa gabime.

## Çfarë mbetet për përmirësim

Një kufizim i testimit është se pranimi dhe refuzimi u testuan duke përdorur të njëjtën llogari GitHub dhe duke ia ndryshuar përkohësisht rolin në databazë. Testimi me dy llogari të ndryshme GitHub mbetet për t'u realizuar.

Në të ardhmen mund të shtohen edhe Push Notifications përmes shfletuesit, nëse nevojiten.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të kuptuar kërkesat e laboratorit, për të planifikuar implementimin, për të shkruar dhe kontrolluar kodin dhe për të identifikuar gabimet gjatë zhvillimit.

Vetë i testova funksionalitetet në aplikacion, kontrollova të dhënat në databazën Neon, verifikova lidhjen e njoftimeve me kërkesat përkatëse dhe ekzekutova `npm run build` për të kontrolluar nëse projekti kompilohej pa gabime.
