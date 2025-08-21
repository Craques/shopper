import { ModalComponent } from '@/src/components/Modal';
import { NavigationBar } from '@/src/components/NavigationBar';
import { useState } from 'react';
import { Text, View } from 'react-native';

export const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(prevState => !prevState);
  return (
    <View>
      <NavigationBar onPressAdd={toggleModal} />
      <Text>Hello world</Text>
      <ModalComponent
        title="Add Item"
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </View>
  );
};
