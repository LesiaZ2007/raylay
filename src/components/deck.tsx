"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Field, Pane, Slide, Spark } from "@/components/fx";
import { LiveView, useStation } from "@/components/live-view";
import { TidelineVoice } from "@/components/tideline-voice";
import { usePresentation } from "@/hooks/use-presentation";
import { COMPARE, LIVE_STATION_URL, PARTS, SECTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const BuoyViewer = dynamic(
  () => import("@/components/buoy-viewer").then((mod) => mod.BuoyViewer),
  { ssr: false, loading: () => <div className="h-full w-full bg-layer" /> },
);

export function Deck() {
  const active = usePresentation();
  const payload = useStation();
  const station = payload.reading;
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
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Part 1 · The hardware
          </p>
          <h1 className="mt-3 text-6xl font-light tracking-tight text-ink md:text-8xl">Raylay</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            A printed hull, a board, and a handful of catalog sensors. They mesh over ESP-NOW and
            show up on Tideline as water, air, pressure, wave energy, tilt, and GPS.
          </p>
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            <Metric label="Water" value={station.waterC.toFixed(1)} unit="°C" />
            <Metric label="Air" value={station.airC.toFixed(1)} unit="°C" />
            <Metric label="Waves" value={station.waveRmsG.toFixed(3)} unit="g" />
            <Metric label="Pressure" value={station.pressureHpa.toFixed(0)} unit="hPa" />
          </dl>
          <Spark values={station.sparkWater} className="mt-6 h-9 w-64" />
          <p className="mt-3 font-mono text-[11px] text-ink-3">
            {payload.source === "live"
              ? `Live from buoy ${station.name}`
              : `Example packet · buoy ${station.name} offline`}
          </p>
        </Pane>
      </Slide>

      <Slide id="how">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            How it works
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            These are the parts
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            The board reads the temperature probe and the other sensors, then hops a small packet
            to the next buoy or to the laptop that runs Tideline.
          </p>
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
            Official buoys are good. They are also a capital project.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            A commercial directional waverider usually costs $15,000 to $50,000. NOAA’s whole NDBC
            network is about 200 buoys. That is why a harbor or a river landing almost never gets
            one. Raylay is a print job and a parts order.
          </p>
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
          <LiveView payload={payload} />
        </Pane>
      </Slide>

      <Slide id="assistant">
        <Pane>
          <TidelineVoice />
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
            Saltwater fishing put $138 billion into U.S. sales in 2022, across 201 million trips.
            Those trips still start with how the water is. Temperature moves bait. Wave energy
            decides if a 22-foot charter leaves the inlet. NOAA’s NDBC network is about 200 buoys,
            sited for shipping lanes and forecasts. A municipal dock or a creek-mouth landing is
            not on that list.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            Buoy {station.name} is at {station.waterC.toFixed(1)}°C. That is the number a dock
            already wants. Tideline puts it on a page for the harbor that actually uses it.
          </p>
        </Pane>
      </Slide>

      <Slide id="neighborhoods">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Neighborhoods
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            Their water. Their node. Their call.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            Flood-prone waterfronts and blocks downstream of a plant get official buoys last. Kids
            still swim. People still cross. They find out the water turned from a county post, or
            they do not find out.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            Raylay is cheap enough that the neighborhood puts a hull in the water it actually uses.
            Tideline is a public page they keep. Temperature, wave energy, and a silent buoy show
            up in a couple of seconds. The voice will say the water is rough, or that the node went
            dark. That is enough to pull a swim, keep people off a dock, or walk down and check the
            hull.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            They buy the parts. They print the fairing. They own the URL. If it breaks, they fix it.
            The safety call stays with the people who live there, not with a report written about
            someone else’s water.
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
            The people in 16-foot boats are the ones who take the bar on a weekday. The motion
            sensor samples 50 times a second. Tideline calls under 0.02 g calm and over 0.1 g rough. Buoy{" "}
            {station.name} is at {station.waveRmsG.toFixed(3)} g and {station.tiltDeg.toFixed(1)}°
            tilt.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            That is a go or stay number for a water taxi, a kid in a skiff, or someone who crosses
            because the bridge is the long way. You need a node at the mouth you can afford to lose.
          </p>
        </Pane>
      </Slide>

      <Slide id="mesh">
        <Pane className="md:grid md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              A group of them
            </p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
              The landing cannot reach the laptop. The next hull can.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              Put one node at the landing, one at the creek mouth, and one on the approach. #1 is
              out of radio range of the base, so it hands the packet to #2, #2 hands it to #3, and
              #3 is close enough for the laptop. Same Tideline page.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              If a fairing cracks, you print it again. If the probe dies, you order another
              temperature sensor. The fleet stays up because the people who use it can fix it.
            </p>
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
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">RAY</p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
              The hull those parts sit in
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              This is the print file, about 26 cm across. The bay holds the board, the battery, and
              the sensors. The temperature probe exits into the water.
            </p>
          </div>
        </Pane>
      </Slide>

      <Slide id="end">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Tideline</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-6xl">
            The page the landing can open
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            Map, charts, and a voice that will say when buoy {station.name} went silent or the
            water turned rough. Add hulls and the harbor gets a line of numbers instead of a gap
            on the official map.
          </p>
          <p className="mt-10 font-mono text-sm text-accent">
            {LIVE_STATION_URL.replace("https://", "")}
          </p>
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
