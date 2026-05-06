import { useRef, useState, useEffect } from "react";

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Před",
  afterLabel = "Po",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const move = (clientX: number) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, p)));
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      move(x);
    };
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-xl card-soft select-none touch-none"
    >
      <img src={after} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
        />
      </div>
      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-background/80 text-foreground">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-background/80 text-foreground">
        {afterLabel}
      </span>
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        style={{ left: `${pos}%` }}
      >
        <button
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-border flex items-center justify-center cursor-ew-resize"
          aria-label="drag"
        >
          <span className="text-deep text-sm">⇆</span>
        </button>
      </div>
    </div>
  );
}
