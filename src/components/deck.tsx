"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Field, Pane, Slide } from "@/components/fx";
import { usePresentation } from "@/hooks/use-presentation";
import { LIVE_STATION_URL, SECTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const BuoyViewer = dynamic(
  () => import("@/components/buoy-viewer").then((mod) => mod.BuoyViewer),
  { ssr: false, loading: () => <div className="h-full w-full bg-layer" /> },
);

export function Deck() {
  const active = usePresentation();
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative bg-bg text-ink">
      <Field />
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-40 h-px bg-accent"
        style={{ width: progress }}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 md:px-10">
        <a href="#title" className="pointer-events-auto font-mono text-xs tracking-[0.16em] text-ink uppercase">
          Raylay
        </a>
        <a href={LIVE_STATION_URL} className="pointer-events-auto font-mono text-xs text-accent">
          Tideline
        </a>
      </header>

      <ol className="pointer-events-none fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {SECTIONS.map((section) => (
          <li
            key={section.id}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              active === section.id ? "w-5 bg-accent" : "w-1.5 bg-white/20",
            )}
          />
        ))}
      </ol>

      <Slide id="title">
        <Pane>
          <h1 className="text-6xl font-light tracking-tight text-ink md:text-8xl">Raylay</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            A printed hull for the landing that never gets an official buoy.
          </p>
        </Pane>
      </Slide>

      <Slide id="hull" className="overflow-hidden">
        <div className="absolute inset-0 z-[1] md:left-[32%] lg:left-[28%]">
          <BuoyViewer className="h-full w-full" />
        </div>
        <Pane>
          <div className="relative z-[2] max-w-md">
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">The print</p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
              About 26 cm across
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              The probe exits into the water.
            </p>
          </div>
        </Pane>
      </Slide>

      <Slide id="mesh">
        <Pane className="md:grid md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              Out of range
            </p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
              The next hull carries the packet.
            </h2>
          </div>
          <MeshGraphic />
        </Pane>
      </Slide>

      <Slide id="end">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Tideline</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-6xl">
            The demo is the console.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            Map, charts, and the voice are there.
          </p>
          <a href={LIVE_STATION_URL} className="mt-10 font-mono text-sm text-accent">
            {LIVE_STATION_URL.replace("https://", "")}
          </a>
        </Pane>
      </Slide>
    </div>
  );
}

function MeshGraphic() {
  const hops = "M 48 118 H 148 H 248 H 348";

  return (
    <motion.svg
      viewBox="0 0 400 220"
      className="mt-10 h-56 w-full md:mt-0 md:h-80"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.35, once: false }}
      transition={{ duration: 0.6 }}
      role="img"
      aria-label="Packet hops from the landing to the mouth, then the approach, then the laptop."
    >
      <path d="M 8 168 C 90 156, 170 176, 250 160 S 340 148, 392 158 V 220 H 8 Z" fill="#0b3b3c" />
      <path
        d="M 8 168 C 90 156, 170 176, 250 160 S 340 148, 392 158"
        fill="none"
        stroke="#08bdba"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />

      <line
        x1="48"
        y1="118"
        x2="348"
        y2="70"
        stroke="#8d8d8d"
        strokeDasharray="4 5"
        strokeWidth="1.2"
      />
      <text
        x="198"
        y="78"
        textAnchor="middle"
        fill="#8d8d8d"
        fontSize="11"
        fontFamily="IBM Plex Mono, monospace"
      >
        out of range
      </text>

      <path d={hops} fill="none" stroke="#08bdba" strokeWidth="1.8" />
      <HopLabel x={98} y={108} text="hop" />
      <HopLabel x={198} y={108} text="hop" />
      <HopLabel x={298} y={108} text="in range" />

      <circle r="5" fill="#3ddbd9">
        <animateMotion dur="3.4s" repeatCount="indefinite" path={hops} rotate="0" />
      </circle>

      <Node x={48} y={118} title="#1" sub="Landing" />
      <Node x={148} y={118} title="#2" sub="Mouth" />
      <Node x={248} y={118} title="#3" sub="Approach" />
      <Node x={348} y={70} title="Base" sub="Tideline" accent />
    </motion.svg>
  );
}

function HopLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="#08bdba"
      fontSize="10"
      fontFamily="IBM Plex Mono, monospace"
    >
      {text}
    </text>
  );
}

function Node({
  x,
  y,
  title,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="8" fill={accent ? "#08bdba" : "#f4f4f4"} />
      <text
        x={x}
        y={y - 22}
        textAnchor="middle"
        fill="#f4f4f4"
        fontSize="13"
        fontFamily="IBM Plex Sans, sans-serif"
      >
        {title}
      </text>
      <text
        x={x}
        y={y + 26}
        textAnchor="middle"
        fill="#8d8d8d"
        fontSize="11"
        fontFamily="IBM Plex Mono, monospace"
      >
        {sub}
      </text>
    </g>
  );
}
