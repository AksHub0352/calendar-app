export interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  color: string;
  tags: string[];
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
  };
  }
  
  export interface NewEvent {
    title: string;
    startTime: string;
    endTime: string;
    description: string;
    color: string;
  }
  