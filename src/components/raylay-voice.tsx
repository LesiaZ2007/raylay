"use client";

import { motion } from "motion/react";
import { VOICE_THREAD } from "@/lib/site";
import { cn } from "@/lib/utils";

export function RaylayVoice() {
  return (
    <div className="w-full">
      <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
        Raylay voice
      </p>
      <h2 className="mt-3 max-w-3xl text-4xl font-light tracking-tight text-ink md:text-5xl">
        What the number means
      </h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <ol className="space-y-6">
          <Beat n="01" title="Silent, named">
            Two gaps on buoy one, six and twelve minutes ago, before anyone scrolls a plot.
          </Beat>
          <Beat n="02" title="Rough-water patch">
            A stretch over 0.10 g RMS. It opens that chart and says where the hull crossed it.
          </Beat>
          <Beat n="03" title="Impact warning">
            0.83 g is the hit, named out loud. A fisherman and a crew hear the same sentence.
          </Beat>
        </ol>

        <div className="bg-layer">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="font-mono text-[11px] tracking-[0.16em] text-ink uppercase">
              Raylay voice
            </p>
            <p className="font-mono text-[10px] text-accent">Listening</p>
          </div>
          <div className="max-h-[min(62vh,520px)] space-y-3 overflow-y-auto px-4 py-4">
            {VOICE_THREAD.map((line, i) => (
              <motion.div
                key={`${line.role}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: false }}
                transition={{ duration: 0.4, delay: 0.04 * i }}
              >
                {line.role === "tool" ? (
                  <p className="font-mono text-[11px] break-all text-accent">{line.text}</p>
                ) : (
                  <div>
                    <p
                      className={cn(
                        "font-mono text-[10px] tracking-[0.16em] uppercase",
                        line.role === "you" ? "text-ink-3" : "text-accent",
                      )}
                    >
                      {line.role === "you" ? "You" : "Raylay"}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink">{line.text}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <p className="border-t border-border px-4 py-3 font-mono text-[11px] text-ink-3">
            Ask about the water
          </p>
        </div>
      </div>
    </div>
  );
}

function Beat({ n, title, children }: { n: string; title: string; children: string }) {
  return (
    <li>
      <p className="font-mono text-[10px] tracking-[0.16em] text-ink-3 uppercase">
        {n} · {title}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{children}</p>
    </li>
  );
}
