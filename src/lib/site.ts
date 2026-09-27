export const LIVE_STATION_URL = "https://raylay.amuhak.com";

export const SECTIONS = [
  { id: "pitch", label: "Pitch", beat: "01", clock: "0:00" },
  { id: "gap", label: "The gap", beat: "02", clock: "0:30" },
  { id: "ray", label: "RAY", beat: "03", clock: "1:00" },
  { id: "sensors", label: "Sensors", beat: "04", clock: "1:25" },
  { id: "live", label: "Live", beat: "05", clock: "1:50" },
  { id: "impact", label: "Impact", beat: "06", clock: "2:15" },
  { id: "close", label: "Close", beat: "07", clock: "2:50" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const HULL = {
  spanMm: 260,
  lengthMm: 232,
  heightMm: 89,
  triangles: 104_864,
};

export const COMPONENTS = [
  {
    id: "hull",
    name: "Printed hull",
    role: "Body",
    title: "RAY, the 3D-printed hull",
    detail:
      "A compact, repairable shell sized to be printed locally. The geometry is the actual RAY mesh — about 26 cm across — so a shop class or makerspace can reprint a cracked fairing instead of buying a sealed commercial body.",
  },
  {
    id: "temp",
    name: "Temperature probe",
    role: "Water",
    title: "Water temperature",
    detail:
      "A submerged probe reads the water people actually enter. Temperature is the go / no-go number for swimmers, a hypothermia cue for small-craft crews, and an early signal for algal blooms and fish movement.",
  },
  {
    id: "wave",
    name: "Inertial wave array",
    role: "Sea state",
    title: "Wave height and period",
    detail:
      "An inertial sensor watches the hull heave. From that motion Raylay estimates wave height and period — the difference between a workable harbor mouth and a bar that will roll a 16-foot skiff.",
  },
  {
    id: "fix",
    name: "Position fix",
    role: "Where",
    title: "GPS and drift",
    detail:
      "A position fix keeps each packet honest. If RAY drags off station, the map moves with it instead of silently reporting the wrong patch of water.",
  },
  {
    id: "brain",
    name: "Onboard logger",
    role: "Brain",
    title: "Sample, pack, sleep",
    detail:
      "A low-power controller samples the array, packs a small telemetry frame, and sleeps. The design is meant to run on a battery budget a student team can reason about, not a research-vessel generator.",
  },
  {
    id: "relay",
    name: "Data relay",
    role: "Uplink",
    title: "Ray, then relay",
    detail:
      "Packets leave the water and land on an open station at raylay.amuhak.com. The point of the name is the job: sense locally, publish publicly.",
  },
  {
    id: "power",
    name: "Solar endurance",
    role: "Power",
    title: "Stay out without a chase boat",
    detail:
      "A solar trickle and a modest battery keep the duty cycle honest. Fewer retrievals means fewer fuel burns and a station that a small club can actually keep in the water.",
  },
  {
    id: "bay",
    name: "Sealed bay",
    role: "Survive",
    title: "Electronics that can be opened",
    detail:
      "Sensors and radio live in a sealed bay that is still meant to be opened. If a connector fails, a local steward can dry it, swap it, and put RAY back to work.",
  },
] as const;

export const IMPACT = [
  {
    id: "afford",
    kicker: "Affordability",
    title: "A station a community can own",
    body: "A commercial waverider can cost as much as a used truck and is sited for shipping lanes and research programs. Raylay is a printed hull and a commodity sensor array. That is the difference between waiting for a federal siting and hanging a station off your own working waterfront.",
  },
  {
    id: "boats",
    kicker: "Boating and swim safety",
    title: "Go / no-go numbers, not a weather vibe",
    body: "Small craft do not need a North Atlantic forecast. They need the height and period at the mouth of their creek, and the water temperature that decides whether a thrown-in crew has minutes or an hour. Raylay is built for that hyperlocal call.",
  },
  {
    id: "justice",
    kicker: "Communities the maps skip",
    title: "The first people in the water get sensors last",
    body: "Low-income waterfronts, informal landing sites, tribal fisheries, and neighborhoods downstream of industry live with flood, heat, and runoff first. Open packets at raylay.amuhak.com mean a skipper, a teacher, or a clinic can read the same water a lab does.",
  },
  {
    id: "earth",
    kicker: "Sustainability",
    title: "Repair, reprint, redeploy",
    body: "Solar in, no chase-boat diesel for every battery swap, a hull you reprint instead of landfill. One RAY is a prototype. A network of repairable stations is a public utility with a lighter footprint than sealed instruments nobody nearby can fix.",
  },
] as const;
