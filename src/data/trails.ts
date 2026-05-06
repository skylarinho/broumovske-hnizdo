export type TrailType = "hike" | "bike" | "car";
export type Difficulty = "easy" | "medium" | "hard";

export type Trail = {
  id: string;
  type: TrailType;
  name: { cs: string; en: string };
  difficulty: Difficulty;
  lengthKm: number;
  elevationM: number;
  duration: { cs: string; en: string };
  short: { cs: string; en: string };
  description: { cs: string; en: string };
  tip?: { cs: string; en: string };
  warning?: { cs: string; en: string };
  steps: { cs: string; en: string }[];
  links: {
    googleMaps?: string;
    mapyCz?: string;
    web?: string;
  };
  photos: string[]; // placeholder unsplash URLs
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const trails: Trail[] = [
  {
    id: "broumovske-steny",
    type: "hike",
    name: { cs: "Broumovské stěny", en: "Broumov Walls" },
    difficulty: "medium",
    lengthKm: 8,
    elevationM: 300,
    duration: { cs: "3–4 hodiny", en: "3–4 hours" },
    short: {
      cs: "Skalní město s vyhlídkami a kaplí Hvězda.",
      en: "A rock town with viewpoints and the Hvězda chapel.",
    },
    description: {
      cs: "Klasika regionu. Pohodlný okruh skalním městem s několika vyhlídkami nad údolím a barokní kaplí Hvězda.",
      en: "A classic of the region. A pleasant loop through the rock city with viewpoints and the baroque Hvězda chapel.",
    },
    tip: { cs: "Vyrazte ráno, vyhnete se davům a chytíte měkké světlo na skalách.", en: "Start early — quieter trails and softer light on the rocks." },
    warning: { cs: "Některé úseky jsou kamenité, dejte si pozor po dešti.", en: "Some sections are rocky and slippery after rain." },
    steps: [
      { cs: "Start u parkoviště pod kaplí Hvězda", en: "Start at the Hvězda chapel car park" },
      { cs: "Kaple Hvězda", en: "Hvězda chapel" },
      { cs: "Vyhlídka Supí koš", en: "Supí koš viewpoint" },
      { cs: "Návrat lesní cestou", en: "Return via forest path" },
    ],
    links: { googleMaps: "https://maps.google.com/?q=Broumovské+stěny", mapyCz: "https://mapy.cz/s/broumovske-steny" },
    photos: [u("photo-1464822759023-fed622ff2c3b"), u("photo-1441974231531-c6227db76b6e"), u("photo-1465056836041-7f43ac27dcb5"), u("photo-1500382017468-9049fed747ef")],
  },
  {
    id: "adrspach",
    type: "hike",
    name: { cs: "Adršpašské skály", en: "Adršpach Rocks" },
    difficulty: "easy",
    lengthKm: 5,
    elevationM: 120,
    duration: { cs: "2–3 hodiny", en: "2–3 hours" },
    short: { cs: "Pohádkové skalní město s jezírkem.", en: "A fairy-tale rock town with a small lake." },
    description: { cs: "Nejznámější skalní město v Čechách s upraveným okruhem mezi pískovcovými věžemi.", en: "The most famous rock town in Bohemia with a maintained loop between sandstone towers." },
    tip: { cs: "Rezervujte si vstup online, v hlavní sezóně bývá plno.", en: "Book entry online — it gets busy in summer." },
    steps: [
      { cs: "Vstupní brána Adršpach", en: "Adršpach main gate" },
      { cs: "Sloní náměstí", en: "Elephant square" },
      { cs: "Jezírko + plavba", en: "Lake & short boat ride" },
    ],
    links: { web: "https://www.skalyadrspach.cz", googleMaps: "https://maps.google.com/?q=Adršpach", mapyCz: "https://mapy.cz/s/adrspach" },
    photos: [u("photo-1418065460487-3e41a6c84dc5"), u("photo-1470071459604-3b5ec3a7fe05"), u("photo-1426604966848-d7adac402bff"), u("photo-1447752875215-b2761acb3c5d")],
  },
  {
    id: "hvezda-bozanov",
    type: "hike",
    name: { cs: "Z Hvězdy do Božanova", en: "From Hvězda to Božanov" },
    difficulty: "medium",
    lengthKm: 12,
    elevationM: 350,
    duration: { cs: "4–5 hodin", en: "4–5 hours" },
    short: { cs: "Hřebenovka přes nejvyšší body stěn.", en: "Ridge walk over the highest points of the Walls." },
    description: { cs: "Krásná hřebenovka napříč stěnami s několika vyhlídkami a sestupem do malebné vesničky Božanov.", en: "A beautiful ridge crossing the Walls with several viewpoints and a descent to the picturesque village of Božanov." },
    steps: [
      { cs: "Kaple Hvězda", en: "Hvězda chapel" },
      { cs: "Božanovský Špičák", en: "Božanovský Špičák" },
      { cs: "Božanov", en: "Božanov" },
    ],
    links: { mapyCz: "https://mapy.cz/s/hvezda-bozanov" },
    photos: [u("photo-1469474968028-56623f02e42e"), u("photo-1501785888041-af3ef285b470"), u("photo-1472214103451-9374bd1c798e"), u("photo-1455218873509-8097305ee378")],
  },
  {
    id: "okruh-broumov",
    type: "bike",
    name: { cs: "Okruh kolem Broumova", en: "Loop around Broumov" },
    difficulty: "easy",
    lengthKm: 25,
    elevationM: 280,
    duration: { cs: "2 hodiny", en: "2 hours" },
    short: { cs: "Pohodový okruh po polních cestách.", en: "Easy loop along field paths." },
    description: { cs: "Mírně zvlněný okruh kolem Broumova s výhledy na stěny a návštěvou několika vesnických barokních kostelů.", en: "Gently rolling loop around Broumov with views of the Walls and visits to several baroque village churches." },
    steps: [
      { cs: "Broumov, klášter", en: "Broumov, monastery" },
      { cs: "Ruprechtice (dřevěný kostel)", en: "Ruprechtice (wooden church)" },
      { cs: "Heřmánkovice", en: "Heřmánkovice" },
      { cs: "Návrat", en: "Return" },
    ],
    links: { mapyCz: "https://mapy.cz/s/okruh-broumov" },
    photos: [u("photo-1517649763962-0c623066013b"), u("photo-1485965120184-e220f721d03e"), u("photo-1502920917128-1aa500764cbd"), u("photo-1517649763962-0c623066013b")],
  },
  {
    id: "polske-skaly",
    type: "bike",
    name: { cs: "Do Polska – Góry Stołowe", en: "To Poland – Stołowe Mountains" },
    difficulty: "medium",
    lengthKm: 45,
    elevationM: 700,
    duration: { cs: "5–6 hodin", en: "5–6 hours" },
    short: { cs: "Přejezd hranice k polským Stolovým horám.", en: "Cross-border ride to the Polish Table Mountains." },
    description: { cs: "Náročnější výlet přes hraniční přechod Otovice do oblasti Gór Stołowych s Errantem skal Szczeliniec.", en: "A demanding ride across the Otovice border into the Stołowe Mountains and the Szczeliniec rocks." },
    warning: { cs: "Vezměte si doklady, překračujete hranici.", en: "Bring ID — you'll cross the border." },
    steps: [
      { cs: "Broumov", en: "Broumov" },
      { cs: "Otovice (hranice)", en: "Otovice (border)" },
      { cs: "Kudowa-Zdrój", en: "Kudowa-Zdrój" },
      { cs: "Szczeliniec Wielki", en: "Szczeliniec Wielki" },
    ],
    links: { mapyCz: "https://mapy.cz/s/polske-skaly" },
    photos: [u("photo-1454496522488-7a8e488e8606"), u("photo-1444080748397-f442aa95c3e5"), u("photo-1505765050516-f72dcac9c60e"), u("photo-1502082553048-f009c37129b9")],
  },
  {
    id: "stenavske-udoli",
    type: "bike",
    name: { cs: "Stěnavské údolí", en: "Stěnava valley" },
    difficulty: "easy",
    lengthKm: 18,
    elevationM: 80,
    duration: { cs: "1,5 hodiny", en: "1.5 hours" },
    short: { cs: "Rovina podél řeky, vhodné i pro děti.", en: "Flat ride along the river, kid-friendly." },
    description: { cs: "Pohodlná cyklotrasa podél řeky Stěnavy, ideální pro rodiny s dětmi.", en: "Easy cycle path along the Stěnava river, perfect for families." },
    steps: [
      { cs: "Broumov", en: "Broumov" },
      { cs: "Meziměstí", en: "Meziměstí" },
      { cs: "Návrat", en: "Return" },
    ],
    links: { mapyCz: "https://mapy.cz/s/stenavske-udoli" },
    photos: [u("photo-1502082553048-f009c37129b9"), u("photo-1501785888041-af3ef285b470"), u("photo-1500534314209-a25ddb2bd429"), u("photo-1470770841072-f978cf4d019e")],
  },
  {
    id: "okruh-klastery",
    type: "car",
    name: { cs: "Okruh broumovských kostelů", en: "Loop of Broumov churches" },
    difficulty: "easy",
    lengthKm: 35,
    elevationM: 0,
    duration: { cs: "půl dne", en: "half a day" },
    short: { cs: "Devět barokních kostelů Dientzenhoferů.", en: "Nine baroque churches by the Dientzenhofers." },
    description: { cs: "Autem postupně objedete unikátní skupinu barokních kostelů, dílo Kryštofa a Kiliána Ignáce Dientzenhoferových.", en: "Drive between the unique group of baroque churches by Christoph and Kilian Ignaz Dientzenhofer." },
    tip: { cs: "Kostely jsou většinou zamčené, kombinujte s prohlídkou v Polici n. M.", en: "Churches are usually locked — combine with a tour in Police nad Metují." },
    steps: [
      { cs: "Broumov klášter", en: "Broumov monastery" },
      { cs: "Heřmánkovice", en: "Heřmánkovice" },
      { cs: "Vižňov", en: "Vižňov" },
      { cs: "Šonov", en: "Šonov" },
    ],
    links: { web: "https://www.broumovsko.cz", mapyCz: "https://mapy.cz/s/klastery" },
    photos: [u("photo-1548625149-fc4a29cf7092"), u("photo-1543340713-8c3a4c5a0e36"), u("photo-1520637836862-4d197d17c55a"), u("photo-1473773508845-188df298d2d1")],
  },
  {
    id: "orlicke-hory",
    type: "car",
    name: { cs: "Výlet do Orlických hor", en: "Trip to the Orlické hory" },
    difficulty: "easy",
    lengthKm: 60,
    elevationM: 0,
    duration: { cs: "celý den", en: "full day" },
    short: { cs: "Hřebenovka autem + krátké pěší okruhy.", en: "Ridge drive with short walking loops." },
    description: { cs: "Sjízdná hřebenovka přes Šerlich a Deštné s několika krátkými pěšími odbočkami.", en: "Drivable ridge over Šerlich and Deštné with short walking detours." },
    steps: [
      { cs: "Broumov", en: "Broumov" },
      { cs: "Olešnice v O. h.", en: "Olešnice v O. h." },
      { cs: "Šerlich", en: "Šerlich" },
      { cs: "Deštné", en: "Deštné" },
    ],
    links: { mapyCz: "https://mapy.cz/s/orlicke-hory" },
    photos: [u("photo-1470770841072-f978cf4d019e"), u("photo-1469474968028-56623f02e42e"), u("photo-1500382017468-9049fed747ef"), u("photo-1441974231531-c6227db76b6e"))],
  },
];
