export function getAdjustedTextSize(text: string, baseSize: number) {
  let adjustment = 0;
  if (text.length > 5) {
    adjustment = 4;
  }
  if (text.length > 6) {
    adjustment = 6;
  }
  if (text.length > 7) {
    adjustment = 12;
  }
  if (text.length > 8) {
    adjustment = 18;
  }
  if (text.length > 9) {
    adjustment = 24;
  }
  if (text.length > 10) {
    adjustment = 0; // Return to default size for extremely long names.
  }
  return baseSize - adjustment;
}

export function countWords(str: string | undefined) {
  if (!str) {
    return 0;
  }
  return str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function isNameValid(str: string) {
  return str.length > 0;
}
