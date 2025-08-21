import { GroceryListItem } from '@/src/store/grocerylist/groceryList.types';

export interface GroceryListItemProps {
  item: GroceryListItem;
  onPressDelete: (id: number) => void;
  onPressEdit: (item: GroceryListItem) => void;
}
