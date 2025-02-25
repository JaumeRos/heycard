import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { BusinessCard } from '../services/cardService';
import { cardService } from '../services/cardService';
import { BusinessCardItem } from '../components/BusinessCardItem';
import { ButtonText, P1 } from '../components/Text';
import { QrCodeIcon } from '../components/Icons/QrCodeIcon';

export function MyCardScreen() {
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const userCards = await cardService.getUserCards();
      console.log('Loaded cards from Firestore:', JSON.stringify(userCards, null, 2));
      setCards(userCards);
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = () => {
    navigation.navigate('CreateCard');
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <P1>Loading cards...</P1>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.emptyIcon}>
          <QrCodeIcon size={120} color="#000000" />
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateCard}
        >
          <ButtonText style={styles.createButtonText}>
            Create your first card
          </ButtonText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cards.map((card) => (
        <BusinessCardItem
          key={card.id}
          card={card}
          onEdit={() => card.id && navigation.navigate('EditCard', { cardId: card.id })}
          onDelete={async () => {
            if (!card.id) return;
            await cardService.deleteCard(card.id);
            loadCards();
          }}
          onShowQR={() => {}}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  emptyIcon: {
    marginBottom: 40,
  },
  createButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 