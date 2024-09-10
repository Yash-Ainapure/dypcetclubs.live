// src/context/AuthContext.tsx

import axios from "axios";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userData: any;
  login: () => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userData: null,
  login: () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      console.log("login data");
      console.log(response);
      if (response.status === 200) {
        console.log("User logged in");
        setUserData(response.data);
        setIsLoggedIn(true);
        return true;
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.error);
        console.log(error);
      } else {
        console.log("An error occurred during login.");
      }
      return false;
    }
  };

  const logout = () => {
    // Simulate logout logic, e.g., clearing tokens
    setIsLoggedIn(false);
    setUserData(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
export const useAuth = () => useContext(AuthContext);
