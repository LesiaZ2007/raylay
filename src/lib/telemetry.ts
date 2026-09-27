export type TelemetryReading = {
  name: string;
  waterC: number;
  airC: number;
  pressureHpa: number;
  waveRmsG: number;
  wavePeakG: number;
  tiltDeg: number;
  sparkWater: number[];
  sparkWaves: number[];
  sparkAir: number[];
  sparkTilt: number[];
};

export type TelemetryPayload = {
  source: "live" | "example";
  reading: TelemetryReading;
};

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function pick(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const n = asNumber(record[key]);
    if (n !== null) return n;
  }
  return null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function numbers(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return value.filter((n): n is number => typeof n === "number" && Number.isFinite(n));
}

function isFresh(node: Record<string, unknown>) {
  const status = typeof node.status === "string" ? node.status : "";
  if (status === "offline" || status === "unknown" || status === "stale") return false;
  if (status === "online" || status === "ok" || status === "live") return true;
  const age = asNumber(node.age_s);
  return age !== null && age < 20;
}

export function readingFromTideline(raw: unknown): { reading: TelemetryReading; live: boolean } | null {
  const root = asRecord(raw);
  if (!root) return null;

  const nodes = Array.isArray(root.nodes) ? root.nodes : [];
  const node = asRecord(nodes[0]);
  if (!node) return null;
  const latest = asRecord(node.latest);
  const spark = asRecord(node.spark);
  if (!latest) return null;

  const waterC = pick(latest, ["water_c"]);
  if (waterC === null) return null;

  return {
    live: isFresh(node),
    reading: {
      name: typeof node.name === "string" ? node.name : "#1",
      waterC,
      airC: pick(latest, ["air_c"]) ?? 0,
      pressureHpa: pick(latest, ["pressure_hpa"]) ?? 0,
      waveRmsG: pick(latest, ["wave_rms_g"]) ?? 0,
      wavePeakG: pick(latest, ["wave_peak_g"]) ?? 0,
      tiltDeg: pick(latest, ["tilt"]) ?? 0,
      sparkWater: numbers(spark?.water_c),
      sparkWaves: numbers(spark?.wave_rms_g),
      sparkAir: numbers(spark?.air_c),
      sparkTilt: numbers(spark?.tilt),
    },
  };
}

export function buildExample(now = Date.now()): TelemetryReading {
  const points = 48;
  const sparkWater: number[] = [];
  const sparkWaves: number[] = [];
  const sparkAir: number[] = [];
  const sparkTilt: number[] = [];
  const step = 2000;

  for (let i = 0; i < points; i++) {
    const t = (now - (points - 1 - i) * step) / 1000;
    sparkWater.push(Number((21.35 + 0.22 * Math.sin(t / 38) + 0.05 * Math.sin(t / 9)).toFixed(2)));
    sparkWaves.push(
      Number(Math.max(0.004, 0.028 + 0.018 * Math.sin(t / 7) + 0.01 * Math.sin(t / 2.4)).toFixed(3)),
    );
    sparkAir.push(Number((23.6 + 0.18 * Math.sin(t / 50)).toFixed(2)));
    sparkTilt.push(Number((3.4 + 0.35 * Math.sin(t / 6)).toFixed(2)));
  }

  return {
    name: "#1",
    waterC: sparkWater[sparkWater.length - 1] ?? 21.35,
    airC: sparkAir[sparkAir.length - 1] ?? 23.6,
    pressureHpa: Number((982.2 + 0.15 * Math.sin(now / 20000)).toFixed(2)),
    waveRmsG: sparkWaves[sparkWaves.length - 1] ?? 0.028,
    wavePeakG: Number(((sparkWaves[sparkWaves.length - 1] ?? 0.028) * 4.2).toFixed(3)),
    tiltDeg: sparkTilt[sparkTilt.length - 1] ?? 3.4,
    sparkWater,
    sparkWaves,
    sparkAir,
    sparkTilt,
  };
}

export const LAST_PACKET = buildExample(1_790_487_000_000);
