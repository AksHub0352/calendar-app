import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { FilterBar } from "@/components/calendar/FilterBar";
import { EventDialog } from "@/components/calendar/EventDialog";
import { EventList } from "@/components/calendar/EventList";
import { ViewSelector } from "@/components/calendar/ViewSelector";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { WeekView } from "@/components/calendar/WeekView";
import { DayView } from "@/components/calendar/DayView";
import { getDaysInMonth } from "@/lib/calendar";
import { generateRecurringEvents } from "@/lib/calendar";
import { Event, NewEvent } from "@/types/calendar";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">(
    "month"
  );
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: "",
    startTime: "",
    endTime: "",
    description: "",
    color: "blue",
    recurrence: {
      enabled: false,
      endDate: "",
    },
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([
    "Work",
    "Personal",
    "Important",
    "Meeting",
    "Holiday",
    "Birthday",
  ]);

  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dayEvents = events.filter(
      (event) => event.date === date.toDateString()
    );

    if (dayEvents.length > 0) {
      setShowEventList(true);
    } else {
      setShowEventModal(true);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description,
      color: event.color,
      recurrence: event.recurrence || { enabled: false, endDate: "" },
    });
    setShowEventList(false);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id ? { ...event, ...newEvent } : event
        )
      );
      setEditingEvent(null);
    } else {
      if (!selectedDate) return;

      if (!newEvent.recurrence.enabled) {
        setEvents([
          ...events,
          {
            ...newEvent,
            date: selectedDate.toDateString(),
            id: Date.now(),
            tags: [],
          },
        ]);
      } else {
        const recurringEvents = generateRecurringEvents(
          {
            ...newEvent,
            date: selectedDate.toDateString(),
            id: Date.now(),
            tags: [],
          },
          new Date(newEvent.recurrence.endDate || "2030-12-31")
        );
        setEvents([...events, ...recurringEvents]);
      }
    }

    setNewEvent({
      title: "",
      startTime: "",
      endTime: "",
      description: "",
      color: "blue",
      recurrence: { enabled: false, endDate: "" },
    });
    setShowEventModal(false);
  };

  const handleExport = () => {
    const data = events.map((event) => ({
      Title: event.title,
      StartTime: event.startTime,
      EndTime: event.endTime,
      Description: event.description,
      Date: event.date,
    }));

    const csv = [
      ["Title", "StartTime", "EndTime", "Description", "Date"],
      ...data.map((event) => [
        event.Title,
        event.StartTime,
        event.EndTime,
        event.Description,
        event.Date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })}_events.csv`;
    link.click();
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeEvent = events.find((e) => e.id === active.id);
    if (!activeEvent) return;

    const newDate = new Date(over.id as string);
    setEvents(
      events.map((e) =>
        e.id === activeEvent.id ? { ...e, date: newDate.toDateString() } : e
      )
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "week":
        return (
          <WeekView
            currentDate={currentDate}
            events={filteredEvents}
            onDateClick={handleDateClick}
          />
        );
      case "day":
        return (
          <DayView
            currentDate={currentDate}
            events={filteredEvents}
            onDateClick={handleDateClick}
          />
        );
      default:
        return (
          <CalendarGrid
            days={getDaysInMonth(currentDate)}
            events={events}
            filteredEvents={filteredEvents}
            onDateClick={handleDateClick}
          />
        );
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onExport={handleExport}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {renderCurrentView()}

      <EventDialog
        open={showEventModal}
        selectedDate={selectedDate}
        newEvent={newEvent}
        onOpenChange={setShowEventModal}
        onEventChange={setNewEvent}
        onSave={handleSaveEvent}
        isEditing={!!editingEvent}
        availableTags={availableTags}
        onTagsChange={(tags) => setNewEvent({ ...newEvent, tags })}
      />

      <EventList
        open={showEventList}
        date={selectedDate}
        events={filteredEvents.filter(
          (event) => event.date === selectedDate?.toDateString()
        )}
        onClose={() => setShowEventList(false)}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={events.map((e) => e.id)}>
          {events.map((event) => (
            <div key={event.id}>
              <div
                style={{
                  backgroundColor: event.color,
                  padding: "10px",
                  margin: "5px",
                  borderRadius: "5px",
                  cursor: "move",
                }}
              >
                <span>{event.title}</span>
              </div>
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
