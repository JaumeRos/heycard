import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export function AddPictureScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>Add a Picture</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Avatar.Icon 
          size={120} 
          icon="account"
          style={styles.avatar}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => {/* TODO: Implement choose from library */}}
          style={[styles.button, styles.secondaryButton]}
          labelStyle={styles.secondaryButtonText}
        >
          Choose from Library
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => {/* TODO: Implement take photo */}}
          style={[styles.button, styles.secondaryButton]}
          labelStyle={styles.secondaryButtonText}
        >
          Take Photo
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Tabs')}
        style={[styles.button, styles.primaryButton]}
        labelStyle={styles.primaryButtonText}
      >
        Continue
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    backgroundColor: '#F0F0F0',
  },
  buttonContainer: {
    flex: 1,
    gap: 16,
  },
  button: {
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#000000',
    marginTop: 'auto',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F0F0F0',
    borderWidth: 0,
  },
  secondaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
}); 