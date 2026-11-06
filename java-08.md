# RideShare — Java 8

## Çfarë ndërtova
 Përshkruaj ndryshimin e kësaj jave me fjalët e tua.
 Këtë javë në projektin RideShare kam punuar me lokacionin e telefonit dhe konfirmimin e vendtakimit. Kam shtuar mundësinë që përdoruesi të kërkojë lokacionin e tij përmes GPS-it, por aplikacioni nuk duhet të kërkojë leje menjëherë kur hapet faqja. Leja kërkohet vetëm kur përdoruesi zgjedh ta përdorë këtë funksion.


## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
 Hapat, rezultati i pritur dhe çfarë ndodhi.
 E hapa projektin RideShare në shfletues.

Hyra në detajet e udhëtimit.

Vëzhgova nëse shfletuesi kërkonte leje për lokacionin pa klikuar ndonjë buton.

Rezultati i pritur: Aplikacioni nuk duhet të kërkojë leje për lokacionin menjëherë pas hapjes së faqes.

Çfarë ndodhi: Faqja u hap pa kërkuar automatikisht leje për lokacionin. Kjo e lejon përdoruesin të vendosë vetë nëse dëshiron ta përdorë këtë funksion.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
 Hapat, rezultati i pritur dhe çfarë ndodhi.
 Hapat:

E hapa faqen e udhëtimit.

Klikova butonin për përdorimin e lokacionit.

Kur shfletuesi kërkoi leje, zgjodha "Block" ose "Refuzo".

Kontrollova nëse mund të vazhdoja ta përdorja pjesën tjetër të aplikacionit.

Rezultati i pritur: Nëse përdoruesi refuzon lejen, aplikacioni duhet të shfaqë një mesazh informues dhe të vazhdojë të funksionojë normalisht.

Çfarë ndodhi: Refuzimi i lejes nuk duhet ta bllokojë përdoruesin. Ai mund të vazhdojë ta përdorë aplikacionin dhe të zgjedhë vendtakimin manualisht.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
 Hapat, rezultati i pritur dhe çfarë ndodhi.
 Hapat:

Kontrollova pamjet e ekranit që përdoren si dëshmi për projektin.

Kontrollova nëse në to shfaqej adresa ime reale ose ndonjë informatë private.

Kontrollova që në GitHub të mos publikoheshin të dhëna personale.

Rezultati i pritur: Dëshmitë duhet të tregojnë funksionimin e aplikacionit pa zbuluar adresën reale apo lokacionin tim personal.

Çfarë ndodhi: Dëshmitë duhet të përmbajnë vetëm informatat e nevojshme për demonstrimin e funksionit, pa ekspozuar adresën ose lokacionin tim real.

## Ku gjendet puna
 Shëno skedarët kryesorë dhe linkun e demonstrimit nëse është publikuar.
 aplikacioni/src/app/udhetimi/[id]/page.tsx – faqja e detajeve të udhëtimit.

aplikacioni/src/components/Java8Kontrollet.tsx – komponenti për funksionet e lokacionit dhe kontrollin e vendtakimit.

aplikacioni/src/lib/lejet.ts – logjika e lejeve dhe kontrollit të përdoruesit.

Demonstrimi lokal:
http://localhost:3000/udhetimi/2

## Çfarë mbetet për përmirësim
 Një kufizim ose gabim që vure re dhe hapi i ardhshëm.
Një kufizim është se lokacioni GPS nuk është gjithmonë plotësisht i saktë. Saktësia mund të ndryshojë varësisht nga pajisja dhe lidhja me GPS-in.

Në të ardhmen mund të përmirësohet mënyra e paraqitjes së saktësisë së lokacionit dhe të shtohen mesazhe më të qarta për përdoruesin kur lokacioni nuk mund të merret.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
 Çfarë ndihme more dhe çfarë verifikove vetë, ose: Nuk përdora AI.
 Nuk perdora AI


## Prova me një hyrje të re

**Hyrja që provova:**

Ndryshova vendtakimin nga Biblioteka në Parking.

**Parashikimi im para klikimit:**

Prisja që vendtakimi i konfirmuar të mos ndryshonte pa klikuar butonin Konfirmo.

**Çfarë pashë realisht:**

Gjatë ndryshimit të tekstit në fushë, vendtakimi i konfirmuar mbeti Biblioteka. Pasi klikova butonin Konfirmo, vendtakimi ndryshoi në Parking.

**Skedari dhe funksioni që e shpjegojnë:**

`aplikacioni/src/components/Java8Kontrollet.tsx`

Variablat `vendtakimiInput` dhe `vendtakimiKonfirmuar` ruajnë vlerën e shkruar dhe vlerën e konfirmuar. Butoni Konfirmo e përditëson vendtakimin e konfirmuar.

**Çfarë kuptova ose korrigjova:**

Kuptova se ndryshimi i tekstit në fushë nuk duhet ta ndryshojë menjëherë vendtakimin e konfirmuar. Ndryshimi bëhet vetëm pasi përdoruesi klikon Konfirmo.