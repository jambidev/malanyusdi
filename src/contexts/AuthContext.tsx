import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user roles for the application
export type UserRole = 'admin' | 'manager' | 'assistant' | 'supervisor' | 'worker' | 'staff';

// Define user interface
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data - in a real application, this would come from an API
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@malanyusdi.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Field Manager',
    email: 'manager@malanyusdi.com',
    password: 'manager123',
    role: 'manager' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=2'
  }
];

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    // Remove password before storing
    const { password: _, ...userWithoutPassword } = foundUser;
    
    // Store user in state and localStorage
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};