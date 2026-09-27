# Raylay

Presentation site for the Raylay buoy mesh. Live console: [Tideline](https://raylay.amuhak.com).

## What the buoys report

Water temperature, air temperature, pressure, wave energy (RMS and peak, in g), tilt, and GPS. Packets hop over ESP-NOW to a base station. This page reads `https://raylay.amuhak.com/api/nodes`. Tideline’s voice flags silent nodes and rough water, then says what that means in a boat.

## Figures used in the talk

- $138 billion in U.S. recreational saltwater fishing sales, 201 million trips, about 692,000 jobs (NOAA Fisheries, FEUS 2022)
- About 200 buoys in the NOAA NDBC network (NDBC program assessment)
- $97 million drop in Dungeness crab landings and about $40 million in lost Washington tourism after the 2015 West Coast HAB (NMFS / NOAA NCCOS)
- Neighborhoods keep the node and the Tideline URL so a swim or a crossing is their call, not a late county post

## Run

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127). Arrow keys, Page Up/Down, and Space jump section to section.

## Share and publish

This is a Next.js app. Vercel will pick that up automatically.

1. Click **Create repo** above the chat to save a real repository (name it `raylay` if that name is free).
2. Connect a Vercel account if Cursor asks, then click **Publish** in the same bar.

Later pushes to `main` redeploy on their own. If Tideline is offline, the talk still runs on a labeled example packet.
