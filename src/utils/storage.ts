
import { InitialValue } from '../@types';

export const getLocalStorageValue = (key: string, initialValue: InitialValue) => {
  const storedValue: string | null = localStorage.getItem(key);

  return storedValue !== null ? JSON.parse(storedValue) : initialValue;
};
