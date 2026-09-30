# Travel To Know — Production Security & Authenticity Audit

Date: 2026-10-01
Repository: TravelToKnow/traveltoknow.github.io
Scope: current `main` branch static HTML/CSS/JavaScript/configuration and public assets.

## Status model
- FIXED IN PATCH: code change is included in this overlay.
- VERIFIED: directly observed in the reviewed source.
- OPEN / EXTERNAL: requires a provider, GitHub, DNS, or issuing-authority check.
- NOT CLAIMED: no unsupported certification, accreditation, licence, security or affiliate-approval claim is added.

## Findings and changes

### SEC-01 — Affiliate open-redirect / unsafe URL construction
Status: FIXED IN PATCH.
- Agoda and Booking URL construction now validates HTTPS and the expected host before navigation.
- Dynamic query parameters are inserted with `URL.searchParams` rather than string concatenation.
- New-tab affiliate links use `noopener,noreferrer`.
- Agoda flight redirects now use the observed airport-route form `/flights/airport/{from}/{to}/{route}.html` while preserving the supplied CID and selected criteria.

### SEC-02 — DOM injection surface
Status: PARTIALLY HARDENED.
- Modal rendering no longer uses `innerHTML`; user-entered enquiry data is passed through encoded mailto parameters and the modal itself is constructed with DOM APIs.
- Airport options are escaped before insertion. The remaining application-level `innerHTML` assignments render the site's own trusted templates; they are not direct sinks for raw user input.

### SEC-03 — Persistent personal-data storage
Status: FIXED IN PATCH.
- Enquiry drafts move from `localStorage` to `sessionStorage`, limiting persistence to the browser session.
- Flight-search criteria are no longer persisted because the value was not required by the current redirect flow.

### SEC-04 — Date and input validation
Status: FIXED IN PATCH.
- Flight departure dates cannot be in the past.
- Round-trip return dates must be on/after departure.
- Hotel check-in cannot be in the past and check-out must be after check-in.
- Traveller count is constrained to the existing 1–9 selector range.

### SEC-05 — External resource policy
Status: FIXED IN PATCH.
- A restrictive browser CSP is added to `index.html` and `404.html`.
- The only non-self `connect-src` currently required is the OurAirports CSV endpoint used by the worldwide IATA selector.
- No third-party scripts, fonts, frames or trackers are introduced.

### SEC-06 — External-link isolation
Status: FIXED IN PATCH.
- External `target="_blank"` links use `noopener noreferrer`.
- Affiliate links use `nofollow sponsored noopener noreferrer`.

### SEC-07 — API endpoint safety
Status: FIXED IN PATCH.
- The dormant API client rejects unexpected destinations and requires HTTPS for a configured cross-origin API.
- No API keys, provider secrets or credentials are placed in frontend configuration.

### AUTH-01 — Regulatory / industry references
Status: HARDENED / EXTERNAL VERIFICATION REQUIRED.
- MoCAT, ATAB, DBID and IATA visual references and supplied identifiers are preserved.
- The interface now labels them as references and explicitly tells users to verify current status with the relevant organization.
- No new accreditation, licence or approval claim is created.

### AUTH-02 — Payment information
Status: PRESERVED / CAUTION LABEL ADDED.
- Existing BRAC Bank PLC, BRAC Bank Bangla QR, bKash and Dutch-Bangla Bank information is preserved.
- Payment wording no longer calls the methods independently “verified”.
- Users are told to verify current details with Travel To Know support before payment.

### USE-01 — Stale hard-coded dates
Status: FIXED IN PATCH.
- Flight and hotel defaults are now generated relative to the current date instead of using September 2026 dates that can become stale.

### A11Y-01 — Keyboard and assistive-technology affordances
Status: FIXED IN PATCH.
- Mobile menu exposes `aria-expanded` and `aria-controls`.
- Flight mode buttons expose `aria-pressed`.
- Toast notifications expose a live status role.
- Focus-visible styling and reduced-motion support are added without redesigning the site.

## External verification still required

1. Confirm the current MoCAT / ATAB / DBID / IATA status directly with the relevant issuing or membership organizations.
2. Confirm the real Booking.com AID before claiming Booking affiliate attribution; the repository intentionally still contains `YOUR_BOOKING_AID`.
3. Confirm end-to-end Agoda attribution and parameter handling on the live Agoda flow; the route pattern is based on currently observed Agoda airport-route pages, but third-party query-parameter behavior can change.
4. Review GitHub repository security settings separately: branch protection/rulesets, 2FA, collaborator access, Dependabot/secret scanning where available, and Pages/domain configuration.
5. Server response headers such as HSTS, CSP response headers and X-Content-Type-Options remain hosting/CDN controls; the meta CSP in this patch is defense-in-depth, not a substitute for HTTP response headers.

## Repository hygiene

The public repository contains historical update-note files and duplicate README/payment documentation. They are not loaded by the website and do not contain application secrets in the reviewed content. They can be removed in a separate cleanup commit if you want the public repository kept lean; this audit does not delete them automatically.

## Important limitation

A static GitHub Pages frontend cannot by itself provide secure authentication, server-side payment processing, secret API-key storage, rate limiting, server-side fraud controls or authoritative accreditation verification. Those controls require the relevant backend, provider or authority.
