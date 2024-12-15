import { useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from '../utils/storage';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return loadFromStorage(key, initialValue);
  });

  useEffect(() => {
    saveToStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
