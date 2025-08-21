import { useAppEnvironment } from '@/src/config/environmentConfig';
import { useGroceryListStore } from '@/src/store/grocerylist/groceryList.store';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useDeleteGroceryList = () => {
  const { appEnvironment } = useAppEnvironment();
  const { setLoading } = useGroceryListStore();
  const { isPending, data, mutateAsync } = useMutation({
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
  });

  useEffect(() => {
    if (isPending) {
      setLoading(isPending);
      console.log('DATA >>>', data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const onDelete = (id: number) => {
    mutateAsync({ id });
  };

  return { onDelete };
};
