import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/events.api";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: true,
  });
};
