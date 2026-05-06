## Co změníme

### 1. Hero (`src/routes/index.tsx`)
- Eyebrow nad nadpisem: změna z `Broumovsko · 2026` na **`Skřivánkov`**.
- Pod hlavní podnadpis (`brand.tag`) přidat **úvodní odstavec** (i18n klíč `hero.intro`):
  > „Broumovské hnízdo není jen ubytování – je to moje srdcovka, o kterou se chci podělit. Preferuji cestování, které je ohleduplné k místu, k přírodě i k lidem. Proto je Hnízdo samoobslužné, postavené na vzájemné důvěře a respektu k Broumovsku. Žádné zbytečné služby, žádné formality. Jen ty, klid a kousek domova uprostřed unikátní krajiny."
- Doplnit větu, že **byt je malý, ideálně pro 2 osoby**, aby si mohly v klidu odpočinout (zařadit jako druhou větu intra nebo do `stay.lead`).
- Druhý CTA button v hero: místo „Doporučené trasy" → **„Vybavení"** s `href="#ubytovani"` (sjede dolů k fotkám, neotevírá novou stránku). Text z `hero.cta2` změnit na `stay.amenities`.

### 2. Tykání všude
- Projít `src/i18n/index.tsx` a sjednotit všechny CS texty do tykání (`napište` → `napiš`, `Vyberte` → `Vyber`, `Rezervujte` → `Rezervuj`, `Zaujalo vás to` → `Zaujalo tě to`, `chcete přijet` → `chceš přijet` apod.).
- Mid-page CTA (`MidBookCTA`): nadpis **„Zaujalo tě to? Chceš přijet?"** s tykajícím podtextem.

### 3. Sekce Okolí (`AreaSection`) – příprava na rozšíření
- Rozšířit datový tvar `pois` o pole `description` (delší text) a `links: { mapy?: string; google?: string }`.
- V kartě POI přidat pod stávající krátký text místo pro delší popis a dva malé odkazy „Mapy.cz" / „Google Maps" (s ikonkou `ExternalLink`). Zatím s prázdnými placeholdery – uživatel doplní obsah později.

### 4. Nové sekce – skeletony (uživatel doplní obsah)
- **Historie domu** (`#historie`): nová sekce na homepage s nadpisem, krátkým textem (placeholder „Brzy doplníme...") a místem pro **interaktivní prvek před/po** – připravit komponentu `BeforeAfterSlider` (drag handle nad dvěma obrázky, čistá implementace bez závislostí). Zatím s placeholder fotkami.
- **Testimonials** (`#vzkazy`): sekce „Vzkazy z hnízda" – horizontálně scrollovatelné karty stylizované jako stránky ze zápisníku (lehce béžové pozadí, ručně psaný feel přes `font-display` italic). Nyní 1–2 ukázkové vzkazy + poznámka že přibývají z fyzického zápisníku v bytě.
- Obě sekce zařadit pod `RoutesSection` před `BookSection`.

### 5. Patička (`src/components/site/layout.tsx`)
- Krátká verze úvodu:
  > „Broumovské hnízdo: moje srdcovka / tvoje útočiště. Zakládám si na důvěře, samoobslužném konceptu a respektu k přírodě."
- Adresa zůstane, telefon udělat **proklikávací** (`tel:` – už je) a přidat **WhatsApp odkaz**.
- Odstranit zbylou delší `footer.lovenote`, nahradit krátkou verzí (klíč `footer.short`). Osobní „love note" o VŠPJ / Nadaci Partnerství necháme jako jednu malou větu pod tím.

### 6. i18n klíče k přidání/úpravě (`src/i18n/index.tsx`)
- `hero.eyebrow` = „Skřivánkov"
- `hero.intro` (CS + EN)
- `hero.cta2` → směřuje na vybavení (text = `stay.amenities`)
- `mid.title`, `mid.eyebrow` – tykání
- `footer.short` – krátká verze úvodu
- `history.title`, `history.lead`, `testimonials.title`, `testimonials.lead`
- Sjednotit tykání napříč celým slovníkem

## Co zatím neuděláme
- Reálný obsah pro Historii domu, fotky před/po, popisky POI a odkazy na mapy, plné texty testimonials – vše doplní uživatel.
