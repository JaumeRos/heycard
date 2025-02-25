import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ContactsStackParamList } from '../types/navigation';

type ScanQRScreenNavigationProp = NativeStackNavigationProp<ContactsStackParamList, 'ScanQR'>;

export const ScanQRScreen = () => {
  const navigation = useNavigation<ScanQRScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Scan QR Code Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}); 