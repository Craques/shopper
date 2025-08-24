import { useAppEnvironment } from '@/src/config/environmentConfig';
import { useGroceryListStore } from '@/src/store/grocerylist/groceryList.store';
import { GroceryListItem } from '@/src/store/grocerylist/groceryList.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export const useUpdateGroceryListItem = () => {
  const queryClient = useQueryClient();
  const { appEnvironment } = useAppEnvironment();
  const { setLoading } = useGroceryListStore();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['updateGroceryListItem'],
    mutationFn: async (item: GroceryListItem) => {
      const response = await fetch(
        `${appEnvironment.baseUrl}/groceryList/${item.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        },
      );
      return await response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groceryList'] });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Updated Item Succesfully',
      });
    },
    onError: async () => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update item',
      });
    },
  });

  useEffect(() => {
    setLoading(isPending);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const onUpdateItem = async (item: GroceryListItem) => {
    return await mutateAsync(item);
  };

  return { onUpdateItem };
};
