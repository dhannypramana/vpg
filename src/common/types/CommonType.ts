import type { App } from 'vue';

export type SetupModule = (app: App<Element>) => void;
export type ObjectValues<T> = T[keyof T];
export type ObjectKeys<T> = keyof T;
export type Nullable<T> = T | null;
export type Undefined<T> = T | undefined;
export type SelectOption<T, K> = {
    label: T;
    value: K;
};
