import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export type SocialMediaPlatform = 
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'github'
  | 'facebook'
  | 'youtube'
  | 'tiktok';

export interface SocialMediaLink {
  platform: SocialMediaPlatform;
  username: string;
  url: string;
}

export interface BusinessCard {
  id?: string;
  userId: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  companyLogo?: string;
  socialMedia?: SocialMediaLink[];
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to generate social media URLs
export const generateSocialMediaUrl = (platform: SocialMediaPlatform, username: string): string => {
  const baseUrls: Record<SocialMediaPlatform, string> = {
    linkedin: 'https://linkedin.com/in/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
    github: 'https://github.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/@',
    tiktok: 'https://tiktok.com/@'
  };

  return `${baseUrls[platform]}${username.replace('@', '')}`;
};

// For iOS simulator use localhost, for Android use 10.0.2.2
const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000/api' : 'http://10.0.2.2:3000/api';

export const cardService = {
  async createCard(cardData: Omit<BusinessCard, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    const token = await AsyncStorage.getItem('@auth_token');
    if (!token) {
      throw new Error('User must be authenticated');
    }

    try {
      console.log('Creating card with data:', JSON.stringify(cardData, null, 2));
      console.log('Using API URL:', API_URL);
      
      const response = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cardData)
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${responseText}`);
      }

      try {
        const data = JSON.parse(responseText);
        return data;
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error creating card:', error);
      throw error;
    }
  },

  async getUserCards() {
    const token = await AsyncStorage.getItem('@auth_token');
    if (!token) {
      throw new Error('User must be authenticated');
    }

    try {
      const response = await fetch(`${API_URL}/cards`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const cards = await response.json();
      console.log('Fetched cards:', cards);
      return cards;
    } catch (error) {
      console.error('Error getting cards:', error);
      throw error;
    }
  },

  async updateCard(cardId: string, updates: Partial<BusinessCard>) {
    const token = await AsyncStorage.getItem('@auth_token');
    if (!token) {
      throw new Error('User must be authenticated');
    }

    try {
      const response = await fetch(`${API_URL}/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      console.error('Error updating card:', error);
      throw error;
    }
  },

  async deleteCard(cardId: string) {
    const token = await AsyncStorage.getItem('@auth_token');
    if (!token) {
      throw new Error('User must be authenticated');
    }

    try {
      const response = await fetch(`${API_URL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  }
}; 