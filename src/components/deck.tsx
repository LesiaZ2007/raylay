"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Field, Pane, Slide } from "@/components/fx";
import { LiveView } from "@/components/live-view";
import { RaylayVoice } from "@/components/raylay-voice";
import { usePresentation } from "@/hooks/use-presentation";
import { useStation } from "@/hooks/use-station";
import { LIVE_STATION_URL, SECTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const BuoyViewer = dynamic(
  () => import("@/components/buoy-viewer").then((mod) => mod.BuoyViewer),
  { ssr: false, loading: () => <div className="h-full w-full" /> },
);

export function Deck() {
  const active = usePresentation();
  const station = useStation();
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
      </header>
      <a
        href={LIVE_STATION_URL}
        className="fixed right-5 bottom-4 z-30 font-mono text-xs text-accent"
      >
        {LIVE_STATION_URL.replace("https://", "")}
      </a>

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

      <Slide id="title" className="overflow-hidden">
        <div className="absolute inset-0 z-[1] md:left-[42%] lg:left-[38%]">
          <BuoyViewer className="h-full w-full" />
        </div>
        <Pane>
          <div className="relative z-[2] max-w-md md:max-w-lg">
            <h1 className="text-6xl font-light tracking-tight text-ink md:text-8xl">Raylay</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              A cheaper buoy network anyone can place. About 26 cm across, and easy to make. The
              numbers come back for a fisherman, a conservation crew, or anyone watching the water.
            </p>
          </div>
        </Pane>
      </Slide>

      <Slide id="compare">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Cheap enough to own the reading
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            An expensive buoy, replaced by a print.
          </h2>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            <Gap label="To own one" them="$15,000–$50,000" us="A print and parts" />
            <Gap label="How many" them="~200 for the country" us="Wherever you need one" />
            <Gap label="How fresh" them="Every 30 min" us="Every 2 sec" />
          </div>
        </Pane>
      </Slide>

      <Slide id="live">
        <Pane>
          <LiveView payload={station} />
        </Pane>
      </Slide>

      <Slide id="assistant">
        <Pane>
          <RaylayVoice />
        </Pane>
      </Slide>
    </div>
  );
}

function Gap({ label, them, us }: { label: string; them: string; us: string }) {
  return (
    <div className="bg-bg px-5 py-6">
      <p className="font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">{label}</p>
      <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">Typical buoy</p>
      <p className="mt-1 text-3xl font-light tracking-tight text-ink-3">{them}</p>
      <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-accent uppercase">Raylay</p>
      <p className="mt-1 text-3xl font-light tracking-tight text-accent">{us}</p>
    </div>
  );
}

