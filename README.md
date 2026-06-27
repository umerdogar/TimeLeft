# TimeLeft — Event Discovery App

A React Native + Expo app for browsing and discovering social dining events. Built as part of a technical assessment.

**AI Tool Conversation:** https://claude.ai/share/fad68431-0131-4d86-aaec-e8ac62188f93

---

## How to Run

**Prerequisites**

- Node.js 20+
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go on a physical device)

**Steps**

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/TimeLeft.git
cd TimeLeft

# Install dependencies
npm install

# Start the app
npx expo start
```

Press `i` for iOS simulator, `a` for Android, or scan the QR code with Expo Go.

**Run tests**

```bash
npx jest
```

---

## Decisions & Trade-offs

**TanStack Query**
Used for data fetching due to its built-in caching, background refetching, and stale-time configuration. This means events are cached for 5 minutes and users don't see unnecessary loading states on re-visits. The alternative would have been `useEffect` + `useState`, which would require manual cache and loading state management.

**FlashList over FlatList**
FlashList (by Shopify) is significantly faster than FlatList for long lists due to its recycling mechanism. Given the brief mentioned some cities can have over 1,000 events, this was an important choice. Trade-off is a slightly more complex setup and the required `estimatedItemSize` prop.

**Fuse.js for search**
Used for fuzzy search so users can search by type, zone, or city without worrying about exact spelling, capitalisation, or accents — as specified in the brief. Trade-off is an additional dependency, but it's lightweight and purpose-built for this.

**Feature-based folder structure**
Event-related logic (types, hooks, API, components) lives under `src/features/events`. This keeps related code co-located and makes it easy to scale. Trade-off is slightly more nesting than a flat structure.

**Bottom sheet for filters**
Filters are tucked into a `@gorhom/bottom-sheet` to keep the main screen clean and uncluttered. This gives a native feel and allows for a richer filter UI without sacrificing screen space.

**Multiple filter selection**
Filters support multi-select rather than single-select, which feels more natural when browsing — a user may want to see both `upcoming` and `live` events at the same time.

---

## What I Would Improve With More Time

- **UI polish** — more visual hierarchy on the event card, better empty states, loading skeletons instead of a blank screen
- **More sort options** — sort by popularity (most booked), proximity if location is available, or personalised recommendations
- **Pagination or infinite scroll** — the current implementation loads all events at once; for 1,000+ events, paginated fetching would be better for performance
- **Error states** — currently returns `null` on error; a proper error screen with a retry button would be more user-friendly
- **Booking flow** — the detail screen shows availability but has no booking action; this would be the natural next step
- **More tests** — unit tests for `StatsBar`, `FilterBar`, and `EventDetailScreen`; integration tests for the full filter + search flow; E2E tests with Detox

---

## Ambiguities in the Brief

- **Filter options** — the brief said "filter and sort the list" but didn't specify which fields. I chose status, city, and event type as the most useful dimensions based on the data shape.
- **Sort metrics** — not specified. I implemented date (soonest/latest) and capacity (largest/smallest) as the most meaningful options for a dining discovery app.
- **Stats bar scope** — "high-level stats" was open-ended. I interpreted this as a summary of event counts by status (upcoming, live, past) since that's the most useful availability overview at a glance.
- **Design** — no visual spec was provided so I used a clean, modern palette with coral accents suited to a social dining product.

---

## Notes

- Testing covers the core functionality: filter logic (`useEventFilters`), event card rendering (`EventCard`), and the events list screen (`EventsList`). These represent the highest-value paths to test given the time constraint. More tests would be added with more time.
- CI/CD is set up via GitHub Actions and runs the test suite on every push to `main`.
- The app uses Expo Router for file-based navigation.
- This was an enjoyable challenge — the open-ended nature of the brief made it feel close to a real product decision-making process.
