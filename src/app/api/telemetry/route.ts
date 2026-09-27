import { LIVE_STATION_URL } from "@/lib/site";
import { buildExample, readingFromStation, type TelemetryPayload } from "@/lib/telemetry";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(`${LIVE_STATION_URL}/api/nodes`, {
      cache: "no-store",
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) {
      const parsed = readingFromStation((await response.json()) as unknown);
      if (parsed) {
        const payload: TelemetryPayload = {
          source: parsed.live ? "live" : "station",
          reading: parsed.reading,
        };
        return Response.json(payload, {
          headers: { "cache-control": "no-store" },
        });
      }
    }
  } catch {
    // Fall through to the labeled example only when the station cannot be read.
  }

  return Response.json(
    {
      source: "example",
      reading: buildExample(),
    } satisfies TelemetryPayload,
    { headers: { "cache-control": "no-store" } },
  );
}
