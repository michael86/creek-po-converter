export const saveToStorage = (key: string, value: string) => localStorage.setItem(key, value);
export const readFromStorage = (key: string) => localStorage.getItem(key);
