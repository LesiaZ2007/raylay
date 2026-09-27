export type TelemetryReading = {
  waterTempC: number;
  waveHeightM: number;
  wavePeriodS: number;
  batteryPct: number;
  lat: number;
  lon: number;
  recordedAt: string;
};

export type TelemetryPayload = {
  source: "live" | "offline";
  stationUrl: string;
  liveUrlTried: string[];
  reading: TelemetryReading | null;
  history: TelemetryReading[];
  note: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function pickNumber(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (key in record) {
      const n = asNumber(record[key]);
      if (n !== null) return n;
    }
  }
  return null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

export function normalizeLiveReading(raw: unknown): TelemetryReading | null {
  const root = asRecord(raw);
  if (!root) return null;

  const nested =
    asRecord(root.data) ??
    asRecord(root.telemetry) ??
    asRecord(root.reading) ??
    asRecord(root.latest) ??
    root;

  const waterTempC = pickNumber(nested, [
    "waterTempC",
    "water_temp_c",
    "waterTemperature",
    "water_temperature",
    "temperature",
    "temp",
    "tempC",
  ]);
  const waveHeightM = pickNumber(nested, [
    "waveHeightM",
    "wave_height_m",
    "waveHeight",
    "wave_height",
    "height",
    "hs",
  ]);
  const wavePeriodS = pickNumber(nested, [
    "wavePeriodS",
    "wave_period_s",
    "wavePeriod",
    "wave_period",
    "period",
    "tp",
  ]);

  if (waterTempC === null && waveHeightM === null) return null;

  const recorded =
    (typeof nested.recordedAt === "string" && nested.recordedAt) ||
    (typeof nested.timestamp === "string" && nested.timestamp) ||
    (typeof nested.time === "string" && nested.time) ||
    new Date().toISOString();

  return {
    waterTempC: waterTempC ?? 0,
    waveHeightM: waveHeightM ?? 0,
    wavePeriodS: wavePeriodS ?? 0,
    batteryPct: pickNumber(nested, ["batteryPct", "battery", "battery_pct"]) ?? 0,
    lat: pickNumber(nested, ["lat", "latitude"]) ?? 0,
    lon: pickNumber(nested, ["lon", "lng", "longitude"]) ?? 0,
    recordedAt: recorded,
  };
}

export function buildReplayReading(now = Date.now()): TelemetryReading {
  const t = now / 1000;
  return {
    waterTempC: Number((18.6 + 0.35 * Math.sin(t / 46)).toFixed(2)),
    waveHeightM: Number(
      clamp(0.62 + 0.22 * Math.sin(t / 7.5) + 0.08 * Math.sin(t / 2.2), 0.2, 1.6).toFixed(2),
    ),
    wavePeriodS: Number((5.1 + 0.45 * Math.sin(t / 13)).toFixed(2)),
    batteryPct: 86,
    lat: Number.NaN,
    lon: Number.NaN,
    recordedAt: new Date(now).toISOString(),
  };
}

export function buildReplayHistory(now = Date.now(), points = 48): TelemetryReading[] {
  const stepMs = 8_000;
  return Array.from({ length: points }, (_, i) =>
    buildReplayReading(now - (points - 1 - i) * stepMs),
  );
}
