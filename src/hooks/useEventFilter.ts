import { useState, useMemo } from "react";
import { Event, EventStatus } from "@appTypes";
import Fuse from "fuse.js";

type Filters = {
  statuses: EventStatus[];
  cities: string[];
  types: string[];
};

export type SortOption =
  | "date_asc"
  | "date_desc"
  | "capacity_desc"
  | "capacity_asc";

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Soonest first", value: "date_asc" },
  { label: "Latest first", value: "date_desc" },
  { label: "Largest", value: "capacity_desc" },
  { label: "Smallest", value: "capacity_asc" },
];
const DEFAULT_SORT: SortOption | null = null;

const DEFAULT_FILTERS: Filters = {
  statuses: [],
  cities: [],
  types: [],
};

export const useEventFilters = (
  events: Event[] = [],
  onFilterChange?: () => void,
) => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(events, {
      keys: ["type", "zone.name", "zone.city.name"],
      threshold: 0.3, // 0 = exact, 1 = match anything
      ignoreLocation: true,
      ignoreFieldNorm: true,
    });
  }, [events]);

  const availableCities = useMemo(() => {
    const unique = new Set(events.map((e) => e.zone.city.name));
    return Array.from(unique);
  }, [events]);

  const availableTypes = useMemo(() => {
    const unique = new Set(events.map((e) => e.type));
    return Array.from(unique);
  }, [events]);

  const filteredEvents = useMemo(() => {
    let result = events;
    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map((r) => r.item);
    }

    const filtered = result.filter((event) => {
      if (
        filters.statuses.length > 0 &&
        !filters.statuses.includes(event.status)
      )
        return false;
      if (
        filters.cities.length > 0 &&
        !filters.cities.includes(event.zone.city.name)
      )
        return false;
      if (filters.types.length > 0 && !filters.types.includes(event.type))
        return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (!sort) return 0; // no sort — keep original order
      switch (sort) {
        case "date_asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date_desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "capacity_desc":
          return b.capacity - a.capacity;
        case "capacity_asc":
          return a.capacity - b.capacity;
        default:
          return 0;
      }
    });
  }, [events, filters, sort, searchQuery, setSearchQuery]); // ← add `sort` dependency

  const toggleStatus = (status: EventStatus) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));
    onFilterChange?.();
  };

  const toggleCity = (city: string) => {
    setFilters((prev) => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter((c) => c !== city)
        : [...prev.cities, city],
    }));
    onFilterChange?.();
  };

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
    onFilterChange?.();
  };
  const changeSort = (option: SortOption) => {
    setSort(option);
    onFilterChange?.();
  };
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSort(null);
    onFilterChange?.();
  };

  const activeFilterCount =
    filters.statuses.length + filters.cities.length + filters.types.length;

  const hasActiveFilters = activeFilterCount > 0 || sort !== null;

  return {
    filters,
    sort,
    filteredEvents,
    availableCities,
    availableTypes,
    toggleStatus,
    toggleCity,
    toggleType,
    changeSort,
    resetFilters,
    activeFilterCount,
    hasActiveFilters,
    searchQuery,
    setSearchQuery,
  };
};
