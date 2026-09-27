"use client";

import { CloseSection, GapSection, ImpactSection, LiveSection, PitchSection, RaySection, SensorsSection } from "@/components/sections";
import { SiteNav, TalkRail } from "@/components/site-nav";
import { usePresentation } from "@/hooks/use-presentation";

export function PresentationShell() {
  const active = usePresentation();

  return (
    <div className="relative">
      <SiteNav active={active} />
      <TalkRail active={active} />
      <PitchSection />
      <GapSection />
      <RaySection />
      <SensorsSection />
      <LiveSection />
      <ImpactSection />
      <CloseSection />
    </div>
  );
}
