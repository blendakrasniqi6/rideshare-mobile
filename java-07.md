# Java 7 – Provo, korrigjo dhe shpjego RideShare-in tënd

## Skenari i zgjedhur

**Skenari 4 – Kopja offline**

## Parashikimi

Parashikoj që, pasi lista e udhëtimeve të jetë hapur kur ka internet, ajo do të mund të shfaqet edhe pasi të shkëputet interneti, falë kopjes së ruajtur nga aplikacioni.

## Prova fillestare

**Hapat:**
1. E nisa projektin me `npm run dev`.
2. E hapa RideShare në shfletues.
3. E hapa mjetin Developer Tools dhe pjesën Network.
4. E zgjodha mënyrën Offline.
5. E rifreskova faqen.

**Parashikimi** Lista e udhëtimeve të shfaqet edhe pa internet.
Rasti im: E hapa RideShare aktivizova Offline te Network dhe e rifresokva faqen.
Lista e ruajtur u shfaq pa internet dhe lista e udhetimeve u shfaq edhe ne menyren offline.


## Prova 2 – Kërkesa për udhëtim

**Hapat:**
1. E hapa RideShare me internet.
2. E kontrollova listën dhe detajet e udhëtimit.
3. Kontrollova tekstin që shfaqet te kërkesa për udhëtim.

**Pritshmëria:** Aplikacioni të mos pretendojë se është kryer rezervim real.

**Vëzhgimi:** Kërkesa paraqitet me tekstin “Simulim: Në pritje”. Nuk paraqitet si rezervim i konfirmuar.

**Përfundimi:** Sjellja e vëzhguar është e qartë dhe e dallon simulimin nga një rezervim real.

## Prova 3 – Udhëtimi që nuk ekziston

**Hapat:**
1. E hapa RideShare në shfletues.
2. Në shiritin e adresës shkrova `http://localhost:3000/udhetimi/99`.
3. Shtypa Enter dhe kontrollova rezultatin.

**Pritshmëria:** Aplikacioni të tregojë një mesazh të qartë kur udhëtimi me ID 99 nuk ekziston.

**Vëzhgimi:** Aplikacioni shfaqi mesazhin “Udhëtimi nuk u gjet”.

**Përfundimi:** Aplikacioni e trajton saktë rastin kur kërkohet një udhëtim që nuk ekziston.



## Problemi 1 – Lidhja e gabuar e navigimit

**Problemi:** Në faqen e kërkesës për udhëtim, lidhja “Kthehu te detajet” e hapte përsëri të njëjtën faqe, sepse përdorte adresën `/udhetimi/${id}`.

**Korrigjimi:** E ndryshova lidhjen që të çojë te faqja kryesore me adresën `/`, ku shfaqet lista e udhëtimeve.

**Kodi para korrigjimit:**

```tsx
<Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
```

**Kodi pas korrigjimit:**

```tsx
<Link href="/">← Kthehu te lista e udhëtimeve</Link>
```

**Prova:** E hapa faqen e kërkesës dhe klikova lidhjen e kthimit.

**Rezultati i pritur:** Të kthehem te lista e udhëtimeve.

**Rezultati i vëzhguar:** Lidhja funksionoi dhe më ktheu te lista e udhëtimeve.

**Përfundimi:** Problemi i navigimit u korrigjua dhe u testua me sukses.


## Paqartësia 2 – Gabimi i lidhjes me databazën

**Paqartësia:** Kodi përmban mesazhin “Nuk u lidhëm me databazën. Provo përsëri.”, por ende nuk e kam testuar sjelljen e aplikacionit kur databaza nuk është e disponueshme.

**Kontrolli:** E shqyrtova kodin te `src/app/page.tsx`, `src/app/udhetimi/[id]/page.tsx` dhe `src/lib/db.ts`.

**Vëzhgimi:** Kodi kontrollon nëse `DATABASE_URL` mungon dhe përmban mesazhe për gabimin e lidhjes. Megjithatë, kjo nuk dëshmon se të gjitha rastet e dështimit janë trajtuar si duhet.

**Hapi i ardhshëm:** Duhet të kryej një test të kontrolluar për gabimin e lidhjes, pa ndryshuar konfigurimin e databazës që përdoret normalisht.


