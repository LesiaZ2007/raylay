# Raylay

A 3-minute presentation site for **Raylay**, a low-cost data-collection buoy that measures water temperature, wave height, and sea state, then publishes the packets.

The live station is [raylay.amuhak.com](https://raylay.amuhak.com). When that host is down, the Live section keeps a clearly labeled field-session replay on screen so the talk never goes blank.

## What you can walk in three minutes

1. **Pitch** — RAY is the hull. The lay is the relay.
2. **The gap** — official buoys watch shipping lanes; most working water is unread.
3. **Meet RAY** — the real print mesh, orbitable in the browser.
4. **Sensors** — temperature, inertial wave array, fix, logger, uplink, solar, sealed bay.
5. **Live** — public feed, or an honest replay if the station is offline.
6. **Impact** — affordability, small-craft safety, communities the maps skip, repairable hardware.
7. **Close** — one prototype versus a public network.

Desktop presenters can use **space**, **↓**, or **Page Down** to advance.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://127.0.0.1:43127](http://127.0.0.1:43127).

```bash
npm run build
npm start -- --port 43127
```

## Project notes

- The hull on the page is the uploaded `RAY.stl` mesh (`public/models/RAY.stl`).
- Telemetry is proxied through `src/app/api/telemetry/route.ts`, which tries the public station and falls back to replay.
- No login and no database. This site is the briefing; the station is the instrument.
