export interface GroceryListState {
  loading: boolean;
  groceryList: GroceryListItem[];
  setGroceryList: (list: GroceryListItem[]) => void;
  setLoading: (loading: boolean) => void;
}

export interface GroceryListItem {
  itemName: string;
  price: number;
  id: number;
  bought: boolean;
}
