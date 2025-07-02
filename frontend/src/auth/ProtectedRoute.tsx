// This file defines a protected route component that checks if the user is logged in before rendering the children components.
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { isLoggedIn } from './useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return isLoggedIn() ? children : <Navigate to={ROUTES.login} replace />;
};
