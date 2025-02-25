import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyCardScreen } from '../screens/MyCardScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const MyCardsStack = createNativeStackNavigator();

export function MyCardsStackScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleCreateCard = () => {
    navigation.navigate('CreateCard');
  };

  return (
    <MyCardsStack.Navigator>
      <MyCardsStack.Screen 
        name="MyCardsList" 
        component={MyCardScreen}
        options={{
          title: 'HeyCard',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
            color: '#000000',
          },
          headerBackTitle: 'My Cards',
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleSettingsPress}
              style={styles.headerButton}
            >
              <Icon name="cog" size={24} color="#000000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={handleCreateCard}
              style={styles.headerButton}
            >
              <Icon name="plus" size={24} color="#000000" />
            </TouchableOpacity>
          ),
        }}
      />
    </MyCardsStack.Navigator>
  );
}

const styles = {
  headerButton: {
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
}; 