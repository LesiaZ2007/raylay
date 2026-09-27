"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.35, once: false }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
      className={`relative flex min-h-[100svh] snap-start items-center px-5 py-20 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </section>
  );
}

export function ParallaxBlock({
  children,
  from = 80,
  to = -80,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function Rings({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute top-1/2 left-[64%] size-[min(92vw,820px)] -translate-x-1/2 -translate-y-1/2">
        <div className="ring-spin absolute inset-0 rounded-full border border-amber-200/20" />
        <div className="ring-spin-rev absolute inset-10 rounded-full border border-dashed border-teal-100/25" />
        <div className="ring-spin absolute inset-[4.5rem] rounded-full border border-teal-200/15" />
        <div className="ring-spin-fast absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(244,210,122,0.16),transparent_42%)] opacity-70 mix-blend-screen" />
      </div>
    </div>
  );
}

export function Waves() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden opacity-50" aria-hidden>
      <svg className="wave-a absolute bottom-0 h-28 w-[200%]" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0 70 Q150 20 300 70 T600 70 T900 70 T1200 70 V120 H0 Z"
          fill="rgba(90, 196, 186, 0.18)"
        />
      </svg>
      <svg className="wave-b absolute bottom-0 h-24 w-[200%]" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0 80 Q150 40 300 80 T600 80 T900 80 T1200 80 V120 H0 Z"
          fill="rgba(244, 210, 122, 0.1)"
        />
      </svg>
    </div>
  );
}

export function Dial({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="relative grid h-44 w-44 place-items-center md:h-52 md:w-52">
      <div className="ring-spin absolute inset-0 rounded-full border border-teal-100/25" />
      <div className="ring-spin-rev absolute inset-4 rounded-full border border-dashed border-amber-200/30" />
      <div className="relative text-center">
        <p className="text-sm text-teal-50/75">{label}</p>
        <p className="font-heading text-5xl tracking-tight text-white md:text-6xl">{value}</p>
        <p className="mt-1 text-sm text-amber-100/85">{unit}</p>
      </div>
    </div>
  );
}

export function ScaleMap() {
  const nodes = [
    { x: 18, y: 62, r: 5 },
    { x: 32, y: 40, r: 4 },
    { x: 48, y: 58, r: 7 },
    { x: 61, y: 28, r: 4 },
    { x: 74, y: 48, r: 5 },
    { x: 86, y: 34, r: 3.5 },
  ];
  const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [4, 5],
    [1, 3],
  ];

  return (
    <svg viewBox="0 0 100 80" className="h-full w-full" aria-hidden>
      {links.map(([a, b], i) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(158, 217, 212, 0.35)"
          strokeWidth="0.4"
          className="link-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
      {nodes.map((node, i) => (
        <g key={`${node.x}-${node.y}`}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r + 4}
            fill="none"
            stroke="rgba(244, 210, 122, 0.25)"
            className="node-ring"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
          <circle cx={node.x} cy={node.y} r={node.r} fill={i === 2 ? "#f4d27a" : "#9ed9d4"} />
        </g>
      ))}
    </svg>
  );
}

export function useGlobalParallax(): {
  yFar: MotionValue<number>;
  yMid: MotionValue<number>;
  yNear: MotionValue<number>;
  progress: MotionValue<number>;
} {
  const { scrollYProgress } = useScroll();
  const yFar = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, -560]);
  return { yFar, yMid, yNear, progress: scrollYProgress };
}
