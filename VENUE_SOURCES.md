# Venue data sources

Verified on 7 September 2026 against the official Urban Sports Club venue pages linked in `venues.js`.

- The displayed venue name, activity summary, address and hero photograph come from each linked venue page.
- The “See more venues” destination uses Urban Sports Club’s official city directory for Berlin, Hamburg, Munich or Cologne.
- The prototype deliberately avoids prices, live opening times and guaranteed access because these can change by plan and date.
- Location detection runs only after the visitor presses the button. It compares the browser-provided coordinates with the four demo city centres, does not transmit or store them, and falls back to manual selection.
