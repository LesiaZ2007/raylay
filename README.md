# Raylay

A short scrolling talk for the Raylay buoy mesh. The live console is [Tideline](https://raylay.amuhak.com).

What the buoys actually report:

- Water temperature (°C)
- Air temperature (°C)
- Pressure (hPa)
- Wave energy RMS and peak (g)
- Tilt (°)
- GPS

They hop packets over an ESP-NOW mesh to a base station. This site pulls the latest packet from `https://raylay.amuhak.com/api/nodes` and uses Tideline’s dark theme (`#161616` / `#08bdba`, IBM Plex).

## Run

```bash
npm install
npm run dev
```

[http://127.0.0.1:43127](http://127.0.0.1:43127)
