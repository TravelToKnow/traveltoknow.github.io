# Travel To Know — Footer Route Scroll Fix

Updated `app.js` so that when a user taps any footer Explore/Services link, the SPA renders the selected page and then explicitly resets both the window and document scroll positions to the very top.

This fixes the issue where the new page could open while retaining the previous page's scroll position.

## Install
Replace the current `app.js` in the GitHub Pages repository with this version.
