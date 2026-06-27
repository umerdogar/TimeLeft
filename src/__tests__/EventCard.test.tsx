import React from "react";
import { render } from "@testing-library/react-native";
import { EventCard } from "@/components/EventCard";
import { Event } from "@appTypes";

// mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const mockEvent: Event = {
  id: "evt_1",
  type: "Coffee",
  date: "2025-12-30T16:30:00Z",
  zone: {
    id: 1,
    name: "11th",
    city: {
      id: 1,
      name: "Paris",
      country: { id: 1, name: "France" },
    },
  },
  booked: 40,
  capacity: 50,
  status: "upcoming",
};

describe("EventCard", () => {
  describe("rendering", () => {
    it("renders event type in uppercase", () => {
      const { getByText } = render(<EventCard event={mockEvent} />);
      expect(getByText("COFFEE")).toBeTruthy();
    });

    it("renders event status", () => {
      const { getByText } = render(<EventCard event={mockEvent} />);
      expect(getByText("upcoming")).toBeTruthy();
    });

    it("renders location correctly", () => {
      const { getByText } = render(<EventCard event={mockEvent} />);
      expect(getByText("11th · Paris, France")).toBeTruthy();
    });

    it("renders formatted date", () => {
      const { getByText } = render(<EventCard event={mockEvent} />);
      expect(getByText(new Date(mockEvent.date).toDateString())).toBeTruthy();
    });
  });

  describe("availability", () => {
    it("shows availability section for upcoming events", () => {
      const { getByText } = render(<EventCard event={mockEvent} />);
      expect(getByText(/40\/50 booked/)).toBeTruthy();
    });

    it("shows spots left for upcoming event", () => {
      const { getByText } = render(<EventCard event={mockEvent} />);
      expect(getByText("10 spots left")).toBeTruthy();
    });

    it("shows sold out when no spots left", () => {
      const soldOutEvent = { ...mockEvent, booked: 50, capacity: 50 };
      const { getByText } = render(<EventCard event={soldOutEvent} />);
      expect(getByText("Sold out")).toBeTruthy();
    });

    it("hides availability section for past events", () => {
      const pastEvent = { ...mockEvent, status: "past" as const };
      const { queryByText } = render(<EventCard event={pastEvent} />);
      expect(queryByText(/spots left/)).toBeNull();
      expect(queryByText("Sold out")).toBeNull();
    });

    it("shows availability section for live events", () => {
      const liveEvent = { ...mockEvent, status: "live" as const };
      const { getByText } = render(<EventCard event={liveEvent} />);
      expect(getByText("10 spots left")).toBeTruthy();
    });
  });

  describe("status styles", () => {
    it("renders live status", () => {
      const liveEvent = { ...mockEvent, status: "live" as const };
      const { getByText } = render(<EventCard event={liveEvent} />);
      expect(getByText("live")).toBeTruthy();
    });

    it("renders past status", () => {
      const pastEvent = { ...mockEvent, status: "past" as const };
      const { getByText } = render(<EventCard event={pastEvent} />);
      expect(getByText("past")).toBeTruthy();
    });
  });

  describe("navigation", () => {
    it("calls router.push with correct event id on press", () => {
      const mockPush = jest.fn();
      jest
        .spyOn(require("expo-router"), "useRouter")
        .mockReturnValue({ push: mockPush });

      const { getByText } = render(<EventCard event={mockEvent} />);
      const { fireEvent } = require("@testing-library/react-native");
      fireEvent.press(getByText("COFFEE"));
      expect(mockPush).toHaveBeenCalledWith("/event/evt_1");
    });
  });
});
