import { type ClassValue, clsx } from 'clsx';
import { customTwMerge } from './customTwMerge';

export function mergeClassNames(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
