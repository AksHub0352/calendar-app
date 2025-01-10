import React from "react";
import { Event } from "@/types/calendar";

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onDateClick,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="border rounded-lg">
      <div className="sticky top-0 bg-white p-4 border-b">
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleDateString("default", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h2>
      </div>

      <div className="divide-y">
        {hours.map((hour) => {
          const timeEvents = events.filter((event) => {
            if (event.date !== currentDate.toDateString()) return false;
            const eventHour = parseInt(event.startTime.split(":")[0]);
            return eventHour === hour;
          });

          return (
            <div
              key={hour}
              className="flex min-h-16 group hover:bg-gray-50"
              onClick={() => onDateClick(currentDate)}
            >
              <div className="w-20 p-2 text-right text-sm text-gray-500">
                {hour.toString().padStart(2, "0")}:00
              </div>
              <div className="flex-1 p-2">
                {timeEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`
                      p-1 rounded text-sm mb-1
                      ${
                        event.color === "blue"
                          ? "bg-blue-100 text-blue-800"
                          : event.color === "green"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }
                    `}
                  >
                    {event.title} ({event.startTime} - {event.endTime})
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
