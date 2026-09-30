# Travel To Know — API + Affiliate Ready Upload Bundle

This bundle prepares the static GitHub Pages site for the next integration stage.

## Included
- `api-config.js` — public API endpoint configuration scaffold
- `api-client.js` — browser-side API client scaffold; no provider secrets
- `affiliate-config.js` — Agoda CID `8085912` and Booking.com AID placeholder
- `app.js` — Hotels tab and destination/place cards/photos connected to the configured hotel affiliate flow
- `index.html` / `404.html` — load the API and affiliate configuration files
- `legal-content.js` — current legal content retained

## Affiliate behavior
The current preferred provider is Agoda because the supplied CID is available. When the Booking.com AID is supplied, set `preferredProvider` to `booking` in `affiliate-config.js` if Booking should be the active redirect provider.

## API behavior
The frontend does not contain API keys. When the real backend/provider APIs are supplied, update `api-config.js` with the backend base URL and endpoint paths. Secrets must remain server-side.

## Upload
Upload/merge these files into the existing `TravelToKnow/traveltoknow.github.io` repository root. **Do not delete the existing image files or `styles.css`.** The existing GitHub Pages image assets are referenced by the updated app.
