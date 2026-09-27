export const LIVE_STATION_URL = "https://raylay.amuhak.com";

export const SECTIONS = [
  { id: "title", label: "Raylay" },
  { id: "fishing", label: "Fishing" },
  { id: "conservation", label: "Conservation" },
  { id: "boats", label: "Boats" },
  { id: "end", label: "Tideline" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
