import React, { useState } from 'react';
import AddTicketForm from '../components/AddTicketForm';
import TicketList from '../components/TicketList';
import IncidentLog from '../components/IncidentLog';
import IncidentStats from '../components/IncidentStats';
import Navbar from '../components/NavBar';

const Dashboard: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleRefresh = (): void => setRefreshKey((prev) => prev + 1);

  return (
    <div className="page-wrapper">
      {/* Top navigation bar */}
      <Navbar />

      <main className="main-content">

        {/* Top row: Add form + Stats chart */}
        <div className="responsive-grid">
          <AddTicketForm onSuccess={handleRefresh} />
          <IncidentStats refreshKey={refreshKey} />
        </div>

        {/* Bottom row: Ticket list + Incident log */}
        <div className="responsive-grid">
          <TicketList key={refreshKey} onCloseSuccess={handleRefresh} />
          <IncidentLog refreshKey={refreshKey} />
        </div>
      </main>
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Incident Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
