import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyCardsStackScreen } from './MyCardsStackScreen';
import { ContactsStackScreen } from './ContactsStackScreen';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tab.Screen
        name="MyCardsStack"
        component={MyCardsStackScreen}
        options={{
          title: 'My Cards',
          tabBarIcon: ({ color, size }) => (
            <Icon name="card-account-details" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ContactsStack"
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
} 