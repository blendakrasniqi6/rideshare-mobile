# Java 7 – Provo, korrigjo dhe shpjego RideShare-in tënd

## Rasti im (P7-274, GitHub: blendakrasniqi6)

Skenari 4 – Kopja offline.

## Parashikimi

Parashikoj që lista e udhëtimeve, pasi të hapet me internet, do të shfaqet edhe kur aktivizohet mënyra Offline, falë kopjes së ruajtur nga aplikacioni.

## Ndryshimi i ri

Korrigjova lidhjen e kthimit në faqen e udhëtimit, sepse më parë e hapte përsëri të njëjtën faqe. Tani lidhja kthehet te lista e udhëtimeve.

## Ndihma nga AI

Përdora ChatGPT për të kuptuar problemin e navigimit dhe për të gjetur ndryshimin e nevojshëm. E provova vetë lidhjen pas korrigjimit.

## Dy probleme

**1. Problem me navigimin:** Lidhja e kthimit përdorte `/udhetimi/${id}` dhe e hapte përsëri faqen e njëjtë.

**2. Paqartësi me databazën:** Nuk e kam testuar sjelljen kur databaza nuk është e disponueshme. Kodi përmban një mesazh gabimi, por kjo nuk dëshmon se çdo rast është trajtuar saktë.

## Korrigjimi (arsyeja)

Ndryshova adresën e lidhjes që përdoruesi të mund të kthehet te lista e udhëtimeve.

Skedari: aplikacioni/src/app/udhetimi/[id]/page.tsx

Kodi para korrigjimit:

```tsx
<Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
```

Kodi pas korrigjimit:

```tsx
<Link href="/">← Kthehu te lista e udhëtimeve</Link>
```

## Prova 1 – Kopja offline

### Hapat
1. E nisa projektin me `npm run dev`.
2. E hapa RideShare me internet.
3. Në Developer Tools hapa Network dhe aktivizova Offline.
4. E rifreskova faqen.

### Pritshmëria
Lista e ruajtur e udhëtimeve të shfaqet edhe pa internet.

### Vëzhgimi
Lista e ruajtur u shfaq edhe pasi aktivizova Offline.

## Prova 2 – Kërkesa për udhëtim

### Hapat
1. E hapa RideShare me internet.
2. E hapa një udhëtim që ka vende të lira.
3. Kontrollova tekstin në faqen e kërkesës.

### Pritshmëria
Aplikacioni të tregojë qartë se kërkesa është simulim dhe jo rezervim real.

### Vëzhgimi
U shfaq “Simulim: Në pritje” dhe teksti tregonte se kërkesa nuk i ishte dërguar shoferit.

## Prova 3 – Udhëtimi që nuk ekziston

### Hapat
1. E hapa RideShare në shfletues.
2. Vizitova `http://localhost:3000/udhetimi/99`.
3. Kontrollova mesazhin e shfaqur.

### Pritshmëria
Aplikacioni të tregojë se udhëtimi nuk ekziston.

### Vëzhgimi
U shfaq mesazhi “Udhëtimi nuk u gjet”.

## Përfundimi

Tri provat kontrolluan kopjen offline, kërkesën demonstrative dhe udhëtimin që nuk ekziston. Korrigjova lidhjen e kthimit dhe e testova me sukses. Testimi i gabimit të databazës mbetet për t'u bërë.