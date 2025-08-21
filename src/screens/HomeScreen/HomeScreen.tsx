import { ModalComponent } from '@/src/components/Modal';
import { NavigationBar } from '@/src/components/NavigationBar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ListRenderItem, FlatList } from 'react-native';
import { schema } from './schema';
import { useForm } from 'react-hook-form';
import { useGetGroceryList } from '@/src/services/groceryList/getGroceryList';
import { GroceryListItem as TGroceryListItem } from '@/src/store/grocerylist/groceryList.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { GroceryListItem } from '@/src/components/GroceryListItem/GroceryListItem';

export const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();
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

  const { groceryList } = useGetGroceryList();

  const rendeItem: ListRenderItem<TGroceryListItem> = ({ item }) => {
    return (
      <GroceryListItem
        item={item}
        onPressDelete={() => undefined}
        onPressEdit={() => undefined}
      />
    );
  };

  return (
    <Box className="flex-1">
      <NavigationBar onPressAdd={toggleModal} />
      <Box
        className="bg-primary-600 flex-1"
        style={{ paddingBottom: insets.bottom }}
      >
        <FlatList
          data={groceryList}
          renderItem={rendeItem}
          keyExtractor={item => item.id?.toString()}
          ItemSeparatorComponent={() => <Divider className="bg-primary-200" />}
        />
      </Box>
      <ModalComponent
        control={control}
        onSubmit={onSubmit}
        title="Add Item"
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </Box>
  );
};
