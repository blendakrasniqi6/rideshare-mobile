
# RideShare

RideShare është aplikacion mobil për gjetjen dhe menaxhimin e udhëtimeve të përbashkëta.

## Teknologjitë

- Next.js 15
- React 19
- TypeScript
- Neon PostgreSQL
- NextAuth dhe GitHub OAuth
- Vitest

## Struktura e projektit

```text
rideshare-mobile/
├── README.md
├── java-02.md ... java-14.md
└── aplikacioni/
    ├── package.json
    ├── package-lock.json
    ├── vitest.config.ts
    └── src/
        ├── app/
        ├── components/
        └── lib/
```

## Nisja lokale

Kërkohet Node.js dhe npm.

Hap terminalin dhe ekzekuto:

```powershell
cd aplikacioni
npm install
npm run dev
```

Aplikacioni hapet në:

http://localhost:3000

## Variablat e mjedisit

Krijo skedarin `.env.local` brenda folderit `aplikacioni/`.

Nevojiten këto variabla:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

Plotëso vlerat nga konfigurimi yt privat i Neon dhe GitHub OAuth.

Për GitHub OAuth, callback URL lokale është:

`http://localhost:3000/api/auth/callback/github`

Mos publiko `.env.local`, çelësat privatë ose kredencialet në GitHub.

Në Vercel, shto të njëjtat variabla te Environment Variables për projektin.

## Testimi

Për ekzekutimin e testeve:

```powershell
cd aplikacioni
npm test
```

Për ndërtimin e versionit production:

```powershell
npm run build
```

Testet automatike për API-në kontrollojnë:
- Dërgimin e një kërkese kur ka vende të lira.
- Refuzimin kur nuk ka vende të lira.
- Refuzimin e përdoruesit pa rolin e duhur.

Testet përdorin funksione të simuluara dhe nuk ndryshojnë databazën reale.

## Publikimi

Projekti publikohet në Vercel. Variablat private konfigurohen në cilësimet e projektit dhe nuk ruhen në repository.

## Raportet e ushtrimeve

Raportet Java ruhen në folderin kryesor të repository-t.
