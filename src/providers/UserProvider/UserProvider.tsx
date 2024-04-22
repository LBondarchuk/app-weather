import { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  displayName?: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  showUserForm: boolean;
  setShowUserForm: (showUserFor: boolean) => void;
  formVariant: 'signIn' | 'signUp';
  setFormVariant: (variant: 'signIn' | 'signUp') => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formVariant, setFormVariant] = useState<'signIn' | 'signUp'>('signIn');

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        showUserForm,
        setShowUserForm,
        formVariant,
        setFormVariant,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
