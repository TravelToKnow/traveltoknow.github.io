/* Travel To Know API connector configuration.
 * Keep API keys/secrets on your backend. Only public endpoint URLs belong here.
 * Replace baseUrl and routes when the real provider/backend APIs are supplied.
 */
window.TRAVEL_API_CONFIG = {
  baseUrl: "",
  ready: false,
  endpoints: {
    hotelsSearch: "/api/hotels/search",
    hotelDetails: "/api/hotels/details",
    flightsSearch: "/api/flights/search",
    bookingRedirect: "/api/affiliates/booking",
    agodaRedirect: "/api/affiliates/agoda"
  }
};
