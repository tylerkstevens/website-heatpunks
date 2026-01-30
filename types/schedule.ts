export type SessionType =
  | 'talk'
  | 'workshop'
  | 'panel'
  | 'demo'
  | 'break'
  | 'social';

export interface Session {
  id: string;
  title: string;
  type: SessionType;
  start: string; // HH:mm format
  end: string; // HH:mm format
  speakers?: string[];
  description?: string;
  location?: string;
  track?: 'main' | 'breakout';
  link?: string; // External link (e.g., RSVP)
  isPublic?: boolean; // Open to non-ticket holders
}

export interface ScheduleDay {
  date: string; // YYYY-MM-DD format
  name: string;
  sessions: Session[];
}

export interface Summit {
  year: number;
  dates: {
    pre_summit: string;
    day1: string;
    day2: string;
  };
  venue: {
    name: string;
    address: string;
    timezone: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export interface ScheduleData {
  summit: Summit;
  days: ScheduleDay[];
}

export interface Sponsor {
  name: string;
  logo: string;
  logoDark?: string; // Dark version for light mode
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
