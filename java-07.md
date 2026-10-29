# Java 7 – Provo, korrigjo dhe shpjego RideShare-in tënd

## Rasti im 

**Skenari i zgjedhur:** Skenari 4 – Kopja offline.

### Parashikimi

Parashikoj që, pasi lista e udhëtimeve të hapet kur ka internet, ajo do të mund të shfaqet edhe pasi të shkëputet interneti, falë kopjes së ruajtur nga aplikacioni.

## Ndryshimi i ri

Gjatë testimit, vura re se lidhja për kthim nga faqja e kërkesës për udhëtim e hapte përsëri të njëjtën faqe. E ndryshova lidhjen që të kthehet te lista kryesore e udhëtimeve.

## Ndihma nga AI
Nuk perdora AI.

## Dy probleme

**1. Problem me navigimin**

Lidhja “Kthehu te detajet” e hapte përsëri të njëjtën faqe, sepse përdorte adresën `/udhetimi/${id}`. Kjo nuk e kthente përdoruesin te lista e udhëtimeve.

**2. Paqartësi në rastin e gabimit të databazës**

Kodi përmban mesazhin “Nuk u lidhëm me databazën. Provo përsëri.”, por nuk e kam testuar veçmas sjelljen e aplikacionit kur databaza nuk është e disponueshme. Prandaj, nuk mund të them se ky rast është testuar plotësisht.

## Korrigjimi (arsyeja)

E ndryshova lidhjen e kthimit që të çojë te faqja kryesore, sepse përdoruesi duhet të mund të kthehet te lista e udhëtimeve.

**Skedari:** `aplikacioni/src/app/udhetimi/[id]/page.tsx`

Kodi para korrigjimit:

```tsx
<Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
```

Kodi pas korrigjimit:

```tsx
<Link href="/">← Kthehu te lista e udhëtimeve</Link>
```

Pas ndryshimit, e hapa faqen e kërkesës dhe klikova lidhjen. Ajo më ktheu te lista e udhëtimeve.

## Prova 1 – Lista offline

**Hapat:**
1. E nisa projektin me `npm run dev`.
2. E hapa RideShare në shfletues kur kishte internet.
3. E hapa Developer Tools dhe pjesën Network.
4. E aktivizova mënyrën Offline.
5. E rifreskova faqen.

**Pritshmëria:** Lista e ruajtur e udhëtimeve të shfaqet edhe pa internet.

**Vëzhgimi:** Lista e ruajtur u shfaq edhe pasi aktivizova mënyrën Offline.

**Përfundimi:** Prova e mbështeti parashikimin se lista publike mund të lexohet edhe pa internet.

## Prova 2 – Kërkesa për udhëtim

**Hapat:**
1. E hapa RideShare me internet.
2. E kontrollova listën dhe detajet e udhëtimit.
3. E kontrollova tekstin që shfaqet te kërkesa për udhëtim.

**Pritshmëria:** Aplikacioni të mos pretendojë se është kryer rezervim real.

**Vëzhgimi:** Kërkesa paraqitet me tekstin “Simulim: Në pritje”. Nuk paraqitet si rezervim i konfirmuar.

**Përfundimi:** Aplikacioni e dallon simulimin nga një rezervim real.

## Prova 3 – Udhëtimi që nuk ekziston

**Hapat:**
1. E hapa RideShare në shfletues.
2. Në shiritin e adresës shkrova `http://localhost:3000/udhetimi/99`.
3. Shtypa Enter dhe kontrollova rezultatin.

**Pritshmëria:** Aplikacioni të tregojë një mesazh të qartë kur udhëtimi me ID 99 nuk ekziston.

**Vëzhgimi:** Aplikacioni shfaqi mesazhin “Udhëtimi nuk u gjet”.

**Përfundimi:** Aplikacioni e trajtoi rastin e udhëtimit që nuk ekziston në mënyrën e pritur.

## Përfundimi

Testova listën offline, paraqitjen e kërkesës si simulim dhe rastin kur udhëtimi nuk ekziston. Gjatë testimit identifikova dhe korrigjova një problem me lidhjen e navigimit. Testimi i gabimit të lidhjes me databazën mbetet punë për t'u bërë.