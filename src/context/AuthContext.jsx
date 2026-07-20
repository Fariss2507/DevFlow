import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 

  const login = (email, password) => {
    
    const fakeUser = { name: 'Test User', email };
    setUser(fakeUser);
    return { success: true };
  };

  const register = (name, email, password) => {
   
    const fakeUser = { name, email };
    setUser(fakeUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}