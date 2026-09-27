"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkline } from "@/components/sparkline";
import { COMPONENTS, HULL, IMPACT, LIVE_STATION_URL } from "@/lib/site";
import type { TelemetryPayload } from "@/lib/telemetry";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Radio, Waves } from "lucide-react";

const BuoyViewer = dynamic(
  () => import("@/components/buoy-viewer").then((mod) => mod.BuoyViewer),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full place-items-center">
        <p className="font-mono text-[11px] tracking-[0.22em] text-teal-100/60 uppercase">
          Staging RAY
        </p>
      </div>
    ),
  },
);

function Kicker({ children }: { children: string }) {
  return (
    <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-amber-200/90 uppercase">
      {children}
    </p>
  );
}

export function PitchSection() {
  return (
    <section id="pitch" className="section-snap relative">
      <div className="site-shell grid min-h-[100svh] items-center gap-8 pt-20 pb-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Kicker>Hackathon project · 3-minute briefing</Kicker>
          <h1 className="font-heading text-[clamp(3.4rem,9vw,7.4rem)] leading-[0.86] tracking-[-0.04em] text-teal-50">
            Ray<span className="text-amber-200">lay</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-teal-50/80 sm:text-xl">
            A low-cost sensor buoy that reads water temperature, wave height, and sea state — then
            relays the numbers to anyone who has to decide whether the water is safe.
          </p>
          <p className="mt-4 max-w-xl text-base text-teal-100/65">
            RAY is the hull. The lay is the relay. Together they turn a stretch of harbor, river, or
            nearshore water into a public instrument.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              nativeButton={false}
              render={<a href="#ray" />}
              className="h-10 rounded-full bg-amber-200 px-4 text-[#1b1406] hover:bg-amber-100"
            >
              Meet RAY
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<a href={LIVE_STATION_URL} target="_blank" rel="noreferrer" />}
              className="h-10 rounded-full border-white/20 bg-white/5 px-4 text-teal-50 hover:bg-white/10"
            >
              Open live station
              <ArrowUpRight className="size-3.5" />
            </Button>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.18em] text-teal-100/50 uppercase">
                Water temp
              </dt>
              <dd className="mt-1 text-sm text-teal-50">Measured in situ</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.18em] text-teal-100/50 uppercase">
                Sea state
              </dt>
              <dd className="mt-1 text-sm text-teal-50">Height and period</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.18em] text-teal-100/50 uppercase">
                Public feed
              </dt>
              <dd className="mt-1 text-sm text-teal-50">raylay.amuhak.com</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="hero-frame">
            <BuoyViewer className="h-[min(62vh,560px)] w-full" />
            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between text-teal-50/80">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
                Drag to orbit · actual print mesh
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
                {HULL.spanMm} × {HULL.lengthMm} × {HULL.heightMm} mm
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GapSection() {
  return (
    <section id="gap" className="section-snap">
      <div className="site-shell py-20 md:py-28">
        <Kicker>02 · The data desert</Kicker>
        <h2 className="max-w-4xl font-heading text-4xl tracking-[-0.03em] text-teal-50 sm:text-6xl">
          Official buoys watch shipping lanes. Most working water is still a blank.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-teal-100/70">
          NOAA and research fleets are excellent at the places they cover. They are also expensive,
          sparse, and aimed at ports and science programs. The creek mouth, the swimming hole, the
          subsistence landing — those waters stay unread.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Tens of thousands of dollars",
              body: "A directional waverider is a capital project. If you run a skiff, a water taxi, or a high-school robotics shop, that instrument was never priced for you.",
            },
            {
              title: "The wrong resolution",
              body: "A regional forecast can be right and still be useless at the bar. Small-craft risk is local: fetch, wind against tide, a heat spike in a sheltered basin.",
            },
            {
              title: "The wrong owners",
              body: "When only agencies can afford a station, only agencies set the questions. Raylay is built so a community can hang its own instrument and publish the feed.",
            },
          ].map((card) => (
            <Card key={card.title} className="glass-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-teal-50">{card.title}</CardTitle>
                <CardDescription className="text-teal-100/70">{card.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RaySection() {
  return (
    <section id="ray" className="section-snap">
      <div className="site-shell grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="hero-frame overflow-hidden">
          <BuoyViewer className="h-[min(58vh,520px)] w-full" />
        </div>
        <div>
          <Kicker>03 · Meet RAY</Kicker>
          <h2 className="font-heading text-4xl tracking-[-0.03em] text-teal-50 sm:text-5xl">
            A hull you can print, open, and put back in the water.
          </h2>
          <p className="mt-5 text-lg text-teal-100/70">
            This is the real RAY mesh — 104,864 triangles, about the size of a backpack — not a
            marketing silhouette. The shape is squat and wide so it rides like a working float, not
            a research monument.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              `${HULL.spanMm} mm span, ${HULL.heightMm} mm tall — printable on a serious desktop machine`,
              "Repairable fairing: reprint a cracked part instead of retiring the station",
              "Designed around a sealed bay you can still open on a workbench",
            ].map((line) => (
              <li key={line} className="flex gap-3 text-teal-50/85">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-200" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/15 text-teal-50">
              3D-printed hull
            </Badge>
            <Badge variant="outline" className="border-white/15 text-teal-50">
              Field-serviceable
            </Badge>
            <Badge variant="outline" className="border-white/15 text-teal-50">
              Open station
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SensorsSection() {
  return (
    <section id="sensors" className="section-snap">
      <div className="site-shell py-20 md:py-28">
        <Kicker>04 · The array</Kicker>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-heading text-4xl tracking-[-0.03em] text-teal-50 sm:text-5xl">
            Eight pieces. One job: turn motion and heat into a public packet.
          </h2>
          <p className="max-w-sm text-sm text-teal-100/60">
            Commodity sensors, a printed body, and a relay. Nothing here is meant to be mysterious —
            mystery is what makes ocean data expensive.
          </p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {COMPONENTS.map((item, index) => (
            <Card key={item.id} className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-amber-200/80 uppercase">
                    {String(index + 1).padStart(2, "0")} · {item.role}
                  </span>
                </div>
                <CardTitle className="font-heading text-xl text-teal-50">{item.name}</CardTitle>
                <CardDescription className="text-teal-100/70">{item.detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LiveSection() {
  const [payload, setPayload] = useState<TelemetryPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/api/telemetry", { cache: "no-store" });
        if (!response.ok) throw new Error("bad status");
        const json = (await response.json()) as TelemetryPayload;
        if (!cancelled) {
          setPayload(json);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const reading = payload?.reading;
  const live = payload?.source === "live";

  return (
    <section id="live" className="section-snap">
      <div className="site-shell py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker>05 · The station</Kicker>
            <h2 className="font-heading text-4xl tracking-[-0.03em] text-teal-50 sm:text-5xl">
              Numbers on the water, not in a lab notebook.
            </h2>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "h-7 border-white/15 px-3 font-mono text-[10px] tracking-[0.18em] uppercase",
              live ? "text-emerald-200" : "text-amber-100",
            )}
          >
            <span className={cn("mr-2 size-1.5 rounded-full", live ? "bg-emerald-300" : "bg-amber-200")} />
            {error ? "Feed unreachable" : live ? "Live packets" : "Replay · station offline"}
          </Badge>
        </div>
        <p className="mt-5 max-w-2xl text-lg text-teal-100/70">
          {payload?.note ??
            "Checking raylay.amuhak.com. If the host is down, the briefing keeps a replay on screen so the talk never goes blank."}
        </p>

        {error && !payload ? (
          <Card className="glass-card mt-10">
            <CardContent className="py-8">
              <p className="text-teal-100/75">
                Could not reach the local telemetry proxy. The public station still lives at{" "}
                <a className="underline decoration-amber-200/70" href={LIVE_STATION_URL}>
                  raylay.amuhak.com
                </a>
                .
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-50">
                  <Waves className="size-4 text-amber-200" />
                  Sea state
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-3">
                <Metric
                  label="Water temp"
                  value={reading ? `${reading.waterTempC.toFixed(1)}°C` : "—"}
                />
                <Metric
                  label="Wave height"
                  value={reading ? `${reading.waveHeightM.toFixed(2)} m` : "—"}
                />
                <Metric
                  label="Wave period"
                  value={reading ? `${reading.wavePeriodS.toFixed(1)} s` : "—"}
                />
              </CardContent>
              <CardContent>
                <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-teal-100/45 uppercase">
                  Height, last several minutes
                </p>
                <Sparkline
                  values={(payload?.history ?? []).map((row) => row.waveHeightM)}
                  className="h-16 w-full text-teal-200/80"
                />
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-50">
                  <Radio className="size-4 text-amber-200" />
                  Packet
                </CardTitle>
                <CardDescription className="text-teal-100/65">
                  Battery, fix, and the public host. When the station wakes up, this card stops
                  replaying and starts echoing live frames.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 font-mono text-sm text-teal-50/90">
                <Row label="Battery" value={reading ? `${reading.batteryPct}%` : "—"} />
                <Row
                  label="Fix"
                  value={
                    reading && Number.isFinite(reading.lat) && Number.isFinite(reading.lon)
                      ? `${reading.lat.toFixed(3)}, ${reading.lon.toFixed(3)}`
                      : "Held for replay"
                  }
                />
                <Row
                  label="Stamp"
                  value={
                    reading
                      ? new Date(reading.recordedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "—"
                  }
                />
                <Row label="Host" value="raylay.amuhak.com" />
              </CardContent>
              <CardContent>
                <Button
                  nativeButton={false}
                  render={<a href={LIVE_STATION_URL} target="_blank" rel="noreferrer" />}
                  className="h-10 w-full rounded-full bg-teal-100 text-[#082024] hover:bg-white"
                >
                  Open raylay.amuhak.com
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.18em] text-teal-100/45 uppercase">{label}</p>
      <p className="mt-1 font-heading text-4xl tracking-[-0.03em] text-teal-50">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-2">
      <span className="text-teal-100/45">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export function ImpactSection() {
  return (
    <section id="impact" className="section-snap">
      <div className="site-shell py-20 md:py-28">
        <Kicker>06 · Who this is for</Kicker>
        <h2 className="max-w-4xl font-heading text-4xl tracking-[-0.03em] text-teal-50 sm:text-6xl">
          Social good is not a slide at the end. It is the reason the buoy exists.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-teal-100/70">
          Climate numbers that never reach a dock are decoration. Raylay is aimed at the people who
          already read water with their eyes — and deserve instruments that do not require a grant
          office.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {IMPACT.map((item, index) => (
            <Card key={item.id} className="glass-card">
              <CardHeader>
                <p className="font-mono text-[10px] tracking-[0.22em] text-amber-200/85 uppercase">
                  {String(index + 1).padStart(2, "0")} · {item.kicker}
                </p>
                <CardTitle className="font-heading text-2xl text-teal-50 sm:text-3xl">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-base text-teal-100/70">{item.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Commercial buoy versus Raylay</caption>
            <thead className="bg-white/5 font-mono text-[10px] tracking-[0.18em] text-teal-100/55 uppercase">
              <tr>
                <th className="px-4 py-3 font-medium"> </th>
                <th className="px-4 py-3 font-medium">Typical waverider</th>
                <th className="px-4 py-3 font-medium">Raylay</th>
              </tr>
            </thead>
            <tbody className="text-teal-50/85">
              {[
                ["Cost to own", "Capital equipment, often $10k–$50k+", "Printed hull + commodity sensors"],
                ["Who maintains it", "Agency or contractor", "A local team with a workbench"],
                ["Where it sits", "Shipping lanes, research sites", "The water people actually use"],
                ["Who can read it", "Specialized portals", "Open station at raylay.amuhak.com"],
                ["If it breaks", "Factory cycle", "Reprint a part, reseal, redeploy"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-white/8">
                  {row.map((cell, i) => (
                    <td key={cell} className={cn("px-4 py-3", i === 0 && "text-teal-100/55")}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function CloseSection() {
  return (
    <section id="close" className="section-snap">
      <div className="site-shell flex min-h-[88svh] flex-col justify-center py-20">
        <Kicker>07 · The ask</Kicker>
        <h2 className="max-w-4xl font-heading text-5xl tracking-[-0.04em] text-teal-50 sm:text-7xl">
          One RAY is a prototype. A network is a public utility.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-teal-100/75">
          Help us keep the station in the water, keep the feed public, and put the next hull where
          official maps are still blank — working harbors, swim piers, and communities that have
          been told to wait.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            nativeButton={false}
            render={<a href={LIVE_STATION_URL} target="_blank" rel="noreferrer" />}
            className="h-11 rounded-full bg-amber-200 px-5 text-[#1b1406] hover:bg-amber-100"
          >
            Follow the live station
            <ArrowUpRight className="size-3.5" />
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={<a href="#pitch" />}
            className="h-11 rounded-full border-white/20 bg-white/5 px-5 text-teal-50 hover:bg-white/10"
          >
            Back to the pitch
          </Button>
        </div>
        <p className="mt-16 font-mono text-[11px] tracking-[0.22em] text-teal-100/40 uppercase">
          Raylay · local water, public data
        </p>
      </div>
    </section>
  );
}
