"use client";

import { useEffect, useState } from "react";
import { Copy, Photo, Slide, Spark } from "@/components/fx";
import { usePresentation } from "@/hooks/use-presentation";
import { LIVE_STATION_URL, SECTIONS } from "@/lib/site";
import { LAST_PACKET, type TelemetryReading } from "@/lib/telemetry";
import { cn } from "@/lib/utils";

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
        // Keep whatever we already have on screen.
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

  return (
    <div className="bg-bg text-ink">
      <ol className="pointer-events-none fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {SECTIONS.map((section) => (
          <li
            key={section.id}
            className={cn(
              "h-1.5 rounded-full transition-all duration-400",
              active === section.id ? "w-5 bg-accent" : "w-1.5 bg-white/20",
            )}
          />
        ))}
      </ol>

      <Slide id="title">
        <Photo src="/images/hero-water.png" alt="" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            HackGT · Tideline
          </p>
          <h1 className="mt-3 text-6xl font-light tracking-tight text-ink md:text-8xl">Raylay</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            Small manta-ray buoys. They measure the water, hop the data across a radio mesh, and
            land it on Tideline.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 sm:gap-x-6">
            <Metric label="Water" value={station.waterC.toFixed(1)} unit="°C" />
            <Metric label="Air" value={station.airC.toFixed(1)} unit="°C" />
            <Metric label="Waves" value={station.waveRmsG.toFixed(3)} unit="g" />
            <Metric label="Pressure" value={station.pressureHpa.toFixed(0)} unit="hPa" />
          </dl>
          <Spark values={station.sparkWater} className="mt-6 h-9 w-56" />
        </Copy>
      </Slide>

      <Slide id="fishing">
        <Photo src="/images/fishing.png" alt="" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Fishing</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-6xl">
            Temperature is the useful number
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            People who work the same stretch of water every week already know this. Fish move when
            the water does. Buoy {station.name} is reading {station.waterC.toFixed(1)}°C.
          </p>
        </Copy>
      </Slide>

      <Slide id="conservation">
        <Photo src="/images/conservation.png" alt="" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Conservation
          </p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-6xl">
            Heat shows up here first
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            A bloom or a die-off doesn’t start as a headline. It starts as water getting warmer than
            it should. One buoy is a sample. A mesh of them is a picture of a creek or a bay.
          </p>
        </Copy>
      </Slide>

      <Slide id="boats">
        <Photo src="/images/boats.png" alt="" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Small boats</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-6xl">
            Calm is under 0.02 g
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            We don’t guess wave height from a forecast. The hull has a 50 Hz motion sensor. Wave
            energy right now is {station.waveRmsG.toFixed(3)} g, tilt {station.tiltDeg.toFixed(1)}°.
            That’s the local call.
          </p>
        </Copy>
      </Slide>

      <Slide id="end">
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-water md:block" />
        <Copy>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Tideline</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-6xl">
            The console is already live
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
            Map, charts, the mesh. Same numbers you just saw — water, air, pressure, wave energy,
            tilt — updating from the base station.
          </p>
          <p className="mt-10 font-mono text-sm text-accent">{LIVE_STATION_URL.replace("https://", "")}</p>
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
