import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { NavigationBar } from './components/NavigationBar';

const Stack = createNativeStackNavigator();
export const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Shopper"
      options={{
        headerShown: false,
      }}
      component={HomeScreen}
    />
  </Stack.Navigator>
);
