import React from "react";
import { Event } from "@/types/calendar";

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onDateClick,
}) => {
  const getWeekDates = (date: Date) => {
    const week = [];
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      week.push(new Date(start.getTime() + i * 24 * 60 * 60 * 1000));
    }

    return week;
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <div className="grid grid-cols-7 gap-1 min-h-[600px]">
      {weekDates.map((date, index) => (
        <div key={index} className="border rounded-lg p-2">
          <div className="font-medium mb-2">
            {date.toLocaleDateString("default", { weekday: "short" })}
            <br />
            {date.getDate()}
          </div>
          <div className="space-y-1">
            {events
              .filter((event) => event.date === date.toDateString())
              .map((event) => (
                <div
                  key={event.id}
                  className={`
                    text-xs p-1 rounded
                    ${
                      event.color === "blue"
                        ? "bg-blue-100 text-blue-800"
                        : event.color === "green"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }
                  `}
                  onClick={() => onDateClick(date)}
                >
                  {event.startTime} - {event.title}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
