"use client";

import { useEffect, useState } from "react";
import { Spark } from "@/components/fx";
import { LIVE_STATION_URL } from "@/lib/site";
import { buildExample, LAST_PACKET, type TelemetryPayload } from "@/lib/telemetry";
import { cn } from "@/lib/utils";

export function useStation(): TelemetryPayload {
  const [payload, setPayload] = useState<TelemetryPayload>({
    source: "example",
    reading: LAST_PACKET,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/telemetry", { cache: "no-store" });
        if (!response.ok) throw new Error("bad status");
        const json = (await response.json()) as TelemetryPayload;
        if (!cancelled && json.reading) setPayload(json);
      } catch {
        if (!cancelled) {
          setPayload({ source: "example", reading: buildExample() });
        }
      }
    };

    void load();
    const timer = window.setInterval(() => {
      void load();
    }, 2000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return payload;
}

export function LiveView({ payload }: { payload: TelemetryPayload }) {
  const live = payload.source === "live";
  const reading = payload.reading;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Live view
          </p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
            What Tideline shows
          </h2>
        </div>
        <p
          className={cn(
            "font-mono text-[11px] tracking-[0.14em] uppercase",
            live ? "text-success" : "text-warning",
          )}
        >
          {live ? `Live · buoy ${reading.name}` : "Example · buoy offline"}
        </p>
      </div>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
        {live
          ? `These are the fields coming off buoy ${reading.name} right now. Same water, air, pressure, wave energy, and tilt you get on Tideline.`
          : "The buoy is not sending right now, so this panel is running an example packet with the same fields and the same scale Tideline uses."}
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Kpi label="Water" value={reading.waterC.toFixed(1)} unit="°C" series={reading.sparkWater} />
        <Kpi label="Air" value={reading.airC.toFixed(1)} unit="°C" series={reading.sparkAir} />
        <Kpi
          label="Pressure"
          value={reading.pressureHpa.toFixed(1)}
          unit="hPa"
          series={[reading.pressureHpa - 0.2, reading.pressureHpa, reading.pressureHpa + 0.1]}
        />
        <Kpi label="Wave energy" value={reading.waveRmsG.toFixed(3)} unit="g RMS" series={reading.sparkWaves} />
        <Kpi label="Wave peak" value={reading.wavePeakG.toFixed(3)} unit="g" series={reading.sparkWaves} />
        <Kpi label="Tilt" value={reading.tiltDeg.toFixed(1)} unit="°" series={reading.sparkTilt} />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <ChartCard title="Water temperature" unit="°C" values={reading.sparkWater} />
        <ChartCard title="Wave energy" unit="g" values={reading.sparkWaves} />
      </div>

      <p className="mt-6 font-mono text-xs text-ink-3">
        Calm is under 0.02 g. Rough is over 0.1 g. Full console at {LIVE_STATION_URL.replace("https://", "")}
      </p>
    </div>
  );
}

function Kpi({
  label,
  value,
  unit,
  series,
}: {
  label: string;
  value: string;
  unit: string;
  series: number[];
}) {
  return (
    <div className="bg-layer px-4 py-4">
      <p className="font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">{label}</p>
      <p className="mt-2 text-3xl font-light text-ink">
        {value}
        <span className="ml-1 text-sm text-ink-3">{unit}</span>
      </p>
      <Spark values={series} className="mt-3 h-8 w-full" />
    </div>
  );
}

function ChartCard({
  title,
  unit,
  values,
}: {
  title: string;
  unit: string;
  values: number[];
}) {
  return (
    <div className="bg-layer px-4 py-4">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">{title}</p>
        <p className="font-mono text-[10px] text-ink-3">{unit}</p>
      </div>
      <Spark values={values} className="mt-4 h-24 w-full" />
    </div>
  );
}
