import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, X, Check, KeyRound, LogOut } from "lucide-react";
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

// Tyto seznamy budou doplněny — placeholder.
const arrival = [
  { cs: "Klíče najdete ve schránce u vchodu (kód pošlu předem).", en: "Keys are in the mailbox at the entrance (code sent ahead)." },
  { cs: "Hlavní vypínač je v chodbě vlevo.", en: "Main switch is on the left in the hallway." },
  { cs: "Bojler nastavte na ECO režim.", en: "Set the boiler to ECO mode." },
  { cs: "Lednici zapněte kolečkem na střed.", en: "Turn on the fridge to the middle setting." },
];

const departure = [
  { cs: "Zadní vchod zamkněte.", en: "Lock the back entrance." },
  { cs: "Radiátory odpojte (speciální sazba).", en: "Disconnect the radiators (special tariff)." },
  { cs: "Bojler nechte v ECO.", en: "Leave the boiler in ECO." },
  { cs: "Vše ostatní vypněte.", en: "Switch everything else off." },
  { cs: "Použité prostěradlo dejte do koše.", en: "Put used sheets in the basket." },
  { cs: "Vysypejte odpadky.", en: "Take out the trash." },
  { cs: "Klíče vraťte do schránky.", en: "Return keys to the mailbox." },
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
