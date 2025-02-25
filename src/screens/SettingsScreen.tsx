import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export function SettingsScreen() {
  const { signOut } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Account & Language Section */}
      <View style={[styles.section, styles.firstSection]}>
        <List.Item
          title="Account"
          left={props => <Icon {...props} name="account-outline" size={24} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{
            color: '#000000',
          }}
          style={{
            backgroundColor: '#FFFFFF',
          }}
        />
        <List.Item
          title="Language"
          left={props => <Icon {...props} name="flag-outline" size={24} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{
            color: '#000000',
          }}
          style={{
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>

      {/* Subscription Section */}
      <View style={styles.section}>
        <List.Item
          title="Manage Subscription"
          left={props => <Icon {...props} name="diamond-outline" size={24} color="#FFB800" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{
            color: '#000000',
          }}
          style={{
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>

      {/* Help & Feedback Section */}
      <View style={styles.section}>
        <List.Item
          title="Frequently Asked Questions"
          left={props => <Icon {...props} name="help-circle-outline" size={24} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{
            color: '#000000',
          }}
          style={{
            backgroundColor: '#FFFFFF',
          }}
        />
        <List.Item
          title="Send Feedback"
          left={props => <Icon {...props} name="heart-outline" size={24} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{
            color: '#000000',
          }}
          style={{
            backgroundColor: '#FFFFFF',
          }}
        />
        <List.Item
          title="Rate CardApp on the App Store"
          left={props => <Icon {...props} name="star-outline" size={24} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{
            color: '#000000',
          }}
          style={{
            backgroundColor: '#FFFFFF',
          }}
        />
        <List.Item
          title="About CardApp"
          left={props => <Icon {...props} name="information-outline" size={24} />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          titleStyle={{
            color: '#000000',
          }}
          style={{
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>

      {/* Social Media Section */}
      <View style={styles.socialSection}>
        <Text style={styles.followText}>Follow us @cardappbiz</Text>
        <View style={styles.socialIcons}>
          <Icon name="whatsapp" size={24} style={styles.socialIcon} />
          <Icon name="instagram" size={24} style={styles.socialIcon} />
          <Icon name="linkedin" size={24} style={styles.socialIcon} />
          <Icon name="twitter" size={24} style={styles.socialIcon} />
        </View>
      </View>

      {/* Sign Out Button */}
      <View style={styles.logoutSection}>
        <List.Item
          title="Log out"
          titleStyle={styles.logoutText}
          onPress={handleSignOut}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  firstSection: {
    marginTop: 16,
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 12,
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  followText: {
    color: '#666',
    marginBottom: 16,
    fontSize: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  socialIcon: {
    color: '#000',
  },
  logoutSection: {
    backgroundColor: '#fff',
    marginTop: 'auto',
    marginBottom: 16,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  logoutText: {
    color: 'red',
    textAlign: 'center',
    fontWeight: '500',
  },
}); 