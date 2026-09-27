"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Dial, ParallaxBlock, Reveal, Rings, ScaleMap, Slide, Waves } from "@/components/fx";
import { usePresentation } from "@/hooks/use-presentation";
import { INSIDE, LIVE_STATION_URL, SCALE, SECTIONS, USES, type SectionId } from "@/lib/site";
import type { TelemetryPayload } from "@/lib/telemetry";
import { cn } from "@/lib/utils";

const BuoyViewer = dynamic(
  () => import("@/components/buoy-viewer").then((mod) => mod.BuoyViewer),
  { ssr: false, loading: () => null },
);

const BUOY_STAGE: Record<SectionId, string> = {
  title: "translate-x-[18%] scale-100 opacity-100",
  what: "translate-x-[26%] scale-[0.88] opacity-40",
  why: "translate-x-[8%] scale-[0.72] opacity-20",
  hull: "translate-x-[14%] scale-[1.12] opacity-100",
  inside: "translate-x-[28%] scale-[0.9] opacity-35",
  data: "translate-x-0 scale-[0.62] opacity-15",
  uses: "translate-x-[-6%] scale-[0.7] opacity-18",
  scale: "translate-x-[10%] scale-[0.68] opacity-16",
  end: "translate-x-[16%] scale-100 opacity-90",
};

export function Deck() {
  const active = usePresentation();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const hazeY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const dustY = useTransform(scrollYProgress, [0, 1], [0, -480]);

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 h-[2px] bg-amber-200/80"
        style={{ width: progressWidth }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed -top-24 left-[-10%] h-[50vh] w-[55vw] rounded-full bg-amber-200/10 blur-3xl"
        style={{ y: hazeY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-[30%] right-[-15%] h-[46vh] w-[48vw] rounded-full bg-teal-300/10 blur-3xl"
        style={{ y: dustY }}
      />

      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-0 transition-all duration-1000 ease-out",
          BUOY_STAGE[active],
        )}
      >
        <Rings />
        <BuoyViewer className="h-full w-full" />
      </div>

      <Waves />

      <ol className="pointer-events-none fixed top-1/2 right-4 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-500",
                active === section.id ? "w-6 bg-amber-200" : "w-1.5 bg-white/25",
              )}
            />
          </li>
        ))}
      </ol>

      <TitleSlide />
      <WhatSlide />
      <WhySlide />
      <HullSlide />
      <InsideSlide />
      <DataSlide />
      <UsesSlide />
      <ScaleSlide />
      <EndSlide />
    </div>
  );
}

function TitleSlide() {
  return (
    <Slide id="title">
      <div className="relative z-10 max-w-xl">
        <Reveal>
          <p className="mb-4 text-sm text-amber-100/80">A hackathon project about water, and who gets to measure it.</p>
          <h1 className="font-heading text-[clamp(4.2rem,12vw,8.4rem)] leading-[0.82] text-white">
            Raylay
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-md text-xl leading-relaxed text-white/88">
            We built a buoy that sits in the water, measures a few things, and puts the numbers online.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-10 text-sm text-white/50">Scroll. That’s the whole talk.</p>
        </Reveal>
      </div>
    </Slide>
  );
}

function WhatSlide() {
  return (
    <Slide id="what">
      <div className="relative z-10 max-w-3xl">
        <ParallaxBlock from={70} to={-40}>
          <Reveal>
            <h2 className="font-heading text-5xl text-white md:text-7xl">What it actually does</h2>
          </Reveal>
        </ParallaxBlock>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/88">
            RAY is the printed hull. The electronics inside watch water temperature, how the buoy
            moves (that becomes wave height), and where it is. Then it relays that to{" "}
            <span className="text-amber-100">raylay.amuhak.com</span>.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            ["Temperature", "A probe in the water, not a guess from the air."],
            ["Wave height", "The hull bobs. We turn that motion into sea state."],
            ["A public page", "If you can open a browser, you can see it."],
          ].map(([title, line], i) => (
            <ParallaxBlock key={title} from={50 + i * 24} to={-30 - i * 16}>
              <Reveal delay={0.08 * i}>
                <p className="font-heading text-2xl text-white">{title}</p>
                <p className="mt-2 text-white/72">{line}</p>
              </Reveal>
            </ParallaxBlock>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function WhySlide() {
  return (
    <Slide id="why">
      <div className="relative z-10 max-w-3xl">
        <ParallaxBlock from={90} to={-50}>
          <Reveal>
            <h2 className="font-heading text-5xl text-white md:text-7xl">The expensive ones already exist</h2>
          </Reveal>
        </ParallaxBlock>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/88">
            Commercial wave buoys are good. They also cost somewhere in the ten-to-fifty-thousand
            dollar range, and they get parked along shipping lanes and research sites.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-white/88">
            That leaves harbors, rivers, swim spots, and working docks mostly unread. If you don’t
            have a grant and a service boat, you guess.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-8 text-lg text-amber-100/90">
            We wanted something you could print, wire, and afford to repair.
          </p>
        </Reveal>
      </div>
    </Slide>
  );
}

function HullSlide() {
  return (
    <Slide id="hull">
      <div className="relative z-10 max-w-lg">
        <ParallaxBlock from={60} to={-30}>
          <Reveal>
            <h2 className="font-heading text-5xl text-white md:text-7xl">This is RAY</h2>
          </Reveal>
        </ParallaxBlock>
        <Reveal delay={0.1}>
          <p className="mt-6 text-xl leading-relaxed text-white/88">
            That’s the real print file spinning back there — about 26 cm across, 9 cm tall. Backpack
            sized. Not a rendering we made look pretty for slides.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 text-xl leading-relaxed text-white/88">
            If a piece cracks, you print it again. The electronics live in a bay you can still open
            on a table.
          </p>
        </Reveal>
      </div>
    </Slide>
  );
}

function InsideSlide() {
  return (
    <Slide id="inside">
      <div className="relative z-10 w-full max-w-5xl">
        <ParallaxBlock from={70} to={-24}>
          <Reveal>
            <h2 className="font-heading text-5xl text-white md:text-6xl">What’s on it</h2>
          </Reveal>
        </ParallaxBlock>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {INSIDE.map((item, i) => (
            <ParallaxBlock key={item.name} from={40 + (i % 2) * 30} to={-20 - (i % 3) * 12}>
              <Reveal delay={i * 0.05}>
                <p className="text-amber-100/85">{item.name}</p>
                <p className="mt-1 text-lg leading-relaxed text-white/86">{item.line}</p>
              </Reveal>
            </ParallaxBlock>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function DataSlide() {
  const [payload, setPayload] = useState<TelemetryPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch("/api/telemetry", { cache: "no-store" });
        if (!response.ok) return;
        const json = (await response.json()) as TelemetryPayload;
        if (!cancelled) setPayload(json);
      } catch {
        // The slide still works with empty values.
      }
    };
    void load();
    const timer = window.setInterval(() => void load(), 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const reading = payload?.reading;
  const live = payload?.source === "live";

  return (
    <Slide id="data">
      <div className="relative z-10 w-full">
        <ParallaxBlock from={50} to={-20}>
          <Reveal>
            <h2 className="font-heading text-5xl text-white md:text-6xl">What comes back</h2>
          </Reveal>
        </ParallaxBlock>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {live
              ? "This is live from the station."
              : "The tracker at raylay.amuhak.com isn’t up right now, so these are from a recorded session. Same layout as the live page."}
          </p>
        </Reveal>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-10 md:gap-16">
          <ParallaxBlock from={30} to={-50}>
            <Dial
              label="Water"
              value={reading ? reading.waterTempC.toFixed(1) : "—"}
              unit="°C"
            />
          </ParallaxBlock>
          <ParallaxBlock from={70} to={-20}>
            <Dial
              label="Waves"
              value={reading ? reading.waveHeightM.toFixed(2) : "—"}
              unit="meters"
            />
          </ParallaxBlock>
          <ParallaxBlock from={20} to={-60}>
            <Dial
              label="Period"
              value={reading ? reading.wavePeriodS.toFixed(1) : "—"}
              unit="seconds"
            />
          </ParallaxBlock>
        </div>
        <Reveal delay={0.15}>
          <p className="mt-12 text-center text-sm text-white/45">{LIVE_STATION_URL.replace("https://", "")}</p>
        </Reveal>
      </div>
    </Slide>
  );
}

function UsesSlide() {
  return (
    <Slide id="uses">
      <div className="relative z-10 w-full max-w-5xl">
        <ParallaxBlock from={80} to={-30}>
          <Reveal>
            <h2 className="font-heading text-5xl text-white md:text-7xl">Where this gets used</h2>
          </Reveal>
        </ParallaxBlock>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-2xl text-xl text-white/86">
            Not as a science fair object. As a thing you leave in the water because someone has a
            decision to make in the morning.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {USES.map((item, i) => (
            <ParallaxBlock key={item.name} from={36 + (i % 2) * 40} to={-28 - (i % 3) * 14}>
              <Reveal delay={i * 0.04}>
                <p className="font-heading text-3xl text-white">{item.name}</p>
                <p className="mt-2 text-lg leading-relaxed text-white/80">{item.line}</p>
              </Reveal>
            </ParallaxBlock>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function ScaleSlide() {
  return (
    <Slide id="scale">
      <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <ParallaxBlock from={70} to={-24}>
            <Reveal>
              <h2 className="font-heading text-5xl text-white md:text-7xl">How this becomes more than one buoy</h2>
            </Reveal>
          </ParallaxBlock>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/86">
              A single buoy is what we could build for a weekend. The version that matters is a
              string of them — up a river, around a bay — all writing to the same page.
            </p>
          </Reveal>
          <div className="mt-10 space-y-6">
            {SCALE.map((item, i) => (
              <ParallaxBlock key={item.name} from={24 + i * 10} to={-16 - i * 8}>
                <Reveal delay={i * 0.05}>
                  <p className="text-amber-100/90">{item.name}</p>
                  <p className="mt-1 text-lg leading-relaxed text-white/82">{item.line}</p>
                </Reveal>
              </ParallaxBlock>
            ))}
          </div>
        </div>
        <ParallaxBlock from={40} to={-70} className="h-64 lg:h-[28rem]">
          <div className="h-full rounded-[2rem] border border-white/10 bg-black/20 p-4">
            <ScaleMap />
          </div>
        </ParallaxBlock>
      </div>
    </Slide>
  );
}

function EndSlide() {
  return (
    <Slide id="end">
      <div className="relative z-10 max-w-3xl">
        <ParallaxBlock from={50} to={-20}>
          <Reveal>
            <h2 className="font-heading text-5xl text-white md:text-7xl">That’s the project.</h2>
          </Reveal>
        </ParallaxBlock>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/88">
            Print the hull. Put sensors in it. Leave it where official maps are still blank. If it
            works, you don’t celebrate one buoy. You put another one in the next stretch of water.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 text-lg text-amber-100/90">raylay.amuhak.com</p>
        </Reveal>
      </div>
    </Slide>
  );
}
