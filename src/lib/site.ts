export const LIVE_STATION_URL = "https://raylay.amuhak.com";

export const SECTIONS = [
  { id: "title", label: "Raylay" },
  { id: "hull", label: "Hull" },
  { id: "mesh", label: "A group" },
  { id: "end", label: "Tideline" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
