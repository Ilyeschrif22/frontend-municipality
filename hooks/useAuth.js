"use client"

import { useState, useEffect, createContext, useContext } from 'react';
import apiService from '@/lib/api';

// Contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier le token au chargement
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = apiService.getToken();
      if (token) {
        const response = await apiService.validateToken();
        if (response.valid) {
          // Récupérer les informations complètes de l'utilisateur
          // Pour l'instant, on utilise des données par défaut
          // En production, vous devriez avoir un endpoint pour récupérer les infos utilisateur
          setUser({
            username: response.username,
            citoyenId: 1, // ID par défaut pour les tests
            role: 'citizen', // Rôle par défaut
            // Ajoutez d'autres informations selon votre backend
          });
        } else {
          apiService.logout();
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      apiService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.login(credentials);
      
      // Déterminer le type d'utilisateur et récupérer ses informations
      // Cette logique dépendra de votre backend
      const userInfo = {
        username: credentials.username,
        citoyenId: 1, // ID par défaut pour les tests
        role: 'citizen', // Rôle par défaut
        // Ajoutez d'autres informations selon votre backend
      };
      
      setUser(userInfo);
      return response;
    } catch (error) {
      setError(error.message || 'Erreur de connexion');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setError(null);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Créer un citoyen via l'API
      const response = await apiService.createCitoyen(userData);
      
      // Optionnellement, connecter automatiquement l'utilisateur après l'inscription
      // await login({ username: userData.email, password: userData.password });
      
      return response;
    } catch (error) {
      setError(error.message || 'Erreur lors de l\'inscription');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 