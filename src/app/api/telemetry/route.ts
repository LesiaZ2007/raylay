import { LIVE_STATION_URL } from "@/lib/site";
import {
  buildReplayHistory,
  buildReplayReading,
  normalizeLiveReading,
  type TelemetryPayload,
} from "@/lib/telemetry";

export const dynamic = "force-dynamic";

const LIVE_CANDIDATES = [
  `${LIVE_STATION_URL}/api/telemetry`,
  `${LIVE_STATION_URL}/api/status`,
  `${LIVE_STATION_URL}/api`,
  `${LIVE_STATION_URL}/telemetry`,
  `${LIVE_STATION_URL}/data`,
];

async function tryLive(): Promise<{ reading: ReturnType<typeof normalizeLiveReading>; tried: string[] }> {
  const tried: string[] = [];

  for (const url of LIVE_CANDIDATES) {
    tried.push(url);
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: { accept: "application/json,text/plain,*/*" },
        signal: AbortSignal.timeout(3500),
      });
      if (!response.ok) continue;
      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("json")) continue;
      const raw = (await response.json()) as unknown;
      const reading = normalizeLiveReading(raw);
      if (reading) return { reading, tried };
    } catch {
      // Station is often parked behind a 502. Keep walking the list.
    }
  }

  return { reading: null, tried };
}

export async function GET() {
  const { reading, tried } = await tryLive();
  const now = Date.now();

  const payload: TelemetryPayload = reading
    ? {
        source: "live",
        stationUrl: LIVE_STATION_URL,
        liveUrlTried: tried,
        reading,
        history: [...buildReplayHistory(now).slice(0, -1), reading],
        note: "Live packets from the Raylay station.",
      }
    : {
        source: "offline",
        stationUrl: LIVE_STATION_URL,
        liveUrlTried: tried,
        reading: buildReplayReading(now),
        history: buildReplayHistory(now),
        note: "Station is offline. Showing a field-session replay so the talk still has numbers on screen.",
      };

  return Response.json(payload);
}
