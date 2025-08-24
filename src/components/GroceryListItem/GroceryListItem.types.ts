import { GroceryListItem } from '@/src/store/grocerylist/groceryList.types';

export interface GroceryListItemProps {
  item: GroceryListItem;
  onPressDelete: () => void;
  onPressEdit: () => void;
  onPressBought: () => void;
}
