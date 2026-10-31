# Java 7 – Provo, korrigjo dhe shpjego RideShare-in tënd

## Rasti im (P7-274, GitHub: blendakrasniqi6)

Skenari 4 – Kopja offline.

## Parashikimi

Parashikoj që lista e udhëtimeve, pasi të hapet me internet, do të shfaqet edhe kur aktivizohet mënyra Offline, falë kopjes së ruajtur nga aplikacioni.

## Dy probleme (1. dhe 2.)

**1. Problem me navigimin:** Lidhja e kthimit në faqen e udhëtimit përdorte adresën `/udhetimi/${id}` dhe e hapte përsëri të njëjtën faqe, në vend që të kthehej te lista e udhëtimeve.

**2. Problem me databazën:** Sjellja e aplikacionit kur databaza nuk është e disponueshme nuk është testuar plotësisht. Kodi përmban një mesazh gabimi, por nevojitet testim shtesë.

## Korrigjimi (arsyeja)

Korrigjova lidhjen e kthimit në faqen e udhëtimit. Në vend të adresës `/udhetimi/${id}`, vendosa adresën `/`, në mënyrë që përdoruesi të kthehet te lista kryesore e udhëtimeve.

Skedari: aplikacioni/src/app/udhetimi/[id]/page.tsx

Para: https://github.com/blendakrasniqi6/rideshare-mobile/commit/82f19b7

Pas: https://github.com/blendakrasniqi6/rideshare-mobile/commit/adf1202

Kodi para korrigjimit:

```tsx
<Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
```

Kodi pas korrigjimit:

```tsx
<Link href="/">← Kthehu te lista e udhëtimeve</Link>
```

## Prova 1 (Hapat, Pritshmëria, Vëzhgimi) – Kopja offline

**Hapat:**
1. E nisa projektin me komandën `npm run dev`.
2. E hapa RideShare me internet.
3. Në Developer Tools hapa Network dhe aktivizova Offline.
4. E rifreskova faqen.

**Pritshmëria:**

Lista e ruajtur e udhëtimeve të shfaqet edhe pa internet.

**Vëzhgimi:**

Lista e ruajtur u shfaq edhe pasi aktivizova Offline.

## Prova 2 (Hapat, Pritshmëria, Vëzhgimi) – Kërkesa për udhëtim

**Hapat:**
1. E hapa RideShare me internet.
2. E hapa një udhëtim që ka vende të lira.
3. Kontrollova tekstin në faqen e kërkesës.

**Pritshmëria:**

Aplikacioni të tregojë qartë se kërkesa është simulim dhe jo rezervim real.

**Vëzhgimi:**

U shfaq mesazhi “Simulim: Në pritje” dhe teksti tregonte se kërkesa nuk i ishte dërguar shoferit.

## Prova 3 (Hapat, Pritshmëria, Vëzhgimi) – Udhëtimi që nuk ekziston

**Hapat:**
1. E hapa RideShare në shfletues.
2. Vizitova `http://localhost:3000/udhetimi/99`.
3. Kontrollova mesazhin e shfaqur.

**Pritshmëria:**

Aplikacioni të tregojë se udhëtimi nuk ekziston.

**Vëzhgimi:**

U shfaq mesazhi “Udhëtimi nuk u gjet”.

## Ndryshimi i ri

Korrigjova lidhjen e kthimit në faqen e udhëtimit, në mënyrë që përdoruesi të kthehet te lista kryesore.

## Ndihma nga AI

Përdora ChatGPT për të kuptuar problemin e navigimit dhe për të gjetur ndryshimin e nevojshëm. E kontrollova kodin dhe e provova vetë lidhjen pas korrigjimit.

## Përfundimi

Gjatë testimit kontrollova kopjen offline, kërkesën demonstrative dhe hapjen e një udhëtimi që nuk ekziston. Korrigjova lidhjen e kthimit dhe verifikova ndryshimin në kod. Testimi i sjelljes kur databaza nuk është e disponueshme mbetet për t'u bërë.