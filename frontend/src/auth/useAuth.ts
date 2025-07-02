// This file contains the authentication logic for the frontend application.

export const isLoggedIn = () => {
  return localStorage.getItem("jwt") !== null;
};
