export const summerize = (
  text: string,
  length: number,
) => {
  if (text.length > length) {
    return text.slice(0, length - 3) + '...';
  }
  return text;
};
