import { create } from 'zustand';
import { GroceryListState } from './groceryList.types';

export const useGroceryListStore = create<GroceryListState>(set => ({
  groceryList: [],
  loading: false,
  setGroceryList: groceryList => set({ groceryList }),
  setLoading: loading => set({ loading }),
}));
