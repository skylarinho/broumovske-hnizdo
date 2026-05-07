import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/i18n";

const LAT = 50.5853;
const LON = 16.3318;

type Current = { temp: number; code: number };
type DailyDay = { date: string; code: number; min: number; max: number };

type WeatherData = {
  current: Current;
  daily: DailyDay[];
};

function codeToIcon(code: number): LucideIcon {
  if (code === 0) return Sun;
  if (code === 1 || code === 2) return CloudSun;
  if (code === 3) return Cloud;
  if (code === 45 || code === 48) return CloudFog;
  if (code >= 51 && code <= 57) return CloudDrizzle;
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return CloudRain;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return CloudSnow;
  if (code >= 95) return CloudLightning;
  return Cloud;
}

function codeToLabel(code: number, lang: "cs" | "en"): string {
  const map: Record<number, [string, string]> = {
    0: ["Jasno", "Clear"],
    1: ["Skoro jasno", "Mainly clear"],
    2: ["Polojasno", "Partly cloudy"],
    3: ["Zataženo", "Overcast"],
    45: ["Mlha", "Fog"],
    48: ["Námraza", "Rime fog"],
    51: ["Mrholení", "Drizzle"],
    53: ["Mrholení", "Drizzle"],
    55: ["Mrholení", "Drizzle"],
    61: ["Slabý déšť", "Light rain"],
    63: ["Déšť", "Rain"],
    65: ["Silný déšť", "Heavy rain"],
    71: ["Slabé sněžení", "Light snow"],
    73: ["Sněžení", "Snow"],
    75: ["Silné sněžení", "Heavy snow"],
    77: ["Sněhová zrna", "Snow grains"],
    80: ["Přeháňky", "Showers"],
    81: ["Přeháňky", "Showers"],
    82: ["Silné přeháňky", "Heavy showers"],
    85: ["Sněhové přeháňky", "Snow showers"],
    86: ["Sněhové přeháňky", "Snow showers"],
    95: ["Bouřka", "Thunderstorm"],
    96: ["Bouřka s kroupami", "Thunder + hail" ],
    99: ["Bouřka s kroupami", "Thunder + hail"],
  };
  return (map[code] ?? ["—", "—"])[lang === "cs" ? 0 : 1];
}

let cached: { data: WeatherData; ts: number } | null = null;

async function fetchWeather(): Promise<WeatherData> {
  if (cached && Date.now() - cached.ts < 15 * 60 * 1000) return cached.data;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FPrague&forecast_days=3`;
  const res = await fetch(url);
  const json = await res.json();
  const data: WeatherData = {
    current: {
      temp: Math.round(json.current.temperature_2m),
      code: json.current.weather_code,
    },
    daily: json.daily.time.map((date: string, i: number) => ({
      date,
      code: json.daily.weather_code[i],
      min: Math.round(json.daily.temperature_2m_min[i]),
      max: Math.round(json.daily.temperature_2m_max[i]),
    })),
  };
  cached = { data, ts: Date.now() };
  return data;
}

export function WeatherBadge({ className = "" }: { className?: string }) {
  const [data, setData] = useState<WeatherData | null>(null);
  useEffect(() => {
    fetchWeather().then(setData).catch(() => {});
  }, []);
  if (!data) return null;
  const Icon = codeToIcon(data.current.code);
  return (
    <a
      href="#pocasi"
      className={`inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors ${className}`}
      title="Aktuální počasí v Broumově"
    >
      <Icon className="w-4 h-4 text-deep" />
      <span className="font-medium tabular-nums">{data.current.temp}°</span>
    </a>
  );
}

export function WeatherForecast() {
  const { lang } = useLang();
  const [data, setData] = useState<WeatherData | null>(null);
  useEffect(() => {
    fetchWeather().then(setData).catch(() => {});
  }, []);

  const dayLabel = (date: string, idx: number) => {
    if (idx === 0) return lang === "cs" ? "Dnes" : "Today";
    if (idx === 1) return lang === "cs" ? "Zítra" : "Tomorrow";
    const d = new Date(date);
    return d.toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-US", { weekday: "long" });
  };

  return (
    <section id="pocasi" className="container-prose pt-20 scroll-mt-20">
      <header className="max-w-2xl mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">
          {lang === "cs" ? "Počasí" : "Weather"}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-deep">
          {lang === "cs" ? "Počasí v Broumově" : "Weather in Broumov"}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {lang === "cs"
            ? "Předpověď na nejbližší dny, ať víš, co si zabalit."
            : "Forecast for the next few days so you know what to pack."}
        </p>
      </header>

      {!data ? (
        <div className="card-soft p-8 text-center text-sm text-muted-foreground">
          {lang === "cs" ? "Načítám…" : "Loading…"}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {data.daily.map((d, i) => {
            const Icon = codeToIcon(d.code);
            return (
              <div
                key={d.date}
                className={`card-soft p-4 md:p-6 text-center ${i === 0 ? "bg-secondary/40 ring-1 ring-deep/20" : ""}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-deep/70 mb-3">
                  {dayLabel(d.date, i)}
                </p>
                <Icon className="w-10 h-10 md:w-12 md:h-12 mx-auto text-deep" />
                <p className="mt-3 text-xs text-muted-foreground min-h-[2.5em]">
                  {codeToLabel(d.code, lang)}
                </p>
                <p className="mt-2 font-display text-xl md:text-2xl font-semibold text-deep tabular-nums">
                  {d.max}° <span className="text-muted-foreground/70 text-base">/ {d.min}°</span>
                </p>
              </div>
            );
          })}
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground text-right">
        {lang === "cs" ? "Data: Open-Meteo" : "Data: Open-Meteo"}
      </p>
    </section>
  );
}
