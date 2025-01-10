import React from "react";
import { Event } from "../../../src/types/calendar";

interface CalendarDayProps {
  day: { date: Date; isPadding: boolean };
  events: Event[];
  onClick: () => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  events,
  onClick,
}) => {
  return (
    <div
      className={`
        min-h-24 p-2 border rounded-lg
        ${day.isPadding ? "bg-gray-50" : "bg-white"}
        ${
          day.date.toDateString() === new Date().toDateString()
            ? "ring-2 ring-blue-500"
            : ""
        }
        hover:bg-gray-50 cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="font-medium">{day.date.getDate()}</div>
      <div className="space-y-1 mt-1">
        {events.map((event) => (
          <div
            key={event.id}
            className={`
              text-xs p-1 rounded truncate
              ${
                event.color === "blue"
                  ? "bg-blue-100 text-blue-800"
                  : event.color === "green"
                  ? "bg-green-100 text-green-800"
                  : "bg-purple-100 text-purple-800"
              }
            `}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};
