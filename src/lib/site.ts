export const LIVE_STATION_URL = "https://raylay.amuhak.com";

export const SECTIONS = [
  { id: "title", label: "Raylay" },
  { id: "how", label: "How it works" },
  { id: "compare", label: "Cost" },
  { id: "live", label: "Live" },
  { id: "fishing", label: "Working water" },
  { id: "neighborhoods", label: "Neighborhoods" },
  { id: "boats", label: "Small boats" },
  { id: "mesh", label: "A group" },
  { id: "hull", label: "Hull" },
  { id: "end", label: "Tideline" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const PARTS = [
  {
    name: "ESP32",
    job: "The board. Samples the sensors, packs a packet about every two seconds, and talks ESP-NOW to the next node or the base.",
  },
  {
    name: "DS18B20 probe",
    job: "Waterproof temperature sensor on a cable. That is the water_c field on Tideline. Buoy #1 has been around 21.1°C.",
  },
  {
    name: "BMP280",
    job: "Air temperature and barometric pressure. Tideline shows these as air_c and pressure_hpa.",
  },
  {
    name: "GY-521 MPU6050",
    job: "3-axis accel and gyro at 50 Hz. Firmware turns that motion into wave energy (g), peak, and tilt.",
  },
  {
    name: "NEO-6M GPS",
    job: "Fix and time. If the hull drifts, the packet moves with it.",
  },
  {
    name: "1100 mAh LiPo + 1W solar",
    job: "3.7V pack, tiny panel, and a charger board. The idea is a trickle you can leave in the water, not a chase-boat battery swap.",
  },
] as const;

export const COMPARE = [
  {
    topic: "What it costs to own",
    them: "A directional waverider is usually $15,000 to $50,000, plus a boat to service it.",
    us: "RAY is a printed hull and catalog boards: ESP32, DS18B20, MPU6050, BMP280, NEO-6M, a 1100 mAh cell, a 1W panel.",
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
