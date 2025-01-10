import { Event } from "@/types/calendar";

export const generateRecurringEvents = (event: Event, endDate: Date): Event[] => {
  if (!event.recurrence || !event.recurrence.enabled) {
    return [event]; // If no recurrence, return a single event
  }

  const events: Event[] = [];
  const startDate = new Date(event.date);
  let currentDate = new Date(startDate);

  // Convert the recurrence end date to a Date object
  const recurrenceEndDate = endDate;

  while (currentDate <= recurrenceEndDate) {
    // Add the event with the updated date
    events.push({
      ...event,
      id: Date.now() + Math.random(), // Use a unique ID for each event
      date: currentDate.toDateString(), // Set the date for the current event
    });

    // Increment the current date for the next recurrence
    currentDate.setDate(currentDate.getDate() + 1); // Adjust this if you want specific recurrence logic (e.g., weekly, monthly)
  }

  return events;
};


export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];
  const startPadding = firstDay.getDay(); // Get the starting day of the week (e.g., Sunday)

  // Add padding for previous month days if the first day is not Sunday
  for (let i = 0; i < startPadding; i++) {
    const prevDate = new Date(year, month, -i);
    days.unshift({
      date: prevDate,
      isPadding: true,
    });
  }

  // Add the days of the current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isPadding: false,
    });
  }

  return days;
};
