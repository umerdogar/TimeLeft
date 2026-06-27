import { renderHook, act } from "@testing-library/react-native";
import { useEventFilters } from "@hooks/useEventFilter";
import { Event } from "@appTypes";

const mockEvents: Event[] = [
  {
    id: "evt_1",
    type: "Coffee",
    date: "2025-12-30T16:30:00Z",
    zone: {
      id: 1,
      name: "11th",
      city: { id: 1, name: "Paris", country: { id: 1, name: "France" } },
    },
    booked: 40,
    capacity: 50,
    status: "upcoming",
  },
  {
    id: "evt_2",
    type: "Dinner",
    date: "2025-11-15T19:00:00Z",
    zone: {
      id: 2,
      name: "Shoreditch",
      city: { id: 2, name: "London", country: { id: 2, name: "UK" } },
    },
    booked: 20,
    capacity: 30,
    status: "live",
  },
  {
    id: "evt_3",
    type: "Coffee",
    date: "2025-10-01T10:00:00Z",
    zone: {
      id: 3,
      name: "Mitte",
      city: { id: 3, name: "Berlin", country: { id: 3, name: "Germany" } },
    },
    booked: 15,
    capacity: 20,
    status: "past",
  },
];

describe("useEventFilters", () => {
  describe("initial state", () => {
    it("returns all events with no filters applied", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      expect(result.current.filteredEvents).toHaveLength(3);
    });

    it("returns empty array when no events passed", () => {
      const { result } = renderHook(() => useEventFilters([]));
      expect(result.current.filteredEvents).toHaveLength(0);
    });

    it("hasActiveFilters is false by default", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      expect(result.current.hasActiveFilters).toBe(false);
    });
  });

  describe("status filter", () => {
    it("filters by single status", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.toggleStatus("upcoming"));
      expect(result.current.filteredEvents).toHaveLength(1);
      expect(result.current.filteredEvents[0].id).toBe("evt_1");
    });

    it("filters by multiple statuses", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => {
        result.current.toggleStatus("upcoming");
        result.current.toggleStatus("live");
      });
      expect(result.current.filteredEvents).toHaveLength(2);
    });

    it("toggles status off when selected again", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.toggleStatus("upcoming"));
      act(() => result.current.toggleStatus("upcoming"));
      expect(result.current.filteredEvents).toHaveLength(3);
    });
  });

  describe("city filter", () => {
    it("filters by city", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.toggleCity("Paris"));
      expect(result.current.filteredEvents).toHaveLength(1);
      expect(result.current.filteredEvents[0].id).toBe("evt_1");
    });

    it("filters by multiple cities", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => {
        result.current.toggleCity("Paris");
        result.current.toggleCity("London");
      });
      expect(result.current.filteredEvents).toHaveLength(2);
    });
  });

  describe("type filter", () => {
    it("filters by event type", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.toggleType("Coffee"));
      expect(result.current.filteredEvents).toHaveLength(2);
    });

    it("filters by multiple types", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => {
        result.current.toggleType("Coffee");
        result.current.toggleType("Dinner");
      });
      expect(result.current.filteredEvents).toHaveLength(3);
    });
  });

  describe("combined filters", () => {
    it("applies status and city together", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => {
        result.current.toggleStatus("upcoming");
        result.current.toggleCity("London");
      });
      expect(result.current.filteredEvents).toHaveLength(0);
    });

    it("applies status and type together", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => {
        result.current.toggleStatus("past");
        result.current.toggleType("Coffee");
      });
      expect(result.current.filteredEvents).toHaveLength(1);
      expect(result.current.filteredEvents[0].id).toBe("evt_3");
    });
  });

  describe("sort", () => {
    it("sorts by date ascending", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.changeSort("date_asc"));
      const dates = result.current.filteredEvents.map((e) =>
        new Date(e.date).getTime(),
      );
      expect(dates).toEqual([...dates].sort((a, b) => a - b));
    });

    it("sorts by date descending", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.changeSort("date_desc"));
      const dates = result.current.filteredEvents.map((e) =>
        new Date(e.date).getTime(),
      );
      expect(dates).toEqual([...dates].sort((a, b) => b - a));
    });

    it("sorts by capacity descending", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.changeSort("capacity_desc"));
      const capacities = result.current.filteredEvents.map((e) => e.capacity);
      expect(capacities).toEqual([...capacities].sort((a, b) => b - a));
    });

    it("sorts by capacity ascending", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.changeSort("capacity_asc"));
      const capacities = result.current.filteredEvents.map((e) => e.capacity);
      expect(capacities).toEqual([...capacities].sort((a, b) => a - b));
    });
  });

  describe("search", () => {
    it("searches by event type", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.setSearchQuery("coffee"));
      expect(
        result.current.filteredEvents.every((e) => e.type === "Coffee"),
      ).toBe(true);
    });

    it("searches by city", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.setSearchQuery("paris"));
      expect(result.current.filteredEvents[0].zone.city.name).toBe("Paris");
    });

    it("searches case insensitively", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.setSearchQuery("LONDON"));
      expect(result.current.filteredEvents[0].zone.city.name).toBe("London");
    });

    it("searches by zone name", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => result.current.setSearchQuery("shoreditch"));
      expect(result.current.filteredEvents[0].id).toBe("evt_2");
    });
  });

  describe("reset", () => {
    it("resets all filters and sort", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => {
        result.current.toggleStatus("upcoming");
        result.current.toggleCity("Paris");
        result.current.changeSort("date_desc");
      });
      act(() => result.current.resetFilters());
      expect(result.current.filteredEvents).toHaveLength(3);
      expect(result.current.hasActiveFilters).toBe(false);
      expect(result.current.sort).toBeNull();
    });

    it("activeFilterCount is 0 after reset", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      act(() => {
        result.current.toggleStatus("live");
        result.current.toggleType("Dinner");
      });
      act(() => result.current.resetFilters());
      expect(result.current.activeFilterCount).toBe(0);
    });
  });

  describe("derived data", () => {
    it("returns unique cities", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      expect(result.current.availableCities).toEqual([
        "Paris",
        "London",
        "Berlin",
      ]);
    });

    it("returns unique types", () => {
      const { result } = renderHook(() => useEventFilters(mockEvents));
      expect(result.current.availableTypes).toEqual(["Coffee", "Dinner"]);
    });
  });
});
