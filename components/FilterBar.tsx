import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { EventStatus } from "@appTypes";
import { SORT_OPTIONS, SortOption } from "@/src/hooks/useEventFilter";

const STATUSES: EventStatus[] = ["upcoming", "live", "past"];

type Props = {
  selectedStatuses: EventStatus[];
  selectedCities: string[];
  selectedTypes: string[];
  cities: string[];
  types: string[];
  onStatusToggle: (status: EventStatus) => void;
  onCityToggle: (city: string) => void;
  onTypeToggle: (type: string) => void;
  onReset: () => void;
  onClose: () => void;
  filteredCount: number;
  hasActiveFilters: boolean;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

export function FilterBar({
  selectedStatuses,
  selectedCities,
  selectedTypes,
  cities,
  types,
  onStatusToggle,
  onCityToggle,
  onTypeToggle,
  onReset,
  filteredCount,
  onClose,
  hasActiveFilters,
  sort,
  onSortChange,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.filterContainer}>
        <View style={styles.filterSpacer} />
        <Text style={styles.filterTitle}>Sort & Filters</Text>
        {hasActiveFilters ? (
          <TouchableOpacity onPress={onReset} style={styles.reset}>
            <Text style={styles.resetText}>Clear</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.filterSpacer} />
        )}
      </View>

      <View>
        <Text style={styles.filterHeading}>When</Text>
        <View style={styles.row}>
          {STATUSES.map((status) => {
            const isActive = selectedStatuses.includes(status);
            return (
              <TouchableOpacity
                key={status}
                style={[styles.pill, isActive && styles.pillActive]}
                onPress={() => onStatusToggle(status)}
              >
                <Text
                  style={[styles.pillText, isActive && styles.pillTextActive]}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={styles.filterHeading}>City</Text>
        <View style={styles.row}>
          {cities.map((city) => {
            const isActive = selectedCities.includes(city);
            return (
              <TouchableOpacity
                key={city}
                style={[styles.pill, isActive && styles.pillActive]}
                onPress={() => onCityToggle(city)}
              >
                <Text
                  style={[styles.pillText, isActive && styles.pillTextActive]}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={styles.filterHeading}>Type</Text>
        <View style={styles.row}>
          {types.map((type) => {
            const isActive = selectedTypes.includes(type);
            return (
              <TouchableOpacity
                key={type}
                style={[styles.pill, isActive && styles.pillActive]}
                onPress={() => onTypeToggle(type)}
              >
                <Text
                  style={[styles.pillText, isActive && styles.pillTextActive]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={styles.filterHeading}>Sort by</Text>
        <View style={styles.row}>
          {SORT_OPTIONS.map(({ label, value }) => {
            const isActive = sort === value;
            return (
              <TouchableOpacity
                key={value}
                style={[styles.pill, isActive && styles.pillActive]}
                onPress={() => onSortChange(value)}
              >
                <Text
                  style={[styles.pillText, isActive && styles.pillTextActive]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.resultsBtn} onPress={onClose}>
        <Text style={styles.resultsBtnText}>Show {filteredCount} events</Text>
      </TouchableOpacity>
    </View>
  );
}

// styles unchanged...

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
    borderBottomColor: "#F2F2F7",
    paddingHorizontal: 16,
  },
  row: {
    gap: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    alignSelf: "flex-start",
  },
  pillActive: {
    backgroundColor: "#1D4ED8",
  },
  pillText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#8C8C9E",
  },
  pillTextActive: {
    color: "#fff",
  },
  reset: {
    paddingHorizontal: 16,
  },
  resetText: {
    fontSize: 13,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  filterTitle: {
    fontSize: 18,
    color: "#00000",
    fontWeight: "700",
    alignSelf: "center",
  },
  filterHeading: {
    fontSize: 16,
    color: "#00000",
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 12,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterSpacer: {
    width: 60,
  },
  resultsBtn: {
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
    marginBottom: 8,
  },
  resultsBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
