import { useLocalSearchParams, Stack } from "expo-router";
import { useEvents } from "@/src/hooks";
import { View, Text } from "react-native";
import { EventDetailScreen } from "@/src/screens/events/eventDetail";

export default function EventDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useEvents();

  const event = data?.find((e) => e.id === id);

  if (!event) return <Text>Event not found</Text>;

  return (
    <>
      <Stack.Screen
        options={{ title: event.type, headerBackTitle: "Events" }}
      />
      <EventDetailScreen event={event} />
    </>
  );
}
