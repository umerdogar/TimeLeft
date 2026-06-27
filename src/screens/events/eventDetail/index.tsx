import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Event } from "@appTypes";
import { styles } from "./styles";
import { HeaderBar } from "@/components";

type Props = {
  event: Event;
};

export function EventDetailScreen({ event }: Props) {
  const spotsLeft = event.capacity - event.booked;
  const fillPercent = Math.round((event.booked / event.capacity) * 100);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <HeaderBar title="Event Details" back={true} />
        <View style={styles.header}>
          <Text style={styles.type}>{event.type}</Text>
          <View style={[styles.statusBadge, styles[`status_${event.status}`]]}>
            <Text
              style={[styles.statusText, styles[`statusText_${event.status}`]]}
            >
              {event.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.value}>{event.zone.name}</Text>
          <Text style={styles.subValue}>
            {event.zone.city.name}, {event.zone.city.country.name}
          </Text>
        </View>

        {/* Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <Text style={styles.value}>
            {new Date(event.date).toDateString()}
          </Text>
          <Text style={styles.subValue}>
            {new Date(event.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        {/* Availability */}
        {event.status !== "past" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability</Text>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: `${fillPercent}%` }]}
              />
            </View>
            <View style={styles.availabilityRow}>
              <Text style={styles.subValue}>{event.booked} booked</Text>
              <Text style={spotsLeft > 0 ? styles.spotsGreen : styles.spotsRed}>
                {spotsLeft > 0
                  ? `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} left`
                  : "Fully booked"}
              </Text>
            </View>
          </View>
        )}

        {/* Capacity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Capacity</Text>
          <Text style={styles.value}>{event.capacity} people</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
