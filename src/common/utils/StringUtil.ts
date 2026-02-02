/**
 * @description capitalize first letter
 */
export const toCapitalizeCase = (text: string) => text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);

/**
 * @description lower case all characters
 */
export const toLowerCase = (text: string) => text.toLowerCase();

/**
 * @description upper case all characters
 */
export const toUpperCase = (text: string) => text.toUpperCase();
