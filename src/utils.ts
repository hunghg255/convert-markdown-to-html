export const stringToSlug = (str: string) => {
  return str
    .normalize('NFD') // Normalize the string to decompose combined characters
    .replaceAll(/[\u0300-\u036F]/g, '') // Remove diacritics
    .toLowerCase() // Convert the string to lowercase
    .replaceAll('đ', 'd') // Special case for Vietnamese đ character
    .replaceAll(/\W+/g, '-') // Replace spaces and non-word characters with dashes
    .replaceAll(/^-+|-+$/g, ''); // Remove leading and trailing dashes
};
