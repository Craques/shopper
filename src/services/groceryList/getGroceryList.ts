import { useAppEnvironment } from '@/src/config/environmentConfig';
import { useGroceryListStore } from '@/src/store/grocerylist/groceryList.store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetGroceryList = () => {
  const { appEnvironment } = useAppEnvironment();
  const { setGroceryList } = useGroceryListStore();
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['groceryList'],
    queryFn: async () => {
      const response = await fetch(`${appEnvironment.baseUrl}/groceryList`);
      return await response.json();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setGroceryList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log(isError);
    }
  }, [isError]);
};
