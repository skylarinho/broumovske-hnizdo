import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, X, Check, KeyRound, LogOut, Sparkles } from "lucide-react";
import { useLang, useT } from "@/i18n";

export const Route = createFileRoute("/prijezd")({
  head: () => ({
    meta: [
      { title: "Příjezd a odjezd — Broumovské hnízdo" },
      { name: "description", content: "Co dělat při příjezdu a odjezdu z bytu Broumovské hnízdo." },
    ],
  }),
  component: ArrivalPage,
});

const arrival = [
  { cs: "V případě použití zadního vchodu vždy zamykat.", en: "If using the back entrance, always lock it." },
  { cs: "V zimním období zapojit oba radiátory do zásuvek (hned vedle radiátorů).", en: "In winter, plug in both radiators (sockets are right next to them)." },
  { cs: "Bojler nastavit kolečko na ECO.", en: "Set the boiler dial to ECO." },
  { cs: "Zapnout lednici pomocí kolečka uvnitř.", en: "Turn on the fridge using the dial inside." },
];

const during = [
  { cs: "Plně si užívat lokality a možnosti bytu.", en: "Fully enjoy the location and the flat." },
  { cs: "Dodržovat noční klid a i přes den nerušit sousedy.", en: "Respect quiet hours and don't disturb the neighbours." },
];

const departure = [
  { cs: "Vypnout a otřít lednici a nechat ji společně s mrazákem otevřenou.", en: "Switch off and wipe the fridge, leave it and the freezer open." },
  { cs: "Nastavit kolečko na bojleru na vypnuto.", en: "Turn the boiler dial to off." },
  { cs: "Vypnout oba radiátory ze zásuvky.", en: "Unplug both radiators." },
  { cs: "Vypnout žebřík v koupelně ze zásuvky.", en: "Unplug the towel rail in the bathroom." },
  { cs: "Sundat prostěradlo a povlečení a použité hodit do koše na prádlo.", en: "Strip the sheets and bedding into the laundry basket." },
  { cs: "Vysypat odpadkový koš, pokud v něm jsou zbytky jídla. Popelnice jsou pod schody.", en: "Empty the bin if there's food waste. Bins are under the stairs." },
  { cs: "Termostat v koupelně (vedle vypínače) nastavit na minimum.", en: "Set the bathroom thermostat (next to the switch) to minimum." },
  { cs: "V případě použití zadního vchodu vždy zamykat.", en: "If you used the back entrance, lock it." },
];

function ArrivalPage() {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="container-prose py-12 md:py-16 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          {lang === "cs" ? "Zpět" : "Back"}
        </Link>
        <Link to="/" aria-label={lang === "cs" ? "Zavřít" : "Close"} className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-border hover:border-deep/40">
          <X className="w-4 h-4" />
        </Link>
      </div>

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{t("nav.contact")}</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-deep">
          {lang === "cs" ? "Co dělat při příjezdu a odjezdu" : "Arrival & departure"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {lang === "cs"
            ? "Stručný přehled. Detaily průběžně doplňuji a posílám předem ke každé rezervaci."
            : "A short overview. Details are added gradually and sent ahead of each booking."}
        </p>
      </header>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4 text-deep">
          <KeyRound className="w-4 h-4" />
          <h2 className="font-display text-xl font-semibold">
            {lang === "cs" ? "Při příjezdu" : "On arrival"}
          </h2>
        </div>
        <ul className="space-y-2">
          {arrival.map((it, i) => (
            <li key={i} className="flex items-start gap-3 p-3 card-soft text-sm">
              <Check className="w-4 h-4 text-deep mt-0.5 shrink-0" />
              <span>{lang === "cs" ? it.cs : it.en}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4 text-deep">
          <Sparkles className="w-4 h-4" />
          <h2 className="font-display text-xl font-semibold">
            {lang === "cs" ? "Během pobytu" : "During the stay"}
          </h2>
        </div>
        <ul className="space-y-2">
          {during.map((it, i) => (
            <li key={i} className="flex items-start gap-3 p-3 card-soft text-sm">
              <Check className="w-4 h-4 text-deep mt-0.5 shrink-0" />
              <span>{lang === "cs" ? it.cs : it.en}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4 text-deep">
          <LogOut className="w-4 h-4" />
          <h2 className="font-display text-xl font-semibold">
            {lang === "cs" ? "Při odjezdu" : "On departure"}
          </h2>
        </div>
        <ul className="space-y-2">
          {departure.map((it, i) => (
            <li key={i} className="flex items-start gap-3 p-3 card-soft text-sm">
              <Check className="w-4 h-4 text-deep mt-0.5 shrink-0" />
              <span>{lang === "cs" ? it.cs : it.en}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
