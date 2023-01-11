
import { InitialValue } from '../@types';

interface LocalStorageItems {
  [key: string]: any;
}

export const getLocalStorageValue = (key: string, initialValue: InitialValue, saveInitialValue = false) => {
  const storedValue: string | null = localStorage.getItem(key);

  if (storedValue !== null) {
    return JSON.parse(storedValue);
  }

  if (saveInitialValue) {
    localStorage.setItem(key, JSON.stringify(initialValue));
  }

  return initialValue;
};

export const localStorageSetItems = (items: LocalStorageItems) => {
  Object.keys(items).forEach((key) => localStorage.setItem(key, JSON.stringify(items[key])));
};
