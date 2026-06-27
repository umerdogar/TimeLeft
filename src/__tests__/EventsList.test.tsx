import React from "react";
import { render } from "@testing-library/react-native";
import EventsScreen from "@/src/screens/events/eventsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/src/hooks", () => ({
  useEvents: () => ({
    data: [
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
    ],
    isLoading: false,
    isError: false,
    isFetching: false,
    refetch: jest.fn(),
  }),
  useEventFilters: jest.requireActual("@/src/hooks").useEventFilters,
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("EventsList", () => {
  it("renders the events list", () => {
    const { getByTestId } = render(<EventsScreen />, { wrapper });
    expect(getByTestId("events-list")).toBeTruthy();
  });

  it("renders event cards", () => {
    const { getByText } = render(<EventsScreen />, { wrapper });
    expect(getByText("COFFEE")).toBeTruthy();
    expect(getByText("DINNER")).toBeTruthy();
  });

  it("renders stats bar", () => {
    const { getAllByText, getByText } = render(<EventsScreen />, { wrapper });
    expect(getAllByText("Upcoming").length).toBeGreaterThan(0);
    expect(getAllByText("Live").length).toBeGreaterThan(0);
    expect(getAllByText("Past").length).toBeGreaterThan(0);
  });
});
