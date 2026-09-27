"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

export function Slide({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative min-h-[100svh] w-full snap-start ${className}`}>
      {children}
    </section>
  );
}

export function Pane({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-10 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.28, once: false }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Field() {
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const waterY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div className="tide-grid absolute inset-x-0 -top-[18%] h-[140%] w-full" style={{ y: gridY }} />
      <div className="absolute inset-x-0 top-[58%] h-px bg-accent/20" />
      <motion.div className="absolute inset-x-0 bottom-0 h-[42%] w-full" style={{ y: waterY }}>
        <div className="tide-water absolute inset-0" />
        <Horizon />
      </motion.div>
      <div className="absolute top-10 left-6 size-1.5 bg-accent/80 md:left-10" />
      <div className="absolute top-10 right-6 size-1.5 bg-accent/35 md:right-10" />
      <div className="absolute bottom-10 left-6 size-1.5 bg-accent/35 md:left-10" />
      <div className="absolute right-6 bottom-10 size-1.5 bg-accent/80 md:right-10" />
    </div>
  );
}

function Horizon() {
  return (
    <svg
      className="absolute inset-x-0 top-0 h-20 w-full"
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
    >
      <path
        d="M0 44 C 80 28, 160 58, 240 42 S 400 22, 480 40 640 68, 720 46 880 18, 960 38 1120 62, 1200 36"
        fill="none"
        stroke="#08bdba"
        strokeOpacity="0.55"
        strokeWidth="1.25"
      />
      <path
        d="M0 52 C 90 40, 170 64, 260 50 S 430 34, 520 52 700 74, 790 54 950 28, 1040 48 1140 66, 1200 50"
        fill="none"
        stroke="#3ddbd9"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Spark({ values, className }: { values: number[]; className?: string }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const w = 240;
  const h = 40;
  const points = values
    .map((value, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - 4 - ((value - min) / span) * (h - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" aria-hidden>
      <polyline
        points={points}
        fill="none"
        stroke="#08bdba"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
