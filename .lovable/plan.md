# Broumovské hnízdo — web pro ubytování

Moderní, světlý a minimalistický web s nádechem broumovského baroka. Důraz na sekci výletních tras a praktické informace pro hosty. Vícestránková struktura (samostatné routy pro SEO a sdílení), CS/EN přepínač, plně responsivní.

## Design system

- Barvy: primární světle zelená `#A8C686`, akcent tmavě zelená `#3A5A40`, pozadí béžová `#F5F0E6`, text `#333` / `#555`, bílá pro karty.
- Typografie: **Lora** pro nadpisy (barokní nádech), **Inter** pro body text.
- Karty s jemným stínem, hodně bílého prostoru, jemné křivky a barokní ornamenty (SVG dělící prvky) v pozadí sekcí.
- Ikony: lucide-react.
- Animace: jemné `transition` 200–300 ms, fade/slide přechody.

## Routy (TanStack Router)

```text
/                -> Domů (Hero, Info lišta, krátké úvody do sekcí, CTA)
/ubytovani       -> Detail bytu, galerie, vybavení (modal)
/ceny            -> Cenové karty + podmínky
/okoli           -> Poloha, body zájmu, doprava
/trasy           -> Doporučené trasy (hlavní těžiště)
/kontakt         -> Formulář, WhatsApp, telefon, checklist příjezd/odjezd
```

Sdílený layout v `__root.tsx`: header s logem „Broumovské hnízdo", navigace, přepínač jazyků CS/EN; footer s rychlými odkazy a copyrightem. Každá routa má vlastní `head()` s unikátním title/description/OG.

## Sekce a chování

**Domů (`/`)**
- Hero: jemný gradient + barokní SVG ornament v pozadí, velký nadpis Lora, podnadpis, CTA „Prozkoumat ubytování" → `/ubytovani`.
- Info lišta: 4 ikony (adresa, parkování, kontakt, cena od).
- Krátké teaser bloky pro Ubytování / Ceny / Trasy / Okolí s odkazy na podstránky.

**Ubytování**
- Popis bytu (1+kk, 24 m², vybavení).
- Galerie: kategorie tlačítka (Obývací, Kuchyň, Koupelna), klik otevře lightbox s fotkami (placeholdery).
- Tlačítko „Zobrazit kompletní vybavení" → modal s checklistem (WiFi ❌, Bluetooth repro ✅, myčka ✅ atd.).

**Ceny**
- Dvě karty: Kamarádi+rodina (400/500 Kč), Kamarádi kamarádů (600/700 Kč).
- Podmínky: platba předem, check-in 14–18, check-out do 11, bez kauce.

**Okolí**
- Úvodní popis lokace.
- Karty bodů zájmu (Lidl, Parkování, Klášter, Lokál, U tří růží, U dřevěného kostela) — název, ikona, vzdálenost, popis, odkazy Mapy.cz a Google Maps.
- Podsekce Doprava: tabs/karty Z Prahy / Z Brna / Z Hradce — auto + veřejná doprava.

**Trasy** (hlavní těžiště)
- Filtry nahoře: Vše / Pěší / Cyklo / Auto + počet v každé.
- Mřížka karet (3–4 na řádek, responsivně): název, ikona dle typu, náročnost, délka, převýšení, doba, krátký popis, „Více informací".
- Klik → vysouvací panel zprava (Sheet) s detailem: statistiky, podrobný popis, osobní tip, varování, kroky trasy, 4 sloty na fotky, odkazy Google Maps / Mapy.cz / web. Zavření tlačítkem ✕ nebo klávesou Esc.
- Zdroj dat: lokální TS pole s 8 trasami (placeholder obsah).

**Kontakt**
- Formulář (jméno, e-mail, telefon, zpráva, datum příjezdu/odjezdu) s validací (zod).
- Velké zelené WhatsApp tlačítko → `https://wa.me/420776662256`.
- Klikací telefon `+420 776 66 22 56`.
- Checklist „Při příjezdu a odjezdu" — interaktivní zaškrtávací seznam.

**Footer**
- Logo, rychlé odkazy, CS/EN, © 2026.

## Lokalizace

Jednoduchý překladový slovník (CS/EN) v `src/i18n/`, stav jazyka v URL nebo localStorage. Přepínač v headeru. Pro v1 plně přeloženy hlavní texty UI; obsahové bloky CS s EN ekvivalenty.

## Technické poznámky

- TanStack Start (existující stack), Tailwind v4 + shadcn/ui (Sheet pro detail trasy, Dialog pro vybavení/lightbox, Tabs pro dopravu, Form/Input).
- Bez backendu v této verzi — formulář odesílá přes `mailto:` nebo WhatsApp odkaz; přidání serverové funkce / DB lze později.
- SEO: per-route `head()` s title, description, og:title, og:description; favicon (jednoduchý dům/strom SVG).
- Obrázky: placeholdery (`https://images.unsplash.com/...` pro krajinu Broumovska) připravené k výměně.

## Co bude potřeba doplnit od tebe později

- Reálné fotky bytu, tras a okolí.
- Finální texty tras (popisy, tipy, varování, kroky).
- Konkrétní odkazy Mapy.cz / Google Maps / GPX pro každou trasu a POI.
- Případný e-mail pro kontakt.
