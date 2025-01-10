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
    enabled: boolean; 
    endDate: string; 
  };
  }
  
  export interface NewEvent {
    title: string;
    startTime: string;
    endTime: string;
    description: string;
    color: string;
    tags: string[]; 
    recurrence: {
      enabled: boolean;
      endDate: string;
    };
  }
  