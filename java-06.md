# RideShare — Java 6 · PWA dhe puna offline



## Çfarë ndërtova
Ndërtova një PWA që mundëson hapjen e RideShare edhe pa internet. Manifesti përmban emrin dhe ikonat e aplikacionit, service worker ruan skedarët për përdorim offline, ndërsa kopja publike ruan listën e udhëtimeve në pajisje.


## Provat që bëra
### Prova 1: Manifesti dhe vizita online
 Shkruaj URL-në që hape, emrin dhe përmasat e ikonave që pe, si dhe nëse u ruajt lista. Nëse shfletuesi nuk ofroi instalim, shënoje.
 Shpjego çfarë bëjnë manifesti, service worker dhe kopja publike në pajisje.
 Hapa /manifest.webmanifest. Kontrollova emrin dhe ikonat në përmasat e përcaktuara. Lista u ruajt në pajisje. Shfletuesi nuk ofroi instalim automatik.

### Prova 2: Pa internet dhe pas rifreskimit
 Si e simulove ndërprerjen? A u hapën tri kartat pas rifreskimit? Çfarë kohe ruajtjeje dhe mesazhi pe? Pse nuk ishte konfirmim rezervimi?
 Simulova ndërprerjen përmes Chrome DevTools → Network → Offline. Pas rifreskimit, tri kartat u hapën nga kopja e ruajtur. U shfaq koha e fundit e ruajtjes dhe mesazhi për përdorimin e kopjes lokale. Kjo nuk ishte konfirmim rezervimi, sepse nuk u dërgua kërkesë te serveri.

### Prova 3: Lidhja rikthehet
 Shëno orën e vjetër dhe të renë të ID 2 në Neon, çfarë shfaqej offline dhe çfarë ndodhi pas Rifresko listën. Rikthe orën fillestare.
Në Neon, ID 2 kishte orën fillestare 08:00 dhe orën e ndryshuar 08:25. Offline shfaqej kopja e ruajtur. Pas klikimit te “Rifresko listën”, lista u lexua përsëri nga serveri. Në fund, ora u rikthye në 08:00.
## Ku gjendet puna
 Linku i repository-t, skedarët e shtuar dhe demo në Vercel nëse e ke publikuar.
 Repository: https://github.com/blendakrasniqi6/rideshare-mobile
Skedarët kryesorë janë manifesti, service worker dhe kodi për ruajtjen e kopjes publike. Demo në Vercel: nuk e kam publikuar.

## Çfarë mbetet për përmirësim
 Çfarë ndodh në vizitën e parë pa kopje? Cili është kufizimi i leximit offline?
Në vizitën e parë pa internet, pa kopje të ruajtur, aplikacioni mund të mos i shfaqë udhëtimet. Offline mundësohet vetëm leximi i të dhënave të ruajtura, jo konfirmimi i rezervimeve.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
 Nuk përdora AI.
