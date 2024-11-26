// context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// type for user
interface User {
  name: string;
  email: string;
}

// Type for context
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// providers
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// hook for context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
