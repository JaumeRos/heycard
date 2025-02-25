import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Text } from 'react-native-paper';

export function ContactsScreen() {
  const handleScanQR = () => {
    // TODO: Implement QR code scanning
    console.log('Scan QR code');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text variant="titleMedium">Your contacts will appear here</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Scan a QR code to add a new contact
        </Text>
      </View>
      <FAB
        icon="qrcode-scan"
        style={styles.fab}
        onPress={handleScanQR}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 