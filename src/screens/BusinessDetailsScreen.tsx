import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export function BusinessDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>Business Details</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Add the information you'd like to see on the card
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Company"
          value={company}
          onChangeText={setCompany}
          mode="outlined"
          style={styles.input}
          outlineStyle={styles.inputOutline}
          theme={{
            colors: {
              background: '#F5F5F5',
              outline: 'transparent',
              primary: '#000000',
            },
          }}
        />
        
        <TextInput
          label="Position"
          value={position}
          onChangeText={setPosition}
          mode="outlined"
          style={styles.input}
          outlineStyle={styles.inputOutline}
          theme={{
            colors: {
              background: '#F5F5F5',
              outline: 'transparent',
              primary: '#000000',
            },
          }}
        />
      </View>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddPicture')}
        style={styles.button}
        labelStyle={styles.buttonText}
        disabled={!company || !position}
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
  subtitle: {
    color: '#666666',
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
  },
  inputOutline: {
    borderRadius: 12,
  },
  button: {
    marginTop: 'auto',
    backgroundColor: '#000000',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 