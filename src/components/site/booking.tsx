import { useMemo, useState } from "react";
import { format } from "date-fns";
import { cs as csLocale, enUS } from "date-fns/locale";
import { CalendarIcon, MessageCircle, Phone } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLang, useT } from "@/i18n";
import { cn } from "@/lib/utils";

const PHONE = "420776662256";
const PHONE_DISPLAY = "+420 776 66 22 56";

// Obsazené termíny — uprav podle potřeby (rozsah včetně obou krajních dnů)
const BOOKED_RANGES: { from: Date; to: Date }[] = [
  { from: new Date(2026, 4, 8), to: new Date(2026, 4, 10) },
  { from: new Date(2026, 4, 20), to: new Date(2026, 4, 24) },
  { from: new Date(2026, 5, 15), to: new Date(2026, 5, 17) },
  { from: new Date(2026, 5, 27), to: new Date(2026, 6, 1) },
  { from: new Date(2026, 6, 9), to: new Date(2026, 6, 16) },
  { from: new Date(2026, 6, 20), to: new Date(2026, 6, 26) },
  { from: new Date(2026, 6, 29), to: new Date(2026, 7, 2) },
  
  { from: new Date(2026, 7, 20), to: new Date(2026, 7, 23) },
  { from: new Date(2026, 7, 24), to: new Date(2026, 7, 31) },
  { from: new Date(2026, 8, 3), to: new Date(2026, 8, 5) },
  { from: new Date(2026, 11, 23), to: new Date(2026, 11, 26) },

];

const DAY_MS = 86400000;
const startOfDay = (d: Date) => new Date(d).setHours(0, 0, 0, 0);

function isBooked(d: Date) {
  const t = startOfDay(d);
  return BOOKED_RANGES.some((r) => t > startOfDay(r.from) && t < startOfDay(r.to));
}

// Den odjezdu = ráno obsazené, odpoledne volné
function isCheckoutHalf(d: Date) {
  const t = startOfDay(d);
  return BOOKED_RANGES.some((r) => t === startOfDay(r.to));
}

// Den příjezdu = ráno volné (příprava), odpoledne obsazené
function isCheckinHalf(d: Date) {
  const t = startOfDay(d);
  return BOOKED_RANGES.some((r) => t === startOfDay(r.from));
}

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const { lang } = useLang();
  const locale = lang === "cs" ? csLocale : enUS;
  const [range, setRange] = useState<DateRange | undefined>();
  const [name, setName] = useState("");
  const [people, setPeople] = useState("2");
  const [note, setNote] = useState("");

  const nights = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return Math.max(0, Math.round((+range.to - +range.from) / 86400000));
  }, [range]);

  const dateLabel = range?.from
    ? range.to
      ? `${format(range.from, "d. M.", { locale })} – ${format(range.to, "d. M. yyyy", { locale })}`
      : format(range.from, "d. M. yyyy", { locale })
    : lang === "cs" ? "Vyber termín" : "Pick dates";

  const message = useMemo(() => {
    const lines = lang === "cs"
      ? [
          `Ahoj, rád/a bych si rezervoval/a Broumovské hnízdo.`,
          range?.from ? `Termín: ${dateLabel}${nights ? ` (${nights} ${nights === 1 ? "noc" : nights < 5 ? "noci" : "nocí"})` : ""}` : null,
          `Počet osob: ${people}`,
          name ? `Jméno: ${name}` : null,
          note ? `\n${note}` : null,
        ]
      : [
          `Hi, I'd like to book Broumov Nest.`,
          range?.from ? `Dates: ${dateLabel}${nights ? ` (${nights} night${nights === 1 ? "" : "s"})` : ""}` : null,
          `Guests: ${people}`,
          name ? `Name: ${name}` : null,
          note ? `\n${note}` : null,
        ];
    return lines.filter(Boolean).join("\n");
  }, [dateLabel, nights, name, note, people, range, lang]);

  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <div className={cn("card-soft p-6 md:p-7 grid gap-4", compact ? "" : "md:grid-cols-[1.1fr_1fr]") }>
      <div className="space-y-3">
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            {lang === "cs" ? "Termín pobytu" : "Stay dates"}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="mt-1.5 w-full justify-start text-left font-normal rounded-lg">
                <CalendarIcon className="mr-2 h-4 w-4 text-deep" />
                {dateLabel}
                {nights > 0 && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {nights} {lang === "cs" ? (nights === 1 ? "noc" : nights < 5 ? "noci" : "nocí") : nights === 1 ? "night" : "nights"}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={1}
                disabled={[
                  (d: Date) => d < new Date(new Date().setHours(0, 0, 0, 0)),
                  (d: Date) => isBooked(new Date(d)) || isCheckinHalf(new Date(d)),
                ]}
                modifiers={{
                  booked: (d: Date) => isBooked(new Date(d)),
                  checkoutHalf: (d: Date) => isCheckoutHalf(new Date(d)),
                  checkinHalf: (d: Date) => isCheckinHalf(new Date(d)),
                  available: (d: Date) =>
                    d >= new Date(new Date().setHours(0, 0, 0, 0)) &&
                    !isBooked(new Date(d)) &&
                    !isCheckoutHalf(new Date(d)) &&
                    !isCheckinHalf(new Date(d)),
                }}
                modifiersClassNames={{
                  booked:
                    "line-through text-destructive/70 bg-destructive/15 rounded-md",
                  checkoutHalf:
                    "rounded-md ring-1 ring-border [background:linear-gradient(135deg,rgba(220,38,38,0.22)_0%,rgba(220,38,38,0.22)_50%,rgba(34,197,94,0.22)_50%,rgba(34,197,94,0.22)_100%)]",
                  checkinHalf:
                    "rounded-md ring-1 ring-border [background:linear-gradient(135deg,rgba(34,197,94,0.22)_0%,rgba(34,197,94,0.22)_50%,rgba(220,38,38,0.22)_50%,rgba(220,38,38,0.22)_100%)]",
                  available: "rounded-md ring-1 ring-border bg-[rgba(34,197,94,0.14)]",
                }}
                locale={locale}
                weekStartsOn={1}
                className="p-3 pointer-events-auto"
              />
              <div className="px-3 pb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm ring-1 ring-border bg-[rgba(34,197,94,0.22)]" />
                  {lang === "cs" ? "Volné" : "Available"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-destructive/20 ring-1 ring-destructive/30" />
                  {lang === "cs" ? "Obsazené" : "Booked"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm ring-1 ring-border [background:linear-gradient(135deg,rgba(220,38,38,0.3)_0%,rgba(220,38,38,0.3)_50%,rgba(34,197,94,0.3)_50%,rgba(34,197,94,0.3)_100%)]" />
                  {lang === "cs" ? "Odjezd / příjezd" : "Check-out / in"}
                </span>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="bk-name" className="text-xs uppercase tracking-wider text-muted-foreground">
              {lang === "cs" ? "Jméno" : "Name"}
            </Label>
            <Input id="bk-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="bk-people" className="text-xs uppercase tracking-wider text-muted-foreground">
              {lang === "cs" ? "Osob" : "Guests"}
            </Label>
            <Input id="bk-people" type="number" min={1} max={4} value={people} onChange={(e) => setPeople(e.target.value)} className="mt-1.5" />
          </div>
        </div>

        <div>
          <Label htmlFor="bk-note" className="text-xs uppercase tracking-wider text-muted-foreground">
            {lang === "cs" ? "Poznámka (volitelné)" : "Note (optional)"}
          </Label>
          <Textarea id="bk-note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} className="mt-1.5" />
        </div>
      </div>

      <div className="flex flex-col gap-3 md:justify-end">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-[#25D366] text-white font-medium hover:opacity-95 transition-opacity"
        >
          <MessageCircle className="w-5 h-5" />
          {lang === "cs" ? "Rezervovat přes WhatsApp" : "Book via WhatsApp"}
        </a>
        <a
          href={`tel:+${PHONE}`}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border hover:border-deep/40 transition-colors text-sm"
        >
          <Phone className="w-4 h-4 text-deep" />
          {PHONE_DISPLAY}
        </a>
        <p className="text-xs text-muted-foreground text-center">
          {lang === "cs"
            ? "Otevře WhatsApp s předvyplněnou zprávou."
            : "Opens WhatsApp with a prefilled message."}
        </p>
      </div>
    </div>
  );
}
