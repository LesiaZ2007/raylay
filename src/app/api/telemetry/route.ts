import { LIVE_STATION_URL } from "@/lib/site";
import { LAST_PACKET, readingFromTideline, type TelemetryPayload } from "@/lib/telemetry";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(`${LIVE_STATION_URL}/api/nodes`, {
      cache: "no-store",
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (response.ok) {
      const raw = (await response.json()) as unknown;
      const reading = readingFromTideline(raw);
      if (reading) {
        const payload: TelemetryPayload = { reading };
        return Response.json(payload);
      }
    }
  } catch {
    // Fall through to the last known packet.
  }

  return Response.json({ reading: LAST_PACKET } satisfies TelemetryPayload);
}
