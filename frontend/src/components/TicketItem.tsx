// This component renders a single ticket and includes breach reason logic and a "Close" button if the ticket is open.

import React, { useState, ChangeEvent } from 'react';
import {
  closeTicket,
  updateBreachReason,
  reopenTicket,
  deleteTicket,
} from '../services/ticketService';
import { Ticket } from '../types/ticket';
import { getUserRole } from '../auth/tokenUtils';

interface TicketItemProps {
  ticket: Ticket;
  onClose: () => void;
  onReasonSaved?: () => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, onClose, onReasonSaved }) => {
  const role = getUserRole();

  const [localReason, setLocalReason] = useState<string>(ticket._localReason || '');

  const [closeDate, setCloseDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleClose = async () => {
    try {
      await closeTicket(ticket.ticketId, closeDate);
      onClose();
    } catch (err) {
      console.error('Error closing ticket:', err);
    }
  };

  const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalReason(e.target.value);
  };

  const handleReasonUpdate = async () => {
    try {
      await updateBreachReason(ticket.ticketId, localReason);
      ticket.breachReason = localReason;
      setLocalReason('');
      if (onReasonSaved) onReasonSaved();
    } catch (err) {
      console.error('Failed to save reason:', err);
    }
  }

  const handleReopen = async () => {
    try {
      await reopenTicket(ticket.ticketId);
      onClose();
    } catch (err) {
      console.error('Error reopening ticket:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTicket(ticket.ticketId, ticket.module);
      onClose();
    } catch (err) {
      console.error('Error deleting ticket:', err);
    }
  };

  return (
    <li className="card-list-item">
      <div className="vertical-stack-tight">
        {/* Ticket ID and module */}
        <div className="card-list-item-title">
          {ticket.ticketId} <span className="card-list-item-subtext">({ticket.module})</span>
        </div>

        {/* Ticket status */}
        <div className="card-list-item-subtext">Status: <span className="font-medium">{ticket.status}</span></div>

        {/* Days to SLA */}
        {ticket.status === 'Open' && (
          <div className="card-list-item-subtext">Days to SLA: {ticket.daysToSla}</div>
        )}

        {/* Breach reason input for breached open tickets */}
        {ticket.status === 'Open' && ticket.daysToSla < 0 && (
          <div className="mt-2">
            <label className="form-label">
              Reason for Breach:
            </label>
            {ticket.breachReason ? (
              <p className="breach-reason">
                {ticket.breachReason}
              </p>
            ) : (
              <>
                <textarea
                  className="reason-textarea"
                  value={localReason}
                  onChange={handleReasonChange}
                  placeholder="Enter breach reason"
                  rows={2}
                />
                <button
                  onClick={handleReasonUpdate}
                  className="save-button"
                >
                  Save Reason
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
      {(role === 'ADMIN' || role === 'USER') && (
        <>
          {ticket.status === 'Open' ? (
            <>
              <input
                type="date"
                className="date-input"
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
              />
              <button
                onClick={handleClose}
                className="close-button"
              >
                Close
              </button>
            </>
          ) : (
            <button
              onClick={handleReopen}
              className="reopen-button"
            >
              Reopen
            </button>
          )}
        </>
      )}


        {role === 'ADMIN' && (
          <button
            onClick={handleDelete}
            className="delete-button"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
};

export default TicketItem;
