import { createContext, useEffect, useState, useContext } from 'react';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadUser() {
    
  }

  async function logoutUser() {
    
  }

  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    refreshUser: loadUser,
    logout: logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
