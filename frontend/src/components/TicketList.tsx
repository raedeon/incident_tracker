// This component fetches and displays all tickets using TicketItem.

import React, { useEffect, useState } from 'react'; // useEffect for fetching, useState for storing tickets
import { getTickets } from '../services/ticketService'; // API to get tickets
import TicketItem from './TicketItem'; // Component to render each ticket
import { Ticket } from '../types/ticket';

// Props accepted by TicketList
interface TicketListProps {
  onCloseSuccess?: () => void;
}

const TicketList: React.FC<TicketListProps> = ({ onCloseSuccess }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]); // State to hold all tickets

  const fetchTickets = () => {
    getTickets()
      .then((res) => {
        const sorted = [...res.data].sort((a: Ticket, b: Ticket) => {
          // First, sort by status: Open before Closed
          if (a.status === 'Open' && b.status !== 'Open') return -1;
          if (a.status !== 'Open' && b.status === 'Open') return 1;

          // Then, sort by dateLogged (oldest to newest)
          const dateA = new Date(a.dateLogged).getTime();
          const dateB = new Date(b.dateLogged).getTime();
          return dateA - dateB;
        });

        setTickets(sorted);
      })
      .catch((err) => console.error('Error fetching:', err));
  };

  useEffect(() => {
    fetchTickets(); // Initial load
  }, []);

  const handleClose = async (id: string) => {
    await fetch(`/api/tickets/close/${id}`, { method: 'PUT' });
    fetchTickets();
    onCloseSuccess?.();
  };

  return (
    <div className="card">
      <h2 className="section-title">All Tickets</h2>
      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 space-y-2">
          <span className="text-4xl">📭</span>
          <p className="text-sm">No tickets to display.</p>
        </div>
      ) : (
        <ul className="list-container">
          {tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              onClose={() => handleClose(ticket.ticketId)}
              onReasonSaved={onCloseSuccess}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
