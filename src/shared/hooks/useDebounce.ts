import { useEffect } from 'react';
import { useState } from 'react';

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
