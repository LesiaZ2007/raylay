"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Field, Pane, Slide, Spark } from "@/components/fx";
import { LiveView, useStation } from "@/components/live-view";
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
            A printed hull, an ESP32, and a handful of catalog sensors. They mesh over ESP-NOW and
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
            The ESP32 reads the probe and the breakout boards, then hops a small packet to the next
            buoy or to the laptop that runs Tideline.
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

      <Slide id="fishing">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Part 2 · Who this is for
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            Crews who eat what they catch
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            Recreational saltwater fishing was $138 billion in U.S. sales in 2022, but the people
            who feel a bad week first are small crews and subsistence fishers on landings that never
            get an NDBC siting. Water temperature is the number they already use when they can get
            it. It moves bait and tells you when a stretch has gone stale.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            After the 2015 West Coast bloom, Dungeness crab landings dropped $97 million and
            Washington’s coastal towns lost about $40 million in tourism when the razor clam season
            closed. Buoy {station.name} is at {station.waterC.toFixed(1)}°C. A DS18B20 on a public
            page is how a landing gets that number without a grant office.
          </p>
        </Pane>
      </Slide>

      <Slide id="neighborhoods">
        <Pane>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Neighborhoods
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
            The places that flood and cook first
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            Low-income waterfronts and neighborhoods downstream of industry see runoff, sewage
            overflows, and heat in the basin before anyone publishes a report. They also get sensors
            last. On Lake Erie, researchers put $59 million a year of recreational fishing value at
            risk if the western basin had to close after blooms.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            A DS18B20 and a BMP280 will not replace a chemistry lab. They will tell a clinic, a
            church group, or a high-school team that the water jumped two degrees. Tideline is a
            URL. There is no research login.
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
            The people in 16-foot boats are the ones who take the bar on a weekday. The MPU6050
            samples 50 times a second. Tideline calls under 0.02 g calm and over 0.1 g rough. Buoy{" "}
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
              Three cheap nodes beat one station you will never get
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              ESP-NOW lets a buoy out of range of the laptop hand its packet to a neighbor. A co-op
              can put one hull at the landing, one at the creek mouth, and one on the approach. Same
              Tideline page.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              If a fairing cracks, you print it again. If the probe dies, you order another DS18B20.
              The fleet stays in the water because the people who use it can fix it.
            </p>
          </div>
          <MeshGraphic />
        </Pane>
      </Slide>

      <Slide id="hull">
        <Pane className="md:grid md:grid-cols-2 md:items-center md:gap-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">RAY</p>
            <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
              The hull those parts sit in
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              This is the print file, about 26 cm across. Drag to turn it. The bay holds the ESP32,
              the LiPo, and the breakouts. The DS18B20 exits into the water.
            </p>
          </div>
          <div className="mt-10 aspect-square w-full bg-layer p-6 md:mt-0 md:p-10">
            <BuoyViewer className="h-full w-full" />
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
            Map, charts, and the packet from buoy {station.name}. Add hulls and the neighborhood
            gets a line of numbers instead of a gap on the official map.
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
  const nodes = [
    { x: 18, y: 60, label: "Landing" },
    { x: 40, y: 38, label: "#1" },
    { x: 58, y: 58, label: "Mouth" },
    { x: 76, y: 30, label: "#3" },
    { x: 88, y: 50, label: "Base" },
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
      className="mt-10 h-56 w-full md:mt-0 md:h-80"
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
