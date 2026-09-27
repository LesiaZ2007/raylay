"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-10 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 36, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ amount: 0.28, once: false }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Field() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const farScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const nearScale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const waterY = useTransform(scrollYProgress, [0, 1], ["12%", "-18%"]);
  const waterH = useTransform(scrollYProgress, [0, 1], ["32%", "68%"]);
  const waterScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.16, 0.38]);

  if (reduce) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="tide-grid absolute inset-0" />
        <div className="tide-water absolute inset-x-0 bottom-0 h-[36%]" />
        <Horizon />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="tide-grid absolute -inset-[42%]"
        style={{ y: farY, scale: farScale, transformOrigin: "50% 42%" }}
      />
      <motion.div
        className="tide-grid-near absolute -inset-[42%]"
        style={{ y: nearY, scale: nearScale, transformOrigin: "50% 55%" }}
      />
      <motion.div
        className="absolute inset-x-[-10%] bottom-0"
        style={{ y: waterY, height: waterH, scale: waterScale, transformOrigin: "50% 100%" }}
      >
        <div className="tide-water absolute inset-0" />
        <Horizon />
      </motion.div>
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{ opacity: glow }}
      >
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center_bottom,_#08bdba33,_transparent_62%)]" />
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
      className="absolute inset-x-0 top-0 h-24 w-full"
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
    >
      <path
        d="M0 44 C 80 28, 160 58, 240 42 S 400 22, 480 40 640 68, 720 46 880 18, 960 38 1120 62, 1200 36"
        fill="none"
        stroke="#08bdba"
        strokeOpacity="0.7"
        strokeWidth="1.4"
      />
      <path
        d="M0 52 C 90 40, 170 64, 260 50 S 430 34, 520 52 700 74, 790 54 950 28, 1040 48 1140 66, 1200 50"
        fill="none"
        stroke="#3ddbd9"
        strokeOpacity="0.28"
        strokeWidth="1.1"
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
