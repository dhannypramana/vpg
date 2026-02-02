import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @description Merge class names with tailwind merge and clsx
 */
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
