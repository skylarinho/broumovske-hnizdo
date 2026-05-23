import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ParkingSquare, Phone, Coins, Footprints, Mountain, Clock, ExternalLink, ShoppingBasket, Landmark, UtensilsCrossed, Beer, Church, Check, Quote, Martini, Bus, TrainFront, Coffee, Banknote, Milk } from "lucide-react";
import { useState } from "react";
import { useLang, useT } from "@/i18n";
import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/site/before-after";
import { BookingWidget } from "@/components/site/booking";
import { HScroll } from "@/components/site/h-scroll";
import { WeatherForecast } from "@/components/site/weather";
import { trails, type Trail } from "@/data/trails";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Broumovské hnízdo — ubytování v Broumově" },
      { name: "description", content: "Útulné ubytování 1+kk v centru Broumova. Rezervujte termín přes WhatsApp." },
      { property: "og:title", content: "Broumovské hnízdo" },
      { property: "og:description", content: "Útulné ubytování v srdci Broumovska s tipy na výlety." },
    ],
  }),
  component: HomePage,
});

const galleryPhotos = [
  "/broumov_in_1.jpg",
  "/broumov_in_2.jpg",
  "/broumov_in_11.jpg",
  "/broumov_in_12.jpg",
  "/broumov_in_13.jpg",
  "/broumov_in_14.jpg",
  "/broumov_in_8.jpg",
  "/broumov_in_9.jpg",
  "/broumov_in_10.jpg",
  "/broumov_out_1.jpg",
  "/broumov_out_2.jpg",
  "/broumov_out_3.jpg",
];

const pois = [
  { icon: ParkingSquare, name: { cs: "Parkování", en: "Parking" }, distance: "u domu", longDesc: { cs: "Veřejné parkoviště přímo u domu, místa bývají i večer. Bez poplatku.", en: "Public parking right by the house, usually free spots even in the evening." }, mapy: "https://mapy.cz/zakladni?q=parkoviste+mestsky+urad+Broumov&source=firm&id=ChIJ-XWsyT1DDkcRPXgw2XCpHbM", google: "https://www.google.com/maps/search/?api=1&query=50.5877124,16.3302416" },
  { icon: UtensilsCrossed, name: { cs: "Restaurace Lokál", en: "Lokál" }, distance: "50 m", longDesc: { cs: "Klasická česká kuchyně, příjemná obsluha, občas i koncert. Doporučuji rezervaci.", en: "Czech classics, friendly service, occasional live music. Booking recommended." }, mapy: "https://mapy.cz/zakladni?q=Lok%C3%A1l+Broumov&source=firm&id=ChIJyZAr3ZZDDkcRYA3tjag5bOk", google: "https://www.google.com/maps/search/?api=1&query=50.5870977,16.3318453" },
  { icon: ShoppingBasket, name: { cs: "Lidl", en: "Lidl" }, distance: "100 m", longDesc: { cs: "Otevřeno denně, stačí přejít ulici. Ideální pro rychlý nákup snídaně nebo večeře.", en: "Open daily, just across the street. Perfect for a quick breakfast or dinner run." }, mapy: "https://mapy.cz/zakladni?q=Lidl+Broumov&source=firm&id=ChIJV6hYzT1DDkcR_J1eYREPx2I", google: "https://www.google.com/maps/search/?api=1&query=50.5885544,16.3299471" },
  { icon: Landmark, name: { cs: "Klášter Broumov", en: "Broumov Monastery" }, distance: "100 m", longDesc: { cs: "Jeden z nejvýznamnějších barokních klášterů u nás. Prohlídky, kavárna, výstavy a krásná zahrada.", en: "One of the most important Baroque monasteries in the country. Tours, café, exhibitions and a lovely garden." }, mapy: "https://mapy.cz/zakladni?q=Kl%C3%A1%C5%A1ter+Broumov&source=firm&id=ChIJ824ENhZDDkcRWncBkTvxG-0", google: "https://www.google.com/maps/search/?api=1&query=50.5866287,16.3336243" },
  { icon: Bus, name: { cs: "Zastávka Broumov, MěÚ", en: "Bus stop Broumov, MěÚ" }, distance: "100 m", longDesc: { cs: "Z téhle zastávky se dostaneš autobusem prakticky ke všem turistickým cílům v okolí – Adršpach, Stěny, Police, Machov.", en: "From this stop you can reach almost all hiking destinations in the area by bus." }, mapy: "https://mapy.cz/zakladni?q=zast%C3%A1vka+Broumov+M%C4%9B%C3%9A", google: "https://www.google.com/maps/search/?api=1&query=50.5877,16.3302" },
  { icon: Coffee, name: { cs: "Café Dientzenhofer", en: "Café Dientzenhofer" }, distance: "150 m", longDesc: { cs: "Na pořádnou kávu v příjemném prostředí u kláštera. Kromě kávy si tu koupíš i místní produkty – sýry, broumovské oplatky a šperky.", en: "Proper coffee in a lovely spot by the monastery. You can also buy local products here — cheeses, Broumov wafers and jewellery." }, mapy: "https://mapy.cz/zakladni?q=Caf%C3%A9+Dientzenhofer+Broumov&source=firm&id=ChIJPYzBOhZDDkcRW-WiapaJR9I", google: "https://www.google.com/maps/search/?api=1&query=50.5861328,16.3339624" },
  { icon: ShoppingBasket, name: { cs: "Potraviny u Šafáře", en: "Potraviny u Šafáře (grocery)" }, distance: "150 m", longDesc: { cs: "Lokální produkty, skvělý masový pult a super výběr. O víkendu otevřeno do 11:00. Nezapomeň si u pokladny pamatovat číslo košíku.", en: "Local products, a great meat counter and excellent selection. Weekends open until 11am. Don't forget to remember your basket number at the till." }, mapy: "https://mapy.cz/zakladni?q=Potraviny+u+%C5%A0af%C3%A1%C5%99e+Broumov", google: "https://www.google.com/maps/search/?api=1&query=Potraviny+u+%C5%A0af%C3%A1%C5%99e+Broumov" },
  { icon: Banknote, name: { cs: "Bankomaty Moneta, ČS, ČSOB", en: "ATMs Moneta, ČS, ČSOB" }, distance: "350 m", longDesc: { cs: "Tři bankomaty pohromadě na broumovském náměstí.", en: "Three ATMs together on Broumov's main square." }, mapy: "https://mapy.cz/zakladni?q=bankomat+n%C3%A1m%C4%9Bst%C3%AD+Broumov", google: "https://www.google.com/maps/search/?api=1&query=50.5865,16.3310" },
  { icon: UtensilsCrossed, name: { cs: "Café Restaurant Domíno", en: "Café Restaurant Domíno" }, distance: "350 m", longDesc: { cs: "Když máš chuť na topinku a Krakonoše. Klasika.", en: "Go for a topinka and a Krakonoš beer. Classic." }, mapy: "https://mapy.cz/zakladni?q=Dom%C3%ADno+Broumov&source=firm&id=ChIJy0EEd_FDDkcRFEOaIVcfRAI", google: "https://www.google.com/maps/search/?api=1&query=50.5890284,16.3294422" },
  { icon: Beer, name: { cs: "U tří růží", en: "U tří růží" }, distance: "400 m", longDesc: { cs: "Místní hospůdka s broumovským Opatem a poctivými jídly. Atmosféra jako z minulého století.", en: "Local pub with Broumov's Opat beer and hearty meals. Old-school atmosphere." }, mapy: "https://mapy.cz/zakladni?q=U+T%C5%99%C3%AD+r%C5%AF%C5%BE%C3%AD+Broumov&source=firm&id=ChIJA_mnClZDDkcR4Ka79aupDtM", google: "https://www.google.com/maps/search/?api=1&query=50.5858278,16.3337943" },
  { icon: Beer, name: { cs: "Alka – Bar Restaurant", en: "Alka – Bar Restaurant" }, distance: "600 m", longDesc: { cs: "Tankové pivo, teplá kuchyně a sportovní přenosy. Když chceš zápas s pivem v ruce.", en: "Tank beer, hot food and live sports broadcasts." }, mapy: "https://mapy.cz/zakladni?q=Alka+Broumov&source=firm&id=ChIJK8Nx1BlDDkcR7jvBJNXUItE", google: "https://www.google.com/maps/search/?api=1&query=50.5828373,16.3344639" },
  { icon: Martini, name: { cs: "Bar Terno", en: "Bar Terno" }, distance: "600 m", longDesc: { cs: "Legendární bar za zvonkem, kam se místní přesouvají po desáté — ať už za hudbou nebo kartami.", en: "Legendary bar (ring the bell) where locals move after 10pm — for music or cards." }, mapy: "https://mapy.cz/zakladni?q=Bar+Terno+Broumov&source=firm&id=ChIJ51T81BlDDkcRCQB8hivmeIU", google: "https://www.google.com/maps/search/?api=1&query=50.5829343,16.3344873" },
  { icon: UtensilsCrossed, name: { cs: "Restaurace U Kostela", en: "U Kostela Restaurant" }, distance: "1 km", longDesc: { cs: "Když máš pořádný hlad po výletu – sem se vejde i druhá večeře. Mega porce.", en: "When you're seriously hungry after a hike — portions are massive." }, mapy: "https://mapy.cz/zakladni?q=Restaurace+U+Kostela+Broumov&source=firm&id=ChIJzUqj4hhDDkcRUSpAvuxp3qc", google: "https://www.google.com/maps/search/?api=1&query=50.5800246,16.3324166" },
  { icon: Church, name: { cs: "Dřevěný kostel", en: "Wooden church" }, distance: "1,1 km", longDesc: { cs: "Hřbitovní kostel Panny Marie ze 14. století – unikátní dřevěná stavba, kterou nesmíš minout.", en: "14th-century wooden cemetery church — a unique landmark you shouldn't miss." }, mapy: "https://mapy.cz/zakladni?q=h%C5%99bitovn%C3%AD+kostel+Broumov&source=firm&id=ChIJe9PFGRlDDkcRo4v7Bf6xf88", google: "https://www.google.com/maps/search/?api=1&query=50.5794736,16.3328482" },
  { icon: TrainFront, name: { cs: "Železniční zastávka", en: "Train station" }, distance: "1,2 km", longDesc: { cs: "Vlakové spojení do Náchoda, Hradce Králové i dál.", en: "Train connections to Náchod, Hradec Králové and beyond." }, mapy: "https://mapy.cz/zakladni?q=%C5%BEelezni%C4%8Dn%C3%AD+stanice+Broumov&source=firm&id=ChIJocUXxJ5DDkcR77Bnpp55t6I", google: "https://www.google.com/maps/search/?api=1&query=50.5806255,16.3392616" },
  { icon: Milk, name: { cs: "Braunaer – Sýrárna Broumov", en: "Braunaer – Broumov Cheese Dairy" }, distance: "2 km", longDesc: { cs: "Místní sýrárna s broumovskými sýry – skvělý dárek nebo svačina na výlet.", en: "Local cheese dairy with Broumov cheeses — great gift or hiking snack." }, mapy: "https://mapy.cz/zakladni?q=S%C3%BDr%C3%A1rna+Broumov&source=firm&id=ChIJ4XDryglDDkcRfCB-3XLBuSE", google: "https://www.google.com/maps/search/?api=1&query=50.5742309,16.3359989" },
];



function HomePage() {
  return (
    <>
      <Hero />
      <InfoBar />
      <StaySection />
      <PricesSection />
      <AreaSection />
      <MidBookCTA />
      <RoutesSection />
      <HistorySection />
      <TestimonialsSection />
      <BookSection />
      <WeatherForecast />
      <ArrivalLink />
    </>
  );
}

function MidBookCTA() {
  const t = useT();
  return (
    <section className="container-prose pt-20">
      <div className="card-soft p-8 md:p-10 text-center bg-gradient-to-br from-secondary/60 to-accent/20">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{t("mid.eyebrow")}</p>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-deep">{t("mid.title")}</h3>
        <Button asChild size="lg" className="rounded-full mt-6">
          <a href="#book">
            {t("book.title")} <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}

function ArrivalLink() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="container-prose pt-20 pb-12">
      <Link
        to="/prijezd"
        className="card-soft card-soft-hover p-6 flex items-center justify-between gap-4"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-1">FAQs & TODO</p>
          <h3 className="font-display text-xl font-semibold text-deep">
            🔑 {t("contact.checklist.title")}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === "cs" ? "Praktický průvodce krok za krokem." : "A practical step-by-step guide."}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-deep shrink-0" />
      </Link>
    </section>
  );
}

function Hero() {
  const t = useT();
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--sage) 35%, transparent), transparent 60%), linear-gradient(to bottom, var(--beige), var(--background))",
        }}
      />
      <BaroqueOrnament className="absolute top-6 left-1/2 -translate-x-1/2 w-40 text-deep/15" />
      <div className="container-prose pt-16 pb-16 md:pt-24 md:pb-20 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-4">{t("hero.eyebrow")}</p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] text-deep">
          {t("brand.name")}
        </h1>
        <p className="mt-6 font-display text-2xl md:text-3xl text-deep max-w-2xl mx-auto leading-snug">
          {t("brand.tag")}
        </p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t("hero.intro")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg" className="rounded-full">
            <a href="#book">{t("book.title")} <ArrowRight className="ml-2 w-4 h-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href="#ubytovani">{t("hero.cta2")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function InfoBar() {
  const t = useT();
  const items: { icon: any; label: string; href?: string; external?: boolean }[] = [
    { icon: MapPin, label: t("info.address"), href: "https://mapy.cz/zakladni?q=U%20Horn%C3%AD%20br%C3%A1ny%2022%2C%20Broumov", external: true },
    { icon: ParkingSquare, label: t("info.parking"), href: "https://mapy.cz/zakladni?q=U%20Horn%C3%AD%20br%C3%A1ny%2022%2C%20Broumov", external: true },
    { icon: Phone, label: t("info.phone"), href: "tel:+420776662256" },
    { icon: Coins, label: t("info.priceFrom"), href: "#ceny" },
  ];
  return (
    <section className="container-prose -mt-8 relative z-10">
      <div className="card-soft grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 overflow-hidden">
        {items.map((it) => {
          const inner = (
            <>
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-accent/30 text-deep shrink-0">
                <it.icon className="w-4 h-4" />
              </span>
              <span className="text-sm leading-snug">{it.label}</span>
            </>
          );
          const cls = "bg-card p-4 flex items-start gap-3 hover:bg-secondary/40 transition-colors";
          return it.href ? (
            <a key={it.label} href={it.href} className={cls} {...(it.external ? { target: "_blank", rel: "noreferrer" } : {})}>
              {inner}
            </a>
          ) : (
            <div key={it.label} className={cls}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="max-w-2xl mb-8">
      <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-deep">{title}</h2>
      {lead && <p className="mt-4 text-muted-foreground">{lead}</p>}
    </header>
  );
}

function BookSection() {
  const t = useT();
  return (
    <section id="book" className="container-prose pt-20 scroll-mt-20">
      <SectionHeader eyebrow={t("nav.contact")} title={t("book.title")} lead={t("book.lead")} />
      <BookingWidget />
    </section>
  );
}

function StaySection() {
  const t = useT();
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <section id="ubytovani" className="container-prose pt-20 scroll-mt-20">
      <SectionHeader eyebrow={t("nav.stay")} title={t("stay.title")} lead={t("stay.lead")} />

      <HScroll>
        {galleryPhotos.map((src) => (
          <button
            key={src}
            onClick={() => setLightbox(src)}
            className="snap-start shrink-0 w-[78%] sm:w-[48%] md:w-[32%] aspect-[4/3] overflow-hidden rounded-xl card-soft card-soft-hover"
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </HScroll>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{t("common.swipe")}</p>
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link to="/vybaveni">
            {t("stay.amenities")} <ArrowRight className="ml-1 w-3 h-3" />
          </Link>
        </Button>
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out">
          <img src={lightbox} alt="" className="max-h-full max-w-full rounded-lg" />
        </div>
      )}
    </section>
  );
}

function PricesSection() {
  const t = useT();
  const cards = [
    { title: t("prices.friends"), a: { label: t("prices.nights3"), price: "400 Kč" }, b: { label: t("prices.nights12"), price: "500 Kč" }, featured: true },
    { title: t("prices.friendsOfFriends"), a: { label: t("prices.nights3"), price: "600 Kč" }, b: { label: t("prices.nights12"), price: "700 Kč" }, featured: false },
  ];
  return (
    <section id="ceny" className="container-prose pt-20 scroll-mt-20">
      <SectionHeader eyebrow={t("nav.prices")} title={t("prices.title")} />
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((c) => (
          <div key={c.title} className={`card-soft p-7 ${c.featured ? "ring-1 ring-deep/30 bg-secondary/40" : ""}`}>
            <h3 className="font-display text-xl font-semibold mb-5">{c.title}</h3>
            <div className="space-y-3">
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
      <ul className="grid sm:grid-cols-2 gap-2 mt-6 max-w-3xl">
        {(["prices.t1","prices.t3","prices.t5"] as const).map((k) => (
          <li key={k} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-deep mt-0.5 shrink-0" />
            <span>{t(k)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AreaSection() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section id="okoli" className="container-prose pt-20 scroll-mt-20">
      <SectionHeader eyebrow={t("nav.area")} title={t("area.title")} lead={t("area.lead")} />
      <HScroll>
        {pois.map((p) => (
          <article key={p.name.cs} className="snap-start shrink-0 w-[78%] sm:w-[44%] md:w-[30%] card-soft p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-accent/40 text-deep">
                <p.icon className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-display font-semibold">{p.name[lang]}</h3>
                <p className="text-xs text-muted-foreground">{p.distance}</p>
              </div>
            </div>
            {p.longDesc[lang] && (
              <p className="text-sm text-muted-foreground">{p.longDesc[lang]}</p>
            )}
            {(p.mapy || p.google) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {p.mapy && (
                  <a href={p.mapy} target="_blank" rel="noreferrer" className="text-xs px-2.5 py-1 rounded-full border border-border hover:border-deep/40 inline-flex items-center gap-1">
                    Mapy.cz <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {p.google && (
                  <a href={p.google} target="_blank" rel="noreferrer" className="text-xs px-2.5 py-1 rounded-full border border-border hover:border-deep/40 inline-flex items-center gap-1">
                    Google <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </HScroll>
      <p className="text-xs text-muted-foreground mt-2">{t("common.swipe")}</p>
    </section>
  );
}

function RoutesSection() {
  const t = useT();
  const { lang } = useLang();
  const [active, setActive] = useState<Trail | null>(null);
  const visible = trails;
  return (
    <section id="trasy" className="container-prose pt-20 scroll-mt-20">
      <SectionHeader eyebrow={t("nav.routes")} title={t("routes.title")} lead={t("routes.lead")} />

      <HScroll>
        {visible.map((trail) => {
          const Icon = Footprints;
          return (
            <button
              key={trail.id}
              onClick={() => setActive(trail)}
              className="snap-start shrink-0 w-[80%] sm:w-[48%] md:w-[33%] card-soft card-soft-hover overflow-hidden flex flex-col text-left"
            >
              <div className="aspect-[5/3] overflow-hidden bg-muted">
                <img src={trail.photos[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-deep/80 mb-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-wider">{t(`diff.${trail.difficulty}` as const)}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{trail.name[lang]}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{trail.short[lang]}</p>
                <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-3">
                  <div className="flex items-center gap-1"><ArrowRight className="w-3 h-3" />{trail.lengthKm} km</div>
                  <div className="flex items-center gap-1"><Mountain className="w-3 h-3" />{trail.elevationM} m</div>
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{trail.duration[lang]}</div>
                </dl>
              </div>
            </button>
          );
        })}
      </HScroll>
      <p className="text-xs text-muted-foreground mt-2">{t("common.swipe")}</p>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          {active && <TrailDetail trail={active} />}
        </SheetContent>
      </Sheet>
    </section>
  );
}

function TrailDetail({ trail }: { trail: Trail }) {
  const t = useT();
  const { lang } = useLang();
  const Icon = Footprints;
  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-2 text-xs text-deep/80 mb-1">
          <Icon className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">{t(`diff.${trail.difficulty}` as const)}</span>
        </div>
        <SheetTitle className="font-display text-2xl text-left">{trail.name[lang]}</SheetTitle>
      </SheetHeader>

      <dl className="grid grid-cols-3 gap-3 mt-6">
        <div className="rounded-lg border border-border bg-secondary/40 p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("routes.length")}</div>
          <div className="font-display text-lg text-deep">{trail.lengthKm} km</div>
        </div>
        <div className="rounded-lg border border-border bg-secondary/40 p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("routes.elevation")}</div>
          <div className="font-display text-lg text-deep">{trail.elevationM} m</div>
        </div>
        <div className="rounded-lg border border-border bg-secondary/40 p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("routes.duration")}</div>
          <div className="font-display text-lg text-deep">{trail.duration[lang]}</div>
        </div>
      </dl>

      <p className="mt-6 text-sm leading-relaxed">{trail.description[lang]}</p>

      {trail.tip && (
        <div className="mt-5 p-4 rounded-lg border border-deep/15 bg-accent/15 text-sm">
          <div className="font-medium mb-1">{t("routes.tip")}</div>
          <p className="text-muted-foreground">{trail.tip[lang]}</p>
        </div>
      )}

      <h4 className="font-display font-semibold mt-8 mb-3">{t("routes.steps")}</h4>
      <ol className="space-y-2">
        {trail.steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-full bg-accent/40 text-deep text-xs font-medium">{i + 1}</span>
            <span className="pt-0.5">{s[lang]}</span>
          </li>
        ))}
      </ol>

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
      </div>
    </>
  );
}

function HistorySection() {
  const t = useT();
  return (
    <section id="historie" className="container-prose pt-20 scroll-mt-20">
      <SectionHeader eyebrow={t("history.title")} title={t("history.title")} lead={t("history.lead")} />
      <BeforeAfter
        before="/historie_2.jpeg"
        after="/historie_1.jpg"
        beforeLabel={t("history.before")}
        afterLabel={t("history.after")}
      />
    </section>
  );
}

const sampleNotes = [
  { cs: "Nádherné místo, vrátíme se. Děkujeme za klid a domácí atmosféru.", en: "Beautiful place — we'll be back. Thank you for the peace and homely vibe.", who: "H. & P." },
  { cs: "Hnízdo nás dobilo. Bez WiFi, ale ten klid a pohoda.", en: "The Nest recharged us. No WiFi, but such calm and ease.", who: "Eliška" },
  { cs: "Bylo tady super — jízda na kole, krásné procházky, super jídlo a ubytování vynikající.", en: "It was great here — cycling, beautiful walks, great food and excellent stay.", who: "Lenka a Petr" },
];

function TestimonialsSection() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section id="vzkazy" className="container-prose pt-20 scroll-mt-20">
      <SectionHeader eyebrow={t("testimonials.title")} title={t("testimonials.title")} lead={t("testimonials.lead")} />
      <HScroll>
        {sampleNotes.map((n, i) => (
          <article key={i} className="snap-start shrink-0 w-[80%] sm:w-[48%] md:w-[33%] card-soft p-6 bg-secondary/40 flex flex-col">
            <Quote className="w-6 h-6 text-deep/40 mb-3" />
            <p className="font-display italic text-lg leading-relaxed text-deep">{n[lang]}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-4">— {n.who}</p>
          </article>
        ))}
      </HScroll>
      <p className="text-xs text-muted-foreground mt-2">{t("common.swipe")}</p>
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
