export const firstLetter = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
