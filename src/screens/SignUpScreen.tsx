import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import { H1, P1, ButtonText } from '../components/Text';
import { TextInput } from '../components/TextInput';
import { colors } from '../theme';
import { BackIcon, GoogleIcon, AppleIcon } from '../components/Icon';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpScreen = ({ navigation }: Props) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError('');
      await signUp(email, password);
      navigation.replace('Tabs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackIcon color={colors.primary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <H1 style={styles.title}>Create an account</H1>
          <P1 style={styles.subtitle}>
            Create an account to save your progress and create your business card
          </P1>
        </View>

        {error ? <P1 style={styles.error}>{error}</P1> : null}

        <View style={styles.form}>
          <TextInput
            placeholder="Personal Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            error={!!error && error.includes('email')}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            error={!!error && error.includes('password')}
          />

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <ButtonText style={styles.buttonText}>
              Sign Up with Email
            </ButtonText>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <P1 style={styles.dividerText}>or</P1>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={[styles.button, styles.googleButton]}>
            <GoogleIcon width={20} height={20} />
            <ButtonText style={styles.googleButtonText}>Sign Up with Google</ButtonText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.appleButton]}>
            <AppleIcon width={20} height={20} color="#FFFFFF" />
            <ButtonText style={styles.appleButtonText}>Sign Up with Apple</ButtonText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 24,
    zIndex: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    color: colors.grey,
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 0,
  },
  button: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  googleButtonText: {
    marginLeft: 8,
    color: colors.primary,
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  appleButtonText: {
    marginLeft: 8,
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightGrey,
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.grey,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
}); 