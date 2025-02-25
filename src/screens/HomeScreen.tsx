import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyCardScreen } from './MyCardScreen';
import { ContactsScreen } from './ContactsScreen';
import { ScanQRScreen } from './ScanQRScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainTabParamList, RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator<MainTabParamList>();
const ContactsStack = createNativeStackNavigator();

const ContactsStackScreen = () => {
  return (
    <ContactsStack.Navigator screenOptions={{ headerShown: false }}>
      <ContactsStack.Screen name="ContactsList" component={ContactsScreen} />
      <ContactsStack.Screen name="ScanQR" component={ScanQRScreen} />
    </ContactsStack.Navigator>
  );
};

export const HomeScreen = () => {
  const rootNavigation = useNavigation<RootNavigationProp>();

  const handleSettingsPress = () => {
    console.log('Settings button pressed'); // Debug log
    rootNavigation.navigate('Settings');
  };

  const SettingsButton = () => (
    <TouchableOpacity
      onPress={handleSettingsPress}
      style={{
        padding: 10,
        marginLeft: 10,
      }}
    >
      <Icon name="cog" size={24} color="#000000" />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
        headerShown: false,
        headerLeft: () => <SettingsButton />,
      }}
    >
      <Tab.Screen
        name="MyCards"
        component={MyCardScreen}
        options={{
          title: 'My Cards',
          tabBarIcon: ({ color, size }) => (
            <Icon name="card-account-details" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsStackScreen}
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <Icon name="contacts" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 