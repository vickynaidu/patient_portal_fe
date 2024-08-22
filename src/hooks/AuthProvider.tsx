import React, { ReactNode } from 'react';
import {
  getSession,
  isAuth,
  login,
  logout,
  sendPasswordReset,
  addUser,
  getUsers,
  User,
} from '../services/AuthService';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

// Define the types for the context value
export interface AuthContextType {
  getSession: () => User | null;
  isAuth: () => boolean;
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  addUser: (user:  Omit<User, 'id'>) => Promise<User>;
  getUsers: () => Promise<User[] | undefined>;
}

// Create the context with a default value
const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = {
    getSession,
    isAuth,
    login,
    logout,
    sendPasswordReset,
    addUser,
    getUsers,
  };

  const isAuthenticated = useSelector((state: RootState) => state.loginReducer.isAuthenticated);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;