import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, X, Wifi, Tv, Music, UtensilsCrossed, Refrigerator, Microwave, Coffee, Bath, Wind, Flame, ShowerHead, BedDouble, Shirt, Cookie } from "lucide-react";
import { useLang, useT } from "@/i18n";

export const Route = createFileRoute("/vybaveni")({
  head: () => ({
    meta: [
      { title: "Vybavení bytu — Broumovské hnízdo" },
      { name: "description", content: "Kompletní přehled vybavení bytu Broumovské hnízdo." },
    ],
  }),
  component: AmenitiesPage,
});

type Item = { icon: any; cs: string; en: string; on: boolean; note?: { cs: string; en: string } };

const items: Item[] = [
  {
    icon: Wifi, cs: "WiFi", en: "WiFi", on: false,
    note: {
      cs: "Záměrně bez WiFi — dáváme prostor odpočinku, knížce a procházce. Mobilní data fungují skvěle.",
      en: "Intentionally no WiFi — we leave space for rest, a book and a walk. Mobile data works great.",
    },
  },
  { icon: Tv, cs: "TV", en: "TV", on: false, note: { cs: "Není.", en: "None." } },
  { icon: Music, cs: "Bluetooth reproduktor", en: "Bluetooth speaker", on: true },
  { icon: UtensilsCrossed, cs: "Myčka nádobí", en: "Dishwasher", on: true },
  { icon: Refrigerator, cs: "Lednice s mrazákem", en: "Fridge with freezer", on: true },
  { icon: Microwave, cs: "Mikrovlnka", en: "Microwave", on: true },
  { icon: Flame, cs: "Sporák — indukce", en: "Induction hob", on: true },
  { icon: Coffee, cs: "Kávovar a konvice", en: "Coffee maker & kettle", on: true },
  { icon: Cookie, cs: "Základní zásoby (sůl, olej, koření)", en: "Pantry basics (salt, oil, spices)", on: true },
  { icon: ShowerHead, cs: "Sprcha", en: "Shower", on: true },
  { icon: Bath, cs: "Ručníky a osušky", en: "Towels", on: true },
  { icon: BedDouble, cs: "Povlečení a prostěradla", en: "Bed linen", on: true },
  { icon: Shirt, cs: "Sušák na prádlo", en: "Drying rack", on: true },
  { icon: Wind, cs: "Akumulační radiátory", en: "Storage heaters", on: true },
];

function AmenitiesPage() {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="container-prose py-12 md:py-16 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          hash="ubytovani"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "cs" ? "Zpět" : "Back"}
        </Link>
        <Link
          to="/"
          hash="ubytovani"
          aria-label={lang === "cs" ? "Zavřít" : "Close"}
          className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-border hover:border-deep/40"
        >
          <X className="w-4 h-4" />
        </Link>
      </div>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{t("nav.stay")}</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-deep">
          {lang === "cs" ? "Vybavení bytu" : "Apartment amenities"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {lang === "cs"
            ? "Vše, co najdete v bytě. Bez fotek — jen suchý seznam."
            : "Everything you'll find in the flat. No photos — just a plain list."}
        </p>
      </header>

      <ul className="divide-y divide-border border-t border-b border-border">
        {items.map((it) => (
          <li key={it.cs} className="py-4 flex items-start gap-4">
            <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-accent/30 text-deep">
              <it.icon className="w-4 h-4" />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{lang === "cs" ? it.cs : it.en}</span>
                {it.on ? (
                  <Check className="w-4 h-4 text-deep" />
                ) : (
                  <X className="w-4 h-4 text-destructive" />
                )}
              </div>
              {it.note && (
                <p className="text-sm text-muted-foreground mt-1">
                  {lang === "cs" ? it.note.cs : it.note.en}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
