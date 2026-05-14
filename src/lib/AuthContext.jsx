import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = () => {
    setIsLoadingAuth(true);
    const session = authService.getSession();
    if (session) {
      setUser(session);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoadingAuth(false);
  };

  const login = (email, password) => {
    try {
      const user = authService.login(email, password);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = (email) => {
    try {
      return authService.register(email);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (data) => {
    if (!user) return;
    const updated = authService.updateProfile(user.email, data);
    const session = { ...updated };
    delete session.password;
    setUser(session);
    return session;
  };

  const generateResetToken = (email) => {
    return authService.generateResetToken(email);
  };

  const resetPassword = (token, newPassword) => {
    authService.resetPassword(token, newPassword);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      login,
      register,
      logout,
      updateProfile,
      checkUserAuth,
      generateResetToken,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
