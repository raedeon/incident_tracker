// This component provides a form for users to add new tickets.

import React, { useState, FormEvent } from 'react';
import { addTicket } from '../services/ticketService';

interface AddTicketFormProps {
  onSuccess: () => void;
}

const MODULE_OPTIONS = ['Module A', 'Module B', 'Module C', 'Module D', 'Module E'];

const AddTicketForm: React.FC<AddTicketFormProps> = ({ onSuccess }) => {
  const [ticketId, setTicketId] = useState<string>(''); // Controlled input for ticket ID
  const [module, setModule] = useState<string>('BPP');  // Controlled select input

  // Default to today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const [dateLogged, setDateLogged] = useState<string>(today);

  // Submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addTicket({ ticketId, module, dateLogged });
      onSuccess();
      setTicketId('');
      setDateLogged(today);
    } catch (err) {
      console.error('Failed to add ticket:', err);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">Add New Ticket</h2>
      <form onSubmit={handleSubmit} className="stacked-form">
        <div>
          <label className="form-label">Ticket ID</label>
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="input-base"
            placeholder="e.g. 1234"
            required
          />
        </div>

        <div>
          <label className="form-label">Module</label>
          <select
            value={module}
            onChange={(e) => setModule(e.target.value)}
            className="input-base"
          >
            {MODULE_OPTIONS.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Date Logged</label>
          <input
            type="date"
            value={dateLogged}
            onChange={(e) => setDateLogged(e.target.value)}
            className="input-base"
          />
        </div>

        <button
          type="submit"
          className="navy-button"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;
