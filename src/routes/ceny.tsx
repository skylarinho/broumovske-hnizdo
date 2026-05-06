import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useT } from "@/i18n";

export const Route = createFileRoute("/ceny")({
  head: () => ({
    meta: [
      { title: "Ceny a podmínky — Broumovské hnízdo" },
      { name: "description", content: "Ceny ubytování od 400 Kč/noc. Platba předem, bez kauce." },
      { property: "og:title", content: "Ceny — Broumovské hnízdo" },
      { property: "og:description", content: "Ceny ubytování od 400 Kč/noc." },
    ],
  }),
  component: PricesPage,
});

function PricesPage() {
  const t = useT();
  const cards = [
    {
      title: t("prices.friends"),
      a: { label: t("prices.nights3"), price: "400 Kč" },
      b: { label: t("prices.nights12"), price: "500 Kč" },
      featured: true,
    },
    {
      title: t("prices.friendsOfFriends"),
      a: { label: t("prices.nights3"), price: "600 Kč" },
      b: { label: t("prices.nights12"), price: "700 Kč" },
      featured: false,
    },
  ];
  return (
    <div className="container-prose py-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{t("nav.prices")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-deep">{t("prices.title")}</h1>
      </header>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {cards.map((c) => (
          <div
            key={c.title}
            className={`card-soft p-8 ${c.featured ? "ring-1 ring-deep/30 bg-secondary/40" : ""}`}
          >
            <h3 className="font-display text-xl font-semibold mb-6">{c.title}</h3>
            <div className="space-y-4">
              {[c.a, c.b].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between border-b border-border pb-3 last:border-0">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className="font-display text-2xl font-semibold text-deep">
                    {row.price}<span className="text-sm text-muted-foreground"> / noc</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-semibold mb-5">{t("prices.terms")}</h2>
        <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl">
          {(["prices.t1","prices.t2","prices.t3","prices.t4","prices.t5"] as const).map((k) => (
            <li key={k} className="flex items-start gap-3 p-4 card-soft">
              <Check className="w-4 h-4 text-deep mt-0.5 shrink-0" />
              <span className="text-sm">{t(k)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
