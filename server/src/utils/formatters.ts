export const normalizeText = (text: string) => text.trim().replace(/\s+/g, " ");

export const formatTitle = (text: string) => {
  const normalized = normalizeText(text);
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};
