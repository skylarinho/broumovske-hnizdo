import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBasket, ParkingSquare, Landmark, UtensilsCrossed, Beer, Church, Car, Bus, Train } from "lucide-react";
import { useLang, useT } from "@/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/okoli")({
  head: () => ({
    meta: [
      { title: "Poloha a okolí — Broumovské hnízdo" },
      { name: "description", content: "Body zájmu v okolí Broumova: klášter, restaurace, obchody. Doprava z Prahy, Brna a HK." },
      { property: "og:title", content: "Poloha a okolí — Broumovské hnízdo" },
      { property: "og:description", content: "Body zájmu a doprava do Broumova." },
    ],
  }),
  component: AreaPage,
});

type POI = {
  icon: any;
  name: { cs: string; en: string };
  distance: string;
  desc: { cs: string; en: string };
  google?: string;
  mapy?: string;
};

const pois: POI[] = [
  { icon: ShoppingBasket, name: { cs: "Lidl", en: "Lidl" }, distance: "100 m", desc: { cs: "Nejbližší obchod s potravinami.", en: "Closest grocery store." }, google: "https://maps.google.com/?q=Lidl+Broumov", mapy: "https://mapy.cz/zakladni?q=Lidl+Broumov" },
  { icon: ParkingSquare, name: { cs: "Parkování", en: "Parking" }, distance: "50 m", desc: { cs: "Bezplatné parkování blízko vchodu.", en: "Free parking near the entrance." } },
  { icon: Landmark, name: { cs: "Klášter Broumov", en: "Broumov Monastery" }, distance: "100 m", desc: { cs: "Barokní skvost s knihovnou a kryptou.", en: "Baroque gem with a library and crypt." }, google: "https://maps.google.com/?q=Klášter+Broumov", mapy: "https://mapy.cz/zakladni?q=Klášter+Broumov" },
  { icon: UtensilsCrossed, name: { cs: "Restaurace Lokál", en: "Lokál restaurant" }, distance: "300 m", desc: { cs: "Teplá jídla, živá hudba, pivo od 38 Kč.", en: "Hot meals, live music, beer from 38 CZK." } },
  { icon: Beer, name: { cs: "U tří růží", en: "U tří růží" }, distance: "400 m", desc: { cs: "Místní pivo Opat a domácí kuchyně.", en: "Local Opat beer and home-style cooking." } },
  { icon: Church, name: { cs: "Dřevěný kostel", en: "Wooden church" }, distance: "1,5 km", desc: { cs: "Hřbitovní kostel Panny Marie, jeden z nejstarších v Česku.", en: "One of the oldest wooden churches in the country." } },
];

function AreaPage() {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="container-prose py-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{t("nav.area")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-deep">{t("area.title")}</h1>
        <p className="mt-5 text-muted-foreground text-lg">{t("area.lead")}</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {pois.map((p) => (
          <article key={p.name.cs} className="card-soft card-soft-hover p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-accent/40 text-deep">
                <p.icon className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-display font-semibold">{p.name[lang]}</h3>
                <p className="text-xs text-muted-foreground">{p.distance}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex-1">{p.desc[lang]}</p>
            {(p.google || p.mapy) && (
              <div className="flex flex-wrap gap-2 mt-4 text-xs">
                {p.mapy && (
                  <a href={p.mapy} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-border hover:border-deep/40">
                    {t("area.mapycz")}
                  </a>
                )}
                {p.google && (
                  <a href={p.google} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-border hover:border-deep/40">
                    {t("area.gmaps")}
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-semibold text-deep mb-6">{t("transport.title")}</h2>
        <Tabs defaultValue="prague" className="w-full">
          <TabsList className="bg-secondary/60">
            <TabsTrigger value="prague">{t("transport.fromPrague")}</TabsTrigger>
            <TabsTrigger value="brno">{t("transport.fromBrno")}</TabsTrigger>
            <TabsTrigger value="hk">{t("transport.fromHK")}</TabsTrigger>
          </TabsList>
          <TransportTab value="prague" car={{ time: "~2,5 hod", dist: "160 km", note: "D10 + I/14" }} pt={{ icon: Bus, time: "~3 hod", note: lang === "cs" ? "Přímý bus z Florence (ČSAD)" : "Direct bus from Florenc (ČSAD)" }} />
          <TransportTab value="brno" car={{ time: "~2,5 hod", dist: "180 km", note: "D1 + I/37" }} pt={{ icon: Train, time: "~3,5 hod", note: lang === "cs" ? "Vlak do HK + bus do Broumova" : "Train to HK + bus to Broumov" }} />
          <TransportTab value="hk" car={{ time: "~1 hod", dist: "60 km", note: "I/37" }} pt={{ icon: Bus, time: "~1,5 hod", note: lang === "cs" ? "Přímé autobusové spojení" : "Direct bus connection" }} />
        </Tabs>
      </section>
    </div>
  );
}

function TransportTab({
  value,
  car,
  pt,
}: {
  value: string;
  car: { time: string; dist: string; note: string };
  pt: { icon: any; time: string; note: string };
}) {
  const t = useT();
  return (
    <TabsContent value={value} className="grid sm:grid-cols-2 gap-5 mt-6">
      <div className="card-soft p-6">
        <div className="flex items-center gap-2 mb-3">
          <Car className="w-4 h-4 text-deep" />
          <h4 className="font-display font-semibold">{t("transport.car")}</h4>
        </div>
        <p className="text-2xl font-display text-deep">{car.time}</p>
        <p className="text-sm text-muted-foreground">{car.dist} · {car.note}</p>
      </div>
      <div className="card-soft p-6">
        <div className="flex items-center gap-2 mb-3">
          <pt.icon className="w-4 h-4 text-deep" />
          <h4 className="font-display font-semibold">{t("transport.publicTransport")}</h4>
        </div>
        <p className="text-2xl font-display text-deep">{pt.time}</p>
        <p className="text-sm text-muted-foreground">{pt.note}</p>
      </div>
    </TabsContent>
  );
}
