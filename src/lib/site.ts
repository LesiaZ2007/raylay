export const LIVE_STATION_URL = "https://raylay.amuhak.com";

export const SECTIONS = [
  { id: "title", label: "Raylay" },
  { id: "why", label: "Why" },
  { id: "fishing", label: "Fishing" },
  { id: "conservation", label: "Conservation" },
  { id: "boats", label: "Boats" },
  { id: "mesh", label: "The mesh" },
  { id: "hull", label: "The hull" },
  { id: "end", label: "Tideline" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const STATS = [
  {
    value: "$138B",
    label: "U.S. recreational saltwater fishing sales in 2022",
    source: "NOAA Fisheries, FEUS 2022",
  },
  {
    value: "201M",
    label: "Saltwater fishing trips that year",
    source: "NOAA Fisheries",
  },
  {
    value: "200",
    label: "Buoys in NOAA’s entire NDBC network",
    source: "NDBC program assessment",
  },
  {
    value: "$97M",
    label: "Drop in Dungeness crab landings after the 2015 West Coast bloom",
    source: "NMFS / NOAA NCCOS",
  },
] as const;
