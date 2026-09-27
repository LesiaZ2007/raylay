"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Field, Pane, Slide, Spark } from "@/components/fx";
import { LiveView } from "@/components/live-view";
import { RaylayVoice } from "@/components/raylay-voice";
import { usePresentation } from "@/hooks/use-presentation";
import { useStation } from "@/hooks/use-station";
import { LIVE_STATION_URL, PARTS, SECTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const BuoyViewer = dynamic(
  () => import("@/components/buoy-viewer").then((mod) => mod.BuoyViewer),
  { ssr: false, loading: () => <div className="h-full w-full bg-layer" /> },
);

export function Deck() {
  const active = usePresentation();
  const station = useStation();
  const reading = station?.reading;
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

      <Slide id="title">
        <Pane>
          <h1 className="text-6xl font-light tracking-tight text-ink md:text-8xl">Raylay</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            A cheaper buoy network anyone can place, on a coast or a lake. The page turns the packet
            into a call for the person about to go out: launch, wait, or the water changed.
          </p>
          {reading ? (
            <>
              <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
                <Metric label="Water" value={reading.waterC.toFixed(1)} unit="°C" />
                <Metric label="Air" value={reading.airC.toFixed(1)} unit="°C" />
                <Metric label="Waves" value={reading.waveRmsG.toFixed(3)} unit="g" />
                <Metric label="Pressure" value={reading.pressureHpa.toFixed(0)} unit="hPa" />
              </dl>
              <Spark values={reading.sparkWater} className="mt-6 h-9 w-64" />
            </>
          ) : null}
          <p className="mt-3 font-mono text-[11px] text-ink-3">
            <StationLine payload={station} />
          </p>
        </Pane>
      </Slide>

      <Slide id="how">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">How it works</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            Each reading is a decision
          </h2>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2">
            {PARTS.map((part) => (
              <div key={part.name} className="bg-bg px-5 py-5">
                <p className="font-mono text-xs text-accent">{part.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{part.job}</p>
              </div>
            ))}
          </div>
        </Pane>
      </Slide>

      <Slide id="compare">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Cheap enough to own the reading
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            The person going out can afford the buoy.
          </h2>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            <Gap
              label="To own one"
              them="$15,000–$50,000"
              us="A print and parts"
              note="A waverider plus a service boat, versus a hull anyone can reprint."
            />
            <Gap
              label="How many"
              them="~200"
              us="Wherever you need one"
              note="NDBC covers the country. A lake, a landing, or a creek mouth can hold its own."
            />
            <Gap
              label="How fresh"
              them="30 min"
              us="2 sec"
              note="A portal built for ships, versus a page that says what the water does to you."
            />
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

      <Slide id="neighborhoods">
        <Pane className="!justify-start !pt-24 !pb-20">
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            For the person on the water
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            The number has to mean a launch, a wait, or a swim.
          </h2>
          <ul className="mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-2">
            <li>
              Saltwater fishing put <span className="text-ink">$138 billion</span> into U.S. sales in
              2022, across <span className="text-ink">201 million trips</span> and about 692,000 jobs
              (NOAA Fisheries, FEUS 2022). Those trips still start with water temperature and whether
              a small boat can leave the inlet.
            </li>
            <li>
              NOAA’s NDBC network is about <span className="text-ink">200 buoys</span>, sited for
              shipping lanes and forecasts. A lake, a municipal dock, or a creek mouth is not on that
              list, so the person there is guessing.
            </li>
            <li>
              After the 2015 West Coast bloom, Dungeness crab landings fell about{" "}
              <span className="text-ink">$97 million</span> and Washington tourism about{" "}
              <span className="text-ink">$40 million</span> (NMFS / NOAA NCCOS). A landing that holds
              its own temperature sees the change before a county post.
            </li>
            <li>
              Calm is under <span className="text-ink">0.02 g</span>. Rough is over{" "}
              <span className="text-ink">0.1 g</span>.
              {reading
                ? ` Buoy ${reading.name} is at ${reading.waterC.toFixed(1)}°C and ${reading.waveRmsG.toFixed(3)} g.`
                : ""}{" "}
              That is the go or stay call for a skiff, a kayak, a water taxi, or a swim — sea or lake.
            </li>
          </ul>
        </Pane>
      </Slide>

      <Slide id="hull" className="overflow-hidden">
        <div className="absolute inset-0 z-[1] md:left-[46%] lg:left-[42%]">
          <BuoyViewer className="h-full w-full" />
        </div>
        <Pane>
          <div className="relative z-[2] max-w-md">
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">The hull</p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
              Friendly, cheap, and easy to make.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              About 26 cm across. Print the fairing, seat the board, and the probe sits in the water.
              If that spot cannot reach the base, the next hull carries the packet to someone who can
              read it.
            </p>
            <MeshGraphic className="mt-8 h-40 w-full" />
          </div>
        </Pane>
      </Slide>
    </div>
  );
}

function Gap({
  label,
  them,
  us,
  note,
}: {
  label: string;
  them: string;
  us: string;
  note: string;
}) {
  return (
    <div className="bg-bg px-5 py-6">
      <p className="font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">{label}</p>
      <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">Waverider / NDBC</p>
      <p className="mt-1 text-3xl font-light tracking-tight text-ink-3">{them}</p>
      <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-accent uppercase">Raylay</p>
      <p className="mt-1 text-3xl font-light tracking-tight text-accent">{us}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-2">{note}</p>
    </div>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">{label}</dt>
      <dd className="mt-1 text-2xl font-light text-ink">
        {value}
        <span className="ml-1 text-sm text-ink-3">{unit}</span>
      </dd>
    </div>
  );
}

function StationLine({ payload }: { payload: ReturnType<typeof useStation> }) {
  if (!payload) return "Reading the buoy";
  const { reading } = payload;
  if (payload.source === "live") {
    return `Live · buoy ${reading.name} · ${reading.waterC.toFixed(1)}°C`;
  }
  if (payload.source === "station") {
    return `Buoy ${reading.name} · ${reading.waterC.toFixed(1)}°C`;
  }
  return "Example packet · station not reached";
}

function MeshGraphic({ className = "mt-10 h-56 w-full md:mt-0 md:h-80" }: { className?: string }) {
  const hops = "M 48 118 H 148 H 248 H 348";

  return (
    <motion.svg
      viewBox="0 0 400 220"
      className={className}
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
