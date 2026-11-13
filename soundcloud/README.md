# HIDDEN STAGE — SoundCloud Reimagined

[Launch web app](https://superjjun.github.io/portfolio/soundcloud/) · [Figma prototype](https://www.figma.com/design/Du9eyttPUlEndS0eOmXVkk/?node-id=6-2)

Independent SoundCloud UI/UX **concept project** by KIM JUNSEO. The goal is to make undiscovered artists easier to find and turn listeners into active supporters through follows, saves, shares, and First Listener participation missions.

## Features

- Desktop editorial music web app and responsive mobile-app interface
- Discover, Hidden Stage, Charts, For You / Mood Finder, Community, and My Library
- Six fictional concept artists and twelve distinct tracks
- **Working browser-generated original demo audio** (Web Audio API, 32-second loops, no copyrighted streaming)
- Play/pause, seek, previous/next, volume, repeat, shuffle
- Live search for artists and tracks
- Likes, playlist saves, follows, share flows, local recommendations
- First Listener listening / following / sharing missions and unlockable badge
- Artist detail pages, a support leaderboard and track recommendations
- Local persistence through `localStorage`
- Installable web app manifest where supported

## Running

The site is a static project. Open `index.html` on a static HTTP server, or use the GitHub Pages link above. No build process or API key required.

The example artists, rankings and support metrics are fictional **portfolio demo data**. Local actions are saved only in the current browser; the recommendation form does not submit information to any external server. Audio is generated in real time in the browser and starts only after user interaction. The project is not affiliated with or endorsed by SoundCloud.

## Files

- `index.html`: semantic shell
- `styles.css`: responsive app design
- `app.js`: view rendering, state, navigation, synthesized audio, interactions
- `favicon.svg` and `manifest.webmanifest`: app icon and install metadata
