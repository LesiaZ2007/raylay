"use client";

import { Spark } from "@/components/fx";
import type { TelemetryPayload } from "@/lib/telemetry";
import { cn } from "@/lib/utils";

export function LiveView({ payload }: { payload: TelemetryPayload | null }) {
  if (!payload) {
    return (
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Live view</p>
        <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
          What the numbers do to you on the water
        </h2>
        <p className="mt-5 font-mono text-[11px] text-ink-3">Reading the buoy</p>
      </div>
    );
  }

  const reading = payload.reading;
  const live = payload.source === "live";
  const fromStation = live || payload.source === "station";

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            Live view
          </p>
          <h2 className="mt-3 text-4xl font-light tracking-tight text-ink md:text-5xl">
            What the numbers do to you on the water
          </h2>
        </div>
        <p
          className={cn(
            "font-mono text-[11px] tracking-[0.14em] uppercase",
            live ? "text-success" : fromStation ? "text-ink-2" : "text-warning",
          )}
        >
          {live
            ? `Live · buoy ${reading.name}`
            : fromStation
              ? `Buoy ${reading.name}`
              : "Example · station not reached"}
        </p>
      </div>

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

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Meaning
          who="Going out"
          text={`Water at ${reading.waterC.toFixed(1)}°C is the band a morning starts in, on a lake or a coast. Waves at ${reading.waveRmsG.toFixed(3)} g RMS are ${seaCall(reading.waveRmsG)}. The ${reading.wavePeakG.toFixed(3)} g peak is the knock you feel in a skiff, not a specialist index.`}
        />
        <Meaning
          who="Watching the water"
          text={`Air at ${reading.airC.toFixed(1)}°C and ${reading.pressureHpa.toFixed(0)} hPa are the day changing overhead. A temperature jump, or a node that goes quiet, is the local record a landing has before a county post.`}
        />
      </div>
      <p className="mt-4 font-mono text-xs text-ink-3">
        Calm is under 0.02 g. Rough is over 0.1 g. Same fields, said in a boat.
      </p>
    </div>
  );
}

function seaCall(rms: number) {
  if (rms < 0.02) return "calm enough for a flat crossing";
  if (rms < 0.1) return "workable in a skiff or a kayak, not flat";
  return "rough enough to stay ashore";
}

function Meaning({ who, text }: { who: string; text: string }) {
  return (
    <div className="bg-layer px-4 py-4">
      <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">{who}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">{text}</p>
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
