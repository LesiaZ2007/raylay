export const LIVE_STATION_URL = "https://raylay.amuhak.com";

export const SECTIONS = [
  { id: "title", label: "Raylay" },
  { id: "what", label: "What it is" },
  { id: "why", label: "Why" },
  { id: "hull", label: "The hull" },
  { id: "inside", label: "Inside" },
  { id: "data", label: "Data" },
  { id: "uses", label: "Out in the world" },
  { id: "scale", label: "Scale" },
  { id: "end", label: "End" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const INSIDE = [
  {
    name: "Temperature probe",
    line: "Sits under the hull. Tells you how warm the water actually is, not what the air feels like.",
  },
  {
    name: "IMU",
    line: "Watches the buoy bob. From that we get wave height and period — the two numbers a small boat cares about.",
  },
  {
    name: "GPS",
    line: "Tags every reading with a location, so if it drifts you don't keep pretending it's still on station.",
  },
  {
    name: "Logger",
    line: "A small board that samples, packs a packet, and sleeps. Nothing fancy. That's the point.",
  },
  {
    name: "Radio",
    line: "Sends the packet to raylay.amuhak.com. That's the lay in the name — it relays.",
  },
  {
    name: "Solar and battery",
    line: "So nobody has to boat out every other day just to keep it alive.",
  },
] as const;

export const USES = [
  {
    name: "Small boats",
    line: "A coast-wide forecast can be right and still be useless at the mouth of a creek. Local wave height is the difference between going out and getting knocked around.",
  },
  {
    name: "Fishing",
    line: "Temperature moves fish. People who work the same stretch of water every week don't need a research paper. They need this morning's number.",
  },
  {
    name: "Swimming and rec",
    line: "Water temp is also a safety number — how long someone lasts if they go in, and a cheap early hint that a bloom or a heat spike is starting.",
  },
  {
    name: "Working docks",
    line: "Water taxis, kayak shops, harbor masters. Same question every morning: what's it doing right here, not forty miles down the coast.",
  },
  {
    name: "Places that flood",
    line: "A lot of lower-income waterfronts get hit by runoff and high water first. They also get sensors last. A public feed is one way that doesn't require a research login.",
  },
  {
    name: "Classrooms",
    line: "If a high school can print the hull and wire the board, they can run a real station instead of watching a demo video about one.",
  },
] as const;

export const SCALE = [
  {
    name: "Print another one",
    line: "The hull is a file. If you can print RAY once, you can print five. That's a different problem than buying a second $20,000 instrument.",
  },
  {
    name: "Parts you can reorder",
    line: "Temperature probes, IMUs, GPS modules — this is catalog hardware. Scaling is a purchase order, not a factory relationship.",
  },
  {
    name: "One website, more nodes",
    line: "Every buoy talks to the same place. Add a station upriver or around the point and the map gets denser. The software doesn't have to be reinvented each time.",
  },
  {
    name: "Fix them locally",
    line: "A fleet only works if someone nearby can open the bay and reprint a cracked piece. That's how you keep ten in the water instead of one in a closet.",
  },
] as const;
