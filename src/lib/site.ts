export const LIVE_STATION_URL = "https://raylay.amuhak.com";

export const SECTIONS = [
  { id: "title", label: "Raylay" },
  { id: "how", label: "How it works" },
  { id: "compare", label: "Cost" },
  { id: "live", label: "Live" },
  { id: "assistant", label: "Tideline voice" },
  { id: "fishing", label: "Landings" },
  { id: "neighborhoods", label: "Their call" },
  { id: "boats", label: "Small boats" },
  { id: "mesh", label: "A group" },
  { id: "hull", label: "Hull" },
  { id: "end", label: "Tideline" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const PARTS = [
  {
    name: "Board",
    job: "Reads the sensors, packs a packet about every two seconds, and talks to the next node or the laptop.",
  },
  {
    name: "Temperature sensor",
    job: "Waterproof probe on a cable. That is water temperature on Tideline. Buoy #1 has been around 21.1°C.",
  },
  {
    name: "Air and pressure",
    job: "Air temperature and barometric pressure. Tideline shows these next to the water reading.",
  },
  {
    name: "Motion sensor",
    job: "Samples 50 times a second. Firmware turns that motion into wave energy, peak, and tilt.",
  },
  {
    name: "GPS",
    job: "Fix and time. If the hull drifts, the packet moves with it.",
  },
  {
    name: "Battery and solar",
    job: "A small pack, a 1W panel, and a charger. A trickle you can leave in the water, not a chase-boat swap.",
  },
] as const;

export const COMPARE = [
  {
    topic: "What it costs to own",
    them: "A directional waverider is usually $15,000 to $50,000, plus a boat to service it.",
    us: "RAY is a printed hull plus a board, a temperature sensor, a motion sensor, air and pressure, GPS, a small cell, and a 1W panel.",
  },
  {
    topic: "Who can keep it running",
    them: "NOAA’s NDBC network is about 200 buoys for the country. They sit on shipping lanes and research lines.",
    us: "A shop class or a fishing co-op can reprint a cracked fairing and swap a $4 probe.",
  },
  {
    topic: "What you get back",
    them: "Specialized portals, often on a 30-minute cycle, aimed at forecasts and ship routing.",
    us: "A two-second packet on Tideline: water, air, pressure, wave energy, tilt, GPS. Public URL.",
  },
] as const;

export const VOICE_THREAD = [
  {
    role: "tideline",
    text: "Buoy one had two critical silent periods, most recently about six minutes ago and another twelve minutes ago.",
  },
  {
    role: "tool",
    text: "show_problem(#1 · offline · 6 min and 12 min ago)",
  },
  {
    role: "tideline",
    text: "It also saw rough water with a peak of 0.83 g about fourteen minutes ago.",
  },
  {
    role: "tool",
    text: "show_problem(#1 · waves · 0.83 g peak)",
  },
  {
    role: "tideline",
    text: "That's the main abnormality on record.",
  },
  {
    role: "you",
    text: "Let's focus on the rough water.",
  },
  {
    role: "tool",
    text: "show_chart(#1, wave_rms_g, 20 min, rough water period)",
  },
  {
    role: "tideline",
    text: "Opened the wave RMS chart for buoy one. It crossed the rough threshold of 0.10 g RMS, with a peak of 0.83 g.",
  },
  {
    role: "you",
    text: "What does this mean in terms of effects on me?",
  },
  {
    role: "tideline",
    text: "0.83 g peak means the hull is getting tossed. On a small boat you would feel real rocking, the kind that makes people sick. A swimmer would hit stronger, less predictable waves.",
  },
] as const;
