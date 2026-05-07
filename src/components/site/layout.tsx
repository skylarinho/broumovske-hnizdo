import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Menu, X, Bird, MapPin, Phone, MessageCircle } from "lucide-react";
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

function useScrollToHash() {
  const router = useRouter();
  const location = useLocation();
  return (hash: string) => {
    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== "/") {
      router.navigate({ to: "/" }).then(() => setTimeout(scroll, 50));
    } else {
      scroll();
    }
  };
}

export function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollToHash();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="container-prose flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/40 text-deep">
            <Bird className="w-4 h-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">{t("brand.name")}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.hash}
              onClick={() => scrollTo(l.hash)}
              className="px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {t(l.key)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Multi-language disabled for now — keep ready for future */}
          {false && <LangSwitch lang={lang} setLang={setLang} />}
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
              <button
                key={l.hash}
                onClick={() => {
                  setOpen(false);
                  scrollTo(l.hash);
                }}
                className="py-3 text-sm text-left border-b border-border last:border-0"
              >
                {t(l.key)}
              </button>
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
      <div className="container-prose py-10 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 mb-3 text-foreground">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/40 text-deep">
            <Bird className="w-4 h-4" />
          </span>
          <span className="font-display text-lg font-semibold">{t("brand.name")}</span>
        </div>
        <p className="max-w-xl leading-relaxed text-foreground/80">{t("footer.short")}</p>
        
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="https://mapy.cz/zakladni?q=U%20Horn%C3%AD%20br%C3%A1ny%2022%2C%20Broumov"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <MapPin className="w-4 h-4" />
            U Horní brány 22, Broumov
          </a>
          <a href="tel:+420776662256" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Phone className="w-4 h-4" />
            +420 776 66 22 56
          </a>
          <a
            href="https://wa.me/420776662256"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
        <p className="mt-6 text-xs">© 2026 {t("brand.name")}. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
