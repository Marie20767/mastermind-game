import { useEffect, useState } from 'react';
import { InitialValue } from '../@types';

const useLocalStorageState = (key: string, initialValue: InitialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorageState;
