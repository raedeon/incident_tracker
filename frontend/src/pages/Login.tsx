// components/Login.tsx
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes'; // Adjust the path if necessary
import logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    const credential = credentialResponse.credential;
    if (!credential) {
      alert('No credential received');
      return;
    }

    localStorage.setItem('jwt', credential);

    try {
      const res = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${credential}`
        }
      });
      const data = await res.json();
      const role = data.role || 'VIEWER';
      localStorage.setItem('role', role);
    } catch (err) {
      console.error('Failed to get role:', err);
      localStorage.setItem('role', 'VIEWER');
    }
  
    navigate(ROUTES.dashboard);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-10" />
            <span className="text-xl font-semibold text-[#00205B]">Incident Tracker</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">Use your Enterprise account</p>
        <div className='flex justify-center mt-4'>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => alert('Login Failed')}
          />
        </div>
      </div>
      <p className="footer-note">© {new Date().getFullYear()} Incident Tracker. All rights reserved.</p>
    </div>
  );
};

export default Login;
