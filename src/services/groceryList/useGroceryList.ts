import { useGroceryListStore } from '@/src/store/grocerylist/groceryList.store';
import { useAddGroceryListItem } from './addGroceryListItem';
import { useDeleteGroceryList } from './deleteGroceryListItem';
import { useUpdateGroceryListItem } from './updateGroceryListItem';

export const useGroceryList = () => {
  const { loading } = useGroceryListStore();
  const { onDelete } = useDeleteGroceryList();
  const { onUpdateItem } = useUpdateGroceryListItem();
  const { onAddItem } = useAddGroceryListItem();

  return { onAddItem, onUpdateItem, onDelete, loading };
};
