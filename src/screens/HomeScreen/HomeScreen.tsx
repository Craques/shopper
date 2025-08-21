import { NavigationBar } from '@/src/components/NavigationBar';
import { Alert, Text, View } from 'react-native';

export const HomeScreen = () => {
  return (
    <View>
      <NavigationBar onPressAdd={() => Alert.alert('hello')} />
      <Text>Hello world</Text>
    </View>
  );
};
