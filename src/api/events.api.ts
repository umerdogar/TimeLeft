import { Event, EventStatus } from "@appTypes";

const EVENTS_URL = "https://cdn.timeleft.com/frontend-tech-test/events.json";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(EVENTS_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
};
