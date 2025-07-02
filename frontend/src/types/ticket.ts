// Defines the structure of a ticket, which is used throughout the application.
export interface Ticket {
  id: number; // Java `Long` maps to TypeScript `number`
  ticketId: string;
  module: string;
  dateLogged: string; // LocalDate comes as ISO string (e.g., "2024-06-19")
  daysToSla: number;
  status: string; // e.g., 'Open' | 'Closed'
  dayClosed: string | null;
  breachedDate: string | null;
  breachReason: string | null;
  _localReason?: string; // client-side only
}

