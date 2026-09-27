"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

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
    <section
      id={id}
      className={`relative min-h-[100svh] w-full snap-start ${className}`}
    >
      {children}
    </section>
  );
}

export function Photo({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        initial={{ opacity: 0, scale: 1.12 }}
        whileInView={{ opacity: 1, scale: 1.04 }}
        viewport={{ amount: 0.35, once: false }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-[-12%] h-[124%] w-full object-cover"
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#161616] via-[#161616]/90 to-[#161616]/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}

export function Copy({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative z-10 flex h-full min-h-[100svh] max-w-xl flex-col justify-center px-6 py-20 md:px-14 lg:px-20 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.35, once: false }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
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
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
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
