export const truncateText = (text: string) => {
  if (text.length > 10) {
    return `${text.substring(0, 10)}...`;
  }
  return text;
};
