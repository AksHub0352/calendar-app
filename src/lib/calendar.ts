
import { Event } from "@/types/calendar";


export const generateRecurringEvents = (event: Event, endDate: Date): Event[] => {
  if (!event.recurrence) return [event];

  const events: Event[] = [];
  const startDate = new Date(event.date);
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    events.push({
      ...event,
      id: Date.now() + Math.random(),
      date: currentDate.toDateString(),
    });

    switch (event.recurrence.type) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + event.recurrence.interval);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + (7 * event.recurrence.interval));
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + event.recurrence.interval);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + event.recurrence.interval);
        break;
    }
  }

  return events;
};


export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];
  const startPadding = firstDay.getDay();

 
  for (let i = 0; i < startPadding; i++) {
    const prevDate = new Date(year, month, -i);
    days.unshift({
      date: prevDate,
      isPadding: true
    });
  }

  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isPadding: false
    });
  }

  return days;
};
