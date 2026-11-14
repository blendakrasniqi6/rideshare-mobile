# SHABLLON PRD (Product Requirements Document) — 1 Faqe

**Shkurtesat:** PWA (Progressive Web App – aplikacion web progresiv); PRD (Product Requirements Document – dokumenti i kërkesave të produktit); MVP (Minimum Viable Product – produkti minimal i përdorshëm).

**Kursi:** Programimi për Pajisje Mobile (2026/2027) • **Kolegji AAB**

**Emri i Projektit:** AAB RideShare

**Themeluesi / Ekipi:** Blenda Krasniqi

**Data & Versioni:** Java 02 • Versioni 1.0 (Draft për MVP)

---

## 1. Përdoruesi dhe Problemi Real

- **Kush e përjeton dhimbjen?** Studentët e Kolegjit AAB që udhëtojnë çdo ditë nga qytetet e tjera drejt Prishtinës.
- **Kur ndodh?** Në mëngjes para fillimit të ligjëratave dhe pasdite pas përfundimit të tyre.
- **Si e zgjidhin sot?** Përdorin autobusë, taksi ose organizohen përmes grupeve në WhatsApp. Këto mënyra shpesh shkaktojnë vonesa, shpenzime të larta dhe vështirësi në organizim.

## 2. Evidenca e Vëzhgimit (3 Bisedat me Përdoruesit)

- **Biseda 1 (Shofer – Student):** "Udhëtoj çdo ditë me veturë drejt Prishtinës dhe kam vende të lira. Do të doja t'i ndaja shpenzimet e udhëtimit me studentë të tjerë."
- **Biseda 2 (Udhëtar – Studente):** "Autobusët shpesh vonohen dhe ndonjëherë rrezikoj të vonohem në ligjërata. Do të preferoja të udhëtoja me një koleg."
- **Biseda 3 (Shofer – Student):** "Grupet në WhatsApp janë të paorganizuara. Është e vështirë të dihet kush ka rezervuar vend dhe sa vende kanë mbetur."

## 3. Hipoteza e Vlerës

> **Nëse** u ofrojmë studentëve një PWA mobile me verifikim përmes emailit institucional AAB, ku shoferët publikojnë udhëtimet dhe udhëtarët rezervojnë vende,
>
> **atëherë** studentët do të kenë mundësi të udhëtojnë së bashku, të ndajnë shpenzimet e transportit dhe të zvogëlojnë vonesat në ligjërata.

## 4. Rrjedha Kryesore e Përdoruesit (Core Flow — Max 5 Hapa)

1. **Kyçja:** Studenti regjistrohet ose kyçet me email institucional AAB.
2. **Kërkimi / Postimi:** Shoferi publikon qytetin e nisjes, orën dhe numrin e vendeve të lira.
3. **Kërkesa:** Udhëtari zgjedh udhëtimin dhe shtyp butonin `[Kërko Vend]`.
4. **Konfirmimi:** Shoferi pranon ose refuzon kërkesën për rezervim.
5. **Përfundimi:** Pas udhëtimit, të dy përdoruesit mund të japin vlerësim për njëri-tjetrin.

## 5. Kufijtë e MVP-së (Scope Contract)

- **BRENDA MVP-së (Maksimumi 3 funksione):**
  1. Autentikimi i përdoruesve përmes emailit institucional AAB.
  2. Publikimi dhe shfaqja e udhëtimeve me numër të vendeve dhe çmim.
  3. Kërkesa dhe konfirmimi i rezervimit të vendeve në kohë reale.

- **JASHTË MVP-së (Të përjashtuara qëllimisht për këtë semestër):**
  - Pa pagesa përmes kartelave bankare.
  - Pa navigim GPS dhe harta në kohë reale.
  - Pa sistem të brendshëm të komunikimit (chat).

## 6. Kriteret e Pranimit (Acceptance Criteria – Çfarë testohet)

- [ ] **AC-1:** Kur shoferi publikon një udhëtim me 3 vende, udhëtimi shfaqet në listën e udhëtimeve.
- [ ] **AC-2:** Kur një rezervim konfirmohet, numri i vendeve të lira zvogëlohet nga 3 në 2.
- [ ] **AC-3:** Përdoruesit pa email institucional AAB nuk lejohen të regjistrohen.
- [ ] **AC-4:** Aplikacioni hapet edhe pa internet dhe shfaq përmbajtjen e ruajtur paraprakisht.

## 7. Modeli Minimal i të Dhënave (Supabase PostgreSQL)

```sql
profiles (id, full_name, email, phone, role)

rides (id, driver_id, origin, departure_time, available_seats, price_eur, status)

bookings (id, ride_id, passenger_id, status, created_at)
```

## 8. Rreziku Kryesor që Duhet Testuar

- **Rreziku:** A do të kenë studentët besim të udhëtojnë me persona që nuk i njohin personalisht?
- **Testi në Javën 2:** Verifikimi përmes emailit institucional AAB do të testohet për të parë nëse ndihmon në krijimin e besimit dhe sigurisë ndërmjet studentëve.