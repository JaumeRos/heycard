import { BusinessCard } from '../services/cardService';

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Tabs: undefined;
  MyCardsStack: undefined;
  ContactsStack: undefined;
  CreateCard: undefined;
  EditCard: { cardId: string };
  Settings: undefined;
};

export type MyCardsStackParamList = {
  MyCardsList: undefined;
};

export type ContactsStackParamList = {
  ContactsList: undefined;
  ScanQR: undefined;
}; 