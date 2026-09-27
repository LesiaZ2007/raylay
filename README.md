# Raylay

Presentation site for the Raylay buoy mesh. Live console: [Tideline](https://raylay.amuhak.com).

## What the buoys report

Water temperature, air temperature, pressure, wave energy (RMS and peak, in g), tilt, and GPS. Packets hop over ESP-NOW to a base station. This page reads `https://raylay.amuhak.com/api/nodes`.

## Figures used in the talk

- $138 billion in U.S. recreational saltwater fishing sales, 201 million trips, about 692,000 jobs (NOAA Fisheries, FEUS 2022)
- About 200 buoys in the NOAA NDBC network (NDBC program assessment)
- $97 million drop in Dungeness crab landings and about $40 million in lost Washington tourism after the 2015 West Coast HAB (NMFS / NOAA NCCOS)
- $59 million a year at risk for Lake Erie recreational anglers if the western basin closed (peer-reviewed recreation study)

## Run

```bash
npm install
npm run dev
```

[http://127.0.0.1:43127](http://127.0.0.1:43127)
