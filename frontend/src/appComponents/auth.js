
import React, { createContext, useContext } from 'react';
import { auth } from './firebase'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider value={{ login, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
