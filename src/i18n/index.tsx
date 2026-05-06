import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "cs" | "en";

type Dict = Record<string, { cs: string; en: string }>;

export const dict = {
  // nav
  "nav.home": { cs: "Domů", en: "Home" },
  "nav.stay": { cs: "Ubytování", en: "Stay" },
  "nav.prices": { cs: "Ceny", en: "Prices" },
  "nav.area": { cs: "Okolí", en: "Area" },
  "nav.routes": { cs: "Trasy", en: "Routes" },
  "nav.contact": { cs: "Kontakt", en: "Contact" },

  // brand
  "brand.name": { cs: "Broumovské hnízdo", en: "Broumov Nest" },
  "brand.tag": {
    cs: "Tvoje útočiště v srdci Broumovska – malý byt ideální pro dva, kde si v klidu odpočineš.",
    en: "Your hideaway in the heart of the Broumov region — a small flat ideal for two, where you can truly rest.",
  },
  "hero.eyebrow": { cs: "Skřivánkov", en: "Skřivánkov" },
  "hero.intro": {
    cs: "Broumovské hnízdo není jen ubytování – je to moje srdcovka, o kterou se chci podělit. Preferuji cestování, které je ohleduplné k místu, k přírodě i k lidem. Proto je Hnízdo samoobslužné, postavené na vzájemné důvěře a respektu k Broumovsku. Žádné zbytečné služby, žádné formality. Jen ty, klid a kousek domova uprostřed unikátní krajiny.",
    en: "Broumov Nest isn't just a place to stay — it's my heart project, something I want to share. I prefer travel that respects the place, nature and people. That's why the Nest is self-service, built on mutual trust and respect for the Broumov region. No unnecessary services, no formalities. Just you, calm and a bit of home in a unique landscape.",
  },

  // hero
  "hero.cta": { cs: "Prozkoumat ubytování", en: "Explore the stay" },
  "hero.cta2": { cs: "Vybavení a fotky", en: "Amenities & photos" },

  // info bar
  "info.address": { cs: "U Horní brány 22, Broumov", en: "U Horní brány 22, Broumov" },
  "info.parking": { cs: "Parkování zdarma, 50 m", en: "Free parking, 50 m" },
  "info.phone": { cs: "+420 776 66 22 56", en: "+420 776 66 22 56" },
  "info.priceFrom": { cs: "Od 400 Kč / noc", en: "From 400 CZK / night" },

  // sections
  "stay.title": { cs: "Tvoje pohodlné zázemí", en: "Your cosy base" },
  "stay.lead": {
    cs: "Útulný byt 1+kk o 24 m² – malý a útulný, ideálně pro dva. Plně vybavená kuchyň, koupelna se sprchou, rozkládací postel. Vinylová podlaha, akumulační radiátory.",
    en: "A cosy 24 m² studio — small and snug, ideally for two. Fully equipped kitchen, walk-in shower, sofa bed. Vinyl flooring, storage heaters.",
  },
  "stay.gallery": { cs: "Galerie", en: "Gallery" },
  "stay.amenities": { cs: "Kompletní vybavení", en: "Full amenities" },
  "stay.cat.living": { cs: "Obývací část", en: "Living area" },
  "stay.cat.kitchen": { cs: "Kuchyň", en: "Kitchen" },
  "stay.cat.bath": { cs: "Koupelna", en: "Bathroom" },

  "prices.title": { cs: "Ceny a podmínky", en: "Prices & terms" },
  "prices.friends": { cs: "Nejbližší kamarádi a rodina", en: "Close friends & family" },
  "prices.friendsOfFriends": { cs: "Kamarádi kamarádů", en: "Friends of friends" },
  "prices.nights3": { cs: "3+ nocí", en: "3+ nights" },
  "prices.nights12": { cs: "1–2 noci", en: "1–2 nights" },
  "prices.terms": { cs: "Podmínky", en: "Terms" },
  "prices.t1": { cs: "Platba předem na účet", en: "Payment in advance by transfer" },
  "prices.t2": { cs: "Minimální délka pobytu: 1 noc", en: "Minimum stay: 1 night" },
  "prices.t3": { cs: "Check-in i check-out flexibilně, dle dohody", en: "Check-in & check-out flexible, by agreement" },
  "prices.t4": { cs: "Pokud není rezervace před/po, lze i během dne", en: "If there's no booking before/after, anytime during the day works" },
  "prices.t5": { cs: "Bez kauce", en: "No deposit" },

  "area.title": { cs: "Poloha a okolí", en: "Location & surroundings" },
  "area.lead": {
    cs: "Broumovské hnízdo se nachází v klidné části Broumova, kousek od kláštera a přírodních krás Broumovských stěn.",
    en: "Broumov Nest sits in a quiet part of Broumov, a short walk from the monastery and the natural wonders of Broumov Walls.",
  },
  "area.mapycz": { cs: "Mapy.cz", en: "Mapy.cz" },
  "area.gmaps": { cs: "Google Maps", en: "Google Maps" },

  "transport.title": { cs: "Jak se k nám dostaneš", en: "How to reach us" },
  "transport.fromPrague": { cs: "Z Prahy", en: "From Prague" },
  "transport.fromBrno": { cs: "Z Brna", en: "From Brno" },
  "transport.fromHK": { cs: "Z Hradce Králové", en: "From Hradec Králové" },
  "transport.car": { cs: "Autem", en: "By car" },
  "transport.publicTransport": { cs: "Veřejnou dopravou", en: "Public transport" },

  "routes.title": { cs: "Výlety a trasy", en: "Trips & routes" },
  "routes.lead": {
    cs: "Vybrané tipy z okolí — pěšky, na kole i autem. Klikni na kartu pro detail.",
    en: "Curated tips around — on foot, by bike or by car. Tap a card for details.",
  },
  "routes.all": { cs: "Vše", en: "All" },
  "routes.hike": { cs: "Pěší", en: "Hiking" },
  "routes.bike": { cs: "Cyklo", en: "Cycling" },
  "routes.car": { cs: "Auto", en: "By car" },
  "routes.more": { cs: "Více informací", en: "More info" },
  "routes.difficulty": { cs: "Náročnost", en: "Difficulty" },
  "routes.length": { cs: "Délka", en: "Length" },
  "routes.elevation": { cs: "Převýšení", en: "Elevation" },
  "routes.duration": { cs: "Doba", en: "Duration" },
  "routes.tip": { cs: "Osobní tip", en: "Personal tip" },
  "routes.warning": { cs: "Upozornění", en: "Heads up" },
  "routes.steps": { cs: "Body trasy", en: "Route waypoints" },
  "routes.openMaps": { cs: "Otevřít v mapě", en: "Open in maps" },
  "routes.web": { cs: "Webové stránky", en: "Website" },

  "contact.title": { cs: "Rezervace a kontakt", en: "Booking & contact" },
  "contact.form.name": { cs: "Jméno", en: "Name" },
  "contact.form.email": { cs: "E-mail", en: "Email" },
  "contact.form.phone": { cs: "Telefon", en: "Phone" },
  "contact.form.arrival": { cs: "Datum příjezdu", en: "Arrival" },
  "contact.form.departure": { cs: "Datum odjezdu", en: "Departure" },
  "contact.form.message": { cs: "Zpráva", en: "Message" },
  "contact.form.submit": { cs: "Odeslat poptávku", en: "Send enquiry" },
  "contact.whatsapp": { cs: "Napiš nám na WhatsApp", en: "Message us on WhatsApp" },
  "contact.checklist.title": { cs: "Co dělat při příjezdu a odjezdu", en: "Arrival & departure checklist" },

  "footer.rights": { cs: "Všechna práva vyhrazena.", en: "All rights reserved." },
  "footer.quickLinks": { cs: "Rychlé odkazy", en: "Quick links" },
  "footer.short": {
    cs: "Broumovské hnízdo: moje srdcovka / tvoje útočiště. Zakládám si na důvěře, samoobslužném konceptu a respektu k přírodě.",
    en: "Broumov Nest: my heart project / your hideaway. Built on trust, a self-service concept and respect for nature.",
  },
  "footer.lovenote": {
    cs: "Dělám s láskou. Vystudoval jsem cestovní ruch na VŠPJ a pracuji v Nadaci Partnerství — proto je hnízdo v duchu udržitelného turismu. — Eman",
    en: "Made with love. I studied tourism at VŠPJ and work at the Partnership Foundation — so the Nest follows sustainable tourism. — Eman",
  },

  "book.title": { cs: "Rezervovat pobyt", en: "Book your stay" },
  "book.lead": {
    cs: "Vyber termín a napiš nám rovnou na WhatsApp – odpovíme obvykle do hodiny.",
    en: "Pick your dates and ping us on WhatsApp – we usually reply within an hour.",
  },
  "mid.eyebrow": { cs: "Zaujalo tě to?", en: "Like what you see?" },
  "mid.title": { cs: "Chceš přijet? Vyber termín a napiš.", en: "Want to come? Pick your dates and message us." },

  "history.title": { cs: "Historie domu", en: "House history" },
  "history.lead": {
    cs: "Tady brzy doplním příběh domu a interaktivní porovnání před / po rekonstrukci.",
    en: "Soon I'll add the story of the house and an interactive before/after slider.",
  },
  "history.before": { cs: "Před", en: "Before" },
  "history.after": { cs: "Po", en: "After" },

  "testimonials.title": { cs: "Vzkazy z hnízda", en: "Notes from the Nest" },
  "testimonials.lead": {
    cs: "V bytě mám zápisník, kam mi hosté píší vzkazy. Postupně je sem budu přepisovat.",
    en: "There's a guestbook in the flat. I'll be transcribing notes from it here.",
  },

  "common.swipe": { cs: "← táhni pro více →", en: "← swipe for more →" },

  // difficulties
  "diff.easy": { cs: "lehká", en: "easy" },
  "diff.medium": { cs: "střední", en: "medium" },
  "diff.hard": { cs: "náročná", en: "hard" },
} satisfies Dict;

export type Key = keyof typeof dict;

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "cs",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cs");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "cs" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}

export function useT() {
  const { lang } = useLang();
  return (k: Key) => dict[k][lang];
}
