export const LIVE_STATION_URL = "https://raylay.amuhak.com";

export const SECTIONS = [
  { id: "title", label: "Raylay" },
  { id: "compare", label: "Cost" },
  { id: "live", label: "Numbers" },
  { id: "assistant", label: "Raylay voice" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const VOICE_THREAD = [
  {
    role: "you",
    text: "What's happened in the past couple of hours that I should take note of?",
  },
  {
    role: "raylay",
    text: "Buoy one had two critical silent periods, most recently about six minutes ago and another twelve minutes ago.",
  },
  {
    role: "tool",
    text: "show_problem(#1 · offline · 6 min and 12 min ago)",
  },
  {
    role: "raylay",
    text: "It also saw rough water with a peak of 0.83 g about fourteen minutes ago.",
  },
  {
    role: "tool",
    text: "show_problem(#1 · waves · 0.83 g peak)",
  },
  {
    role: "raylay",
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
    role: "raylay",
    text: "Opened the wave RMS chart for buoy one. It crossed the rough threshold of 0.10 g RMS, with a peak of 0.83 g.",
  },
  {
    role: "you",
    text: "What does this mean in terms of effects on me?",
  },
  {
    role: "raylay",
    text: "0.83 g peak means the hull is getting tossed. On a small boat you would feel real rocking, the kind that makes people sick. A swimmer would hit stronger, less predictable waves.",
  },
] as const;
