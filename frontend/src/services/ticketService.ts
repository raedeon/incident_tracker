// This file defines all Axios-based API calls to interact with the Spring Boot backend.

import API from '../utils/axiosSetup'; // Use the configured instance
import { Ticket } from '../types/ticket';

export interface NewTicket {
  ticketId: string;
  module: string;
  dateLogged: string;
}

const TICKETS_BASE = '/tickets';

// GET /api/tickets
export const getTickets = () => API.get<Ticket[]>(TICKETS_BASE);

// POST /api/tickets
export const addTicket = (data: NewTicket) => API.post(TICKETS_BASE, data);

// PUT /api/tickets/close/{id}
export const closeTicket = (ticketId: string, closeDate: string) =>
  API.put(`${TICKETS_BASE}/close/${ticketId}`, { closeDate });

// PUT /api/tickets/reopen/{id}
export const reopenTicket = (ticketId: string) =>
  API.put(`${TICKETS_BASE}/reopen/${ticketId}`);

// DELETE /api/tickets/{module}/{ticketId}
export const deleteTicket = (ticketId: string, module: string) =>
  API.delete(`${TICKETS_BASE}/${module}/${ticketId}`);

// PUT /api/tickets/breach-reason/{id}
export const updateBreachReason = (ticketId: string, reason: string) =>
  API.put(`${TICKETS_BASE}/breach-reason/${ticketId}`, reason, {
    headers: { 'Content-Type': 'application/json' },
  });

// GET /api/tickets/stats?range=...
export const fetchIncidentStats = (range: string) =>
  API.get(`${TICKETS_BASE}/stats?range=${range}`);
