"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Slide({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative h-[100svh] w-full snap-start overflow-hidden">
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
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="absolute inset-[-8%] h-[116%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#161616] via-[#161616]/88 to-[#161616]/25" />
    </div>
  );
}

export function Copy({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="relative z-10 flex h-full max-w-xl flex-col justify-center px-6 md:px-14 lg:px-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.45, once: false }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
  const w = 220;
  const h = 36;
  const points = values
    .map((value, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - 3 - ((value - min) / span) * (h - 6);
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
