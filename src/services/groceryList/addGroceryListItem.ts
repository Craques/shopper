import { useAppEnvironment } from '@/src/config/environmentConfig';
import { useGroceryListStore } from '@/src/store/grocerylist/groceryList.store';
import { GroceryListItem } from '@/src/store/grocerylist/groceryList.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export const useAddGroceryListItem = () => {
  const queryClient = useQueryClient();
  const { appEnvironment } = useAppEnvironment();
  const { setLoading } = useGroceryListStore();
  const { isPending, data, mutateAsync } = useMutation({
    mutationKey: ['addGroceryListItem'],
    mutationFn: async (item: Omit<GroceryListItem, 'id' | 'bought'>) => {
      const response = await fetch(`${appEnvironment.baseUrl}/groceryList/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...item, bought: false }),
      });
      return await response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groceryList'] });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Added Item Succesfully',
      });
    },
    onError: async () => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add item',
      });
    },
  });

  useEffect(() => {
    if (isPending) {
      setLoading(isPending);
      console.log('DATA >>>', data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, data]);

  const onAddItem = async (item: Omit<GroceryListItem, 'id' | 'bought'>) => {
    return await mutateAsync(item);
  };

  return { onAddItem };
};
