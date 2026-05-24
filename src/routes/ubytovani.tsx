import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wifi, WifiOff, Coffee, UtensilsCrossed, Bath, Tv, Music, Refrigerator, Microwave, Wind, Check, X } from "lucide-react";
import { useLang, useT } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/ubytovani")({
  head: () => ({
    meta: [
      { title: "Ubytování — Broumovské hnízdo" },
      { name: "description", content: "Útulný byt 1+kk, 24 m², plně vybavená kuchyň, koupelna se sprchou." },
      { property: "og:title", content: "Ubytování — Broumovské hnízdo" },
      { property: "og:description", content: "Útulný byt 1+kk, 24 m², plně vybavený." },
    ],
  }),
  component: StayPage,
});

const cats = ["living", "kitchen", "bath"] as const;
type Cat = typeof cats[number];

// Vlastní fotky ze složky /public. Stačí přidat soubor do public/
// a odkázat na něj absolutní cestou (např. "/broumov_in_1.jpg").
const photos: Record<Cat, string[]> = {
  living: [
    "/broumov_in_1.jpg",
    "/broumov_in_2.jpg",
    "/broumov_in_16.jpg",
    "/broumov_in_17.jpg",
    "/broumov_in_11.jpg",
    "/broumov_in_12.jpg",
    "/broumov_in_13.jpg",
    "/broumov_in_14.jpg",
  ],
  kitchen: [
    
    "/broumov_in_8.jpg",
  ],
  bath: [
    "/broumov_in_15.jpg",
    "/broumov_in_9.jpg",
    "/broumov_in_10.jpg",
  ],
};

function StayPage() {
  const t = useT();
  const { lang } = useLang();
  const [cat, setCat] = useState<Cat>("living");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const labels = {
    living: t("stay.cat.living"),
    kitchen: t("stay.cat.kitchen"),
    bath: t("stay.cat.bath"),
  } as const;

  return (
    <div className="container-prose py-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{t("nav.stay")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-deep">{t("stay.title")}</h1>
        <p className="mt-5 text-muted-foreground text-lg">{t("stay.lead")}</p>
      </header>

      <div className="mt-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                cat === c
                  ? "bg-deep text-primary-foreground border-deep"
                  : "bg-card border-border hover:border-deep/40"
              }`}
            >
              {labels[c]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos[cat].map((src) => (
            <button
              key={src}
              onClick={() => setLightbox(src)}
              className="aspect-[4/3] overflow-hidden rounded-xl card-soft card-soft-hover"
            >
              <img src={src} alt={labels[cat]} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full">
              {t("stay.amenities")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display">{t("stay.amenities")}</DialogTitle>
            </DialogHeader>
            <AmenitiesGrid lang={lang} />
          </DialogContent>
        </Dialog>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img src={lightbox} alt="" className="max-h-full max-w-full rounded-lg" />
        </div>
      )}
    </div>
  );
}

function AmenitiesGrid({ lang }: { lang: "cs" | "en" }) {
  const items: { icon: any; cs: string; en: string; on: boolean }[] = [
    { icon: WifiOff, cs: "WiFi", en: "WiFi", on: false },
    { icon: Music, cs: "Bluetooth reproduktor", en: "Bluetooth speaker", on: true },
    { icon: UtensilsCrossed, cs: "Myčka nádobí", en: "Dishwasher", on: true },
    { icon: Refrigerator, cs: "Lednice s mrazákem", en: "Fridge with freezer", on: true },
    { icon: Microwave, cs: "Mikrovlnka", en: "Microwave", on: true },
    { icon: Coffee, cs: "Kávovar / konvice", en: "Coffee maker / kettle", on: true },
    { icon: Tv, cs: "TV", en: "TV", on: true },
    { icon: Bath, cs: "Sprcha", en: "Shower", on: true },
    { icon: Wind, cs: "Sušák na prádlo", en: "Drying rack", on: true },
  ];
  return (
    <ul className="grid sm:grid-cols-2 gap-3 mt-2">
      {items.map((it) => (
        <li key={it.cs} className="flex items-center gap-3 p-3 rounded-lg border border-border">
          <it.icon className="w-4 h-4 text-deep" />
          <span className="flex-1 text-sm">{lang === "cs" ? it.cs : it.en}</span>
          {it.on ? <Check className="w-4 h-4 text-deep" /> : <X className="w-4 h-4 text-destructive" />}
        </li>
      ))}
    </ul>
  );
}
