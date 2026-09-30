/* Travel To Know affiliate configuration.
 * Booking AID is intentionally left as a placeholder until the approved AID is supplied.
 * Agoda CID is the currently supplied CID.
 * Amazon link is the existing Travel To Know Associates link.
 * The application validates these hosts before constructing affiliate redirects.
 */
window.TRAVEL_AFFILIATE_CONFIG = {
  preferredProvider: "agoda",
  booking: {
    aid: "YOUR_BOOKING_AID",
    base: "https://www.booking.com",
    allowedHost: "www.booking.com",
    destinationPath: "/searchresults.html"
  },
  agoda: {
    cid: "8085912",
    base: "https://www.agoda.com",
    allowedHost: "www.agoda.com",
    destinationPath: "/search",
    flightPath: "/flights"
  },
  amazon: {
    url: "https://amzn.to/4AUcpLI",
    allowedHost: "amzn.to",
    trackingId: "traveltoknow2-20"
  }
};
