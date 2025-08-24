import { useAppEnvironment } from '@/src/config/environmentConfig';
import { useGroceryListStore } from '@/src/store/grocerylist/groceryList.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export const useDeleteGroceryList = () => {
  const queryClient = useQueryClient();
  const { appEnvironment } = useAppEnvironment();
  const { setLoading } = useGroceryListStore();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['deleteGroceryList'],
    mutationFn: async ({ id }: { id: number }) => {
      const response = await fetch(
        `${appEnvironment.baseUrl}/groceryList/${id}`,
        {
          method: 'DELETE',
        },
      );
      return await response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groceryList'] });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Deleted Item Succesfully',
      });
    },
    onError: async () => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete item',
      });
    },
  });

  useEffect(() => {
    setLoading(isPending);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const onDelete = (id: number) => {
    mutateAsync({ id });
  };

  return { onDelete };
};
