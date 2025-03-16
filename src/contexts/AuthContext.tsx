
import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email?: string, phone?: string) => void;
  logout: () => void;
  user: User | null;
};

type User = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email?: string, phone?: string) => {
    // Mock login functionality
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: 'Test User',
      email: email,
      phone: phone,
      avatar: 'https://source.unsplash.com/random/200x200/?portrait',
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
