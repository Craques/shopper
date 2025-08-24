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
import { useDeleteGroceryList } from '@/src/services/groceryList/deleteGroceryListItem';
import { useAddGroceryListItem } from '@/src/services/groceryList/addGroceryListItem';
import { ConfirmationModal } from '@/src/components/ConfirmationModal/ConfirmationModal';
import { useUpdateGroceryListItem } from '@/src/services/groceryList/updateGroceryListItem';

const ItemSeperator = () => <Divider className="bg-primary-200" />;

export const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBoughtModalOpen, setIsBoughtModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    TGroceryListItem | undefined
  >();
  const insets = useSafeAreaInsets();
  const { onDelete } = useDeleteGroceryList();
  const { onUpdateItem } = useUpdateGroceryListItem();
  const { onAddItem } = useAddGroceryListItem();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { itemName: undefined, price: undefined },
    mode: 'onBlur',
  });

  const toggleModal = (item: TGroceryListItem | undefined) => {
    console.log('ITEM >>>', item);
    setSelectedItem(item);
    if (item?.id) {
      reset({ itemName: item.itemName, price: item.price.toString() });
    } else {
      console.log('GOT HERE');
      reset({ itemName: undefined, price: undefined });
    }
    setIsOpen(prevState => !prevState);
  };

  const toggleBoughtModal = (item: TGroceryListItem | undefined) => {
    setSelectedItem(item);
    setIsBoughtModalOpen(prevState => !prevState);
  };
  const toggleDeleteModal = (item: TGroceryListItem | undefined) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(prevState => !prevState);
  };

  const onSubmit = async (data: Omit<TGroceryListItem, 'id' | 'bought'>) => {
    if (selectedItem && selectedItem.id) {
      await onUpdateItem({
        ...selectedItem,
        itemName: data.itemName,
        price: Number(data.price),
      });
    } else {
      await onAddItem({ itemName: data.itemName, price: Number(data.price) });
    }
    toggleModal(undefined);
  };

  const { groceryList } = useGetGroceryList();

  const rendeItem: ListRenderItem<TGroceryListItem> = ({ item }) => {
    return (
      <GroceryListItem
        item={item}
        onPressDelete={() => toggleDeleteModal(item)}
        onPressEdit={() => toggleModal(item)}
        onPressBought={() => toggleBoughtModal(item)}
      />
    );
  };

  return (
    <Box className="flex-1">
      <NavigationBar onPressAdd={() => toggleModal(undefined)} />
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
        title={selectedItem?.id ? 'Edit Item' : 'Add Item'}
        isOpen={isOpen}
        toggleModal={() => toggleModal(undefined)}
        ctaTitle={selectedItem?.id ? 'Edit' : 'Add'}
      />
      <ConfirmationModal
        isOpen={isBoughtModalOpen}
        ctaTitle={selectedItem?.bought ? 'Incomplete' : 'Complete'}
        type={selectedItem?.bought ? 'warning' : 'success'}
        onPress={() => {
          if (selectedItem) {
            onUpdateItem({ ...selectedItem, bought: !selectedItem.bought });
            toggleBoughtModal(undefined);
          }
        }}
        title="Mark as Bought?"
        toggleModal={() => toggleBoughtModal(undefined)}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        ctaTitle="Delete"
        type="error"
        onPress={() => {
          if (selectedItem) {
            onDelete(selectedItem?.id);
          }
          toggleDeleteModal(undefined);
        }}
        title="Delete Item?"
        toggleModal={() => toggleDeleteModal(undefined)}
      />
    </Box>
  );
};
