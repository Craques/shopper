import { ModalComponent } from '@/src/components/Modal';
import { NavigationBar } from '@/src/components/NavigationBar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ListRenderItem, FlatList, Alert } from 'react-native';
import { schema } from './schema';
import { useForm } from 'react-hook-form';
import { useGetGroceryList } from '@/src/services/groceryList/getGroceryList';
import { GroceryListItem as TGroceryListItem } from '@/src/store/grocerylist/groceryList.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { GroceryListItem } from '@/src/components/GroceryListItem/GroceryListItem';
import { useDeleteGroceryList } from '@/src/services/groceryList/deleteGroceryListItem';
import { useAddGroceryListItem } from '@/src/services/groceryList/addGroceryListItem';

const ItemSeperator = () => <Divider className="bg-primary-200" />;

export const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const { onDelete } = useDeleteGroceryList();
  const { onAddItem } = useAddGroceryListItem();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { itemName: undefined, price: undefined },
    mode: 'onBlur',
  });
  const toggleModal = () => {
    setIsOpen(prevState => !prevState);
    reset();
  };

  const onSubmit = async (data: Omit<TGroceryListItem, 'id' | 'bought'>) => {
    await onAddItem({ itemName: data.itemName, price: Number(data.price) });
    toggleModal();
  };

  const { groceryList } = useGetGroceryList();

  const rendeItem: ListRenderItem<TGroceryListItem> = ({ item }) => {
    return (
      <GroceryListItem
        item={item}
        onPressDelete={onDelete}
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
          ItemSeparatorComponent={ItemSeperator}
        />
      </Box>
      <ModalComponent
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        title="Add Item"
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </Box>
  );
};
