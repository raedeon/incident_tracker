// This file sets up Axios interceptors to include the token in the headers of every request.
// This allows the frontend to make authenticated requests to the backend without needing to manually add the token
import axios from 'axios';

// Create a custom Axios instance with a predefined base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api', // All requests will be prefixed with this URL
});

// Attach a request interceptor to the Axios instance
API.interceptors.request.use((config) => {
  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('jwt');

  // If a token exists and headers are defined in the request config
  if (token && config.headers) {
    // Attach the token to the Authorization header in the format: Bearer <token>
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return the modified config object so the request proceeds
  return config;
});

// Attach a response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response, // Pass through successful responses without modification
  (error) => {
    // If the response returns a 401 Unauthorized status (invalid/expired token)
    if (error.response?.status === 401) {
      // Remove the stored JWT token from localStorage (logs the user out)
      localStorage.removeItem('jwt');

      // Redirect the user to the login page
      window.location.href = '/login';
    }

    // Reject the promise to let calling code handle the error as well
    return Promise.reject(error);
  }
);

// Export the configured Axios instance for use in the app
export default API;

