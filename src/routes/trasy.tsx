import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Footprints, Bike, Car, Mountain, Clock, ArrowRight, ExternalLink, Lightbulb, AlertTriangle } from "lucide-react";
import { useLang, useT } from "@/i18n";
import { trails, type Trail, type TrailType } from "@/data/trails";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trasy")({
  head: () => ({
    meta: [
      { title: "Výlety a trasy — Broumovské hnízdo" },
      { name: "description", content: "Pěší, cyklo i auto trasy v okolí Broumova: Broumovské stěny, Adršpach a další." },
      { property: "og:title", content: "Výlety a trasy — Broumovské hnízdo" },
      { property: "og:description", content: "Tipy na trasy v okolí Broumova." },
    ],
  }),
  component: RoutesPage,
});

const typeIcon: Record<TrailType, any> = { hike: Footprints, bike: Bike, car: Car };

function RoutesPage() {
  const t = useT();
  const { lang } = useLang();
  const [filter, setFilter] = useState<"all" | TrailType>("all");
  const [active, setActive] = useState<Trail | null>(null);

  const counts = useMemo(() => ({
    all: trails.length,
    hike: trails.filter((x) => x.type === "hike").length,
    bike: trails.filter((x) => x.type === "bike").length,
    car: trails.filter((x) => x.type === "car").length,
  }), []);

  const visible = filter === "all" ? trails : trails.filter((x) => x.type === filter);

  const filters = [
    { key: "all" as const, label: t("routes.all") },
    { key: "hike" as const, label: t("routes.hike") },
    { key: "bike" as const, label: t("routes.bike") },
    { key: "car" as const, label: t("routes.car") },
  ];

  return (
    <div className="container-prose py-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{t("nav.routes")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-deep">{t("routes.title")}</h1>
        <p className="mt-5 text-muted-foreground text-lg">{t("routes.lead")}</p>
      </header>

      <div className="flex flex-wrap gap-2 mt-10">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors inline-flex items-center gap-2 ${
              filter === f.key
                ? "bg-deep text-primary-foreground border-deep"
                : "bg-card border-border hover:border-deep/40"
            }`}
          >
            {f.label}
            <span className={`text-xs ${filter === f.key ? "opacity-80" : "text-muted-foreground"}`}>
              {counts[f.key]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {visible.map((trail) => {
          const Icon = typeIcon[trail.type];
          return (
            <article key={trail.id} className="card-soft card-soft-hover overflow-hidden flex flex-col">
              <div className="aspect-[5/3] overflow-hidden bg-muted">
                <img src={trail.photos[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-deep/80 mb-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wider">{t(`diff.${trail.difficulty}` as const)}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{trail.name[lang]}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{trail.short[lang]}</p>
                <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-4">
                  <div className="flex items-center gap-1"><ArrowRight className="w-3 h-3" />{trail.lengthKm} km</div>
                  <div className="flex items-center gap-1"><Mountain className="w-3 h-3" />{trail.elevationM} m</div>
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{trail.duration[lang]}</div>
                </dl>
                <Button onClick={() => setActive(trail)} variant="outline" className="mt-5 rounded-full self-start">
                  {t("routes.more")}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          {active && <TrailDetail trail={active} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function TrailDetail({ trail }: { trail: Trail }) {
  const t = useT();
  const { lang } = useLang();
  const Icon = typeIcon[trail.type];
  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-2 text-xs text-deep/80 mb-1">
          <Icon className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">{t(`diff.${trail.difficulty}` as const)}</span>
        </div>
        <SheetTitle className="font-display text-2xl">{trail.name[lang]}</SheetTitle>
      </SheetHeader>

      <dl className="grid grid-cols-3 gap-3 mt-6">
        <Stat label={t("routes.length")} value={`${trail.lengthKm} km`} />
        <Stat label={t("routes.elevation")} value={`${trail.elevationM} m`} />
        <Stat label={t("routes.duration")} value={trail.duration[lang]} />
      </dl>

      <p className="mt-6 text-sm leading-relaxed text-foreground/90">{trail.description[lang]}</p>

      {trail.tip && (
        <Callout icon={Lightbulb} title={t("routes.tip")} tone="sage">
          {trail.tip[lang]}
        </Callout>
      )}
      {trail.warning && (
        <Callout icon={AlertTriangle} title={t("routes.warning")} tone="warn">
          {trail.warning[lang]}
        </Callout>
      )}

      <h4 className="font-display font-semibold mt-8 mb-3">{t("routes.steps")}</h4>
      <ol className="space-y-2">
        {trail.steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-full bg-accent/40 text-deep text-xs font-medium">
              {i + 1}
            </span>
            <span className="pt-0.5">{s[lang]}</span>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-2 gap-2 mt-8">
        {trail.photos.slice(0, 4).map((p, i) => (
          <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
            <img src={p} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-8">
        {trail.links.googleMaps && (
          <a href={trail.links.googleMaps} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-deep/40 inline-flex items-center gap-1">
            Google Maps <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {trail.links.mapyCz && (
          <a href={trail.links.mapyCz} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-deep/40 inline-flex items-center gap-1">
            Mapy.cz <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {trail.links.web && (
          <a href={trail.links.web} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-deep/40 inline-flex items-center gap-1">
            {t("routes.web")} <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-lg text-deep">{value}</div>
    </div>
  );
}

function Callout({ icon: Icon, title, tone, children }: { icon: any; title: string; tone: "sage" | "warn"; children: React.ReactNode }) {
  return (
    <div className={`mt-5 p-4 rounded-lg border text-sm ${tone === "warn" ? "border-amber-300/60 bg-amber-50/60" : "border-deep/15 bg-accent/15"}`}>
      <div className="flex items-center gap-2 mb-1 font-medium">
        <Icon className="w-4 h-4 text-deep" />
        {title}
      </div>
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}
