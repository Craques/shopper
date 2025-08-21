/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStack } from './src/Navigation';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GluestackUIProvider mode={isDarkMode ? 'dark' : 'light'}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

export default App;
