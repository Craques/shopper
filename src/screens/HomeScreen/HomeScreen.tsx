import { ModalComponent } from '@/src/components/Modal';
import { NavigationBar } from '@/src/components/NavigationBar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { schema } from './schema';
import { useForm } from 'react-hook-form';

export const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { itemName: undefined, price: undefined },
    mode: 'onBlur',
  });
  const toggleModal = () => {
    setIsOpen(prevState => !prevState);
    reset();
  };

  const onSubmit = () => {
    handleSubmit(() => undefined);
  };
  return (
    <View>
      <NavigationBar onPressAdd={toggleModal} />
      <Text>Hello world</Text>
      <ModalComponent
        control={control}
        onSubmit={onSubmit}
        title="Add Item"
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </View>
  );
};
