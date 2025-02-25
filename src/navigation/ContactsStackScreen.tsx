import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactsScreen } from '../screens/ContactsScreen';
import { ScanQRScreen } from '../screens/ScanQRScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const ContactsStack = createNativeStackNavigator();

export function ContactsStackScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen 
        name="ContactsList" 
        component={ContactsScreen}
        options={{
          title: 'Contacts',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
            color: '#000000',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleSettingsPress}
              style={styles.headerButton}
            >
              <Icon name="cog" size={24} color="#000000" />
            </TouchableOpacity>
          ),
        }}
      />
      <ContactsStack.Screen 
        name="ScanQR" 
        component={ScanQRScreen}
        options={{ 
          title: 'Scan QR Code',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
            color: '#000000',
          },
        }}
      />
    </ContactsStack.Navigator>
  );
}

const styles = {
  headerButton: {
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
}; 