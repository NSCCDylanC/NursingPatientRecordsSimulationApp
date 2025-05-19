import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //helper function for making access control easier 
  const isAdmin = useMemo(() => {
    return user?.roles?.includes('Admin') || user?.role === 'admin';
  }, [user]);

  useEffect(() => {
    // Initialize user from sessionStorage if it exists
    const storedUser = sessionStorage.getItem('nurse');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('nurse', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('nurse');
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAdmin,
      login, 
      logout,
      loading
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

