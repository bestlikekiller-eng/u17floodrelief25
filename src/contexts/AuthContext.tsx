import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  currentAdmin: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials as per requirements
const ADMIN_CREDENTIALS: Record<string, string> = {
  'Ayash': 'Ayash123@#',
  'Atheeq': 'Atheeq887&*',
  'Inas': 'Inas456$%',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedAdmin = sessionStorage.getItem('currentAdmin');
    if (storedAdmin && ADMIN_CREDENTIALS[storedAdmin]) {
      setIsLoggedIn(true);
      setCurrentAdmin(storedAdmin);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    if (ADMIN_CREDENTIALS[username] && ADMIN_CREDENTIALS[username] === password) {
      setIsLoggedIn(true);
      setCurrentAdmin(username);
      sessionStorage.setItem('currentAdmin', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    sessionStorage.removeItem('currentAdmin');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
