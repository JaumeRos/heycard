import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import HeycardLogo from '../assets/heycard.svg';

export function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/welcome_background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <HeycardLogo 
            style={styles.logo}
            width={200}
            height={50}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
             onPress={() => navigation.navigate('SignUp')}
            style={[styles.button, styles.primaryButton]}
            labelStyle={styles.primaryButtonText}
          >
            Get Started
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('SignIn')}
            style={[styles.button, styles.secondaryButton]}
            labelStyle={styles.secondaryButtonText}
          >
            Log In
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
    paddingBottom: 40,
  },
  button: {
    width: '100%',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#000000',
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