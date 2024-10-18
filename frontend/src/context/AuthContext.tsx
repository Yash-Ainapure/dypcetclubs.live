import axios from "../appComponents/axiosInstance";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface Club {
  ClubID: number;
  ClubName: string;
  Description?: string;
  FoundedDate?: string;
  Email: string;
  LogoURL?: string;
}

interface UserData {
  Email: string;
  ClubName: string; 
  ClubID: number; 
  Club: Club;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null; 
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userData: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Load user data from localStorage on initial load
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post("/api/clubs/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const club = response.data.club;
        setUserData({ 
          Email: club.Email, 
          ClubName: club.ClubName, 
          ClubID: club.ClubID,
          Club:club 
        });  // Store both clubName and clubId
        setIsLoggedIn(true);

        // Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify({ 
          Email: club.Email, 
          ClubName: club.ClubName, 
          ClubID: club.ClubID,
          Club: club,
        }));
        
        return true;
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log("An error occurred during login.");
      }
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("userData"); // Remove user data from localStorage
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
