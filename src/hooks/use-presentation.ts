"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS, type SectionId } from "@/lib/site";

function sectionIndex() {
  const slop = Math.min(140, window.innerHeight * 0.2);
  let index = 0;
  for (let i = 0; i < SECTIONS.length; i++) {
    const node = document.getElementById(SECTIONS[i].id);
    if (node && node.getBoundingClientRect().top <= slop) index = i;
  }
  return index;
}

export function usePresentation() {
  const [active, setActive] = useState<SectionId>("title");
  const pending = useRef<number | null>(null);
  const current = useRef(0);

  useEffect(() => {
    const go = (index: number) => {
      const next = Math.min(SECTIONS.length - 1, Math.max(0, index));
      const section = SECTIONS[next];
      pending.current = next;
      current.current = next;
      setActive(section.id);
      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        if (pending.current === next) pending.current = null;
      }, 750);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      const from = pending.current ?? sectionIndex();
      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        go(from + 1);
        return;
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(from - 1);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        go(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        go(SECTIONS.length - 1);
      }
    };

    const onScroll = () => {
      if (pending.current !== null) return;
      const index = sectionIndex();
      if (index === current.current) return;
      current.current = index;
      setActive(SECTIONS[index].id);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}
