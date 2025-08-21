import { useState } from 'react';

export const environment = {
  DEV: {
    baseUrl: 'http://localhost:3000',
  },
  PROD: {
    baseUrl: 'http://localhost:3000',
  },
} as const;

export const useAppEnvironment = () => {
  const [appEnvironment, setAppEnvironment] = useState(environment.DEV);

  return { appEnvironment, setAppEnvironment };
};
