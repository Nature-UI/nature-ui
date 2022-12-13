export const addItem = <T>(array: T[], item: T) => {
  return [...array, item];
};

export const removeItem = <T>(array: T[], item: T) => {
  return array.filter((eachItem) => eachItem !== item);
};
