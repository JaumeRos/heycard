import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.auth.login(email, password);
      
      await AsyncStorage.setItem('@auth_token', response.token);
      await AsyncStorage.setItem('@user', JSON.stringify(response.user));
      
      setToken(response.token);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.auth.register(email, password);
      
      await AsyncStorage.setItem('@auth_token', response.token);
      await AsyncStorage.setItem('@user', JSON.stringify(response.user));
      
      setToken(response.token);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      // Clear all auth-related data from AsyncStorage
      await AsyncStorage.multiRemove(['@auth_token', '@user']);
      // Reset state
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load stored authentication state when app starts
  React.useEffect(() => {
    async function loadStoredAuth() {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem('@auth_token');
        const storedUser = await AsyncStorage.getItem('@user');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadStoredAuth();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token,
        signIn, 
        signUp, 
        signOut,
        loading
      }}
    >
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