// NavBar.tsx
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/logo.png';

interface JwtPayload {
  email: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const email = jwt ? jwtDecode<JwtPayload>(jwt).email : '';

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Title */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-6" />
        <span className="text-lg font-semibold">Incident Tracker</span>
      </div>

      {/* Right-side: email and logout */}
      <div className="flex items-center gap-4">
        {email && (
          <span className="user-info">
            Logged in as {email}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="cyan-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
