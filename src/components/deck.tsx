"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Copy, Photo, Slide, Spark } from "@/components/fx";
import { usePresentation } from "@/hooks/use-presentation";
import { LIVE_STATION_URL, SECTIONS, STATS } from "@/lib/site";
import { LAST_PACKET, type TelemetryReading } from "@/lib/telemetry";
import { cn } from "@/lib/utils";

const BuoyViewer = dynamic(
  () => import("@/components/buoy-viewer").then((mod) => mod.BuoyViewer),
  { ssr: false, loading: () => <div className="h-full w-full bg-layer" /> },
);

function useStation() {
  const [reading, setReading] = useState<TelemetryReading>(LAST_PACKET);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch("/api/telemetry", { cache: "no-store" });
        if (!response.ok) return;
        const json = (await response.json()) as { reading: TelemetryReading };
        if (!cancelled && json.reading) setReading(json.reading);
      } catch {
        // Keep the last good packet on screen.
      }
    };
    void load();
    const timer = window.setInterval(() => void load(), 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return reading;
}

export function Deck() {
  const active = usePresentation();
  const station = useStation();
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="bg-bg text-ink">
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-40 h-px bg-accent"
        style={{ width: progress }}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 md:px-10">
        <a href="#title" className="pointer-events-auto font-mono text-xs tracking-[0.16em] text-ink uppercase">
          Raylay
        </a>
        <a
          href={LIVE_STATION_URL}
          className="pointer-events-auto font-mono text-xs text-accent"
        >
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

      <Slide id="title" className="overflow-hidden">
        <Photo src="/images/hero-water.png" alt="Dark open water" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Sensor buoy mesh
          </p>
          <h1 className="mt-3 text-6xl font-light tracking-tight text-ink md:text-8xl">Raylay</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            Printed manta-ray hulls with a water probe, air and pressure sensors, a 50 Hz motion
            package, and GPS. They relay packets over ESP-NOW to a base station. Tideline is the
            console that shows the fleet.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            <Metric label="Water" value={station.waterC.toFixed(1)} unit="°C" />
            <Metric label="Air" value={station.airC.toFixed(1)} unit="°C" />
            <Metric label="Waves" value={station.waveRmsG.toFixed(3)} unit="g" />
            <Metric label="Pressure" value={station.pressureHpa.toFixed(0)} unit="hPa" />
          </dl>
          <Spark values={station.sparkWater} className="mt-6 h-9 w-56" />
          <p className="mt-3 font-mono text-[11px] text-ink-3">
            Buoy {station.name} on Tideline, last sixty water readings
          </p>
        </Copy>
      </Slide>

      <Slide id="why" className="bg-bg">
        <div className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center px-6 py-24 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4, once: false }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              Why this matters
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
              Most working water is still guessed at, and the official network is small.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
              NOAA’s National Data Buoy Center runs about 200 buoys for the whole country, plus a
              few dozen shore stations. Those instruments are excellent. They are also expensive to
              site and keep on station, so they sit on shipping lanes and research lines. Harbors,
              rivers, and community docks rarely get one.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.4, once: false }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-border pt-4"
              >
                <p className="text-4xl font-light text-accent">{stat.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{stat.label}</p>
                <p className="mt-2 font-mono text-[10px] text-ink-3">{stat.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Slide>

      <Slide id="fishing" className="overflow-hidden">
        <Photo src="/images/fishing.png" alt="Workboats in a harbor" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Fishing</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-6xl">
            $138 billion, and it still runs on local water
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            In 2022, U.S. recreational saltwater fishing generated $138 billion in sales and
            supported about 692,000 jobs. Anglers took 201 million trips. Temperature is one of the
            first things those trips depend on. It moves bait and gamefish through the water column,
            and crews already watch it when they have it.
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
            Buoy {station.name} is reading {station.waterC.toFixed(1)}°C. A group of hulls along a
            creek mouth or a bank can show a gradient, which is what a single offshore station
            cannot do for a harbor.
          </p>
        </Copy>
      </Slide>

      <Slide id="conservation" className="overflow-hidden">
        <Photo src="/images/conservation.png" alt="Coastal marsh at dusk" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Conservation
          </p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-6xl">
            Blooms show up as heat before they show up as closures
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            The 2015 West Coast harmful algal bloom cut Dungeness crab landings by $97 million
            from the year before. Washington’s coastal towns lost about $40 million in tourism when
            the razor clam season closed. On Lake Erie, researchers estimated recreational anglers
            would lose $59 million a year if the western basin had to shut.
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
            Those events track with water temperature and weather. A mesh gives you the same fields
            at more points, so a heat spike is a pattern on a map instead of one lucky sample.
          </p>
        </Copy>
      </Slide>

      <Slide id="boats" className="overflow-hidden">
        <Photo src="/images/boats.png" alt="Small boat in chop" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Small boats</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-6xl">
            50 samples a second, then a simple scale
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            The IMU logs motion at 50 Hz. Tideline reports wave energy in g. Below 0.02 g the water
            is calm. Above 0.1 g it is rough. Buoy {station.name} is at {station.waveRmsG.toFixed(3)} g
            with {station.tiltDeg.toFixed(1)}° of tilt.
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
            NOAA’s coastal weather buoys measure waves for shipping and forecasts. A string of
            Raylay nodes can sit at a bar, a marina entrance, and a sheltered basin at the same
            time, which is the scale small craft actually use.
          </p>
        </Copy>
      </Slide>

      <Slide id="mesh" className="bg-bg">
        <div className="mx-auto grid min-h-[100svh] w-full max-w-5xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4, once: false }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
              A group of them
            </p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
              One hull is a station. Several hulls are coverage.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              Each buoy can forward another buoy’s packet over ESP-NOW. Units out of range of the
              laptop still arrive through a neighbor. Tideline already treats them as a fleet:
              buoy {station.name}, a named base, and a shared chart.
            </p>
            <ul className="mt-8 space-y-4 text-ink-2">
              <li>
                <span className="text-ink">Along a shoreline.</span> Temperature and wave energy
                change over a few hundred meters. Three nodes turn that into a line, which is enough
                to see a warm pocket or a rough entrance.
              </li>
              <li>
                <span className="text-ink">Up a river or creek.</span> Heat and runoff move
                downstream. A short string of cheap stations is how a school or a co-op watches a
                stretch NOAA will never instrument.
              </li>
              <li>
                <span className="text-ink">Around a working dock.</span> One unit at the mouth, one
                in the basin, one on the approach. Same website, more points, same two-second
                packets.
              </li>
            </ul>
          </motion.div>
          <MeshGraphic />
        </div>
      </Slide>

      <Slide id="hull" className="bg-bg">
        <div className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-8 px-6 py-24 md:grid-cols-2 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4, once: false }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">RAY</p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
              The print file, framed
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              This is the actual hull mesh, about 26 cm across and 9 cm tall. Drag to turn it. The
              shape is the manta-ray body the radios and probes sit in. If a fairing cracks, you
              print that piece again and put the bay back in the water.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.35, once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-square w-full bg-layer p-6 md:p-10"
          >
            <BuoyViewer className="h-full w-full" />
          </motion.div>
        </div>
      </Slide>

      <Slide id="end" className="overflow-hidden">
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-water md:block" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Tideline</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-6xl">
            The fleet view is already up
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            Map, sparklines, and the same fields you see here: water, air, pressure, wave energy,
            tilt, and GPS. Add hulls and the page gets denser. That is the whole idea.
          </p>
          <p className="mt-10 font-mono text-sm text-accent">
            {LIVE_STATION_URL.replace("https://", "")}
          </p>
        </Copy>
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
  const nodes = [
    { x: 16, y: 62, label: "Mouth" },
    { x: 38, y: 40, label: "#1" },
    { x: 58, y: 58, label: "Basin" },
    { x: 74, y: 28, label: "#3" },
    { x: 88, y: 48, label: "Base" },
  ];
  const links = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ];

  return (
    <motion.svg
      viewBox="0 0 100 80"
      className="h-64 w-full md:h-80"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.4, once: false }}
      transition={{ duration: 0.8 }}
      aria-hidden
    >
      {links.map(([a, b], i) => (
        <motion.line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#08bdba"
          strokeOpacity="0.45"
          strokeWidth="0.45"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ amount: 0.4, once: false }}
          transition={{ duration: 0.9, delay: 0.1 * i }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.g
          key={node.label}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.4, once: false }}
          transition={{ duration: 0.45, delay: 0.12 * i }}
        >
          <circle cx={node.x} cy={node.y} r="3.2" fill={i === 4 ? "#08bdba" : "#f4f4f4"} />
          <text
            x={node.x}
            y={node.y - 5.5}
            textAnchor="middle"
            fill="#8d8d8d"
            fontSize="3.4"
            fontFamily="IBM Plex Mono, monospace"
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  );
}
