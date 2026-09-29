const ASSET = "";

// Affiliate configuration. Replace the placeholder IDs in affiliate-config.js after approval.
const AFFILIATE = window.TRAVEL_AFFILIATE_CONFIG || {
  booking: { aid: "YOUR_BOOKING_AID", base: "https://www.booking.com" },
  agoda: { cid: "8085912", base: "https://www.agoda.com" }
};

function affiliateConfigured(provider) {
  if (provider === "booking") return Boolean(AFFILIATE.booking?.aid && AFFILIATE.booking.aid !== "YOUR_BOOKING_AID");
  if (provider === "agoda") return Boolean(AFFILIATE.agoda?.cid && AFFILIATE.agoda.cid !== "8085912");
  return false;
}

function bookingUrl(params = {}) {
  const url = new URL(params.flight ? "/flights/index.html" : "/searchresults.html", AFFILIATE.booking?.base || "https://www.booking.com");
  if (params.destination) url.searchParams.set("ss", params.destination);
  if (params.checkIn) url.searchParams.set("checkin", params.checkIn);
  if (params.checkOut) url.searchParams.set("checkout", params.checkOut);
  if (params.adults) url.searchParams.set("group_adults", String(params.adults));
  if (params.rooms) url.searchParams.set("no_rooms", String(params.rooms));
  if (affiliateConfigured("booking")) url.searchParams.set("aid", AFFILIATE.booking.aid);
  return url.toString();
}

function agodaUrl(params = {}) {
  const url = new URL("/search", AFFILIATE.agoda?.base || "https://www.agoda.com");
  if (params.destination) url.searchParams.set("text", params.destination);
  if (params.checkIn) url.searchParams.set("checkIn", params.checkIn);
  if (params.checkOut) url.searchParams.set("checkOut", params.checkOut);
  if (params.rooms) url.searchParams.set("rooms", String(params.rooms));
  if (params.adults) url.searchParams.set("adults", String(params.adults));
  if (affiliateConfigured("agoda")) url.searchParams.set("cid", AFFILIATE.agoda.cid);
  return url.toString();
}

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
  ["Malaysia", "Explore the vibrant cityscape of Kuala Lumpur, known for its iconic Petronas Towers.", "malaysia.avif"],
  ["Thailand", "Experience the bustling life of Bangkok, Thailand's vibrant capital city.", "thailand.avif"],
  ["Singapore", "Discover the beautiful and ultra-modern city of Singapore.", "singapore.avif"],
  ["Indonesia", "Enjoy the serene beaches and tropical vibes of Bali, Indonesia.", "bali.jpg"],
  ["Sri Lanka", "Experience cultural heritage and lush landscapes by the Indian Ocean.", "colombo.webp"]
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
  "/flights": "Book Cheap Flights Online | Travel To Know",
  "/hotels": "Book Hotels at Best Prices | Travel To Know",
  "/holidays": "Tour Packages & Tours at Best Prices | Travel To Know",
  "/visa": "Best Visa Processing Agency in Bangladesh | Travel To Know",
  "/umrah-packages": "Umrah Packages 2026-2027 | Travel To Know",
  "/about-us": "About us - Travel To Know",
  "/contact-us": "Contact us - Travel To Know",
  "/privacy-policy": "Privacy policy - Travel To Know",
  "/terms-and-conditions": "Terms and Condition - Travel To Know",
  "/refund-policy": "Refund & Cancellation Policy | Travel To Know",
  "/payment-method": "Payment Methods | Travel To Know",
  "/blog": "Travel To Know | Travel Guidance & Support",
  "/blog/corporate-travel-cost-control": "Corporate Travel Planning & Cost Control | Travel To Know",
  "/sign-in": "Login to your account | Travel To Know",
  "/sing-up": "Open a new account | Travel To Know",
  "/forgot-password": "Forgot your password | Travel To Know",
  "/request-service": "Request a Travel Service | Travel To Know"
};

function routeFromLocation() {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) return hash.startsWith("/") ? hash.split("?")[0] : `/${hash.split("?")[0]}`;
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const known = Object.keys(routeTitles).sort((a, b) => b.length - a.length);
  return known.find((route) => path === route || path.endsWith(route)) || "/";
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
    <button class="menu-toggle" aria-label="Open menu" data-menu-toggle>☰</button>
    <nav class="primary-nav" data-primary-nav>${nav.map(([route, label]) => `<a href="#${route}" class="${active === route ? "active" : ""}">${label}</a>`).join("")}</nav>
    <a class="header-account" href="#/sign-in">Sign In</a><a class="signin" href="#/request-service">Request a quote</a>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-wrap">
    <div class="footer-brand"><img src="${ASSET}logo.png" alt="Travel To Know — Your Travel Partner"><p>Your trusted travel partner for flights, hotels, holidays, visas and Umrah services.</p><a href="mailto:traveltoknowbd@gmail.com">traveltoknowbd@gmail.com</a><a href="tel:+8801772282925">+88 01772 282925</a><a href="tel:+8801999192993">+88 01999 192993</a><a href="tel:+8801999192994">+88 01999 192994</a></div>
    <div><h3>Explore</h3><a href="#/about-us">About Us</a><a href="#/contact-us">Contact Us</a><a href="#/privacy-policy">Privacy Policy</a><a href="#/terms-and-conditions">Terms &amp; Conditions</a><a href="#/refund-policy">Refund &amp; Cancellation</a><a href="#/blog">Blog</a><a href="#/payment-method">Payment Method</a></div>
    <div><h3>Services</h3><a href="#/flights">Flight</a><a href="#/hotels">Hotel</a><a href="#/holidays">Holiday</a><a href="#/visa">Visa</a><a href="#/umrah-packages">Umrah</a></div>
    <div><h3>Corporate Office</h3><p>28/A-2 Toyenbee Circular Road (1st Floor), Motijheel C/A, Dhaka-1000, Bangladesh.</p><p>Sat–Thu, 10:00 AM – 8:00 PM</p><div class="socials"><a href="https://facebook.com/Travel2know0" target="_blank" rel="noreferrer">f</a><a href="https://youtube.com/Travel2know0" target="_blank" rel="noreferrer">▶</a><a href="https://instagram.com/Travel2know0" target="_blank" rel="noreferrer">◎</a></div></div>
  </div><div class="footer-bottom"><span>© 2026 Travel To Know. All rights reserved.</span><span>Some travel links may be affiliate links; prices and booking terms are set by the supplier.</span><span>Designed &amp; Developed by RegTech Nexus AI</span></div></footer>`;
}

function serviceTabMarkup(active) {
  return `<div class="service-tabs">${serviceTabs.map(([route, icon, label]) => route === "umrah-packages" ? `<a class="service-tab ${active === route ? "active" : ""}" href="#/${route}"><span class="tab-icon">${icon}</span>${label}</a>` : `<button class="service-tab ${active === route ? "active" : ""}" data-service-tab="${route}"><span class="tab-icon">${icon}</span>${label}</button>`).join("")}</div>`;
}

function bookingForm(type) {
  if (type === "hotels") return `<div class="booking-card" data-form="hotels"><div class="mode-row"><span class="mode active">Stay More, Pay Less — Book Your Dream Hotel Now! 🏨💫</span></div><div class="form-grid"><div class="field"><label>CITY / HOTEL / RESORT / AREA</label><input class="input" name="hotel-destination" value="Dhaka, Bangladesh" aria-label="City, hotel, resort or area"></div><div class="field"><label>CHECK IN DATE</label><input class="date-input" name="hotel-checkin" type="date" value="2026-09-23"></div><div class="field"><label>CHECK OUT DATE</label><input class="date-input" name="hotel-checkout" type="date" value="2026-09-26"></div><div class="field"><label>ROOMS &amp; GUESTS</label><select name="hotel-rooms-guests"><option value="1|2">1 Room, 2 Guests</option><option value="2|4">2 Rooms, 4 Guests</option><option value="3|6">3 Rooms, 6 Guests</option></select></div><button class="primary-button" data-affiliate-search="hotel" data-provider="booking" type="button">Search on Booking.com</button><button class="primary-button" data-affiliate-search="hotel" data-provider="agoda" type="button">Search on Agoda</button></div></div>`;
  if (type === "holidays") return `<div class="booking-card" data-form="holidays"><div class="mode-row"><span class="mode active">Explore More, Pay Less — Book Your Dream Tour Today! 🌍✨</span></div><div class="form-grid"><div class="field"><label>SELECT YOUR TOUR DESTINATION CITY</label><select><option>Cox's Bazar — BANGLADESH</option><option>Dubai — UAE</option><option>Kuala Lumpur — MALAYSIA</option><option>Bangkok — THAILAND</option></select></div><div></div><div></div><button class="primary-button" data-demo-search="Holiday">Search Holiday</button></div></div>`;
  if (type === "visa") return `<div class="booking-card" data-form="visa"><div class="mode-row"><span class="mode active">Hassle-Free Visa Services — Apply With Us For Fast Approval! 🛂✈️</span></div><div class="form-grid"><div class="field"><label>SELECT YOUR VISA CITY</label><select><option>Select country</option><option>Singapore</option><option>Thailand</option><option>Malaysia</option><option>Vietnam</option><option>Uzbekistan</option></select></div><div class="field"><label>SELECT TRAVELER(S)</label><select><option>1 Traveler</option><option>2 Travelers</option><option>3 Travelers</option></select></div><div></div><button class="primary-button" data-demo-search="Visa">Find Visa Info</button></div></div>`;
  return `<div class="booking-card" data-form="flights"><div class="mode-row"><button class="mode active" data-flight-mode="one-way" type="button">One-way</button><button class="mode" data-flight-mode="round-trip" type="button">Round-trip</button><button class="mode" data-flight-mode="multi-city" type="button">Multi-city</button></div><div class="form-grid"><div class="field"><label>From</label><input class="input" name="flight-from" value="DAC" aria-label="Departure airport code"></div><div class="field"><label>To</label><input class="input" name="flight-to" value="CXB" aria-label="Arrival airport code"></div><div class="field"><label>Departure date</label><input class="date-input" name="flight-departure" type="date" value="2026-09-23"></div><div class="field"><label>Return date</label><input class="date-input" name="flight-return" type="date" value="2026-09-26"><span class="hint">Save more on roundtrip</span></div><div class="field"><label>TRAVELERS</label><select name="flight-travelers"><option value="1">1 Traveler</option><option value="2">2 Travelers</option><option value="3">3 Travelers</option><option value="4">4 Travelers</option></select></div><div class="field"><label>CLASS</label><select name="flight-class"><option>Economy</option><option>Premium Economy</option><option>Business</option><option>First Class</option></select></div><div></div><button class="primary-button" data-affiliate-search="flight" data-provider="booking" type="button">Search Flights</button></div></div>`;
}

function heroPage(type = "flights", activeRoute = `/${type}`) {
  const copy = { flights: ["Explore the Best Flight Options", "Uncover unbeatable offers on global travel destinations"], hotels: ["Discover Your Perfect Vacation Stay", "Discover amazing deals to destinations worldwide"], holidays: ["Discover Your Next Tour", "Discover amazing deals to destinations worldwide"], visa: ["Visa processing Services Available!", "Visa depends on your profile and financial conditions!"] }[type];
  return `${header(activeRoute, true)}<main><section class="hero"><div class="hero-inner"><div class="hero-copy"><h1>${copy[0]}</h1><p>${copy[1]}</p><div class="hero-actions"><a class="primary-button" href="#/request-service">Plan Your Next Journey</a><a class="hero-call" href="tel:+8801772282925">Call +88 01772 282925</a></div></div><div class="booking-shell">${serviceTabMarkup(type)}${bookingForm(type)}</div></div></section>${serviceLanes()}${trustStrip()}${offers()}${destinationSection()}${featuresSection()}${placesSection()}${newsletter()}</main>${footer()}`;
}

function serviceLanes() { return `<section class="section service-lanes"><div class="section-header"><h2>Travel support for the journeys that matter</h2><p>Tell us what you need. A Travel To Know specialist will review the request and respond with the next practical step.</p></div><div class="segment-grid">${serviceLaneData.map(([title, text, value], index) => `<a class="segment-card segment-${index + 1}" href="#/request-service?service=${encodeURIComponent(value)}"><span class="segment-number">0${index + 1}</span><h3>${title}</h3><p>${text}</p><span class="segment-link">Request support →</span></a>`).join("")}</div></section>`; }

function trustStrip() { return `<section class="trust-strip"><div class="trust-wrap"><div><span class="eyebrow">WHY TRAVEL TO KNOW</span><h2>Your journey. Our priority.</h2><p>Reliable travel solutions for business, leisure and journeys beyond borders—with human support when the details matter.</p></div><div class="trust-badges"><div><strong>IATA</strong><span>Accredited agency</span></div><div><strong>MoCAT</strong><span>0013575</span></div><div><strong>DBID</strong><span>717571834</span></div></div><div class="trust-actions"><a class="primary-button" href="#/request-service">Start an enquiry</a><a href="#/contact-us">View contact &amp; office details</a><a href="#/terms-and-conditions">Read refund &amp; cancellation terms</a></div></div></section>`; }

function offers() { return `<section class="section compact"><div class="section-header"><h2>Exclusive Offers</h2><p>Discover unbeatable offers that won't last long. Grab these premium deals before they're gone!</p></div><div class="empty-state">No offer found</div></section>`; }

function destinationSection() { return `<section class="section"><div class="section-header"><h2>Popular Destinations</h2><p>Click on a destination to explore exciting flight deals.</p></div><div class="destination-grid">${destinations.map(([from, to, airport, code, country, image]) => `<button class="destination-card" data-destination="${to}"><img src="${ASSET}${image}" alt="${from} to ${to}"><div class="destination-info"><h3>${from} <span>${to}</span></h3><p>${airport}</p><div class="destination-meta"><span>IATA: ${code} · ${country}</span><span class="tag">Top Pick</span></div></div></button>`).join("")}</div></section>`; }

function featuresSection() { return `<section class="section"><div class="section-header"><h2>Our Services at a Glance</h2><p>Discover a variety of features designed to enhance and simplify your travel journey.</p></div><div class="features-grid">${features.map(([icon, title, text]) => `<div class="feature"><div class="feature-icon">${icon}</div><h3>${title}</h3><p>${text}</p></div>`).join("")}</div></section>`; }

function placesSection() { return `<section class="places-section"><h2>Must-Visit Places</h2><p>Discover More About Us</p><div class="places-grid">${places.map(([title, text, image]) => `<button class="place-card" data-place="${title}"><img src="${ASSET}${image}" alt="${title}"><div class="place-copy"><h3>${title}</h3><p>${text}</p></div></button>`).join("")}</div></section>`; }

function newsletter() { return `<section class="newsletter"><h2>Join Our Travel Circle</h2><p>Get insider travel advice, sneak peeks at new destinations, and access to subscriber-only offers. Your next adventure starts in your inbox.</p><form class="newsletter-form" data-newsletter><input class="input" type="email" placeholder="you@example.com" aria-label="Email address" required><button class="primary-button" type="submit">Get Updates</button></form></section>`; }

function requestPage() {
  const selected = queryParam("service");
  const selectedOption = serviceLaneData.some(([, , value]) => value === selected) ? selected : "";
  return `${header("/request-service")}<main class="page-main request-page"><div class="request-layout"><div class="request-intro"><span class="eyebrow">TRAVEL TO KNOW · SERVICE DESK</span><h1>Tell us what you need.</h1><p>Share the essentials and our team can review your request for a tailored flight, hotel, visa, holiday, corporate, family or Umrah solution.</p><div class="support-card"><strong>Need immediate assistance?</strong><a href="tel:+8801772282925">+88 01772 282925</a><a href="tel:+8801999192993">+88 01999 192993</a><a href="tel:+8801999192994">+88 01999 192994</a><span>Sat–Thu, 10:00 AM – 8:00 PM</span></div><p class="microcopy">Service fees, refund conditions and supplier restrictions are explained before confirmation.</p></div><div class="content-card"><h2>Travel service enquiry</h2><p>Fields marked with * help us respond faster.</p><form class="lead-form" data-lead-form><label>Service needed *<select name="service" required><option value="">Select a service</option>${serviceLaneData.map(([, , value]) => `<option ${selectedOption === value ? "selected" : ""}>${value}</option>`).join("")}<option>Flight ticketing</option><option>Hotel or accommodation</option><option>Visa assistance</option><option>Holiday package</option></select></label><div class="form-two"><label>Your name *<input name="name" type="text" placeholder="Full name" required></label><label>Phone / WhatsApp *<input name="phone" type="tel" placeholder="+880" required></label></div><div class="form-two"><label>Email<input name="email" type="email" placeholder="you@example.com"></label><label>Travel date<input name="date" type="date"></label></div><div class="form-two"><label>Origin / departure city<input name="origin" type="text" placeholder="Dhaka"></label><label>Destination / route<input name="destination" type="text" placeholder="Destination or multi-city route"></label></div><div class="form-two"><label>Travellers / party size<input name="travellers" type="number" min="1" placeholder="e.g., 2"></label><label>Indicative budget<input name="budget" type="text" placeholder="Optional"></label></div><label>What should we know?<textarea name="notes" rows="5" placeholder="Dates, visa needs, baggage, hotel category, corporate requirements or other details"></textarea><button class="primary-button" type="submit">Prepare enquiry email</button><span class="required-note">Your draft stays in this browser until you choose to email it. Live CRM submission can be connected later.</span></form></div></div></main>${footer()}`;
}

function infoPage(route) {
  const pages = {
    "/contact-us": `<h1>Contact Us</h1><p class="intro">We’d love to hear from you! Whether you have a question, need assistance, or want to start planning your next journey, our team is here to help.</p><h2>Get In Touch</h2><div class="contact-row"><strong>Address</strong><span>28/A-2 Toyenbee Circular Road (1st Floor), Motijheel, Dhaka-1000, Bangladesh</span></div><div class="contact-row"><strong>MoCAT</strong><span>Certificate No.: 0013575</span></div><div class="contact-row"><strong>IATA</strong><span>Certificate No.: 42341666</span></div><div class="contact-row"><strong>DBID</strong><span>License No.: 717571834</span></div><div class="contact-row"><strong>Phone</strong><span><a class="text-link" href="tel:+8801772282925">01772 282925</a><br><a class="text-link" href="tel:+8801999192993">01999 192993</a> or <a class="text-link" href="tel:+8801999192994">01999 192994</a></span></div><div class="contact-row"><strong>Email</strong><a class="text-link" href="mailto:traveltoknowbd@gmail.com">traveltoknowbd@gmail.com</a></div><div class="contact-row"><strong>Office Hours</strong><span>Sat–Thu, 10:00 AM – 8:00 PM</span></div>`,
  };
  const official = typeof OFFICIAL_LEGAL_CONTENT === "object" ? OFFICIAL_LEGAL_CONTENT[route] : "";
  const body = official || pages[route] || `<h1>Page not found</h1><p>The requested page could not be found.</p>`;
  return `${header(route)}<main class="page-main"><div class="content-card legal-copy">${body}</div></main>${footer()}`;
}
function paymentPage() { return `${header("/payment-method")}<main class="page-main"><div class="content-card"><h1>Payment Methods</h1><p class="intro">Select a verified payment method to proceed with your transaction.</p><h2>Available Methods</h2><div class="payment-grid"><div class="payment-card"><div class="bank-icon">▣</div><h3>BRAC Bank PLC</h3><div class="type">Bank</div><dl><div><dt>Account Name</dt><dd>Travel To Know</dd></div><div><dt>Account Number</dt><dd>2060728030001</dd></div><div><dt>Branch</dt><dd>Motijheel Branch</dd></div><div><dt>Routing</dt><dd>060274247</dd></div><div><dt>SWIFT Code</dt><dd>BRAKBDDH</dd></div></dl><a href="#/payment-method" data-demo-payment>Proceed to deposit →</a></div><div class="payment-card"><div class="bank-icon">৳</div><h3>Bkash (Payment Only)</h3><div class="type">MFS</div><dl><div><dt>Account Name</dt><dd>Travel To Know</dd></div><div><dt>Account Number</dt><dd>01772282925</dd></div></dl><a href="#/payment-method" data-demo-payment>Proceed to deposit →</a></div><div class="payment-card"><div class="bank-icon">▣</div><h3>Dutch-Bangla Bank PLC</h3><div class="type">Bank</div><dl><div><dt>Account Name</dt><dd>Travel To Know</dd></div><div><dt>Account Number</dt><dd>7017100453518</dd></div><div><dt>Branch</dt><dd>Agent Banking (Foreign Exchange Branch)</dd></div><div><dt>Routing</dt><dd>090270608</dd></div><div><dt>SWIFT Code</dt><dd>DBBLBDDH</dd></div></dl><a href="#/payment-method" data-demo-payment>Proceed to deposit →</a></div></div><p class="hint" style="margin-top:24px">All payment methods should be verified with Travel To Know support before making a transfer.</p></div></main>${footer()}`; }

function blogPage() { return `${header("/blog")}<main class="page-main"><div class="content-card"><h1>Latest from Our Blog</h1><a class="blog-card" href="#/blog/corporate-travel-cost-control"><img src="${ASSET}hero.jpg" alt="Corporate travel planning"><div><h2>Corporate Travel Planning: Better Control Without Compromising Service</h2><p>A practical guide for businesses that want clearer travel requests, better itinerary planning, predictable service support and fewer avoidable travel costs.</p><div class="meta">Travel To Know · 4 min read</div></div></a></div></main>${footer()}`; }

function articlePage() { return `${header("/blog")}<main class="page-main"><article class="content-card"><div class="article-head"><h1>Corporate Travel Planning: Better Control Without Compromising Service</h1><div class="meta"><span>Travel To Know</span><span>Travel guidance</span><span>4 min read</span></div></div><img class="article-cover" src="${ASSET}hero.jpg" alt="Corporate travel planning"><div class="article-body"><p><strong>Business travel works best when the journey is planned before the ticket is purchased.</strong></p><p class="quote">A good corporate travel process balances traveller needs, cost visibility, timing and dependable support.</p><p>Start with a simple travel request: traveller name, route, date, purpose, preferred timing, baggage needs and approval status. This gives the travel desk enough context to compare practical options instead of focusing only on the lowest displayed fare.</p><h2>Five practical habits</h2><ul><li>Group repeat routes and frequent traveller needs.</li><li>Confirm the business purpose, timing and flexibility before booking.</li><li>Review baggage, change, cancellation and refund conditions in advance.</li><li>Keep one clear record of the request, confirmation and service fees.</li><li>Use human support for complex, disrupted or multi-city journeys.</li></ul><h2>Travel with confidence</h2><p>Travel To Know supports business, family, leisure and religious journeys with a service-led approach. The objective is not simply to issue a ticket—it is to help the traveller understand the available option and the conditions attached to it.</p><p><a class="text-link" href="#/request-service">Request corporate travel support →</a></p></div></article></main>${footer()}`; }

function authPage(route) {
  if (route === "/forgot-password") return `${header(route)}<main class="auth-layout"><div class="auth-art"><div class="plane">✈</div><h2>Welcome Back</h2><p>Sign in to continue your journey.</p></div><div class="auth-card"><h2>Forgot password?</h2><p>Enter your email and we’ll help you recover your account.</p><form class="auth-form" data-forgot-form><label>Email<input class="input" type="email" placeholder="Provide your email" required></label><button class="primary-button">Send OTP to Email</button></form><p class="form-foot">Already have an account? <a href="#/sign-in">Login here</a></p></div></main>${footer()}`;
  if (route === "/sing-up") return `${header(route)}<main class="auth-layout"><div class="auth-art"><div class="plane">✈</div><h2>Welcome!</h2><p>Create your account to start your adventure with us.</p></div><div class="auth-card"><h2>Open a new account</h2><p>Set up your Travel To Know account.</p><form class="auth-form" data-signup-form><label>Full Name<input class="input" type="text" placeholder="Your full name" required></label><label>Email Address<input class="input" type="email" placeholder="you@example.com" required></label><label>Password<input class="input" type="password" placeholder="Enter your password" required></label><label>Gender<select><option>Male</option><option>Female</option><option>Other</option></select></label><label>Phone Number<input class="input" type="tel" placeholder="Your phone number" required></label><button class="primary-button">Sign up</button></form><p class="form-foot">Already have an account? <a href="#/sign-in">Login here</a></p></div></main>${footer()}`;
  return `${header(route)}<main class="auth-layout"><div class="auth-art"><div class="plane">✈</div><h2>Welcome Back</h2><p>Let’s continue your journey. Sign in securely to access your account.</p></div><div class="auth-card"><h2>Sign in to your account</h2><p>Use your account details to continue.</p><form class="auth-form" data-login-form><label>Email Address<input class="input" type="email" placeholder="Provide your email" required></label><label>Password<input class="input" type="password" placeholder="Provide your password" required></label><div class="form-between"><span></span><a href="#/forgot-password">Forgot your password?</a></div><button class="primary-button">Log in</button></form><p class="form-foot">Not a member? <a href="#/sing-up">Create an account</a></p></div></main>${footer()}`;
}

function umrahPage() { return `${header("/umrah-packages")}<main class="page-main"><div class="content-card"><h1>Umrah Packages 2026-2027 from Bangladesh</h1><div class="empty-state">No package found</div><p class="hint">Contact our team for the latest verified package availability, dates and inclusions.</p></div></main>${footer()}`; }

function render() {
  const route = routeFromLocation();
  document.title = routeTitles[route] || routeTitles["/"];
  const app = document.getElementById("app");
  if (["/", "/flights", "/hotels", "/holidays", "/visa"].includes(route)) app.innerHTML = heroPage(route === "/" ? "flights" : route.slice(1), route);
  else if (["/about-us", "/contact-us", "/privacy-policy", "/terms-and-conditions", "/refund-policy"].includes(route)) app.innerHTML = infoPage(route);
  else if (route === "/payment-method") app.innerHTML = paymentPage();
  else if (route === "/blog") app.innerHTML = blogPage();
  else if (route === "/blog/corporate-travel-cost-control") app.innerHTML = articlePage();
  else if (["/sign-in", "/sing-up", "/forgot-password"].includes(route)) app.innerHTML = authPage(route);
  else if (route === "/umrah-packages") app.innerHTML = umrahPage();
  else if (route === "/request-service") app.innerHTML = requestPage();
  else app.innerHTML = infoPage("/missing");
  bindInteractions();
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div"); node.className = "toast"; node.textContent = message; document.body.appendChild(node);
  setTimeout(() => node.remove(), 4200);
}

function showModal(title, message) {
  document.querySelector(".modal-backdrop")?.remove();
  const backdrop = document.createElement("div"); backdrop.className = "modal-backdrop";
  const body = String(message).includes("<") ? message : `<p>${message}</p>`;
  backdrop.innerHTML = `<div class="modal"><button data-close-modal aria-label="Close">×</button><h2>${title}</h2>${body}<button data-close-modal>Close</button></div>`;
  document.body.appendChild(backdrop);
  backdrop.addEventListener("click", (event) => { if (event.target === backdrop || event.target.closest("[data-close-modal]")) backdrop.remove(); });
}

function bindInteractions() {
  document.querySelector("[data-dismiss-announcement]")?.addEventListener("click", (event) => { event.target.closest(".announcement")?.remove(); });
  document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => document.querySelector("[data-primary-nav]")?.classList.toggle("open"));
  document.querySelectorAll("[data-service-tab]").forEach((button) => button.addEventListener("click", () => go(`/${button.dataset.serviceTab}`)));
  document.querySelectorAll("[data-affiliate-search]").forEach((button) => button.addEventListener("click", () => {
    const card = button.closest("[data-form]");
    const provider = button.dataset.provider;
    const type = button.dataset.affiliateSearch;
    if (!card) return;
    if (type === "hotel") {
      const [rooms, adults] = (card.querySelector("[name=hotel-rooms-guests]")?.value || "1|2").split("|");
      const params = {
        destination: card.querySelector("[name=hotel-destination]")?.value || "Dhaka, Bangladesh",
        checkIn: card.querySelector("[name=hotel-checkin]")?.value || "",
        checkOut: card.querySelector("[name=hotel-checkout]")?.value || "",
        rooms, adults
      };
      const url = provider === "agoda" ? agodaUrl(params) : bookingUrl(params);
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    const from = card.querySelector("[name=flight-from]")?.value || "DAC";
    const to = card.querySelector("[name=flight-to]")?.value || "CXB";
    const departure = card.querySelector("[name=flight-departure]")?.value || "";
    const ret = card.querySelector("[name=flight-return]")?.value || "";
    const adults = card.querySelector("[name=flight-travelers]")?.value || "1";
    window.open(bookingUrl({ flight: true }), "_blank", "noopener,noreferrer");
  }));
  document.querySelectorAll("[data-destination], [data-place]").forEach((button) => button.addEventListener("click", () => showModal(button.dataset.destination || button.dataset.place, "Destination detail is ready for the live travel API or your own package catalogue.")));
  document.querySelectorAll("[data-demo-payment]").forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); showModal("Payment verification", "Please verify the current account details with Travel To Know support before making a transfer."); }));
  document.querySelector("[data-newsletter]")?.addEventListener("submit", (event) => { event.preventDefault(); toast("Thanks — newsletter subscription is ready for backend integration."); event.target.reset(); });
  document.querySelector("[data-lead-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());
    localStorage.setItem("travelToKnowLeadDraft", JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
    const subject = encodeURIComponent(`Travel To Know enquiry — ${data.service || "Travel service"}`);
    const body = encodeURIComponent([`Service: ${data.service || ""}`, `Name: ${data.name || ""}`, `Phone / WhatsApp: ${data.phone || ""}`, `Email: ${data.email || ""}`, `Travel date: ${data.date || ""}`, `Origin: ${data.origin || ""}`, `Destination / route: ${data.destination || ""}`, `Travellers: ${data.travellers || ""}`, `Budget: ${data.budget || ""}`, `Notes: ${data.notes || ""}`].join("\n"));
    showModal("Enquiry prepared", `<p>Your enquiry has been saved as a local draft. Use the button below to open your email client and send it to Travel To Know.</p><p><a class="primary-button modal-mail" href="mailto:traveltoknowbd@gmail.com?subject=${subject}&body=${body}">Open email draft</a></p>`);
  });
  document.querySelector("[data-login-form]")?.addEventListener("submit", (event) => { event.preventDefault(); showModal("Demo sign-in", "Authentication is not connected in this static GitHub Pages build. Add your backend auth endpoint to activate it."); });
  document.querySelector("[data-signup-form]")?.addEventListener("submit", (event) => { event.preventDefault(); showModal("Demo sign-up", "Account creation is not connected in this static build. Add your backend auth endpoint to activate it."); });
  document.querySelector("[data-forgot-form]")?.addEventListener("submit", (event) => { event.preventDefault(); showModal("Demo password recovery", "OTP delivery requires a secure backend email/SMS service."); });
  document.querySelectorAll("[data-flight-mode]").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll("[data-flight-mode]").forEach((item) => item.classList.remove("active")); button.classList.add("active"); toast(`${button.textContent} mode selected.`); }));
}

window.addEventListener("hashchange", render);
window.addEventListener("popstate", render);
render();
