# RideShare — Java 10

## Çfarë ndërtova
Këtë javë ndërtova sistemin e kërkesave për udhëtime. Udhëtari mund të dërgojë kërkesë për një udhëtim, ndërsa shoferi mund ta pranojë ose refuzojë atë përmes panelit të tij. Kur shoferi e pranon kërkesën, statusi përditësohet dhe numri i vendeve të lira zvogëlohet për një. Gjithashtu, shtova përditësimin automatik të të dhënave çdo 3 sekonda dhe njoftimin kur ndërpritet lidhja me internetin.

## Provat që bëra

### Prova 1: Ndryshimi shihet te të dy përdoruesit.
**Hapat:** U kyça me llogarinë time GitHub. Fillimisht e ndryshova përkohësisht rolin në databazë në `udhetar` dhe dërgova një kërkesë për udhëtimin me ID 1. Pastaj e ndryshova rolin në `shofer` dhe hapa panelin e shoferit për të parë kërkesën.

**Rezultati i pritur:** Kërkesa të shfaqet në panelin e shoferit dhe statusi të përditësohet pas pranimit ose refuzimit.

**Çfarë ndodhi:** Kërkesa u shfaq në panel me statusin "Në pritje". Pas klikimit te butoni "Prano", statusi ndryshoi në "Pranuar".

Shënim: Këtë provë e realizova me të njëjtën llogari GitHub duke ndryshuar përkohësisht rolin. Sinkronizimi mes dy llogarive të ndryshme ende nuk është testuar.

### Prova 2: Numri i vendeve nuk bëhet negativ.
**Hapat:** U dërgua një kërkesë për udhëtimin me ID 1, i cili kishte fillimisht 2 vende të lira. Pas pranimit të kërkesës nga shoferi, kontrollova numrin e vendeve në databazën Neon.

**Rezultati i pritur:** Numri i vendeve të zvogëlohet nga 2 në 1 dhe të mos bëhet negativ në rast se nuk ka më vende të lira.

**Çfarë ndodhi:** Pas pranimit të kërkesës, numri i vendeve ndryshoi nga 2 në 1. Në kod është shtuar kontrolli që nuk lejon pranimin e kërkesës kur nuk ka vende të lira. Gjithashtu, përdoret bllokimi i rreshtave në databazë për të parandaluar pranime të njëkohshme.

### Prova 3: Ndërprerja e lidhjes shpjegohet në ekran.
**Hapat:** Hapa aplikacionin dhe përdora Developer Tools në Chrome, te pjesa Network, për ta ndërprerë përkohësisht lidhjen me internetin duke zgjedhur Offline.

**Rezultati i pritur:** Aplikacioni të shfaqë një njoftim që tregon se lidhja është ndërprerë dhe se po provohet rilidhja.

**Çfarë ndodhi:** Në ekran u shfaq mesazhi "Po rilidhemi...". Aplikacioni kontrollon përsëri lidhjen dhe provon të marrë të dhënat pas rikthimit të internetit.

## Ku gjendet puna
Skedarët kryesorë të implementimit:

- `aplikacioni/schema-java10.sql`
- `aplikacioni/src/app/api/kerkesat/route.ts`
- `aplikacioni/src/app/api/kerkesat/[id]/route.ts`
- `aplikacioni/src/components/KerkesaReale.tsx`
- `aplikacioni/src/components/KerkesatShoferit.tsx`
- `aplikacioni/src/app/udhetimi/[id]/page.tsx`
- `aplikacioni/src/app/panel/page.tsx`

Projekti gjendet në GitHub:

https://github.com/blendakrasniqi6/rideshare-mobile

Linku i demonstrimit: Ende nuk është publikuar.

## Çfarë mbetet për përmirësim
Mbetet të testohet sinkronizimi me dy llogari të ndryshme dhe me një koleg, për të verifikuar që ndryshimet shfaqen te të dy përdoruesit pa rifreskim manual të faqes. Aktualisht përditësimi realizohet me polling çdo 3 sekonda. Në të ardhmen mund të përmirësohet duke përdorur WebSocket.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora AI për ndihmë gjatë zhvillimit të projektit, krijimin dhe shpjegimin e kodit, strukturimin e API-ve, lidhjen me databazën dhe zgjidhjen e gabimeve. Vetë verifikova dërgimin e kërkesës, shfaqjen e saj në panelin e shoferit, pranimin e kërkesës, ndryshimin e numrit të vendeve në databazë dhe shfaqjen e njoftimit gjatë ndërprerjes së internetit.