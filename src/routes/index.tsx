import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ParkingSquare, Phone, BedDouble, Mountain, Coins, Map } from "lucide-react";
import { useT } from "@/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Broumovské hnízdo — ubytování v Broumově" },
      { name: "description", content: "Útulné ubytování 1+kk v centru Broumova. Ideální výchozí bod pro výlety." },
      { property: "og:title", content: "Broumovské hnízdo" },
      { property: "og:description", content: "Útulné ubytování v srdci Broumovska s tipy na výlety." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const t = useT();
  return (
    <>
      <Hero />
      <InfoBar />
      <Teasers />
    </>
  );
}

function Hero() {
  const t = useT();
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--sage) 35%, transparent), transparent 60%), linear-gradient(to bottom, var(--beige), var(--background))",
        }}
      />
      <BaroqueOrnament className="absolute top-6 left-1/2 -translate-x-1/2 w-40 text-deep/15" />
      <div className="container-prose pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-4">Broumovsko · 2026</p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] text-deep">
          {t("brand.name")}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("brand.tag")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/ubytovani">
              {t("hero.cta")} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/trasy">{t("hero.cta2")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function InfoBar() {
  const t = useT();
  const items = [
    { icon: MapPin, label: t("info.address") },
    { icon: ParkingSquare, label: t("info.parking") },
    { icon: Phone, label: t("info.phone") },
    { icon: Coins, label: t("info.priceFrom") },
  ];
  return (
    <section className="container-prose -mt-10 relative z-10">
      <div className="card-soft grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 overflow-hidden">
        {items.map((it) => (
          <div key={it.label} className="bg-card p-5 flex items-start gap-3">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-accent/30 text-deep shrink-0">
              <it.icon className="w-4 h-4" />
            </span>
            <span className="text-sm leading-snug">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Teasers() {
  const t = useT();
  const cards = [
    { to: "/ubytovani", icon: BedDouble, title: t("nav.stay"), desc: t("stay.lead") },
    { to: "/trasy", icon: Mountain, title: t("nav.routes"), desc: t("routes.lead") },
    { to: "/okoli", icon: Map, title: t("nav.area"), desc: t("area.lead") },
  ] as const;
  return (
    <section className="container-prose mt-24 mb-12">
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="card-soft card-soft-hover p-7 block">
            <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-accent/40 text-deep mb-5">
              <c.icon className="w-5 h-5" />
            </span>
            <h3 className="font-display text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{c.desc}</p>
            <span className="mt-5 inline-flex items-center text-sm text-deep font-medium">
              {t("routes.more")} <ArrowRight className="ml-1 w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BaroqueOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 30 C 40 30 40 10 80 10 C 100 10 100 30 100 30 C 100 30 100 50 120 50 C 160 50 160 30 200 30" />
      <circle cx="100" cy="30" r="3" fill="currentColor" />
      <circle cx="60" cy="20" r="1.5" fill="currentColor" />
      <circle cx="140" cy="40" r="1.5" fill="currentColor" />
    </svg>
  );
}
