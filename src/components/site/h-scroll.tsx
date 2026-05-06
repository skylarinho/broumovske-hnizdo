import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HScroll({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative -mx-5 px-5", className)}>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin]">
        {children}
      </div>
    </div>
  );
}
