import { View, Text, StyleSheet } from "react-native";
import { useMemo } from "react";
import { Event } from "@appTypes";

type Props = {
  events: Event[];
};

export function StatsBar({ events }: Props) {
  const summary = useMemo(
    () => ({
      upcoming: events.filter((e) => e.status === "upcoming").length,
      live: events.filter((e) => e.status === "live").length,
      past: events.filter((e) => e.status === "past").length,
    }),
    [events],
  );

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={[styles.count, styles.upcoming]}>{summary.upcoming}</Text>
        <Text style={styles.label}>Upcoming</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <Text style={[styles.count, styles.live]}>{summary.live}</Text>
        <Text style={styles.label}>Live</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <Text style={[styles.count, styles.past]}>{summary.past}</Text>
        <Text style={styles.label}>Past</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#AE8625",
    borderRadius: 14,
    marginHorizontal: 16,
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  count: {
    fontSize: 20,
    fontWeight: "700",
  },
  label: {
    fontSize: 12,
    color: "#8C8C9E",
    fontWeight: "500",
  },
  divider: {
    width: 1,
    backgroundColor: "#F2F2F7",
  },
  upcoming: { color: "#1D4ED8" },
  live: { color: "#16A34A" },
  past: { color: "#8C8C9E" },
});
