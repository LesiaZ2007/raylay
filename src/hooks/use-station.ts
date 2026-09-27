"use client";

import { useEffect, useState } from "react";
import { buildExample, type TelemetryPayload } from "@/lib/telemetry";

export function useStation() {
  const [payload, setPayload] = useState<TelemetryPayload | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/telemetry", { cache: "no-store" });
        if (!response.ok) throw new Error("bad status");
        const json = (await response.json()) as TelemetryPayload;
        if (!cancelled && json.reading && json.source) setPayload(json);
      } catch {
        if (!cancelled) {
          setPayload((current) => current ?? { source: "example", reading: buildExample() });
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
