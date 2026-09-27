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
};

export type TelemetryPayload = {
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

export function readingFromTideline(raw: unknown): TelemetryReading | null {
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
    name: typeof node.name === "string" ? node.name : "#1",
    waterC,
    airC: pick(latest, ["air_c"]) ?? 0,
    pressureHpa: pick(latest, ["pressure_hpa"]) ?? 0,
    waveRmsG: pick(latest, ["wave_rms_g"]) ?? 0,
    wavePeakG: pick(latest, ["wave_peak_g"]) ?? 0,
    tiltDeg: pick(latest, ["tilt"]) ?? 0,
    sparkWater: numbers(spark?.water_c),
    sparkWaves: numbers(spark?.wave_rms_g),
  };
}

export const LAST_PACKET: TelemetryReading = {
  name: "#1",
  waterC: 21.12,
  airC: 23.89,
  pressureHpa: 982.43,
  waveRmsG: 0.015,
  wavePeakG: 0.079,
  tiltDeg: 3.79,
  sparkWater: [
    21.25, 21.31, 21.25, 21.18, 21.12, 21.18, 21.18, 21.12, 21.18, 21.12,
  ],
  sparkWaves: [0, 0.001, 0.058, 0.002, 0, 0.001, 0, 0, 0, 0.015],
};
