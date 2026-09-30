/* Travel To Know API client scaffold. No provider secrets are stored in the browser. */
(function () {
  const cfg = window.TRAVEL_API_CONFIG || { baseUrl: "", ready: false, endpoints: {} };
  function url(path) { return new URL(path || "", cfg.baseUrl || window.location.origin).toString(); }
  async function request(path, options = {}) {
    if (!cfg.ready || !cfg.baseUrl) throw new Error("Travel To Know API is not connected yet.");
    const response = await fetch(url(path), { ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    return response.json();
  }
  window.TravelToKnowAPI = {
    config: cfg,
    searchHotels: (payload) => request(cfg.endpoints.hotelsSearch, { method: "POST", body: JSON.stringify(payload || {}) }),
    getHotelDetails: (payload) => request(cfg.endpoints.hotelDetails, { method: "POST", body: JSON.stringify(payload || {}) }),
    getBookingRedirect: (payload) => request(cfg.endpoints.bookingRedirect, { method: "POST", body: JSON.stringify(payload || {}) }),
    getAgodaRedirect: (payload) => request(cfg.endpoints.agodaRedirect, { method: "POST", body: JSON.stringify(payload || {}) })
  };
})();
