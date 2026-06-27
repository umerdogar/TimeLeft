import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  type: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A2E",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  status_upcoming: { backgroundColor: "#EFF6FF" },
  status_live: { backgroundColor: "#F0FDF4" },
  status_past: { backgroundColor: "#F5F5F5" },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statusText_upcoming: { color: "#2563EB" },
  statusText_live: { color: "#16A34A" },
  statusText_past: { color: "#8C8C9E" },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8C8C9E",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1A1A2E",
  },
  subValue: {
    fontSize: 14,
    color: "#8C8C9E",
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#F2F2F7",
    borderRadius: 3,
    marginVertical: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1D4ED8",
    borderRadius: 3,
  },
  availabilityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spotsGreen: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16A34A",
  },
  spotsRed: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6B6B",
  },
});
