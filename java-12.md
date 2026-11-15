
# RideShare — Java 12

## Çfarë ndërtova

Përmirësova sigurinë e kërkesave për udhëtime. Shtova kontrolle në server për përdoruesit, rolet dhe vlefshmërinë e të dhënave. Gjatë pranimit të një kërkese, databaza bllokon përkohësisht rreshtin e udhëtimit dhe kontrollon nëse ka vende të lira. Nëse kërkesa pranohet, numri i vendeve zvogëlohet me një.

## Provat që bëra

### Prova 1: Të dhënat e pavlefshme refuzohen edhe nga serveri.

Hapat:
- Kontrollova validimin e ID-së së udhëtimit në API.
- Kontrollova që kërkesa lejohet vetëm për përdoruesit e kyçur me rolin udhëtar.
- Për provën praktike, ndryshova përkohësisht validimin e shfletuesit për numrin e vendeve nga `min="1"` në `min="0"`.
- Dërgova vlerën `0` nga formulari.
- Pas testimit, riktheva `min="1"`.

Rezultati: Serveri e refuzoi vlerën `0` dhe shfaqi mesazhin: "Numri i vendeve duhet të jetë numër i plotë më i madh se 0." Të dhënat e databazës nuk u ndryshuan.

### Prova 2: Nuk konfirmohen dy përdorues për të njëjtin vend të fundit.

Hapat:
- Kontrollova kodin e pranimit të kërkesave në server.
- Kontrollova përdorimin e `FOR UPDATE OF k, u`.
- Kontrollova që pranimi bëhet vetëm kur `u.vende > 0`.
- Kontrollova që pas pranimit numri i vendeve zvogëlohet me një.

Rezultati: Logjika mbrojtëse ekziston në SQL dhe parandalon pranimin e kërkesave kur nuk ka më vende të lira. Testimi praktik me dy përdorues njëkohësisht nuk u realizua.

### Prova 3: Mesazhi i gabimit tregon si korrigjohet fusha.

Hapat:
- Prova praktike me vlerën `0` në numrin e vendeve.
- Kontrollova mesazhet e gabimit në API për kërkesat e pavlefshme.
- Kontrollova mesazhin për mungesë vendesh dhe kërkesa që nuk janë më në pritje.

Rezultati: Mesazhi për numrin e vendeve tregon qartë se duhet vendosur një numër i plotë më i madh se zero.

## Testimi teknik

- `npm run build` përfundoi me sukses.
- Formulari lexon të dhënat aktuale nga databaza Neon.
- Ruajtja e ndryshimeve në udhëtimin ID 2 u testua me sukses.
- Validimi `min="1"` u rikthye pas testimit.

## Ku gjendet puna

- `aplikacioni/src/app/api/kerkesat/route.ts`
- `aplikacioni/src/app/api/kerkesat/[id]/route.ts`
- `aplikacioni/schema.sql`
- `aplikacioni/src/lib/lejet.ts`
- `aplikacioni/src/app/panel/actions.ts`
- `aplikacioni/src/app/panel/page.tsx`

Repository: https://github.com/blendakrasniqi6/rideshare-mobile

Linku i demonstrimit: Nuk është dokumentuar.

## Çfarë mbetet për përmirësim

- Testimi praktik me dy përdorues për vendin e fundit.
- Testimi i kërkesave të pavlefshme përmes API-së.
- Përmirësimi i mesazheve të tjera të gabimit me udhëzime konkrete për korrigjim.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të analizuar kodin, për të identifikuar validimet në server dhe për të kontrolluar logjikën e pranimit të kërkesave. Kodin ekzistues dhe strukturën e projektit i kontrollova vetë.

