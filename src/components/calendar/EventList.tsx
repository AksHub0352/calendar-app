import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { Event } from "@/types/calendar";

interface EventListProps {
  open: boolean;
  date: Date | null;
  events: Event[];
  onClose: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: number) => void;
}

export const EventList: React.FC<EventListProps> = ({
  open,
  date,
  events,
  onClose,
  onEditEvent,
  onDeleteEvent,
}) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Events for {date?.toLocaleDateString()}</SheetTitle>
          <SheetDescription>{events.length} events scheduled</SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-lg border flex items-start justify-between"
            >
              <div className="flex-1">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-500">
                  {event.startTime} - {event.endTime}
                </p>
                {event.description && (
                  <p className="text-sm mt-1">{event.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditEvent(event)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteEvent(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
