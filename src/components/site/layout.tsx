import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { useLang, useT, type Lang } from "@/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { hash: "book", key: "book.title" as const },
  { hash: "ubytovani", key: "nav.stay" as const },
  { hash: "ceny", key: "nav.prices" as const },
  { hash: "okoli", key: "nav.area" as const },
  { hash: "trasy", key: "nav.routes" as const },
];

export function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="container-prose flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/40 text-deep">
            <Leaf className="w-4 h-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">{t("brand.name")}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-3 py-2 text-sm rounded-md transition-colors",
                  active ? "text-deep font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} setLang={setLang} />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container-prose py-2 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm border-b border-border last:border-0"
              >
                {t(l.key)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="inline-flex rounded-full border border-border overflow-hidden text-xs">
      {(["cs", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "px-2.5 py-1 uppercase tracking-wider transition-colors",
            lang === l ? "bg-deep text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-prose py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/40 text-deep">
              <Leaf className="w-4 h-4" />
            </span>
            <span className="font-display text-lg font-semibold">{t("brand.name")}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">{t("brand.tag")}</p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">{t("footer.quickLinks")}</h4>
          <ul className="space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-foreground">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>U Horní brány 22, Broumov</p>
          <p>+420 776 66 22 56</p>
          <p className="mt-6">© 2026 {t("brand.name")}. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
