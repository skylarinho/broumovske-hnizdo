import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MessageCircle, Phone } from "lucide-react";
import { useT } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Rezervace a kontakt — Broumovské hnízdo" },
      { name: "description", content: "Rezervujte ubytování přes formulář, WhatsApp nebo telefon." },
      { property: "og:title", content: "Kontakt — Broumovské hnízdo" },
      { property: "og:description", content: "Napište nám pro rezervaci." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Vyplňte jméno").max(100),
  email: z.string().trim().email("Neplatný e-mail").max(255),
  phone: z.string().trim().max(40).optional(),
  arrival: z.string().optional(),
  departure: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
});

const checklist = [
  { cs: "Zadní vchod zamknout", en: "Lock the back door" },
  { cs: "Radiátory zapojit (speciální sazba)", en: "Switch on heaters (special tariff)" },
  { cs: "Bojler nastavit na ECO", en: "Set boiler to ECO" },
  { cs: "Lednici zapnout kolečkem", en: "Turn the fridge dial on" },
  { cs: "Při odjezdu vše vypnout", en: "Turn everything off when leaving" },
  { cs: "Prostěradla dát do koše", en: "Put sheets in the basket" },
  { cs: "Vysypat odpadky", en: "Take out the bin" },
];

function ContactPage() {
  const t = useT();
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const res = schema.safeParse(data);
    if (!res.success) {
      toast.error(res.error.issues[0]?.message ?? "Zkontrolujte formulář");
      return;
    }
    const body = encodeURIComponent(
      `Jméno: ${res.data.name}\nE-mail: ${res.data.email}\nTelefon: ${res.data.phone ?? ""}\nPříjezd: ${res.data.arrival ?? ""}\nOdjezd: ${res.data.departure ?? ""}\n\n${res.data.message ?? ""}`
    );
    window.location.href = `https://wa.me/420776662256?text=${body}`;
  };

  return (
    <div className="container-prose py-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-deep/70 mb-3">{t("nav.contact")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-deep">{t("contact.title")}</h1>
      </header>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 mt-10">
        <form onSubmit={onSubmit} className="card-soft p-7 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field name="name" label={t("contact.form.name")} required />
            <Field name="email" type="email" label={t("contact.form.email")} required />
            <Field name="phone" label={t("contact.form.phone")} />
            <div />
            <Field name="arrival" type="date" label={t("contact.form.arrival")} />
            <Field name="departure" type="date" label={t("contact.form.departure")} />
          </div>
          <div>
            <Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("contact.form.message")}
            </Label>
            <Textarea id="message" name="message" rows={4} className="mt-1.5" />
          </div>
          <Button type="submit" size="lg" className="rounded-full w-full sm:w-auto">
            {t("contact.form.submit")}
          </Button>
        </form>

        <aside className="space-y-4">
          <a
            href="https://wa.me/420776662256"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-5 rounded-2xl bg-[#25D366] text-white hover:opacity-95 transition-opacity"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-medium">{t("contact.whatsapp")}</span>
          </a>
          <a
            href="tel:+420776662256"
            className="flex items-center gap-3 p-5 card-soft card-soft-hover"
          >
            <Phone className="w-5 h-5 text-deep" />
            <span className="font-medium">+420 776 66 22 56</span>
          </a>
          <div className="card-soft p-5 text-sm text-muted-foreground">
            <p className="font-display text-foreground font-semibold mb-1">U Horní brány 22</p>
            <p>549 54 Broumov</p>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold mb-5">{t("contact.checklist.title")}</h2>
        <ul className="grid sm:grid-cols-2 gap-2 max-w-3xl">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-center gap-3 p-3 card-soft">
              <Checkbox
                id={`chk-${i}`}
                checked={!!checked[i]}
                onCheckedChange={(v) => setChecked((s) => ({ ...s, [i]: !!v }))}
              />
              <Label htmlFor={`chk-${i}`} className={`text-sm cursor-pointer ${checked[i] ? "line-through text-muted-foreground" : ""}`}>
                {item.cs}
              </Label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <Label htmlFor={name} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}{required && " *"}
      </Label>
      <Input id={name} name={name} type={type} required={required} className="mt-1.5" />
    </div>
  );
}
