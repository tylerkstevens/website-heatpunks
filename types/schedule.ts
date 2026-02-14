export type SessionType =
  | 'talk'
  | 'workshop'
  | 'panel'
  | 'demo'
  | 'break'
  | 'social';

export interface Person {
  name: string;
  affiliation?: string;
}

export interface Session {
  id: string;
  title: string;
  type: SessionType;
  start: string; // HH:mm format
  end: string; // HH:mm format
  speakers?: Person[] | string[]; // Support both formats for backward compatibility
  moderator?: Person | string; // Moderator for panels and fireside chats
  description?: string;
  location?: string;
  track?: 'main' | 'breakout';
  link?: string; // External link (e.g., RSVP)
  isPublic?: boolean; // Open to non-ticket holders
  status?: 'confirmed' | 'tentative'; // Session confirmation status
}

export interface ScheduleDay {
  date: string; // YYYY-MM-DD format
  name: string;
  sessions: Session[];
}

export interface Summit {
  year: number;
  dates: {
    pre_summit?: string; // Keep for backward compatibility
    pre_summit_day1?: string; // Feb 25
    pre_summit_day2?: string; // Feb 26
    day1: string;
    day2: string;
  };
  venue: {
    name: string;
    address: string;
    timezone: string;
    coordinates?: { // Optional for when coordinates aren't available
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
