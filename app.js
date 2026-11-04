const ASSET = "/";

const destinations = [
  ["Bangladesh", "Jeddah", "King Abdulaziz International Airport", "JED", "SAUDI ARABIA", "jeddah.jpg"],
  ["Bangladesh", "Dubai", "Dubai International Airport", "DXB", "UNITED ARAB EMIRATES", "dubai.jpg"],
  ["Bangladesh", "New York", "John F. Kennedy International Airport", "JFK", "UNITED STATES", "newyork.jpg"],
  ["Bangladesh", "Sydney / Mascot", "Sydney Airport", "SYD", "AUSTRALIA", "sydney.jpg"],
  ["Bangladesh", "London", "Heathrow Airport", "LHR", "UNITED KINGDOM", "london.jpg"],
  ["Bangladesh", "Kolkata", "Netaji Subhas Chandra Bose International Airport", "CCU", "INDIA", "kolkata.jpg"]
];

const places = [
  ["United Arab Emirates", "Discover the modern marvels and luxurious experiences of Dubai.", "dubai.jpg"],
  ["Saudi Arabia", "Explore Jeddah and plan your next journey with practical travel support.", "jeddah.jpg"],
  ["United States", "Discover New York and plan a well-supported international journey.", "newyork.jpg"],
  ["Australia", "Explore Sydney and build a practical itinerary for your next trip.", "sydney.jpg"],
  ["United Kingdom", "Discover London with flight, hotel and travel-service support.", "london.jpg"],
  ["India", "Explore Kolkata and connect your journey with convenient travel planning.", "kolkata.jpg"]
];

const features = [
  ["✈", "Domestic & International Options", "Find practical flight choices for business, family and personal travel."],
  ["৳", "Transparent Fare Options", "Review available inclusions, service fees and conditions before confirmation."],
  ["✓", "Seamless Travel Planning", "Bring flights, hotels, visas and support into one clear travel conversation."],
  ["◉", "Human Travel Support", "Speak with a responsible travel professional when the details matter."],
  ["▣", "Document Guidance", "Receive practical guidance for visa, itinerary and travel-document preparation."],
  ["↻", "After-Sales Assistance", "Get structured support for changes, disruptions and supplier-policy questions."],
  ["⌁", "Travel Updates", "Stay informed about important schedule, route and journey updates."],
  ["★", "Corporate Traveller Care", "Support repeat business travel with practical coordination and clear records."]
];

const serviceLaneData = [
  ["Corporate / SME Travel", "Managed itineraries, traveller support and clear documentation for business travel.", "Corporate travel"],
  ["Migrant & Family Travel", "Practical route planning for family visits, migrant journeys and time-sensitive travel.", "Migrant and family travel"],
  ["Umrah & Religious Travel", "Coordinated flight, accommodation and support planning for religious journeys.", "Umrah and religious travel"],
  ["Premium / Complex Itineraries", "Multi-city, special-request and higher-touch travel planning with human support.", "Premium or complex itinerary"]
];

const serviceTabs = [
  ["flights", "✈", "Flights"], ["hotels", "▦", "Hotels"], ["holidays", "▧", "Holidays"], ["visa", "▥", "Visa"], ["umrah-packages", "▱", "Umrah"]
];

const routeTitles = {
  "/": "Travel To Know | Your Travel Partner",
  "/flights": "Flights | Travel To Know",
  "/hotels": "Hotels | Travel To Know",
  "/holidays": "Holiday Packages | Travel To Know",
  "/visa": "Visa Processing Services | Travel To Know",
  "/umrah-packages": "Umrah Packages 2026-2027 | Travel To Know",
  "/about-us": "About us - Travel To Know",
  "/contact-us": "Contact us - Travel To Know",
  "/privacy-policy": "Privacy policy - Travel To Know",
  "/terms-and-conditions": "Terms and Condition - Travel To Know",
  "/refund-policy": "Refund & Cancellation Policy | Travel To Know",
  "/payment-method": "Payment Methods | Travel To Know",
  "/blog": "Travel To Know | Travel Guidance & Support",
  "/blog/corporate-travel-cost-control": "Corporate Travel Planning & Cost Control | Travel To Know",
  "/sign-in": "Sign-in assistance | Travel To Know",
  "/sign-up": "Account access enquiry | Travel To Know",
  "/sing-up": "Account access enquiry | Travel To Know",
  "/forgot-password": "Forgot your password | Travel To Know",
  "/request-service": "Request a Travel Service | Travel To Know"
};

function routeFromLocation() {
  const known = Object.keys(routeTitles).sort((a, b) => b.length - a.length);
  const normalize = (value) => {
    let path = String(value || "").split("?")[0].trim();
    try { path = decodeURIComponent(path); } catch (_) {}
    if (!path.startsWith("/")) path = "/" + path;
    path = path.replace(/\/{2,}/g, "/").replace(/\/+$/, "").toLowerCase();
    return path || "/";
  };

  const rawHash = window.location.hash.replace(/^#/, "");
  if (rawHash) {
    const hashPath = normalize(rawHash);
    const exactHashRoute = known.find((route) => route.toLowerCase() === hashPath);
    if (exactHashRoute) return exactHashRoute;
    const embeddedHashRoute = known.find((route) => route !== "/" && hashPath.endsWith(route.toLowerCase()));
    if (embeddedHashRoute) return embeddedHashRoute;
  }

  const path = normalize(window.location.pathname);
  const exactPathRoute = known.find((route) => route.toLowerCase() === path);
  if (exactPathRoute) return exactPathRoute;
  return known.find((route) => route !== "/" && path.endsWith(route.toLowerCase())) || "/";
}
function go(route) {
  window.location.hash = route;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[match]));
}

function queryParam(name) {
  const raw = window.location.hash.includes("?") ? window.location.hash.split("?").slice(1).join("?") : window.location.search.slice(1);
  return new URLSearchParams(raw).get(name) || "";
}

function header(active = "", onHero = false) {
  const nav = [["/", "Home"], ["/flights", "Flights"], ["/hotels", "Hotels"], ["/holidays", "Holidays"], ["/visa", "Visa"], ["/umrah-packages", "Umrah"]];
  return `<div class="announcement">Welcome to Travel To Know <button aria-label="Dismiss announcement" data-dismiss-announcement>×</button></div>
  <header class="site-header ${onHero ? "on-hero" : ""}"><div class="nav-wrap">
    <a class="brand" href="#/" aria-label="Travel To Know — Your Travel Partner"><img src="${ASSET}logo.png" alt="Travel To Know — Your Travel Partner"></a>
    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="primary-navigation" data-menu-toggle>☰</button>
    <nav id="primary-navigation" class="primary-nav" data-primary-nav>${nav.map(([route, label]) => `<a href="#${route}" class="${active === route ? "active" : ""}">${label}</a>`).join("")}<a class="mobile-menu-login" href="#/sign-in">Sign In</a></nav>
    <label class="language-switcher">Language <select data-language-select aria-label="Choose language"><option value="en">English</option><option value="bn">বাংলা</option></select></label><a class="header-account" href="#/sign-in">Sign In</a><a class="signin" href="#/request-service">Request a quote</a>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-wrap">
    <div class="footer-brand"><img src="${ASSET}logo.png" alt="Travel To Know — Your Travel Partner"><p>Your trusted travel partner for flights, hotels, holidays, visas and Umrah services.</p><a href="mailto:info@traveltoknow.com.bd">info@traveltoknow.com.bd</a><a href="mailto:traveltoknowbd@gmail.com">traveltoknowbd@gmail.com</a><a href="tel:+8801772282925">+88 01772 282925</a><a href="tel:+8801999192993">+88 01999 192993</a><a href="tel:+8801999192994">+88 01999 192994</a></div>
    <div><h3>Explore</h3><a href="#/about-us">About Us</a><a href="#/contact-us">Contact Us</a><a href="#/privacy-policy">Privacy Policy</a><a href="#/terms-and-conditions">Terms &amp; Conditions</a><a href="#/refund-policy">Refund &amp; Cancellation</a><a href="#/blog">Blog</a><a href="#/payment-method">Payment Method</a></div>
    <div><h3>Services</h3><a href="#/flights">Flight</a><a href="#/hotels">Hotel</a><a href="#/holidays">Holiday</a><a href="#/visa">Visa</a><a href="#/umrah-packages">Umrah</a></div>
    <div><h3>Corporate Office</h3><p>28/A-2 Toyenbee Circular Road (1st Floor), Motijheel C/A, Dhaka-1000, Bangladesh.</p><p>Sat–Thu, 10:00 AM – 8:00 PM</p><div class="socials"><a href="https://facebook.com/Travel2know0" target="_blank" rel="noopener noreferrer">f</a><a href="https://youtube.com/Travel2know0" target="_blank" rel="noopener noreferrer">▶</a><a href="https://www.instagram.com/traveltoknow.com.bd?obrf=NDhrbnd6ajVrY3A3" target="_blank" rel="noopener noreferrer">◎</a></div></div>
  </div><div class="footer-bottom"><span>© 2026 Travel To Know. All rights reserved.</span><span>Designed &amp; Developed by <a href="https://regtechnexusai.com" target="_blank" rel="noopener noreferrer">RegTech Nexus AI</a></span></div><button class="scroll-top-button" type="button" aria-label="Scroll to top" title="Scroll to top" data-scroll-top>↑</button></footer>`;
}

function serviceTabMarkup(active) {
  return `<div class="service-tabs">${serviceTabs.map(([route, icon, label]) => route === "umrah-packages" ? `<a class="service-tab ${active === route ? "active" : ""}" href="#/${route}"><span class="tab-icon">${icon}</span>${label}</a>` : `<button class="service-tab ${active === route ? "active" : ""}" data-service-tab="${route}"><span class="tab-icon">${icon}</span>${label}</button>`).join("")}</div>`;
}

function dateOffsetISO(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + Number(days || 0));
  return date.toISOString().slice(0, 10);
}

function bookingForm(type) {
  if (type === "hotels") return `<div class="booking-card" data-form="hotels"><div class="mode-row"><span class="mode active">Stay More, Pay Less — Book Your Dream Hotel Now! 🏨💫</span></div><div class="form-grid"><div class="field"><label>CITY / HOTEL / RESORT / AREA</label><input name="hotelDestination" type="text" value="Dhaka, Bangladesh" placeholder="City, hotel, resort or area" aria-label="Hotel destination"></div><div class="field"><label>CHECK IN DATE</label><input class="date-input" name="checkIn" type="date" min="${dateOffsetISO(0)}" value="${dateOffsetISO(1)}"></div><div class="field"><label>CHECK OUT DATE</label><input class="date-input" name="checkOut" type="date" min="${dateOffsetISO(0)}" value="${dateOffsetISO(4)}"></div><div class="field"><label>ROOMS &amp; GUESTS</label><select name="roomsGuests"><option value="1|2">1 Room, 2 Guests</option><option value="2|4">2 Rooms, 4 Guests</option><option value="3|6">3 Rooms, 6 Guests</option><option value="1|1">1 Room, 1 Guest</option><option value="1|3">1 Room, 3 Guests</option><option value="1|4">1 Room, 4 Guests</option></select></div><div class="hotel-provider-actions"><button class="primary-button" data-hotel-search type="button">Search on Agoda</button><button class="hotel-provider-secondary" data-booking-search type="button">Search on Booking.com</button></div></div></div>`;
  if (type === "holidays") return `<div class="booking-card" data-form="holidays"><div class="mode-row"><span class="mode active">Explore More, Pay Less — Book Your Dream Tour Today! 🌍✨</span></div><div class="form-grid"><div class="field"><label>SELECT YOUR TOUR DESTINATION CITY</label><select data-holiday-destination><option>Cox's Bazar — BANGLADESH</option><option>Dubai — UAE</option><option>Kuala Lumpur — MALAYSIA</option><option>Bangkok — THAILAND</option><option>Singapore</option><option>Bali</option><option>Colombo</option><option>Jeddah</option><option>London</option><option>New York</option></select></div><div></div><div></div><button class="primary-button" data-holiday-search type="button">Search Holiday</button></div></div>`;
  if (type === "visa") return `<div class="booking-card" data-form="visa"><div class="mode-row"><span class="mode active">Hassle-Free Visa Services — Apply With Us For Fast Approval! 🛂✈️</span></div><div class="form-grid"><div class="field"><label>SELECT YOUR VISA CITY</label><select><option>Select country</option><option>Singapore</option><option>Thailand</option><option>Malaysia</option><option>Vietnam</option><option>Uzbekistan</option></select></div><div class="field"><label>SELECT TRAVELER(S)</label><select><option>1 Traveler</option><option>2 Travelers</option><option>3 Travelers</option></select></div><div></div><button class="primary-button" data-demo-search="Visa">Find Visa Info</button></div></div>`;
  return `<div class="booking-card flight-booking-card" data-form="flights"><div class="mode-row"><button class="mode active" aria-pressed="true" data-flight-mode="one-way">One-way</button><button class="mode" aria-pressed="false" data-flight-mode="round-trip">Round-trip</button><button class="mode" aria-pressed="false" data-flight-mode="multi-city">Multi-city</button></div><div class="form-grid"><div class="flight-basic-fields" data-basic-flight-fields><div class="field"><label>From</label><select class="flight-airport-select" name="from" aria-label="Departure airport"><option value="DAC" selected>DAC — Dhaka</option></select></div><div class="field"><label>To</label><select class="flight-airport-select" name="to" aria-label="Arrival airport"><option value="DXB" selected>DXB — Dubai</option></select></div><div class="field"><label>Departure date</label><input class="date-input" name="departureDate" type="date" min="${dateOffsetISO(0)}" value="${dateOffsetISO(1)}"></div><div class="field return-date-field" data-return-field hidden><label>Return date</label><input class="date-input" name="returnDate" type="date" min="${dateOffsetISO(0)}" value=""><span class="hint">Required for round-trip searches</span></div></div><div class="multi-city-panel" data-multi-city-panel hidden><div class="multi-city-heading"><strong>Flight segments</strong><span>Plan up to 6 legs in one itinerary</span></div><div class="multi-city-legs" data-multi-city-legs><div class="multi-city-leg" data-leg><div class="multi-city-leg-title">Flight 1</div><div class="field"><label>From</label><select class="flight-airport-select" name="multiFrom" aria-label="Flight 1 departure airport"><option value="DAC" selected>DAC — Dhaka</option></select></div><div class="field"><label>To</label><select class="flight-airport-select" name="multiTo" aria-label="Flight 1 arrival airport"><option value="DXB" selected>DXB — Dubai</option></select></div><div class="field"><label>Departure</label><input class="date-input" name="multiDate" type="date" min="${dateOffsetISO(0)}" value="${dateOffsetISO(1)}"></div></div><div class="multi-city-leg" data-leg><div class="multi-city-leg-title">Flight 2</div><div class="field"><label>From</label><select class="flight-airport-select" name="multiFrom" aria-label="Flight 2 departure airport"><option value="DXB" selected>DXB — Dubai</option></select></div><div class="field"><label>To</label><select class="flight-airport-select" name="multiTo" aria-label="Flight 2 arrival airport"><option value="DAC" selected>DAC — Dhaka</option></select></div><div class="field"><label>Departure</label><input class="date-input" name="multiDate" type="date" min="${dateOffsetISO(0)}" value="${dateOffsetISO(8)}"></div></div></div><button class="multi-city-add" type="button" data-add-flight-leg>+ Add another flight</button><p class="multi-city-help">Each segment is searched together on KAYAK. Check the dates, airports and fare conditions before booking.</p></div><div class="field"><label>TRAVELERS</label><select name="travellers"><option value="1">1 Traveler</option><option value="2">2 Travelers</option><option value="3">3 Travelers</option><option value="4">4 Travelers</option><option value="5">5 Travelers</option><option value="6">6 Travelers</option><option value="7">7 Travelers</option><option value="8">8 Travelers</option><option value="9">9 Travelers</option></select></div><div class="field"><label>CLASS</label><select name="cabin"><option value="Economy">Economy</option><option value="Premium Economy">Premium Economy</option><option value="Business">Business</option><option value="First Class">First Class</option></select></div><div></div><button class="primary-button" data-flight-search type="button">Search Flight</button></div></div>`;
}

function agodaPartnerUrl() {
  return agodaHotelServiceUrl();
}

function agodaPartnerLogo() {
  return `<section class="agoda-partner-strip" aria-label="Agoda hotel booking partner">
    <a class="agoda-partner-link" href="${agodaPartnerUrl()}" target="_blank" rel="nofollow sponsored noopener noreferrer" aria-label="Book hotels on Agoda">
      <img src="https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg" alt="Agoda" loading="lazy">
      <span><strong>Book your stay with Agoda</strong><small>Explore hotels and accommodation worldwide</small></span>
      <span class="agoda-partner-cta">Explore hotels <span aria-hidden="true">↗</span></span>
    </a>
  </section>`;
}

function hotelEditorialSection() {
  return '<section class="section hotel-editorial" aria-labelledby="hotel-guide-title"><div class="section-header"><span class="eyebrow">HOTEL BOOKING GUIDANCE</span><h2 id="hotel-guide-title">Choose accommodation with the full stay in mind</h2><p>Use these practical checks when comparing accommodation. Travel To Know does not independently guarantee supplier inventory, hotel ratings or room availability.</p></div><div class="hotel-guide-grid">' +
    '<article class="hotel-guide-card"><h3>Dhaka: business and city stays</h3><p>Compare the property location against your meeting venue, airport transfer needs and expected daily travel. Check breakfast, Wi-Fi, check-in time, room occupancy and whether taxes or service charges are included.</p></article>' +
    '<article class="hotel-guide-card"><h3>Cox’s Bazar: leisure stays</h3><p>Review the exact property location, room description, occupancy rules and seasonal cancellation conditions. Confirm whether meals, transfers, extra beds and any resort or service fees are included.</p></article>' +
    '<article class="hotel-guide-card"><h3>Dubai: international stays</h3><p>Check the neighbourhood and transport access against your itinerary. Review local taxes, deposit requirements, check-in rules, cancellation deadlines and late-arrival procedures.</p></article></div>' +
    '<div class="hotel-checklist"><h3>Before confirming any hotel booking</h3><ul><li>Verify property name, address, room category and guest count.</li><li>Compare the final payable amount, including taxes and mandatory fees.</li><li>Read cancellation, no-show, prepayment and refund conditions.</li><li>Check check-in/check-out times, identification requirements and special-request rules.</li><li>Save the supplier confirmation and contact details after booking.</li></ul></div>' +
    '<p class="hotel-provider-note">Searches on Agoda or other external providers open the provider’s website. The provider controls its prices, inventory, payment process, booking confirmation and customer-service terms.</p></section>';
}

function bookingAffiliateNotice() {
  return '<aside class="affiliate-disclosure booking-affiliate-notice" aria-label="Booking and affiliate information"><strong>Booking &amp; affiliate information:</strong> Travel To Know may earn a commission from qualifying Agoda hotel bookings successfully attributed under an approved partner programme, at no extra cost to you. Flight searches currently open KAYAK as an external search link and are not represented as affiliate-tracked. Agoda and KAYAK control their own prices, availability, booking and payment terms.</aside>';
}
function heroPage(type = "flights", activeRoute = `/${type}`) {
  const copy = { flights: ["Explore the Best Flight Options", "Uncover unbeatable offers on global travel destinations"], hotels: ["Discover Your Perfect Vacation Stay", "Discover amazing deals to destinations worldwide"], holidays: ["Discover Your Next Tour", "Discover amazing deals to destinations worldwide"], visa: ["Visa processing Services Available!", "Visa depends on your profile and financial conditions!"] }[type];
  return `${header(activeRoute, true)}<main class="travel-landing-page">${type === "flights" ? '' : ""}<section class="hero"><div class="hero-inner"><div class="hero-copy"><h1>${copy[0]}</h1><p>${copy[1]}</p></div><div class="booking-shell">${serviceTabMarkup(type)}${bookingForm(type)}</div></div></section>${agodaPartnerLogo()}${bookingAffiliateNotice()}${type === "hotels" ? hotelEditorialSection() : ""}${serviceLanes()}${trustStrip()}${offers()}${amazonAffiliateSection()}${destinationSection()}${featuresSection()}${placesSection()}${newsletter()}${type === "flights" ? '' : ""}</main>${footer()}`;
}

function serviceLanes() { return `<section class="section service-lanes"><div class="section-header"><h2>Travel support for the journeys that matter</h2><p>Tell us what you need. A Travel To Know specialist will review the request and respond with the next practical step.</p></div><div class="segment-grid">${serviceLaneData.map(([title, text, value], index) => `<a class="segment-card segment-${index + 1}" href="#/request-service?service=${encodeURIComponent(value)}"><span class="segment-number">0${index + 1}</span><h3>${title}</h3><p>${text}</p><span class="segment-link">Request support →</span></a>`).join("")}</div></section>`; }

function trustStrip() { return `<section class="trust-strip"><div class="trust-wrap"><div><span class="eyebrow">WHY TRAVEL TO KNOW</span><h2>Your journey. Our priority.</h2><p>Reliable travel solutions for business, leisure and journeys beyond borders—with human support when the details matter.</p></div><div class="trust-badges trust-badges-logos" aria-label="Travel To Know registration and association references"><div class="trust-badge trust-logo-badge trust-badge-mocat"><img src="${ASSET}mocat-logo.jpg" alt="MoCAT reference logo" loading="lazy"><span class="trust-badge-copy"><strong>MoCAT</strong><small>0013575</small></span></div><div class="trust-badge trust-logo-badge trust-badge-atab"><img src="${ASSET}atab-logo.jpg" alt="ATAB reference logo" loading="lazy"><span class="trust-badge-copy"><strong>ATAB</strong><small>Travel Agents of Bangladesh</small></span></div><div class="trust-badge trust-logo-badge trust-badge-dbid"><img src="${ASSET}dbid-logo.jpg" alt="DBID reference logo" loading="lazy"><span class="trust-badge-copy"><strong>DBID</strong><small>717571834</small></span></div><div class="trust-badge trust-logo-badge trust-badge-iata"><img src="${ASSET}iata-logo.jpg" alt="IATA reference logo" loading="lazy"><span class="trust-badge-copy"><strong>IATA</strong><small>Accredited agency</small></span></div></div><p class="trust-reference-note">Reference details are shown for identification. Please verify current status directly with the relevant issuing or membership organization.</p><div class="trust-actions"><a class="primary-button" href="#/request-service">Start an enquiry</a><a href="#/contact-us">View contact &amp; office details</a><a href="#/terms-and-conditions">Read refund &amp; cancellation terms</a></div></div></section>`; }

function offers() { return ""; }

function amazonAffiliateSection() {
  const link = "https://amzn.to/4AUcpLI";
  return `<section class="section amazon-affiliate-section" aria-labelledby="amazon-travel-essentials-title"><div class="amazon-affiliate-card"><div class="amazon-affiliate-copy"><span class="eyebrow">TRAVEL ESSENTIALS</span><h2 id="amazon-travel-essentials-title">Travel Essentials on Amazon</h2><p>Find useful travel gear and accessories through our Amazon Associate link.</p><a class="amazon-affiliate-button" href="${link}" target="_blank" rel="nofollow sponsored noopener noreferrer">🛒 Check Price on Amazon</a><p class="amazon-disclosure">As an Amazon Associate I earn from qualifying purchases.</p></div><div class="amazon-affiliate-badge" aria-hidden="true"><img src="${ASSET}amazon-logo.gif" alt="Amazon" loading="lazy"></div></div></section>`; }

function destinationSection() { return `<section class="section"><div class="section-header"><h2>Popular Destinations</h2><p>Click on a destination to explore exciting flight deals.</p></div><div class="destination-grid">${destinations.map(([from, to, airport, code, country, image]) => `<button class="destination-card affiliate-clickable" data-destination="${to}" data-affiliate-destination="${to}" aria-label="Explore flight deals to ${to}"><img src="${ASSET}${image}" alt="Flights from ${from} to ${to}"><div class="destination-info"><h3>${from} <span>${to}</span></h3><p>${airport}</p><div class="destination-meta"><span>${country}</span><span class="tag">Flight Deals</span></div></div></button>`).join("")}</div></section>`; }

function featuresSection() { return `<section class="section"><div class="section-header"><h2>Our Services at a Glance</h2><p>Discover a variety of features designed to enhance and simplify your travel journey.</p></div><div class="features-grid">${features.map(([icon, title, text]) => `<div class="feature"><div class="feature-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}</div></section>`; }

function placesSection() { return `<section class="places-section"><h2>Must-Visit Places</h2><p>Discover More About Us</p><div class="places-grid">${places.map(([title, text, image]) => `<button class="place-card affiliate-clickable" data-place="${title}" data-affiliate-destination="${title}" aria-label="Explore hotel offers in ${title}"><img src="${ASSET}${image}" alt="${title}"><div class="place-copy"><h3>${title}</h3><p>${text}</p></div></button>`).join("")}</div></section>`; }

function newsletter() { return `<section class="newsletter"><h2>Join Our Travel Circle</h2><p>Get insider travel advice, sneak peeks at new destinations, and access to subscriber-only offers. Your next adventure starts in your inbox.</p><form class="newsletter-form" data-newsletter><input class="input" type="email" placeholder="you@example.com" aria-label="Email address" required><button class="primary-button" type="submit">Get Updates</button></form></section>`; }

function blogPage() {
  return `${header("/blog")}<main class="page-main blog-page"><div class="content-card"><span class="eyebrow">TRAVEL TO KNOW · BLOG</span><h1>Travel Guidance &amp; Support</h1><p class="intro">Practical travel guidance, planning notes and service insights for business, family and international journeys.</p><div class="blog-grid"><article class="blog-card"><span class="blog-card-label">Travel Planning</span><h2>Corporate Travel Planning &amp; Cost Control</h2><p>Practical ways to structure business travel requests, compare options and keep travel records clear.</p><a class="primary-button blog-read-button" href="#/blog/corporate-travel-cost-control">Read article</a></article></div></div></main>${footer()}`;
}

function articlePage() {
  return `${header("/blog")}<main class="page-main blog-page"><article class="content-card article-card"><a class="back-link" href="#/blog">← Back to Blog</a><span class="eyebrow">TRAVEL TO KNOW · TRAVEL GUIDANCE</span><h1>Corporate Travel Planning &amp; Cost Control</h1><p class="intro">A practical framework for organising business travel while keeping approvals, traveller needs and costs visible.</p><h2>Start with a clear travel brief</h2><p>Record the traveller, route, dates, flexibility, cabin preference, baggage needs and approval requirements before searching. A complete brief reduces repeated changes and makes supplier comparisons easier.</p><h2>Compare the full travel cost</h2><p>Look beyond the headline fare. Consider baggage, change conditions, cancellation terms, hotel location, transport needs and any service charges that apply before confirmation.</p><h2>Keep approvals and records together</h2><p>For business travel, retain the approved itinerary, traveller details, supplier terms and final confirmation in one accessible record. This supports later reconciliation and makes changes easier to track.</p><h2>Review before confirmation</h2><p>Confirm names, dates, routing, inclusions, payment terms and refund or cancellation conditions before issuing a ticket or confirming accommodation.</p><a class="primary-button blog-read-button" href="#/request-service">Request travel support</a></article></main>${footer()}`;
}

function authPage(route) {
  const bn = localStorage.getItem("ttk-language") === "bn";
  const t = (en, bnText) => bn ? bnText : en;
  const isForgot = route === "/forgot-password";
  const isSignup = route === "/sign-up" || route === "/sing-up";
  const title = isForgot
    ? t("Password assistance", "পাসওয়ার্ড সহায়তা")
    : isSignup ? t("Account access enquiry", "অ্যাকাউন্ট খোলার বিষয়ে যোগাযোগ") : t("Sign-in assistance", "সাইন-ইন সহায়তা");
  const intro = isForgot
    ? t("Online password reset is not currently available because customer account authentication has not been enabled on this website. Please contact our team for assistance.", "এই ওয়েবসাইটে গ্রাহক অ্যাকাউন্ট authentication চালু না থাকায় অনলাইনে password reset সুবিধা বর্তমানে উপলভ্য নয়। সহায়তার জন্য আমাদের সঙ্গে যোগাযোগ করুন।")
    : isSignup
      ? t("Online account registration is not currently available. Contact Travel To Know if you need an account or assistance with a travel request.", "অনলাইনে অ্যাকাউন্ট খোলার সুবিধা বর্তমানে চালু নেই। অ্যাকাউন্ট বা ভ্রমণসংক্রান্ত সহায়তা প্রয়োজন হলে Travel To Know-এর সঙ্গে যোগাযোগ করুন।")
      : t("Online customer sign-in is not currently available on this website. You can still contact Travel To Know or submit a travel-service enquiry without creating an account.", "এই ওয়েবসাইটে অনলাইন customer sign-in সুবিধা বর্তমানে চালু নেই। অ্যাকাউন্ট ছাড়াই Travel To Know-এর সঙ্গে যোগাযোগ করতে বা ভ্রমণসেবা enquiry পাঠাতে পারবেন।");
  return `${header()}<main class="page-main"><section class="content-card auth-page" aria-labelledby="auth-page-title">
    <span class="eyebrow">TRAVEL TO KNOW · CUSTOMER SUPPORT</span>
    <h1 id="auth-page-title">${title}</h1>
    <p class="intro">${intro}</p>
    <div class="trust-actions">
      <a class="primary-button" href="#/request-service">${t("Request a travel service", "ভ্রমণসেবা enquiry করুন")}</a>
      <a class="auth-support-email" href="mailto:info@traveltoknow.com.bd" aria-label="${t("Email Travel To Know support at info@traveltoknow.com.bd", "info@traveltoknow.com.bd ঠিকানায় Travel To Know সাপোর্টে ইমেইল করুন")}">${t("Email our support team", "সাপোর্ট টিমকে ইমেইল করুন")}<span class="auth-support-address">info@traveltoknow.com.bd</span></a>
    </div>
    <p class="microcopy">${t("For your security, do not email passwords, card details or other sensitive authentication information.", "আপনার নিরাপত্তার জন্য password, card details বা সংবেদনশীল authentication তথ্য ইমেইল করবেন না।")}</p>
  </section></main>${footer()}`;
}

function umrahPage() {
  const bn = localStorage.getItem("ttk-language") === "bn";
  const t = (en, bnText) => bn ? bnText : en;
  const enquiryHref = "#/request-service?service=Umrah%20and%20religious%20travel";
  return `${header("/umrah-packages")}
  <main class="page-main">
    <section class="content-card umrah-page" aria-labelledby="umrah-page-title">
      <span class="eyebrow">${t("TRAVEL TO KNOW · UMRAH TRAVEL SUPPORT", "TRAVEL TO KNOW · ওমরাহ ভ্রমণ সহায়তা")}</span>
      <h1 id="umrah-page-title">${t("Plan Your Umrah Journey with Confidence", "পরিকল্পিতভাবে আপনার ওমরাহ যাত্রার প্রস্তুতি নিন")}</h1>
      <p class="intro">${t("We help you coordinate the travel arrangements for your Umrah journey, including flight planning, accommodation enquiries and practical travel support. Share your preferred dates and requirements so our team can review the next steps with you.", "ওমরাহ যাত্রার জন্য ফ্লাইট পরিকল্পনা, আবাসনসংক্রান্ত enquiry এবং প্রয়োজনীয় ভ্রমণ সহায়তা সমন্বয়ে আমরা সহযোগিতা করি। আপনার সম্ভাব্য তারিখ ও প্রয়োজনীয় তথ্য জানালে আমাদের টিম পরবর্তী পদক্ষেপ পর্যালোচনা করবে।")}</p>
      <div class="trust-actions">
        <a class="primary-button" href="${enquiryHref}" data-umrah-enquiry>${t("Enquire about Umrah", "ওমরাহ সম্পর্কে enquiry করুন")}</a>
        <a href="tel:+8801772282925">${t("Call Travel To Know", "Travel To Know-এ ফোন করুন")}</a>
      </div>
    </section>
    <section class="content-card">
      <h2>${t("Discuss your travel requirements", "আপনার ভ্রমণসংক্রান্ত প্রয়োজন জানান")}</h2>
      <p>${t("When you enquire, please share your intended travel period, number of travellers, departure city and any accommodation preferences. These details help us assess the request.", "enquiry করার সময় সম্ভাব্য ভ্রমণের সময়, যাত্রীর সংখ্যা, যাত্রার শহর এবং আবাসনসংক্রান্ত পছন্দ জানালে অনুরোধটি পর্যালোচনা করতে সুবিধা হবে।")}</p>
      <ul>
        <li>${t("Flight options and travel dates", "ফ্লাইটের বিকল্প ও ভ্রমণের তারিখ")}</li>
        <li>${t("Accommodation requirements", "আবাসনের প্রয়োজনীয়তা")}</li>
        <li>${t("Visa and travel-document guidance", "ভিসা ও ভ্রমণ নথি বিষয়ে নির্দেশনা")}</li>
        <li>${t("Group size and coordination needs", "দলের সদস্যসংখ্যা ও সমন্বয়ের প্রয়োজন")}</li>
      </ul>
      <p class="microcopy">${t("Package inclusions, departure dates, availability, visa requirements, supplier conditions and all prices must be confirmed directly with Travel To Know before any booking or payment. No live availability or fixed package price is represented on this page.", "প্যাকেজের অন্তর্ভুক্ত বিষয়, যাত্রার তারিখ, আসন/রুমের প্রাপ্যতা, ভিসার শর্ত, সরবরাহকারীর নিয়ম এবং মূল্য বুকিং বা পেমেন্টের আগে Travel To Know-এর সঙ্গে সরাসরি নিশ্চিত করতে হবে। এই পেজে live availability বা নির্দিষ্ট প্যাকেজ মূল্য প্রদর্শনের দাবি করা হচ্ছে না।")}</p>
      <a class="primary-button" href="${enquiryHref}" data-umrah-enquiry>${t("Start an Umrah enquiry", "ওমরাহ enquiry শুরু করুন")}</a>
    </section>
  </main>${footer()}`;
}

function requestPage() {
  const selected = queryParam("service");
  const selectedOption = serviceLaneData.some(([, , value]) => value === selected) ? selected : "";
  return `${header("/request-service")}<main class="page-main request-page"><div class="request-layout"><div class="request-intro"><span class="eyebrow">TRAVEL TO KNOW · SERVICE DESK</span><h1>Tell us what you need.</h1><p>Share the essentials and our team can review your request for a tailored flight, hotel, visa, holiday, corporate, family or Umrah solution.</p><div class="support-card"><strong>Need immediate assistance?</strong><a href="tel:+8801772282925">+88 01772 282925</a><a href="tel:+8801999192993">+88 01999 192993</a><a href="tel:+8801999192994">+88 01999 192994</a><span>Sat–Thu, 10:00 AM – 8:00 PM</span></div><p class="microcopy">Service fees, refund conditions and supplier restrictions are explained before confirmation.</p></div><div class="content-card"><h2>Travel service enquiry</h2><p>Fields marked with * help us respond faster.</p><form class="lead-form" data-lead-form><label>Service needed *<select name="service" required><option value="">Select a service</option>${serviceLaneData.map(([, , value]) => `<option ${selectedOption === value ? "selected" : ""}>${value}</option>`).join("")}<option>Flight ticketing</option><option>Hotel or accommodation</option><option>Visa assistance</option><option>Holiday package</option></select></label><div class="form-two"><label>Your name *<input name="name" type="text" placeholder="Full name" required></label><label>Phone / WhatsApp *<input name="phone" type="tel" placeholder="+880" required></label></div><div class="form-two"><label>Email<input name="email" type="email" placeholder="you@example.com"></label><label>Travel date<input name="date" type="date"></label></div><div class="form-two"><label>Origin / departure city<input name="origin" type="text" placeholder="Dhaka"></label><label>Destination / route<input name="destination" type="text" placeholder="Destination or multi-city route"></label></div><div class="form-two"><label>Travellers / party size<input name="travellers" type="number" min="1" placeholder="e.g., 2"></label><label>Indicative budget<input name="budget" type="text" placeholder="Optional"></label></div><label>What should we know?<textarea name="notes" rows="5" placeholder="Dates, visa needs, baggage, hotel category, corporate requirements or other details"></textarea><button class="primary-button" type="submit">Prepare enquiry email</button><span class="required-note">Your draft stays in this browser session until you choose to email it or close the tab. Live CRM submission can be connected later.</span></form></div></div></main>${footer()}`;
}

function infoPage(route) {
  const language = localStorage.getItem("ttk-language") === "bn" ? "bn" : "en";
  const pages = {
    "/contact-us": `<h1>${language === "bn" ? "যোগাযোগ করুন" : "Contact Us"}</h1><p class="intro">${language === "bn" ? "আপনার সঙ্গে যোগাযোগ করতে পেরে আমরা আনন্দিত হব! আপনার কোনো প্রশ্ন থাকলে, সহায়তা প্রয়োজন হলে অথবা পরবর্তী ভ্রমণের পরিকল্পনা শুরু করতে চাইলে আমাদের টিম আপনাকে সহযোগিতা করতে প্রস্তুত।" : "We’d love to hear from you! Whether you have a question, need assistance, or want to start planning your next journey, our team is here to help."}</p><h2>${language === "bn" ? "আমাদের সঙ্গে যোগাযোগ" : "Get In Touch"}</h2><div class="contact-row"><strong>${language === "bn" ? "ঠিকানা" : "Address"}</strong><span>${language === "bn" ? "২৮/এ-২ টয়েনবি সার্কুলার রোড (১ম তলা), মতিঝিল, ঢাকা-১০০০, বাংলাদেশ" : "28/A-2 Toyenbee Circular Road (1st Floor), Motijheel, Dhaka-1000, Bangladesh"}</span></div><div class="contact-row"><strong>MoCAT</strong><span>${language === "bn" ? "সনদ নম্বর: 0013575" : "Certificate No.: 0013575"}</span></div><div class="contact-row"><strong>IATA</strong><span>${language === "bn" ? "সনদ নম্বর: 42341666" : "Certificate No.: 42341666"}</span></div><div class="contact-row"><strong>DBID</strong><span>${language === "bn" ? "লাইসেন্স নম্বর: 717571834" : "License No.: 717571834"}</span></div><div class="contact-row"><strong>${language === "bn" ? "ফোন" : "Phone"}</strong><span><a class="text-link" href="tel:+8801772282925">01772 282925</a><br><a class="text-link" href="tel:+8801999192993">01999 192993</a> ${language === "bn" ? "অথবা" : "or"} <a class="text-link" href="tel:+8801999192994">01999 192994</a></span></div><div class="contact-row"><strong>${language === "bn" ? "ই-মেইল" : "Email"}</strong><span><a class="text-link" href="mailto:info@traveltoknow.com.bd">info@traveltoknow.com.bd</a><br><a class="text-link" href="mailto:traveltoknowbd@gmail.com">traveltoknowbd@gmail.com</a></span></div><div class="contact-row"><strong>${language === "bn" ? "অফিস সময়" : "Office Hours"}</strong><span>${language === "bn" ? "শনিবার–বৃহস্পতিবার, সকাল ১০টা–রাত ৮টা" : "Sat–Thu, 10:00 AM – 8:00 PM"}</span></div>`,
  };
  const legalContent = window.OFFICIAL_LEGAL_CONTENT || (typeof OFFICIAL_LEGAL_CONTENT !== "undefined" ? OFFICIAL_LEGAL_CONTENT : {});
  const entry = legalContent && typeof legalContent === "object" ? legalContent[route] : "";

  const body = entry && typeof entry === "object" ? (entry[language] || entry.en || "") : (entry || pages[route] || `<h1>Page not found</h1><p>The requested page could not be found.</p>`);
  const affiliateLegalNotice = language === "bn"
    ? '<section class="affiliate-legal-notice"><h2>অ্যাফিলিয়েট লিংক ও রেফারেল ট্র্যাকিং</h2><p>ওয়েবসাইটে Agoda, KAYAK বা অন্য তৃতীয় পক্ষের সার্চ/বুকিং লিংক থাকতে পারে। কোনো qualifying booking আমাদের অনুমোদিত affiliate programme-এর মাধ্যমে সঠিকভাবে attributed হলে Travel To Know কমিশন পেতে পারে; এতে আপনার প্রদেয় মূল্য বাড়ে না। সব provider-এর affiliate approval বা tracking একই পর্যায়ে সক্রিয়—এমন দাবি করা হচ্ছে না। তৃতীয় পক্ষের ওয়েবসাইটে যাওয়ার পর তাদের নিজস্ব privacy, cookie, payment, cancellation ও booking terms প্রযোজ্য হবে।</p></section>'
    : '<section class="affiliate-legal-notice"><h2>Affiliate links and referral tracking</h2><p>This website may include search or booking links to Agoda, KAYAK and other third-party providers. Travel To Know may earn a commission where a qualifying booking is successfully attributed under an approved affiliate programme, at no additional cost to you. We do not represent that every provider relationship or tracking integration is approved or active. Once you leave this website, the third party’s own privacy, cookie, payment, cancellation and booking terms apply.</p></section>';
  const legalBody = (route === "/terms-and-conditions" || route === "/privacy-policy") ? body + affiliateLegalNotice : body;
  return `${header(route)}<main class="page-main"><div class="content-card legal-copy" lang="${language}">${legalBody}</div></main>${footer()}`;
}
function paymentPage() { const bn = localStorage.getItem("ttk-language") === "bn"; const t = (en, bnText) => bn ? bnText : en; return `${header("/payment-method")}<main class="page-main"><div class="content-card" lang="${bn ? "bn" : "en"}"><h1>${t("Payment Methods", "পেমেন্ট পদ্ধতি")}</h1><p class="intro">${t("Available payment methods are listed below. Verify the current details with Travel To Know support before payment.", "নিচে উপলভ্য পেমেন্ট পদ্ধতিগুলো দেওয়া হয়েছে। পেমেন্ট করার আগে Travel To Know-এর সাপোর্ট টিমের সঙ্গে যোগাযোগ করে বর্তমান তথ্য যাচাই করুন।")}</p><h2>${t("Available Methods", "উপলভ্য পদ্ধতি")}</h2><div class="payment-grid">
<div class="payment-card"><div class="payment-brand-logo-wrap"><img class="payment-brand-logo" src="/brac-bank-logo.png" alt="BRAC Bank logo"></div><h3>BRAC Bank PLC</h3><div class="type">${t("Bank", "ব্যাংক")}</div><dl><div><dt>${t("Account Name", "হিসাবের নাম")}</dt><dd>Travel To Know</dd></div><div><dt>${t("Account Number", "হিসাব নম্বর")}</dt><dd>2060728030001</dd></div><div><dt>${t("Branch", "শাখা")}</dt><dd>${t("Motijheel Branch", "মতিঝিল শাখা")}</dd></div><div><dt>${t("Routing", "রাউটিং নম্বর")}</dt><dd>060274247</dd></div><div><dt>${t("SWIFT Code", "SWIFT কোড")}</dt><dd>BRAKBDDH</dd></div></dl><a href="#/payment-method" data-demo-payment>${t("Proceed to deposit →", "জমা দিতে এগিয়ে যান →")}</a></div>
<div class="payment-card payment-qr-card"><div class="payment-brand-logo-wrap"><img class="payment-brand-logo" src="/brac-bank-logo.png" alt="BRAC Bank logo"></div><h3>BRAC Bank Bangla QR</h3><div class="type">${t("Digital QR Payment", "ডিজিটাল QR পেমেন্ট")}</div><div class="payment-qr-box"><img src="/brac-bank-bangla-qr.jpg" alt="Travel To Know BRAC Bank Bangla QR merchant payment code"><p class="payment-qr-caption"><strong>${t("Scan &amp; Pay", "স্ক্যান করুন ও পেমেন্ট করুন")}</strong><br>${t("Use a supported banking app to scan this BRAC Bank Bangla QR and make a payment to Travel To Know.", "সমর্থিত ব্যাংকিং অ্যাপ ব্যবহার করে এই BRAC Bank Bangla QR স্ক্যান করে Travel To Know-কে পেমেন্ট করুন।")}</p><div class="payment-qr-actions"><a class="payment-qr-download" href="/brac-bank-bangla-qr.jpg" download="Travel-To-Know-BRAC-Bank-Bangla-QR.jpg">${t("⬇ Download QR", "↓ QR ডাউনলোড")}</a><a class="payment-qr-open" href="/brac-bank-bangla-qr.jpg" target="_blank" rel="noopener noreferrer">${t("↗ Open QR", "↗ QR খুলুন")}</a></div><p class="payment-qr-merchant">${t("Merchant:", "মার্চেন্ট:")} <strong>TRAVEL TO KNOW</strong></p></div></div>
<div class="payment-card"><div class="payment-brand-logo-wrap"><img class="payment-brand-logo" src="bkash-logo.png" alt="bKash logo"></div><h3>bKash (${t("Payment Only", "শুধুমাত্র পেমেন্ট")})</h3><div class="type">${t("MFS", "মোবাইল ফাইন্যান্সিয়াল সার্ভিস (MFS)")}</div><dl><div><dt>${t("Account Name", "হিসাবের নাম")}</dt><dd>Travel To Know</dd></div><div><dt>${t("Account Number", "হিসাব নম্বর")}</dt><dd>01772282925</dd></div></dl><a href="#/payment-method" data-demo-payment>${t("Proceed to deposit →", "জমা দিতে এগিয়ে যান →")}</a></div>
<div class="payment-card"><div class="payment-brand-logo-wrap"><img class="payment-brand-logo" src="dbbl-logo.png" alt="Dutch-Bangla Bank logo"></div><h3>Dutch-Bangla Bank PLC</h3><div class="type">${t("Bank", "ব্যাংক")}</div><dl><div><dt>${t("Account Name", "হিসাবের নাম")}</dt><dd>Travel To Know</dd></div><div><dt>${t("Account Number", "হিসাব নম্বর")}</dt><dd>7017100453518</dd></div><div><dt>${t("Branch", "শাখা")}</dt><dd>${t("Agent Banking (Foreign Exchange Branch)", "এজেন্ট ব্যাংকিং (ফরেন এক্সচেঞ্জ শাখা)")}</dd></div><div><dt>${t("Routing", "রাউটিং নম্বর")}</dt><dd>090270608</dd></div><div><dt>${t("SWIFT Code", "SWIFT কোড")}</dt><dd>DBBLBDDH</dd></div></dl><a href="#/payment-method" data-demo-payment>${t("Proceed to deposit →", "জমা দিতে এগিয়ে যান →")}</a></div>
</div><p class="hint payment-note">${t("All payment methods should be verified with Travel To Know support before making a transfer.", "টাকা স্থানান্তরের আগে Travel To Know-এর সাপোর্ট টিমের সঙ্গে যোগাযোগ করে সব পেমেন্ট তথ্য যাচাই করে নিন।")}</p></div></main>${footer()}`; }
const routeDescriptions = {
  "/": "Travel To Know helps travellers from Bangladesh plan flights, hotels, holidays, visa assistance and Umrah journeys with practical support.",
  "/flights": "Explore domestic and international flight options from Bangladesh with Travel To Know. Request fare assistance and review booking conditions before confirmation.",
  "/hotels": "Explore hotel and accommodation options in Bangladesh and worldwide with Travel To Know. Compare stay details and supplier conditions before booking.",
  "/holidays": "Plan your next holiday with Travel To Know. Explore destinations, package options and practical travel support for your journey.",
  "/visa": "Get travel-document guidance and visa assistance from Travel To Know. Visa decisions remain with the relevant embassy or immigration authority.",
  "/umrah-packages": "Explore Umrah travel planning with Travel To Know, including flight, accommodation and journey coordination support.",
  "/about-us": "Learn about Travel To Know, its travel services, customer support approach and corporate office in Motijheel, Dhaka.",
  "/contact-us": "Contact Travel To Know for flight, hotel, holiday, visa and Umrah enquiries. Find our Dhaka office address, phone numbers and support hours.",
  "/privacy-policy": "Read the Travel To Know privacy policy to understand the personal information collected for enquiries, bookings, travel services and website use.",
  "/terms-and-conditions": "Review Travel To Know booking terms, payment conditions, supplier responsibilities, amendments, cancellations and customer obligations.",
  "/refund-policy": "Review Travel To Know refund and cancellation conditions for flight tickets, hotels, visa assistance and third-party services.",
  "/payment-method": "Review payment methods published by Travel To Know and verify account details with customer support before making a transfer.",
  "/blog": "Read practical travel planning guidance and service insights from Travel To Know for business, family and international journeys.",
  "/blog/corporate-travel-cost-control": "Learn practical ways to organise business travel, compare full trip costs, maintain approvals and review booking conditions.",
  "/request-service": "Send a travel enquiry to Travel To Know for flights, hotels, visa assistance, holiday packages, corporate travel and Umrah support."
};

function updatePageMetadata(route) {
  const description = routeDescriptions[route] || "The requested page could not be found on Travel To Know.";
  const title = routeTitles[route] || "Page not found | Travel To Know";
  let descriptionTag = document.querySelector('meta[name="description"]');
  if (!descriptionTag) { descriptionTag = document.createElement("meta"); descriptionTag.name = "description"; document.head.appendChild(descriptionTag); }
  descriptionTag.content = description;
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) { canonicalTag = document.createElement("link"); canonicalTag.rel = "canonical"; document.head.appendChild(canonicalTag); }
  const canonicalPath = route === "/" ? "/" : route.replace(/\/+$/, "") + "/";
  canonicalTag.href = "https://traveltoknow.com.bd" + canonicalPath;
  let robotsTag = document.querySelector('meta[name="robots"]');
  if (!robotsTag) { robotsTag = document.createElement("meta"); robotsTag.name = "robots"; document.head.appendChild(robotsTag); }
  const privateRoutes = ["/sign-in", "/sign-up", "/sing-up", "/forgot-password", "/missing"];
  robotsTag.content = privateRoutes.includes(route) ? "noindex, nofollow" : "index, follow";
  document.title = title;
}

function render() {
  const requestedLanguage = queryParam("lang");
  if (requestedLanguage === "en" || requestedLanguage === "bn") localStorage.setItem("ttk-language", requestedLanguage);
  const route = routeFromLocation();
  updatePageMetadata(route);
  if (window.TTK_I18N && localStorage.getItem("ttk-language") === "bn") document.title = window.TTK_I18N.translateText(routeTitles[route] || routeTitles["/"]);
  const app = document.getElementById("app");
  if (["/", "/flights", "/hotels", "/holidays", "/visa"].includes(route)) app.innerHTML = heroPage(route === "/" ? "flights" : route.slice(1), route);
  else if (["/about-us", "/contact-us", "/privacy-policy", "/terms-and-conditions", "/refund-policy"].includes(route)) app.innerHTML = infoPage(route);
  else if (route === "/payment-method") app.innerHTML = paymentPage();
  else if (route === "/blog") app.innerHTML = blogPage();
  else if (route === "/blog/corporate-travel-cost-control") app.innerHTML = articlePage();
  else if (["/sign-in", "/sign-up", "/sing-up", "/forgot-password"].includes(route)) app.innerHTML = authPage(route);
  else if (route === "/umrah-packages") app.innerHTML = umrahPage();
  else if (route === "/request-service") app.innerHTML = requestPage();
  else app.innerHTML = infoPage("/missing");
  if (window.TTK_I18N) window.TTK_I18N.apply(app);
  document.documentElement.lang = localStorage.getItem("ttk-language") === "bn" ? "bn" : "en";
  bindInteractions();
}

function toast(message) {
  if (window.TTK_I18N) message = window.TTK_I18N.translateText(message);
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div"); node.className = "toast"; node.setAttribute("role", "status"); node.setAttribute("aria-live", "polite"); node.textContent = message; document.body.appendChild(node);
  setTimeout(() => node.remove(), 4200);
}

function showModal(title, message, options = {}) {
  if (window.TTK_I18N) { title = window.TTK_I18N.translateText(title); message = window.TTK_I18N.translateText(message); }
  document.querySelector(".modal-backdrop")?.remove();
  const backdrop = document.createElement("div"); backdrop.className = "modal-backdrop";
  const modal = document.createElement("div"); modal.className = "modal"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true");
  const close = document.createElement("button"); close.type = "button"; close.setAttribute("data-close-modal", ""); close.setAttribute("aria-label", "Close"); close.textContent = "×";
  const heading = document.createElement("h2"); heading.textContent = title;
  modal.append(close, heading);
  if (options.mailto) {
    const p = document.createElement("p"); p.textContent = window.TTK_I18N ? window.TTK_I18N.translateText("Your enquiry has been saved for this browser session. Use the button below to open your email client and send it to Travel To Know.") : "Your enquiry has been saved for this browser session. Use the button below to open your email client and send it to Travel To Know.";
    const actions = document.createElement("p"); const mail = document.createElement("a"); mail.className = "primary-button modal-mail"; mail.href = options.mailto; mail.textContent = window.TTK_I18N ? window.TTK_I18N.translateText("Open email draft") : "Open email draft"; actions.append(mail); modal.append(p, actions);
  } else { const p = document.createElement("p"); p.textContent = message; modal.append(p); }
  const done = document.createElement("button"); done.type = "button"; done.setAttribute("data-close-modal", ""); done.textContent = window.TTK_I18N ? window.TTK_I18N.translateText("Close") : "Close"; modal.append(done);
  backdrop.append(modal); document.body.appendChild(backdrop); close.focus();
  backdrop.addEventListener("click", (event) => { if (event.target === backdrop || event.target.closest("[data-close-modal]")) backdrop.remove(); });
}

function getAgodaConfig() { return (window.TRAVEL_AFFILIATE_CONFIG || {}).agoda || {}; }
function getBookingConfig() { return (window.TRAVEL_AFFILIATE_CONFIG || {}).booking || {}; }

const AFFILIATE_HOSTS = Object.freeze({ agoda: "www.agoda.com", booking: "www.booking.com", amazon: "amzn.to" });
const AGODA_FLIGHT_HOST = "flights.agoda.com";

function trustedAffiliateBase(provider, fallback) {
  const config = window.TRAVEL_AFFILIATE_CONFIG || {};
  const candidate = provider === "agoda" ? config.agoda?.base : provider === "booking" ? config.booking?.base : config.amazon?.url;
  const fallbackUrl = new URL(fallback);
  try {
    const url = new URL(candidate || fallback);
    if (url.protocol !== "https:" || url.hostname !== AFFILIATE_HOSTS[provider]) return fallbackUrl;
    return url;
  } catch (_) { return fallbackUrl; }
}

function trustedAffiliatePath(provider, path, fallbackPath) {
  const base = trustedAffiliateBase(provider, provider === "booking" ? "https://www.booking.com" : "https://www.agoda.com");
  const url = new URL(String(path || fallbackPath || "/"), base);
  return url.origin === base.origin ? url : new URL(fallbackPath || "/", base);
}

function trustedAgodaFlightPath(path) {
  // Use Agoda's public Flights service page; do not deep-link to an unverified
  // results route. The visitor completes the flight search on Agoda.
  return trustedAffiliatePath("agoda", path || "/flights", "/flights");
}
function agodaHotelServiceUrl() {
  const cfg = getAgodaConfig();
  // Agoda's official hotel-search interface is /en-gb/search.
  // Use the search page rather than the general app/home landing page or
  // Partner Center router, which opened the app home screen on mobile.
  const url = trustedAffiliatePath("agoda", "/en-gb/search", "/en-gb/search");
  if (cfg.cid) url.searchParams.set("cid", String(cfg.cid));
  return url.toString();
}
function agodaFlightServiceUrl() {
  const cfg = getAgodaConfig();
  const url = trustedAgodaFlightPath("/flights");
  if (cfg.cid) url.searchParams.set("cid", String(cfg.cid));
  return url.toString();
}
function airportSlug(value) { return String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function airportLookup(code) { return window.TRAVEL_AIRPORTS?.find((airport) => airport.iata === String(code || "").toUpperCase()) || null; }

function kayakFlightUrl(criteria) {
  const cabinMap = { "Economy": "e", "Premium Economy": "p", "Business": "b", "First Class": "f" };
  const cabin = cabinMap[criteria.cabin] || "e";
  const adults = Math.max(1, Math.min(9, Number.parseInt(criteria.travellers, 10) || 1));
  let pathSegments = [];
  if (criteria.mode === "multi-city") {
    pathSegments = (criteria.legs || []).flatMap((leg) => [
      `${String(leg.from).toUpperCase()}-${String(leg.to).toUpperCase()}`,
      leg.date
    ]);
  } else {
    pathSegments = [`${String(criteria.from).toUpperCase()}-${String(criteria.to).toUpperCase()}`, criteria.departureDate];
    if (criteria.mode === "round-trip" && criteria.returnDate) pathSegments.push(criteria.returnDate);
  }
  pathSegments.push(`${adults}adults`, cabin);
  const url = new URL(`https://www.kayak.com/flights/${pathSegments.map(encodeURIComponent).join("/")}`);
  url.searchParams.set("sort", "bestflight_a");
  return url.toString();
}

function bookingHotelUrl(criteria) {
  const cfg = getBookingConfig();
  const url = trustedAffiliatePath("booking", cfg.destinationPath || "/searchresults.html", "/searchresults.html");
  if (criteria.destination) url.searchParams.set("ss", criteria.destination);
  if (criteria.checkIn) url.searchParams.set("checkin", criteria.checkIn);
  if (criteria.checkOut) url.searchParams.set("checkout", criteria.checkOut);
  if (criteria.adults) url.searchParams.set("group_adults", criteria.adults);
  url.searchParams.set("group_children", "0");
  url.searchParams.set("no_rooms", criteria.rooms || "1");
  if (cfg.aid && cfg.aid !== "YOUR_BOOKING_AID") url.searchParams.set("aid", String(cfg.aid));
  return url.toString();
}

function normalizeAgodaDestination(destination) {
  return String(destination || "").normalize("NFKC").toLowerCase()
    .replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

// City IDs copied from Agoda Partner Center-generated links and tested by the site owner.
// Add destinations only after generating and checking their official Agoda Text Link.
const AGODA_VERIFIED_CITY_IDS = Object.freeze({
  "paris": "15470",
  "paris france": "15470",
  "tokyo": "5085",
  "tokyo japan": "5085",
  "dubai": "2994",
  "dubai united arab emirates": "2994"
});

function agodaPartnerSearchUrl(destination) {
  const cfg = getAgodaConfig();
  const url = trustedAffiliatePath("agoda", "/partners/partnersearch.aspx", "/partners/partnersearch.aspx");
  url.searchParams.set("pcs", "1");
  url.searchParams.set("cid", String(cfg.cid || ""));
  url.searchParams.set("hl", "en-us");
  const cityId = AGODA_VERIFIED_CITY_IDS[normalizeAgodaDestination(destination)];
  if (cityId) url.searchParams.set("city", cityId);
  return url.toString();
}

function agodaHotelUrl(criteria) {
  // Agoda's public search URL accepts a verified numeric city ID plus stay
  // dates and occupancy. Never invent a city ID for an unverified destination.
  const cfg = getAgodaConfig();
  const destination = String(criteria?.destination || "").trim();
  const cityId = AGODA_VERIFIED_CITY_IDS[normalizeAgodaDestination(destination)];
  const url = trustedAffiliatePath("agoda", "/search", "/search");
  if (cityId) url.searchParams.set("city", cityId);
  if (criteria?.checkIn) url.searchParams.set("checkIn", criteria.checkIn);
  if (criteria?.checkOut) url.searchParams.set("checkOut", criteria.checkOut);
  if (criteria?.adults) url.searchParams.set("adults", String(criteria.adults));
  if (criteria?.rooms) url.searchParams.set("rooms", String(criteria.rooms));
  if (cfg.cid) url.searchParams.set("cid", String(cfg.cid));
  // Unknown destinations still open Agoda's search interface with dates and
  // occupancy retained; Agoda may require the visitor to select the location.
  return url.toString();
}

function agodaHolidayUrl(destination) {
  return agodaHotelServiceUrl();
}

function mountAirportPicker(select, airports) {
  const existing = select.closest(".airport-picker");
  if (existing) {
    existing._airports = airports;
    refreshAirportPicker(existing);
    return;
  }

  const picker = document.createElement("div");
  picker.className = "airport-picker";
  picker._airports = airports;
  picker.innerHTML = `
    <button class="airport-picker-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
      <span class="airport-picker-value"></span><span class="airport-picker-chevron" aria-hidden="true">▾</span>
    </button>
    <div class="airport-picker-panel" hidden>
      <input class="airport-picker-search" type="search" autocomplete="off" placeholder="Search airport, city or code…" aria-label="Search airports">
      <div class="airport-picker-results" role="listbox" aria-label="Airport options"></div>
    </div>`;
  select.classList.add("airport-native-select");
  select.parentNode.insertBefore(picker, select);
  picker.appendChild(select);

  const trigger = picker.querySelector(".airport-picker-trigger");
  const search = picker.querySelector(".airport-picker-search");
  const panel = picker.querySelector(".airport-picker-panel");

  const close = () => {
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  };
  const open = () => {
    document.querySelectorAll(".airport-picker-panel").forEach((item) => { item.hidden = true; });
    document.querySelectorAll(".airport-picker-trigger").forEach((item) => item.setAttribute("aria-expanded", "false"));
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    search.value = "";
    refreshAirportPicker(picker);
    search.focus();
  };

  trigger.addEventListener("click", () => panel.hidden ? open() : close());
  search.addEventListener("input", () => refreshAirportPicker(picker));
  picker.querySelector(".airport-picker-results").addEventListener("click", (event) => {
    const option = event.target.closest("[data-airport-code]");
    if (!option) return;
    select.value = option.dataset.airportCode;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    refreshAirportPicker(picker);
    close();
    trigger.focus();
  });
  search.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { close(); trigger.focus(); }
    if (event.key === "Enter") {
      const first = picker.querySelector(".airport-picker-option");
      if (first) { event.preventDefault(); first.click(); }
    }
  });
  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) close();
  });
  refreshAirportPicker(picker);
}

function refreshAirportPicker(picker) {
  const select = picker.querySelector(".flight-airport-select");
  const triggerValue = picker.querySelector(".airport-picker-value");
  const search = picker.querySelector(".airport-picker-search");
  const results = picker.querySelector(".airport-picker-results");
  const selected = picker._airports.find((airport) => airport.iata === select.value);
  triggerValue.textContent = selected ? `${selected.iata} — ${selected.city || selected.name}` : (select.value || "Select airport");
  const term = String(search.value || "").trim().toLowerCase();
  const matches = picker._airports.filter((airport) => [
    airport.iata, airport.city, airport.name, airport.country
  ].some((value) => String(value || "").toLowerCase().includes(term))).slice(0, 120);

  results.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "airport-picker-empty";
    empty.textContent = "No matching airports found. Try another city or code.";
    results.appendChild(empty);
    return;
  }
  const fragment = document.createDocumentFragment();
  matches.forEach((airport) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "airport-picker-option";
    option.dataset.airportCode = airport.iata;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(airport.iata === select.value));
    const main = document.createElement("span");
    main.className = "airport-option-main";
    main.textContent = `${airport.iata} — ${airport.city || airport.name}`;
    const detail = document.createElement("small");
    detail.className = "airport-option-detail";
    detail.textContent = [airport.name, airport.country].filter(Boolean).join(" · ");
    option.append(main, detail);
    fragment.appendChild(option);
  });
  results.appendChild(fragment);
}

function populateAirportSelects() {
  const selects = document.querySelectorAll(".flight-airport-select");
  if (!selects.length) return;
  const fallback = [
    ["DAC", "Dhaka", "Hazrat Shahjalal International Airport", "Bangladesh"], ["CXB", "Cox's Bazar", "Cox's Bazar Airport", "Bangladesh"], ["CGP", "Chattogram", "Shah Amanat International Airport", "Bangladesh"], ["ZYL", "Sylhet", "Osmani International Airport", "Bangladesh"], ["DXB", "Dubai", "Dubai International Airport", "United Arab Emirates"], ["JED", "Jeddah", "King Abdulaziz International Airport", "Saudi Arabia"], ["LHR", "London", "Heathrow Airport", "United Kingdom"], ["JFK", "New York", "John F. Kennedy International Airport", "United States"], ["SYD", "Sydney", "Sydney Airport", "Australia"], ["CCU", "Kolkata", "Netaji Subhas Chandra Bose International Airport", "India"], ["SIN", "Singapore", "Singapore Changi Airport", "Singapore"], ["BKK", "Bangkok", "Suvarnabhumi Airport", "Thailand"]
  ];
  const render = (airports) => {
    window.TRAVEL_AIRPORTS = airports;
    selects.forEach((select) => {
      const selected = select.value;
      const fragment = document.createDocumentFragment();
      airports.forEach((airport) => {
        const option = document.createElement("option");
        option.value = airport.iata;
        option.textContent = `${airport.iata} — ${airport.city || airport.name}`;
        fragment.appendChild(option);
      });
      select.replaceChildren(fragment);
      if (airports.some((airport) => airport.iata === selected)) select.value = selected;
      else if (select.name === "from" && airports.some((airport) => airport.iata === "DAC")) select.value = "DAC";
      else if (select.name === "to" && airports.some((airport) => airport.iata === "DXB")) select.value = "DXB";
      mountAirportPicker(select, airports);
    });
  };
  const fallbackAirports = fallback.map(([iata, city, name, country]) => ({ iata, city, name, country }));
  render(fallbackAirports);
  fetch("https://davidmegginson.github.io/ourairports-data/airports.csv", { mode: "cors" })
    .then((response) => { if (!response.ok) throw new Error("Airport data unavailable"); return response.text(); })
    .then((csv) => {
      const rows = parseAirportCsv(csv);
      const airports = rows.filter((row) => /^[A-Z]{3}$/.test(row.iata)).map((row) => ({ iata: row.iata, city: row.city, name: row.name, country: row.country }));
      const unique = new Map();
      airports.forEach((airport) => { if (!unique.has(airport.iata)) unique.set(airport.iata, airport); });
      render(Array.from(unique.values()).sort((a, b) => `${a.iata} ${a.city} ${a.name}`.localeCompare(`${b.iata} ${b.city} ${b.name}`)));
    })
    .catch(() => render(fallbackAirports));
}
function parseAirportCsv(csv) {
  const rows = [];
  let row = [], field = "", quoted = false;
  const pushField = () => { row.push(field); field = ""; };
  const pushRow = () => { if (row.length) rows.push(row); row = []; };
  for (let i = 0; i < csv.length; i += 1) {
    const ch = csv[i];
    if (ch === '"') { if (quoted && csv[i + 1] === '"') { field += '"'; i += 1; } else quoted = !quoted; }
    else if (ch === "," && !quoted) pushField();
    else if ((ch === "\n" || ch === "\r") && !quoted) { if (ch === "\r" && csv[i + 1] === "\n") i += 1; pushField(); pushRow(); }
    else field += ch;
  }
  if (field.length || row.length) { pushField(); pushRow(); }
  if (!rows.length) return [];
  const headers = rows.shift().map((h) => h.trim());
  const iata = headers.indexOf("iata_code"), name = headers.indexOf("name"), city = headers.indexOf("municipality"), country = headers.indexOf("iso_country");
  return rows.map((r) => ({ iata: String(r[iata] || "").trim().toUpperCase(), name: r[name] || "", city: r[city] || "", country: r[country] || "" }));
}

function renumberMultiCityLegs(list) {
  const rows = Array.from(list.querySelectorAll("[data-leg]"));
  rows.forEach((row, index) => {
    const title = row.querySelector(".multi-city-leg-title");
    if (title) {
      const remove = title.querySelector("[data-remove-flight-leg]");
      title.textContent = `Flight ${index + 1}`;
      if (remove) {
        remove.textContent = "Remove";
        remove.setAttribute("aria-label", `Remove flight ${index + 1}`);
        title.appendChild(remove);
      }
    }
  });
  const addButton = list.closest("[data-multi-city-panel]")?.querySelector("[data-add-flight-leg]");
  if (addButton) addButton.hidden = rows.length >= 6;
  list.querySelectorAll("[data-remove-flight-leg]").forEach((button) => { button.hidden = rows.length <= 2; });
}

function searchFlightsFromForm(button) {
  const card = button.closest("[data-form=flights]");
  const mode = card?.querySelector(".mode.active")?.dataset.flightMode || "one-way";
  const criteria = {
    mode,
    from: (card?.querySelector('[name="from"]')?.value || "").trim().toUpperCase(),
    to: (card?.querySelector('[name="to"]')?.value || "").trim().toUpperCase(),
    departureDate: card?.querySelector('[name="departureDate"]')?.value || "",
    returnDate: card?.querySelector('[name="returnDate"]')?.value || "",
    travellers: card?.querySelector('[name="travellers"]')?.value || "1",
    cabin: card?.querySelector('[name="cabin"]')?.value || "Economy"
  };
  if (mode === "multi-city") {
    const rows = Array.from(card.querySelectorAll("[data-leg]"));
    if (rows.length < 2 || rows.length > 6) { toast("A multi-city itinerary must contain 2–6 flight segments."); return; }
    const legs = rows.map((row, index) => ({
      from: (row.querySelector('[name="multiFrom"]')?.value || "").trim().toUpperCase(),
      to: (row.querySelector('[name="multiTo"]')?.value || "").trim().toUpperCase(),
      date: row.querySelector('[name="multiDate"]')?.value || "",
      index
    }));
    for (let i = 0; i < legs.length; i += 1) {
      const leg = legs[i];
      if (!/^[A-Z]{3}$/.test(leg.from) || !/^[A-Z]{3}$/.test(leg.to) || leg.from === leg.to) { toast(`Please select different valid airports for flight ${i + 1}.`); return; }
      if (!leg.date) { toast(`Please select a departure date for flight ${i + 1}.`); return; }
      if (leg.date < dateOffsetISO(0)) { toast(`Flight ${i + 1} cannot depart in the past.`); return; }
      if (i > 0 && leg.date < legs[i - 1].date) { toast("Multi-city flight dates must be in chronological order."); return; }
    }
    criteria.legs = legs;
  } else {
    if (!criteria.from || !criteria.to || criteria.from === criteria.to) { toast("Please select different departure and arrival airports."); return; }
    if (!/^[A-Z]{3}$/.test(criteria.from) || !/^[A-Z]{3}$/.test(criteria.to)) { toast("Please select valid IATA airports."); return; }
    if (!criteria.departureDate) { toast("Please select a departure date."); return; }
    if (criteria.departureDate < dateOffsetISO(0)) { toast("Departure date cannot be in the past."); return; }
    if (mode === "round-trip" && !criteria.returnDate) { toast("Please select a return date for a round-trip search."); return; }
    if (criteria.returnDate && criteria.returnDate < criteria.departureDate) { toast("Return date must be on or after departure date."); return; }
  }
  const travellers = Number(criteria.travellers);
  if (!Number.isInteger(travellers) || travellers < 1 || travellers > 9) { toast("Please select 1–9 travellers."); return; }
  // KAYAK is an external search hand-off; this does not create a Travel To Know booking.
  window.location.assign(kayakFlightUrl(criteria));
}

function bindInteractions() {
  document.querySelector("[data-language-select]")?.addEventListener("change", (event) => {
    localStorage.setItem("ttk-language", event.target.value);
    render();
  });
  const languageSelect = document.querySelector("[data-language-select]");
  if (languageSelect) languageSelect.value = localStorage.getItem("ttk-language") === "bn" ? "bn" : "en";
  document.querySelector("[data-scroll-top]")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.querySelector("[data-dismiss-announcement]")?.addEventListener("click", (event) => { event.target.closest(".announcement")?.remove(); });
  document.querySelector("[data-menu-toggle]")?.addEventListener("click", (event) => { const button = event.currentTarget; const nav = document.querySelector("[data-primary-nav]"); const open = nav?.classList.toggle("open") || false; button.setAttribute("aria-expanded", String(open)); button.setAttribute("aria-label", open ? "Close menu" : "Open menu"); });
  document.querySelectorAll("[data-service-tab]").forEach((button) => button.addEventListener("click", () => go(`/${button.dataset.serviceTab}`)));
  document.querySelectorAll("[data-demo-search]").forEach((button) => button.addEventListener("click", () => { if (button.dataset.demoSearch === "Visa") { window.location.assign("https://traveltoknow.com.bd/flights/#/request-service?service=Visa%20assistance"); return; } showModal(`${button.dataset.demoSearch} search demo`, "This service remains connected to the existing Travel To Know enquiry flow. Live supplier fares and availability require the relevant secure API connection."); }));
  document.querySelectorAll("[data-umrah-enquiry]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.assign("https://traveltoknow.com.bd/flights/?utm_source=chatgpt.com#/request-service?service=Umrah%20and%20religious%20travel");
  }));
  document.querySelectorAll("[data-add-flight-leg]").forEach((button) => button.addEventListener("click", () => {
    const card = button.closest("[data-form=flights]");
    const list = card?.querySelector("[data-multi-city-legs]");
    const count = list?.querySelectorAll("[data-leg]").length || 0;
    if (!list || count >= 6) { toast("KAYAK supports up to 6 flight segments in one multi-city search."); return; }
    const previous = list.querySelector("[data-leg]:last-child");
    const previousTo = previous?.querySelector('[name="multiTo"]')?.value || "DAC";
    const previousDate = previous?.querySelector('[name="multiDate"]')?.value || dateOffsetISO(1);
    const nextDate = new Date(`${previousDate}T12:00:00`);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateValue = `${nextDate.getFullYear()}-${String(nextDate.getMonth()+1).padStart(2,"0")}-${String(nextDate.getDate()).padStart(2,"0")}`;
    const airports = window.TRAVEL_AIRPORTS || [];
    const options = airports.map((airport) => `<option value="${escapeHtml(airport.iata)}">${escapeHtml(airport.iata)} — ${escapeHtml(airport.city || airport.name)}</option>`).join("");
    const row = document.createElement("div");
    row.className = "multi-city-leg";
    row.setAttribute("data-leg", "");
    row.innerHTML = `<div class="multi-city-leg-title">Flight ${count + 1}<button type="button" class="multi-city-remove" data-remove-flight-leg aria-label="Remove flight ${count + 1}">Remove</button></div><div class="field"><label>From</label><select class="flight-airport-select" name="multiFrom" aria-label="Flight ${count + 1} departure airport">${options}</select></div><div class="field"><label>To</label><select class="flight-airport-select" name="multiTo" aria-label="Flight ${count + 1} arrival airport">${options}</select></div><div class="field"><label>Departure</label><input class="date-input" name="multiDate" type="date" min="${dateOffsetISO(0)}" value="${nextDateValue}"></div>`;
    list.appendChild(row);
    const fromSelect = row.querySelector('[name="multiFrom"]');
    const toSelect = row.querySelector('[name="multiTo"]');
    if (airports.some((airport) => airport.iata === previousTo)) fromSelect.value = previousTo;
    if (airports.some((airport) => airport.iata === "DAC")) toSelect.value = "DAC";
    [fromSelect, toSelect].forEach((select) => mountAirportPicker(select, airports));
    row.querySelector("[data-remove-flight-leg]")?.addEventListener("click", () => {
      row.remove();
      renumberMultiCityLegs(list);
    });
    renumberMultiCityLegs(list);
  }));
  document.querySelectorAll("[data-remove-flight-leg]").forEach((button) => button.addEventListener("click", () => {
    const list = button.closest("[data-multi-city-legs]");
    button.closest("[data-leg]")?.remove();
    if (list) renumberMultiCityLegs(list);
  }));
  document.querySelectorAll("[data-flight-search]").forEach((button) => button.addEventListener("click", () => searchFlightsFromForm(button)));
  function readHotelCriteria(button) {
    const card = button.closest("[data-form=hotels]");
    const [rooms, adults] = String(card?.querySelector('[name="roomsGuests"]')?.value || "1|2").split("|");
    const criteria = {
      destination: card?.querySelector('[name="hotelDestination"]')?.value?.trim() || "",
      checkIn: card?.querySelector('[name="checkIn"]')?.value || "",
      checkOut: card?.querySelector('[name="checkOut"]')?.value || "",
      rooms: rooms || "1",
      adults: adults || "2"
    };
    if (!criteria.destination) { toast("Please enter a hotel destination."); return null; }
    if (!criteria.checkIn || !criteria.checkOut) { toast("Please select check-in and check-out dates."); return null; }
    if (criteria.checkIn < dateOffsetISO(0)) { toast("Check-in date cannot be in the past."); return null; }
    if (criteria.checkOut <= criteria.checkIn) { toast("Check-out date must be after check-in date."); return null; }
    return criteria;
  }
  document.querySelectorAll("[data-hotel-search]").forEach((button) => button.addEventListener("click", () => {
    const criteria = readHotelCriteria(button);
    if (criteria) window.location.assign(agodaHotelUrl(criteria));
  }));
  document.querySelectorAll("[data-booking-search]").forEach((button) => button.addEventListener("click", () => {
    const criteria = readHotelCriteria(button);
    if (criteria) window.location.assign(bookingHotelUrl(criteria));
  }));
  document.querySelectorAll("[data-holiday-search]").forEach((button) => button.addEventListener("click", () => {
    const destination = document.querySelector("[data-holiday-destination]")?.value || "";
    const cleanDestination = destination.split("—")[0].trim();
    window.location.assign(agodaHolidayUrl(cleanDestination));
  }));
  document.querySelectorAll("[data-affiliate-destination]").forEach((button) => button.addEventListener("click", () => {
    const destination = button.dataset.affiliateDestination || button.dataset.destination || button.dataset.place || "";
    const config = window.TRAVEL_AFFILIATE_CONFIG || {};
    const provider = config.preferredProvider || "agoda";
    if (provider === "booking" && config.booking?.aid && config.booking.aid !== "YOUR_BOOKING_AID") {
      const url = trustedAffiliatePath("booking", config.booking.destinationPath || "/searchresults.html", "/searchresults.html");
      url.searchParams.set("ss", destination);
      url.searchParams.set("aid", String(config.booking.aid));
      window.open(url.toString(), "_blank", "noopener,noreferrer");
      return;
    }
    if (config.agoda?.cid) {
      window.open(agodaHotelServiceUrl(), "_blank", "noopener,noreferrer");
      return;
    }
    showModal(destination, "Hotel affiliate links are not configured yet.");
  }));
  document.querySelectorAll("[data-destination], [data-place]").forEach((button) => {
    if (button.dataset.affiliateDestination) return;
    button.addEventListener("click", () => showModal(button.dataset.destination || button.dataset.place, "Destination detail is ready for the live travel API or your own package catalogue."));
  });
  document.querySelectorAll("[data-demo-payment]").forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); showModal("Payment verification", "Please verify the current account details with Travel To Know support before making a transfer."); }));
  document.querySelector("[data-newsletter]")?.addEventListener("submit", (event) => { event.preventDefault(); toast("Thanks — newsletter subscription is ready for backend integration."); event.target.reset(); });
  document.querySelector("[data-lead-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());
    sessionStorage.setItem("travelToKnowLeadDraft", JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
    const subject = encodeURIComponent(`Travel To Know enquiry — ${data.service || "Travel service"}`);
    const body = encodeURIComponent([`Service: ${data.service || ""}`, `Name: ${data.name || ""}`, `Phone / WhatsApp: ${data.phone || ""}`, `Email: ${data.email || ""}`, `Travel date: ${data.date || ""}`, `Origin: ${data.origin || ""}`, `Destination / route: ${data.destination || ""}`, `Travellers: ${data.travellers || ""}`, `Budget: ${data.budget || ""}`, `Notes: ${data.notes || ""}`].join("\n"));
    showModal("Enquiry prepared", "", { mailto: `mailto:info@traveltoknow.com.bd?cc=traveltoknowbd@gmail.com&subject=${subject}&body=${body}` });
  });
  document.querySelector("[data-login-form]")?.addEventListener("submit", (event) => { event.preventDefault(); showModal("Demo sign-in", "Authentication is not connected in this static GitHub Pages build. Add your backend auth endpoint to activate it."); });
  document.querySelector("[data-signup-form]")?.addEventListener("submit", (event) => { event.preventDefault(); showModal("Demo sign-up", "Account creation is not connected in this static build. Add your backend auth endpoint to activate it."); });
  document.querySelector("[data-forgot-form]")?.addEventListener("submit", (event) => { event.preventDefault(); showModal("Demo password recovery", "OTP delivery requires a secure backend email/SMS service."); });
  document.querySelectorAll("[data-flight-mode]").forEach((button) => button.addEventListener("click", () => {
    const card = button.closest("[data-form=flights]");
    document.querySelectorAll("[data-flight-mode]").forEach((item) => { item.classList.remove("active"); item.setAttribute("aria-pressed", "false"); });
    button.classList.add("active"); button.setAttribute("aria-pressed", "true");
    const isRoundTrip = button.dataset.flightMode === "round-trip";
    const isMultiCity = button.dataset.flightMode === "multi-city";
    const returnField = card?.querySelector("[data-return-field]");
    const basicFields = card?.querySelector("[data-basic-flight-fields]");
    const multiPanel = card?.querySelector("[data-multi-city-panel]");
    if (basicFields) basicFields.hidden = isMultiCity;
    if (multiPanel) multiPanel.hidden = !isMultiCity;
    if (returnField) returnField.hidden = !isRoundTrip;
    const departure = card?.querySelector('[name="departureDate"]')?.value || dateOffsetISO(1);
    const returnInput = card?.querySelector('[name="returnDate"]');
    if (returnInput) { returnInput.min = departure; if (!isRoundTrip) returnInput.value = ""; }
  }));
  populateAirportSelects();
}

window.addEventListener("hashchange", () => { render(); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" })); });
window.addEventListener("popstate", () => { render(); window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" })); });
render();
