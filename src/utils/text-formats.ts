export function formatTextInLowerCaseAndRemoveSpaces(text: string) {
  const removeSpaces = text.replace(" ", "");
  const transformLower = removeSpaces.toLowerCase();

  return transformLower;
};

