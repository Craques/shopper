import { useAppEnvironment } from '@/src/config/environmentConfig';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetGroceryList = () => {
  const { appEnvironment } = useAppEnvironment();

  const { isLoading, error, data, isError, isSuccess } = useQuery({
    queryKey: ['groceryList'],
    queryFn: async () => {
      const response = await fetch(`${appEnvironment.baseUrl}/groceryList`);
      return await response.json();
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
};
