"use client";

import { SECTIONS, type SectionId } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav({ active }: { active: SectionId }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a
          href="#pitch"
          className="pointer-events-auto font-mono text-[11px] tracking-[0.28em] text-teal-50/90 uppercase"
        >
          Raylay
        </a>
        <nav className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/10 bg-[#07161d]/70 px-2 py-1 backdrop-blur-md md:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors",
                active === section.id
                  ? "bg-teal-100 text-[#082024]"
                  : "text-teal-50/70 hover:text-teal-50",
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>
        <p className="pointer-events-none hidden font-mono text-[10px] tracking-[0.18em] text-teal-100/55 uppercase lg:block">
          Space or ↓ to present
        </p>
      </div>
      <div className="pointer-events-auto mx-4 overflow-x-auto rounded-full border border-white/10 bg-[#07161d]/75 px-2 py-1 backdrop-blur-md md:hidden">
        <nav className="flex min-w-max items-center gap-1">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase",
                active === section.id ? "bg-teal-100 text-[#082024]" : "text-teal-50/70",
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function TalkRail({ active }: { active: SectionId }) {
  return (
    <aside className="pointer-events-none fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 xl:block">
      <ol className="space-y-3">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="pointer-events-auto group flex items-baseline gap-3"
            >
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.2em] uppercase",
                  active === section.id ? "text-amber-200" : "text-teal-100/40",
                )}
              >
                {section.beat}
              </span>
              <span
                className={cn(
                  "text-sm transition-colors",
                  active === section.id
                    ? "text-teal-50"
                    : "text-teal-100/40 group-hover:text-teal-100/80",
                )}
              >
                {section.label}
              </span>
              <span className="font-mono text-[10px] text-teal-100/30">{section.clock}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
