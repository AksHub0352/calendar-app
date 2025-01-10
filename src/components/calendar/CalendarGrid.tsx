import React from "react";
import { CalendarDay } from "./CalendarDay";
import { Event } from "../../../src/types/calendar";

interface CalendarGridProps {
  days: Array<{ date: Date; isPadding: boolean }>;
  events: Event[];
  filteredEvents: Event[];
  onDateClick: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  events,
  filteredEvents,
  onDateClick,
}) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="p-2 text-center font-semibold">
          {day}
        </div>
      ))}

      {days.map((day, index) => (
        <CalendarDay
          key={index}
          day={day}
          events={filteredEvents.filter(
            (event) => event.date === day.date.toDateString()
          )}
          onClick={() => onDateClick(day.date)}
        />
      ))}
    </div>
  );
};
