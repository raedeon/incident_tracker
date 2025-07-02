// This file is the main entry point for the React application.
// It sets up the router, routes, and protected routes for the application.

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { ROUTES } from './routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route
          path={ROUTES.dashboard}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Catch-all: redirect to dashboard */}
        <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
