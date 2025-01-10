import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Event } from "@/types/calendar";

interface DraggableEventProps {
  event: Event;
  onClick: () => void;
}

export const DraggableEvent: React.FC<DraggableEventProps> = ({
  event,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        text-xs p-1 rounded cursor-move
        ${
          event.color === "blue"
            ? "bg-blue-100 text-blue-800"
            : event.color === "green"
            ? "bg-green-100 text-green-800"
            : "bg-purple-100 text-purple-800"
        }
      `}
      onClick={onClick}
    >
      <div className="font-medium">{event.title}</div>
      <div className="text-xs opacity-75">
        {event.startTime} - {event.endTime}
      </div>
      {event.tags.length > 0 && (
        <div className="flex gap-1 mt-1 flex-wrap">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="px-1 rounded-sm bg-white bg-opacity-50 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
