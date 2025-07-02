// This component generates a plain-text incident log similar to the original Python CLI version.

import React, { useEffect, useState } from 'react';
import { getTickets } from '../services/ticketService';
import { Ticket } from '../types/ticket';

interface IncidentLogProps {
  refreshKey: number;
}

const IncidentLog: React.FC<IncidentLogProps> = ({ refreshKey }) => {
  const [log, setLog] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    generateLog();
  }, [refreshKey]);

  const generateLog = async () => {
    try {
      const response = await getTickets();
      const tickets: Ticket[] = response.data;

      let openCount = 0;
      const days: string[][] = [[], [], [], [], [], [], []]; // SLA buckets: 0 = breached

      for (const ticket of tickets) {
        if (ticket.status === 'Open') {
          openCount++;

          if (ticket.daysToSla < 0) {
            days[0].push(`${ticket.module} ${ticket.ticketId}`);
          } else {
            const bucket = Math.min(ticket.daysToSla + 1, 6); // Cap index at 6
            days[bucket].push(`${ticket.module} ${ticket.ticketId}`);
          }
        }
      }

      const now = new Date();
      const formattedTime = now
        .toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(',', '')
        .replace(/:/g, '');

      let logText = '';
      logText += `Last Updated: ${formattedTime}\n\n`;
      logText += `Number of open tickets: ${openCount}\n\n`;

      // Breached SLA this month
      const nowMonth = now.getMonth();
      const nowYear = now.getFullYear();

      const breachedThisMonth = tickets.filter(
        (t) =>
          t.breachedDate &&
          new Date(t.breachedDate).getMonth() === nowMonth &&
          new Date(t.breachedDate).getFullYear() === nowYear
      );

      const breachedIds = breachedThisMonth.map(
        (t) => `${t.module} ${t.ticketId}`
      );

      logText += `Number of breached SLA tickets for this month: ${breachedIds.length}`;
      if (breachedIds.length > 0) {
        logText += ` (${breachedIds.join(', ')})\n`;
        for (const t of breachedThisMonth) {
          logText += `${t.module} ${t.ticketId}: ${
            t.breachReason || 'no reason provided'
          }\n`;
        }
      } else {
        logText += `\n`;
      }
      logText += `\n`;

      for (let i = 0; i < days.length; i++) {
        if (i === 0) {
          logText += `BREACHED SLA: \n`;
        } else if (i === 1) {
          logText += `\nSLA TODAY: \n`;
        } else if (i === 2) {
          logText += `\n1 day to SLA: \n`;
        } else {
          logText += `\n${i - 1} days to SLA: \n`;
        }

        for (const ticket of days[i]) {
          logText += `- ${ticket}\n`;
        }
      }

      setLog(logText);
    } catch (err) {
      console.error('Error generating incident log:', err);
      setLog('Failed to load incident log.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(log).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="card">
        <div className="flex-between-center">
          <h2 className="section-title">Incident Log</h2>
          <button
            onClick={copyToClipboard}
            className="cyan-button"
          >
            {copied ? 'Copied!' : 'Copy Log'}
          </button>
        </div>
        <pre className="log-box">
          {log}
        </pre>
    </div>
  );
};

export default IncidentLog;
