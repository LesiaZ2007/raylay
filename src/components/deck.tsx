"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Field, Pane, Slide, Spark } from "@/components/fx";
import { LiveView } from "@/components/live-view";
import { RaylayVoice } from "@/components/raylay-voice";
import { usePresentation } from "@/hooks/use-presentation";
import { useStation } from "@/hooks/use-station";
import { COMPARE, LIVE_STATION_URL, PARTS, SECTIONS } from "@/lib/site";
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
            These are the parts
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
            Why it is cheap enough to own
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            Official buoys are a capital project.
          </h2>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-medium"> </th>
                  <th className="py-3 pr-4 font-medium">Typical waverider / NDBC</th>
                  <th className="py-3 font-medium text-accent">Raylay</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.topic} className="border-b border-border align-top">
                    <td className="py-4 pr-4 text-ink-3">{row.topic}</td>
                    <td className="py-4 pr-6 text-ink-2">{row.them}</td>
                    <td className="py-4 text-ink">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      <Slide id="fishing">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Part 2 · Who this is for
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            Fishing already runs on water temperature
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            $138 billion in U.S. sales, 201 million trips. NOAA’s network is about 200 buoys. A
            creek-mouth landing is not one of them.
          </p>
          {reading ? (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
              Buoy {reading.name} is at {reading.waterC.toFixed(1)}°C.
            </p>
          ) : null}
        </Pane>
      </Slide>

      <Slide id="neighborhoods">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Neighborhoods</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            Their water. Their node. Their call.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            They print the hull, keep the URL, and decide the swim. Not a county post about someone
            else’s water.
          </p>
        </Pane>
      </Slide>

      <Slide id="boats">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Getting out</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            Water taxis, skiffs, and unpaid crossings
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            Under 0.02 g is calm. Over 0.1 g is rough.
            {reading ? ` Buoy ${reading.name} is at ${reading.waveRmsG.toFixed(3)} g.` : ""} That is
            the go or stay number.
          </p>
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
            <p className="mt-6 text-lg leading-relaxed text-ink-2">The probe exits into the water.</p>
          </div>
        </Pane>
      </Slide>

      <Slide id="end">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Tideline</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-6xl">
            The page the landing can open
          </h2>
          <a href={LIVE_STATION_URL} className="mt-10 font-mono text-sm text-accent">
            {LIVE_STATION_URL.replace("https://", "")}
          </a>
        </Pane>
      </Slide>
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
