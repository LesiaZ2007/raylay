import { LIVE_STATION_URL } from "@/lib/site";
import { buildExample, readingFromStation, type TelemetryPayload } from "@/lib/telemetry";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(`${LIVE_STATION_URL}/api/nodes`, {
      cache: "no-store",
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (response.ok) {
      const parsed = readingFromStation((await response.json()) as unknown);
      if (parsed?.live) {
        const payload: TelemetryPayload = { source: "live", reading: parsed.reading };
        return Response.json(payload);
      }
    }
  } catch {
    // Fall through to the labeled example.
  }

  return Response.json({
    source: "example",
    reading: buildExample(),
  } satisfies TelemetryPayload);
}
