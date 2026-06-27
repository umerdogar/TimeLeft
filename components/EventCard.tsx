import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Event } from "@appTypes";
import { useRouter } from "expo-router";

type Props = {
  event: Event;
  onPress: (event: Event) => void;
};

export function EventCard({ event }: { event: Event }) {
  const spotsLeft = event.capacity - event.booked;
  const router = useRouter();
  const fillPercent =
    event.capacity > 0 ? (event.booked / event.capacity) * 100 : 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/event/${event.id}`)}
    >
      <View style={styles.header}>
        <Text style={styles.type}>{event.type.toLocaleUpperCase()}</Text>
        <Text
          style={[
            styles.status,
            event.status === "live"
              ? styles.statusLive
              : event.status === "past"
                ? styles.statusPast
                : styles.statusUpcoming,
          ]}
        >
          {event.status}
        </Text>
      </View>

      <Text style={styles.location}>
        {event.zone.name} · {event.zone.city.name},{" "}
        {event.zone.city.country.name}
      </Text>

      <Text style={styles.date}>{new Date(event.date).toDateString()}</Text>

      {/* {event.status !== "past" && (
        <Text style={spotsLeft > 0 ? styles.spotsGreen : styles.spotsRed}>
          {spotsLeft > 0
            ? `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`
            : "Sold out"}
        </Text>
      )} */}
      {event.status !== "past" && (
        <View style={styles.availability}>
          {/* Popularity bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${fillPercent}%`,
                  backgroundColor:
                    spotsLeft === 0
                      ? "#FF6B6B"
                      : fillPercent >= 90
                        ? "#F59E0B"
                        : "#16A34A",
                },
              ]}
            />
          </View>
          {/* Text row */}
          <Text style={styles.meta}>
            {event.booked}/{event.capacity} booked ·{" "}
            <Text style={spotsLeft > 0 ? styles.spotsGreen : styles.spotsRed}>
              {spotsLeft > 0 ? `${spotsLeft} spots left` : "Sold out"}
            </Text>
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    gap: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A2E",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF6B6B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  location: {
    fontSize: 13,
    color: "#8C8C9E",
  },
  date: {
    fontSize: 13,
    color: "#8C8C9E",
  },
  spotsGreen: {
    fontSize: 13,
    fontWeight: "600",
    color: "#16A34A",
  },
  spotsRed: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FF6B6B",
  },

  statusUpcoming: {
    color: "#1D4ED8",
  },
  statusLive: {
    color: "#16A34A",
  },
  statusPast: {
    color: "#8C8C9E",
  },
  availability: {
    gap: 6,
    marginTop: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#F2F2F7",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  meta: {
    fontSize: 13,
    color: "#8C8C9E",
  },
});
