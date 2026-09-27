"use client";

import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/lib/site";

export function usePresentation() {
  const [active, setActive] = useState<SectionId>("title");

  useEffect(() => {
    const nodes = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id as SectionId);
        }
      },
      { rootMargin: "-32% 0px -42% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const jump = (delta: number) => {
      const index = SECTIONS.findIndex((section) => section.id === active);
      const next = SECTIONS[Math.min(SECTIONS.length - 1, Math.max(0, index + delta))];
      document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth" });
    };

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        jump(1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        jump(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return active;
}
