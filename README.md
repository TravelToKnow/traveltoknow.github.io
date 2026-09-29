# Travel To Know — GitHub Pages Frontend Clone

This is a static, responsive frontend recreation of the public Travel To Know website interface, prepared for GitHub Pages.

Travel To Know is a standalone travel-agency brand and website. It has its own travel-service purpose, identity, content and customer journey, with travel-only content throughout.

## Included

- Home, Flights, Hotels, Holidays, Visa and Umrah sections
- Responsive header, announcement bar, hero booking panel and footer
- Destination cards, services grid, travel-place cards and newsletter form
- Officially aligned About Us, Contact, Privacy Policy, Terms & Conditions, Refund & Cancellation, Payment Methods and Blog pages
- English/Bangla legal content carried over where published on the official Travel To Know site
- Sign in, sign up and forgot-password screens
- Service-led conversion layer for corporate/SME, migrant/family, Umrah/religious and premium/complex travel
- Structured travel-service enquiry form capturing service need, route, travel date, party size, budget and support notes
- Local enquiry draft plus a prepared email link to Travel To Know support
- Trust block for IATA, MoCAT, DBID, office details, emergency phone support, service-fee and refund disclosure
- Demo interactions for search, authentication, newsletter and payment flows
- Local image assets for the public-facing visual design

## Important limitation

This repository is a frontend copy and phase-one service-led development build. It prioritises qualified enquiries and human-supported travel services before expensive full-OTA engineering. Live flight/hotel/visa availability, booking confirmation, payment processing, OTP delivery, CRM storage and account authentication need a secure backend plus the relevant supplier/API credentials. The demo buttons intentionally explain this instead of pretending to complete a booking.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder.
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/root`.
4. Open the generated Pages URL. The app uses hash routes such as `#/flights`, so it works on project Pages URLs without server-side rewrite configuration.

Before publishing, verify the payment details, contact details, images and legal text against the current official site.
