export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : null;
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
